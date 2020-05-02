//! Initialize elm tests.

use std::path::Path;
use std::process::Command;

pub fn main() {
    // Install elm-explorations/benchmark
    eprintln!("Adding `elm-explorations/benchmark` to development dependencies");

    let status = Command::new("elm-json")
        .arg("install")
        .arg("--test")
        .arg("elm-explorations/benchmark@1.0.1")
        .status()
        .expect("Command elm-json failed to start");
    if !status.success() {
        panic!(
            "There was an error when trying to add elm-explorations/benchmark to your dependencies"
        );
    }

    // Create the benchmarks/Benchmarks.elm template
    std::fs::create_dir_all("benchmarks").expect("Impossible to create directory benchmarks/");

    let location = Path::new("benchmarks/Benchmarks.elm");
    if !location.exists() {
        eprintln!("Creating `benchmarks/Benchmarks.elm` example file");
        match std::fs::write(location, include_str!("../templates/Benchmarks.elm")) {
            Ok(()) => {}
            Err(e) => {
                panic!("Unable to copy Benchmarks.elm template: {:?}", e);
            }
        }
    }

    eprintln!(
        "All done! Try running `elm-bench` to run the example in `benchmarks/Benchmarks.elm`."
    );
}
