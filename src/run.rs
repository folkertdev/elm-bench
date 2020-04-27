//! Module dealing with actually running all the tests.

use crate::elm_json::{Config, Dependencies};
use glob::glob;
use include_dir::{include_dir, Dir};
use std::collections::HashSet;
use std::convert::TryFrom;
use std::ffi::OsStr;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

const ELM_CLI_SRC: Dir = include_dir!("../elm-benchmark-cli/src");

fn unpack_included_dir(root: &Path, dir: Dir) {
    for file in dir.files() {
        let output = root.join(file.path);
        std::fs::File::create(output)
            .expect("Unable to create generated file")
            .write_all(file.contents())
            .expect("Unable to write to generated file");
    }

    for subdir in dir.dirs() {
        let output = root.join(subdir.path);
        std::fs::create_dir_all(output.clone())
            .unwrap_or_else(|_| panic!("could not create directory {:?}", output));
        unpack_included_dir(root, *subdir)
    }
}

#[derive(Debug)]
/// Options passed as arguments.
pub struct Options {
    pub help: bool,
    pub version: bool,
    pub compiler: String,
    pub prefix: Option<String>,
    pub no_optimize: bool,
    pub report: String,
    pub files: Vec<String>,
}

/// Main function, preparing and running the tests.
/// It has multiple steps that can be summarized as:
///
///  1. Generate the list of test modules and their file paths.
///  2. Generate a correct `elm.json` for the to-be-generated `Runner.elm`.
///  3. Compile all test files such that we know they are correct.
///  4. Find all tests.
///  5. Generate `Runner.elm` with a master test concatenating all found exposed tests.
///  6. Compile it into a JS file wrapped into a Node worker module.
///  7. Compile `Reporter.elm` into a Node module.
///  8. Generate and start the Node supervisor program.
pub fn main(options: Options) {
    // The help option is prioritary over the other options
    if options.help {
        crate::help::main();
        return;
    // The version option is the second priority
    } else if options.version {
        println!("{}", std::env!("CARGO_PKG_VERSION"));
        return;
    }

    // Validate reporter
    let reporter = match options.report.as_ref() {
        "console" => "console".to_string(),
        "json" => "json".to_string(),
        value => {
            eprintln!("Wrong --report value: {}", value);
            crate::help::main();
            return;
        }
    };

    // Verify that we are in an Elm project
    let elm_project_root = crate::utils::elm_project_root().unwrap();

    // benchmark source directories
    let benchmark_source_directories = if options.files.is_empty() {
        let root_string = &elm_project_root.to_str().unwrap().to_string();

        // if there is an existing elm.json in the `/benchmarks` folder, try to use it
        // to find the source directories.
        let attempt_decode_elm_json = (|| -> std::io::Result<Vec<_>> {
            // Read benchmark elm.json
            let elm_json_str =
                std::fs::read_to_string(elm_project_root.join("benchmarks/elm.json"))?;
            let info = Config::try_from(elm_json_str.as_ref()).unwrap();

            // Convert package elm.json to an application elm.json if needed
            let result = match info {
                Config::Package(_package) => vec![format!("{}/{}", root_string, "benchmarks")],
                Config::Application(application) => {
                    let mut result = Vec::with_capacity(application.source_directories.len() * 2);

                    for s_dir in application.source_directories.iter() {
                        result.push(format!("{}/benchmarks/{}", root_string, s_dir));
                    }

                    result
                }
            };

            Ok(result)
        })();

        match attempt_decode_elm_json {
            Ok(paths) => paths,
            Err(_) => vec![format!("{}/{}", root_string, "benchmarks")],
        }
    } else {
        vec![]
    };

    let module_globs = if options.files.is_empty() {
        let mut result = Vec::new();
        for source_dir in &benchmark_source_directories {
            result.push(format!("{}/*.elm", source_dir));
            result.push(format!("{}/**/*.elm", source_dir));
        }

        result
    } else {
        options.files
    };

    // Get file paths of all modules in canonical form
    let module_paths: HashSet<PathBuf> = module_globs
        .iter()
        // join expanded globs for each pattern
        .flat_map(|pattern| {
            glob(pattern)
                .unwrap_or_else(|_| panic!(format!("Failed to read glob pattern {}", pattern)))
        })
        // filter out errors
        .filter_map(|x| x.ok())
        // canonical form of paths
        .map(|path| {
            path.canonicalize()
                .unwrap_or_else(|_| panic!(format!("Error in canonicalize of {:?}", path)))
        })
        // collect into a set of unique values
        .collect();

    // Read project elm.json
    let elm_json_str = std::fs::read_to_string(elm_project_root.join("elm.json"))
        .expect("Unable to read elm.json");
    let info = Config::try_from(elm_json_str.as_ref()).unwrap();

    // Convert package elm.json to an application elm.json if needed
    let mut elm_json_tests = match info {
        Config::Package(package) => crate::elm_json::ApplicationConfig::try_from(&package).unwrap(),
        Config::Application(application) => application,
    };

    // Make src dirs relative to the generated tests root
    let benchmarks_root = elm_project_root.join("elm-stuff/benchmarks-0.19.1");
    let mut source_directories: Vec<PathBuf> = elm_json_tests
        .source_directories
        .iter()
        // Add tests/ to the list of source directories
        .chain(benchmark_source_directories.iter())
        // Get canonical form
        .map(|path| match elm_project_root.join(path).canonicalize() {
            Ok(v) => v,
            Err(e) => panic!("error {:?} {:?}", e, elm_project_root.join(path)),
        })
        // Get path relative to benchmarks_root
        .map(|path| {
            pathdiff::diff_paths(&path, &benchmarks_root).expect("Could not get relative path")
        })
        // remove duplicates
        .collect::<HashSet<_>>()
        .into_iter()
        .collect();

    // Add src/ and elm-test-rs/elm/src/ to the source directories
    source_directories.push(Path::new("src").into());
    elm_json_tests.source_directories = source_directories
        .iter()
        .map(|path| path.to_str().unwrap().to_string())
        .collect();

    // Promote test dependencies to normal ones
    elm_json_tests.promote_test_dependencies();

    // Write the elm.json file to disk
    let elm_json_tests_path = benchmarks_root.join("elm.json");
    std::fs::create_dir_all(&benchmarks_root.join("src")).expect("Could not create tests dir");
    std::fs::File::create(&elm_json_tests_path)
        .expect("Unable to create generated elm.json")
        .write_all(serde_json::to_string(&elm_json_tests).unwrap().as_bytes())
        .expect("Unable to write to generated elm.json");

    // Finish preparing the elm.json file by solving any dependency issue (use elm-json)
    eprintln!("Running elm-json to solve dependency issues ...");
    let output = Command::new("elm-json")
        .arg("solve")
        .arg("--test")
        .arg("--extra")
        .arg("elm/core")
        .arg("elm/json")
        .arg("BrianHicks/elm-trend")
        .arg("--")
        .arg(&elm_json_tests_path)
        // stdio config
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::inherit())
        .output()
        .expect("command failed to start");
    let solved_dependencies: Dependencies =
        serde_json::from_str(std::str::from_utf8(&output.stdout).unwrap())
            .expect("Wrongly formed dependencies");
    elm_json_tests.dependencies = solved_dependencies;
    std::fs::File::create(&elm_json_tests_path)
        .expect("Unable to create generated elm.json")
        .write_all(serde_json::to_string(&elm_json_tests).unwrap().as_bytes())
        .expect("Unable to write to generated elm.json");

    // Compile all test files
    eprintln!("Compiling all test files ...");
    compile(
        &benchmarks_root,                   // current_dir
        &options.compiler,                  // compiler
        &Path::new("/dev/null").to_owned(), // output
        module_paths.iter(),                // src
    );

    // Find all modules and tests
    eprintln!("Finding all modules and tests ...");
    let all_modules_and_tests =
        crate::elmi::all_tests(&benchmarks_root, options.prefix, &module_paths).unwrap();
    let runner_imports: Vec<String> = all_modules_and_tests
        .iter()
        .map(|m| "import ".to_string() + &m.module_name)
        .collect();
    let runner_tests: Vec<String> = all_modules_and_tests
        .iter()
        .map(|module| {
            let full_module_tests: Vec<String> = module
                .tests
                .iter()
                .map(move |test| module.module_name.clone() + "." + test)
                .collect();
            format!(
                r#"Benchmark.describe "{}" [ {} ]"#,
                &module.module_name,
                full_module_tests.join(", ")
            )
        })
        .collect();

    // Generate templated src/BenchmarkRunner.elm
    instantiate_template(
        include_str!("../templates/BenchmarkRunner.elm"),
        benchmarks_root.join("src/BenchmarkRunner.elm"), // output
        vec![
            ("user_imports".to_string(), runner_imports.join("\n")),
            ("tests".to_string(), runner_tests.join("\n    , ")),
        ],
    );

    // write all the included cli generator files
    // unpack_included_dir(&benchmarks_root.join("src"), ELM_CLI_SRC);
    std::fs::File::create(benchmarks_root.join("src/Console.elm"))
        .expect("Unable to create generated file")
        .write_all(include_bytes!("../elm-benchmark-cli/src/Console.elm"))
        .expect("Unable to write to generated file");

    std::fs::File::create(benchmarks_root.join("src/AsciiTable.elm"))
        .expect("Unable to create generated file")
        .write_all(include_bytes!("../elm-benchmark-cli/src/AsciiTable.elm"))
        .expect("Unable to write to generated file");

    std::fs::File::create(benchmarks_root.join("src/Benchmark/Runner/Node.elm"))
        .expect("Unable to create generated file")
        .write_all(include_bytes!(
            "../elm-benchmark-cli/src/Benchmark/Runner/Node.elm"
        ))
        .expect("Unable to write to generated file");

    // Compile the src/Runner.elm file into Runner.elm.js
    eprintln!("Compiling the generated templated src/benchmarkRunner.elm ...");
    let compiled_elm_file = benchmarks_root.join("js/Runner.elm.js");
    compile(
        &benchmarks_root,             // current_dir
        &options.compiler,            // compiler
        &compiled_elm_file,           // output
        &["src/BenchmarkRunner.elm"], // src
    );

    // Generate the node_runner.js node module embedding the Elm runner
    let polyfills = include_str!("../templates/node_polyfills.js");

    let node_runner_path = benchmarks_root.join("js/node_benchmark_runner.js");
    instantiate_template(
        include_str!("../templates/node_benchmark_runner.js"),
        node_runner_path.clone(), // output
        vec![
            ("polyfills".to_string(), polyfills.to_string()),
            ("report".to_string(), options.report),
        ],
    );

    // Start the benchmark runner
    eprintln!("Starting the supervisor ...");
    let mut supervisor = Command::new("node")
        .arg("js/node_benchmark_runner.js")
        .current_dir(&benchmarks_root)
        .stdin(Stdio::piped())
        .spawn()
        .expect("command failed to start");

    // Helper closure to write to supervisor
    let stdin = supervisor.stdin.as_mut().expect("Failed to open stdin");
    let mut writeln = |msg| {
        stdin.write_all(msg).expect("writeln");
        stdin.write_all(b"\n").expect("writeln");
    };

    // Send runner module path to supervisor to start the work
    eprintln!("Running tests ...");
    let node_runner_path_string = node_runner_path.to_str().unwrap().to_string();
    writeln(&node_runner_path_string.as_bytes());

    // Wait for supervisor child process to end and terminate with same exit code
    let exit_code = wait_child(&mut supervisor);
    eprintln!("Exited with code {:?}", exit_code);
    std::process::exit(exit_code.unwrap_or(1));
}

