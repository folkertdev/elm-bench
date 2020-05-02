mod elm_json;
mod elmi;
mod help;
mod init;
mod install;
mod run;
mod utils;

use run::Optimize;

#[derive(Debug)]
/// Type representing command line arguments.
enum Args {
    Init,
    Install { packages: Vec<String> },
    Run(run::Options),
}

/// Main entry point of elm-test-rs.
fn main() {
    match main_args() {
        Ok(Args::Init) => init::main(),
        Ok(Args::Install { packages }) => install::main(packages),
        Ok(Args::Run(options)) => run::main(options),
        Err(e) => eprintln!("Error: {:?}.", e),
    }
}

/// Function parsing the command line arguments and returning an Args object or an error.
fn main_args() -> Result<Args, Box<dyn std::error::Error>> {
    let mut args = pico_args::Arguments::from_env();
    match args.subcommand()?.as_deref() {
        Some("init") => Ok(Args::Init),
        Some("install") => Ok(Args::Install {
            packages: args.free()?,
        }),
        // The first arg may be mistaken for an unknown subcommand
        Some(first_arg) => no_subcommand_args(Some(first_arg.to_string()), args),
        None => no_subcommand_args(None, args),
    }
}

/// Parse all command options and file arguments.
/// first_arg is here in case it was mistaken for an unknown subcommand
/// and will be prepended to the rest of free arguments.
/// This happens for example with the command: `elm-benca /path/to/some/Module.elm`.
fn no_subcommand_args(
    first_arg: Option<String>,
    mut args: pico_args::Arguments,
) -> Result<Args, Box<dyn std::error::Error>> {
    Ok(Args::Run(run::Options {
        help: args.contains("--help"),
        version: args.contains("--version"),
        compiler: args
            .opt_value_from_str("--compiler")?
            .unwrap_or_else(|| "elm".to_string()),
        report: args
            .opt_value_from_str("--report")?
            .unwrap_or_else(|| "console".to_string()),
        prefix: args.opt_value_from_str("--prefix")?,
        node_profile: args.contains("--node-profile"),
        optimize: if args.contains("--no-optimize") {
            Optimize::NoOptimize
        } else {
            Optimize::Optimize
        },
        files: {
            let mut files = args.free()?;
            if let Some(file) = first_arg {
                files.insert(0, file);
            }
            files
        },
    }))
}
