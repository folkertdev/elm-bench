port module BenchmarkRunner exposing (main)

{{ user_imports }}
import Benchmark
import Benchmark.Runner.Node exposing (BenchmarkProgram, run)
import Json.Encode exposing (Value)

port emit : Value -> Cmd msg

main : BenchmarkProgram 
main =
    [ {{ tests }} ]
        |> Benchmark.describe "suite"
        |> Benchmark.Runner.Node.run emit