/// Wait for child process to end
fn wait_child(child: &mut std::process::Child) -> Option<i32> {
    match child.try_wait() {
        Ok(Some(status)) => status.code(),
        Ok(None) => match child.wait() {
            Ok(status) => status.code(),
            _ => None,
        },
        Err(e) => {
            eprintln!("Error attempting to wait for child: {}", e);
            None
        }
    }
}

/// Compile an Elm module into a JS file
fn compile<P, I, S>(current_dir: P, compiler: &str, output: P, src: I)
where
    P: AsRef<Path>,
    I: IntoIterator<Item = S>,
    S: AsRef<OsStr>,
{
    let status = Command::new(compiler)
        .arg("make")
        .arg("--optimize")
        .arg(format!("--output={}", output.as_ref().to_str().unwrap()))
        .args(src)
        .current_dir(current_dir)
        // stdio config, comment to see elm make output for debug
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::inherit())
        .status()
        .expect("Command elm make failed to start");
    if !status.success() {
        std::process::exit(1);
    }
}

/// Replace the template keys and write result to output file.
fn instantiate_template<P: AsRef<Path>>(
    template_content: &str,
    output: P,
    replacements: Vec<(String, String)>,
) {
    let content = varj::parse(&template_content, &replacements.into_iter().collect())
        .expect("The template does not match with the replacement keys");
    std::fs::File::create(output)
        .expect("Unable to create generated file")
        .write_all(content.as_bytes())
        .expect("Unable to write to generated file");
}
