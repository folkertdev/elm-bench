//! Basically a wrapper module for elmi-to-json for the time being.
//! It reads the compiled .elmi files and extracts exposed benchmarks.

use serde::Deserialize;
use std::collections::{HashMap, HashSet};
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

fn is_benchmark(value: &serde_json::Value) -> bool {
    use serde_json::Value;
    use serde_json::Value::*;
    if let Object(annotation_fields) = value {
        if let Some(Object(module_name)) = annotation_fields.get("moduleName") {
            let is_benchmark_alias =
                module_name.get("module") == Some(&Value::String("Benchmark".to_string()));
            let from_correct_module = module_name.get("package")
                == Some(&Value::String("elm-explorations/benchmark".to_string()));

            return is_benchmark_alias && from_correct_module;
        }
    }

    false
}

/// Use elmi-to-json as a binary to extract all exposed tests
/// from compiled .elmi files.
pub fn all_tests<P: AsRef<Path>>(
    work_dir: P,
    src_files: &HashSet<PathBuf>,
) -> Result<Vec<TestModule>, String> {
    let output = Command::new("elmi-to-json")
        .arg("--elm-version")
        .arg("0.19.1")
        // stdio config
        .current_dir(&work_dir)
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::inherit())
        .output()
        .expect("command failed to start");
    let str_output = std::str::from_utf8(&output.stdout)
        .map_err(|_| "Output of elmi-to-json is not valid UTF-8".to_string())?;

    // println!("{}", &str_output);
    let output: ElmiToJsonOutput = match serde_json::from_str(str_output) {
        Ok(v) => v,
        Err(e) => panic!("error {:?}", e),
    };

    let mut benchmark_modules = Vec::new();

    for module in output.internals {
        let mut benchmark_values = Vec::new();
        for (name, value) in module.values.iter() {
            if is_benchmark(&value.annotation) {
                benchmark_values.push(name.clone());
            }
        }

        if !benchmark_values.is_empty() {
            benchmark_modules.push(TestModule {
                module_name: module.module_name,
                path: module.path,
                tests: benchmark_values.clone(),
            });
        }
    }

    Ok(benchmark_modules)
}

#[derive(Deserialize, Debug)]
/// Struct mirroring the json result of elmi-to-json --for-elm-test.
struct ElmiToJsonOutput {
    pub internals: Vec<Module>,
}

#[derive(Deserialize, Debug)]
/// Test modules as listed in the json result of elmi-to-json.
pub struct Module {
    pub home: String,
    #[serde(rename = "module")]
    pub module_name: String,
    pub path: String,
    pub values: HashMap<String, Value>,
}

#[derive(Deserialize, Debug)]
pub struct Value {
    pub annotation: serde_json::Value,
}

#[derive(Deserialize, Debug)]
pub struct Annotation {
    pub annotation: String,
}

#[derive(Debug)]
pub struct TestModule {
    pub module_name: String,
    pub path: String,
    pub tests: Vec<String>,
}
