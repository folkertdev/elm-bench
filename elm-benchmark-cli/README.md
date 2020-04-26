# elm benchmarks on the command line

[elm-explorations/benchmark]: https://package.elm-lang.org/packages/elm-explorations/benchmark/latest

An experiment to bring [elm-explorations/benchmark] to the command line.

## How to run

```sh
cd example
elm install
elm make Main.elm --optimize --output elm.js >/dev/null 
node run.js
``` 



## Thanks

- Ilias van Peer for an [earlier prototype](https://github.com/zwilias/elm-benchmark-cli)
- Richard Feldman for [console-print](https://github.com/rtfeldman/console-print)
- Brian Hicks and other contributers for [elm-explorations/benchmark]
