//! Initialize elm tests.

use std::path::Path;
use std::process::Command;

/// Use the elm-json binary tool to copy the behavior of the command `elm-test init`.
pub fn main() {
    // Install elm-explorations/benchmark
    let status = Command::new("elm-json")
        .arg("install")
        .arg("--test")
        .arg("elm-explorations/benchmark@1.0.1")
        .status()
        .expect("Command elm-json failed to start");
    if !status.success() {
        eprintln!(
            "There was an error when trying to add elm-explorations/benchmark to your dependencies"
        );
        std::process::exit(1);
    }

    // Create the benchmarks/Benchmarks.elm template
    std::fs::create_dir_all("benchmarks").expect("Impossible to create directory benchmarks/");

    let location = Path::new("benchmarks/Benchmarks.elm");
    if !location.exists() {
        match std::fs::write(location, include_str!("../templates/Benchmarks.elm")) {
            Ok(()) => {}
            Err(e) => {
                panic!("Unable to copy Benchmarks.elm template: {:?}", e);
            }
        }
    }
}
