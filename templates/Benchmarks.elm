module Benchmarks exposing (foldl, foldr)

import Benchmark
import Array

list = List.range 0 99
array = Array.initialize 100 identity

foldl = Benchmark.compare "foldl"
                    "List.foldl"
                    (\_ -> List.foldl (+) 0 list)
                    "Array.foldl"
                    (\_ -> Array.foldl (+) 0 array)

foldr =
                 Benchmark.compare "foldr"
                    "List.foldr"
                    (\_ -> List.foldr (+) 0 list)
                    "Array.foldr"
                    (\_ -> Array.foldr (+) 0 array)
