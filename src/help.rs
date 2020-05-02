//! Print manually crafted help message.
//! Automatic help is not handled by the lightweight pico-args.

/// Print help message.
pub fn main() {
    println!("{}", USAGE);
}

const USAGE: &str = r#"
elm-bench

Run elm benchmarks on the command line

USAGE:
    elm-bench [<SUBCOMMAND>] [FLAGS] [TESTFILES]
    For example:
        elm-bench benchmarks/*.elm

FLAGS:
    --help                       # Print this message and exit
    --version                    # Print version string and exit
    --compiler /path/to/compiler # Precis the compiler to use (defaults to just elm)
    --report console|json        # Print results to stdout in given format (defaults to console)
    --prefix                     # Only run benchmarks that start with this prefix 
    --node-profile               # Print a profile of the benchmark run  
    --no-optimize                # Allow `Debug` usage. Gives misleading benchmark results!

SUBCOMMANDS:
    init               # Initialize tests dependencies and directory
    install [PACKAGES] # Install packages to "test-dependencies" in your elm.json
"#;
