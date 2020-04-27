# elm-bench

Run elm benchmarks from the command line


## Usage

Currently, you need to have a recent [node][node], elm 0.19.1, [elm-json][elm-json] and [elmi-to-json][elmi-to-json] installed.

[elm-json]: https://github.com/zwilias/elm-json
[elmi-to-json]: https://github.com/stoeffel/elmi-to-json
[node]: https://nodejs.org/en/
[rustup]: https://rustup.rs/

To get started, run: 

```
elm-bench init
```

Similar to `elm-test init`, this will add the required dependencies to your `test-dependencies`, generate a `benchmarks` folder and populate it with `Benchmarks.elm`.
Next you can run:

```
elm-bench
```

This will crawl the files in `benchmarks` for exposed `Benchmark` values, and then run the benchmarks.

## Options

### `--prefix`

Filter benchmark names that start with the given prefix.

Because of how `elm-explorations/benchmark` works right now, we can only filter based on definitions. So in the case of 

```
foo = Benchmark.benchmark "bar" something
```

The benchmark is included for `--prefix=foo`, but not `--prefix=bar`

### `--no-optimize`

Benchmarks should always be compiled in `--optimize` mode. Using any other mode can give wildly misleading results. Therefore, using `--optimize` is the default for `elm-bench`. If you need to e.g. use `Debug.log` in your benchmarks for debugging purposes you can pass this flag. Don't forget to turn it off though!

TODO add a big red warning when running the benchmarks without `--optimize`

### `--report`

Either `console` or `json`, defaults to `console`

The `console` report is a formatted human-readable report of the benchmark results. `json` is a json blob useful for storage or further analysis.

## Build from source

To build the `elm-bench` binary, install the rust toolchain (e.g. using [rustup][rustup]) and run the command:

```sh
# in /elm-bench
cargo install --path .
```

The executable is now added to your PATH and should be available across your system.

## Contributing

Contributions are very welcome.
This project uses [rust format][rustfmt] and [clippy][clippy] (with its default options) to enforce good code style.
To install these tools run

```bash
rustup update
rustup component add clippy rustfmt
```

And then before committing run

```bash
cargo fmt
cargo clippy
```

Both of these tools also integrate with editor plugins.

PS: clippy is a rapidly evolving tool so if there are lint errors on CI
don't forget to `rustup update`. 

[rustfmt]: https://github.com/rust-lang/rustfmt
[clippy]: https://github.com/rust-lang/rust-clippy

## Thanks

- Matthieu Pizenberg for most of the rust code
- Ilias van Peer for an [earlier prototype](https://github.com/zwilias/elm-benchmark-cli)
- Richard Feldman for [console-print](https://github.com/rtfeldman/console-print)
- Brian Hicks and other contributers for [elm-explorations/benchmark]
