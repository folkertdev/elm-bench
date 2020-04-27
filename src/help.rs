//! Print manually crafted help message.
//! Automatic help is not handled by the lightweight pico-args.

/// Print help message.
pub fn main() {
    println!("{}", USAGE);
}

const USAGE: &str = r#"
elm-test-rs
An alternative Elm test runner to node-test-runner

USAGE:
    elm-test-rs [<SUBCOMMAND>] [FLAGS] [TESTFILES]
    For example:
        elm-test-rs tests/*.elm

FLAGS:
    --help                       # Print this message and exit
    --version                    # Print version string and exit
    --compiler /path/to/compiler # Precis the compiler to use (defaults to just elm)
    --report console|json        # Print results to stdout in given format (defaults to console)
    --prefix                     # Only run benchmarks that start with this prefix 
    --no-optimize                # Allow `Debug` usage. Gives misleading benchmark results!

SUBCOMMANDS:
    init               # Initialize tests dependencies and directory
    install [PACKAGES] # Install packages to "test-dependencies" in your elm.json
"#;
