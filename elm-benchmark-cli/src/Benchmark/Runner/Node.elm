module Benchmark.Runner.Node exposing (BenchmarkProgram, run)

import AsciiTable
import Benchmark exposing (Benchmark)
import Benchmark.LowLevel
import Benchmark.Reporting as Reporting
import Benchmark.Status as Status
import Console
import Json.Encode exposing (Value)
import Platform exposing (worker)
import Process
import Task exposing (Task)
import Trend.Linear as Trend exposing (Quick, Trend)
import Trend.Math


type alias Flags =
    { report : String }


type ReportFormat
    = JsonReport
    | ConsoleReport


type alias BenchmarkProgram =
    Program Flags Model Msg


run : (Value -> Cmd Msg) -> Benchmark.Benchmark -> BenchmarkProgram
run emit benchmark =
    worker
        { init =
            \flags ->
                init
                    { emit = emit
                    , report =
                        if flags.report == "json" then
                            JsonReport

                        else
                            ConsoleReport
                    }
                    benchmark
        , update = update
        , subscriptions = always Sub.none
        }


type alias Model =
    { emit : Value -> Cmd Msg
    , report : ReportFormat
    }


type Msg
    = Update Benchmark


init : Model -> Benchmark -> ( Model, Cmd Msg )
init model benchmark =
    ( model
    , Cmd.batch
        [ if Benchmark.done benchmark then
            Cmd.none

          else
            stepCmd benchmark
        , model.emit (running benchmark)
        , model.emit (start benchmark)
        ]
    )


breakForRender : Task x a -> Task x a
breakForRender task =
    Process.sleep 0 |> Task.andThen (always task)


stepCmd : Benchmark -> Cmd Msg
stepCmd benchmark =
    benchmark
        |> Benchmark.step
        |> breakForRender
        |> Task.perform Update


update : Msg -> Model -> ( Model, Cmd Msg )
update (Update benchmark) model =
    if Benchmark.done benchmark then
        ( model
        , Cmd.batch [ model.emit (done benchmark) ]
        )

    else
        ( model
        , Cmd.batch
            [ stepCmd benchmark
            , model.emit (running benchmark)
            ]
        )


reportToProgress : Reporting.Report -> Float
reportToProgress report =
    case report of
        Reporting.Single _ status ->
            Status.progress status

        Reporting.Series _ namedStatuses ->
            averageBy (Tuple.second >> Status.progress) namedStatuses

        Reporting.Group _ reports ->
            averageBy reportToProgress reports


averageBy : (a -> Float) -> List a -> Float
averageBy asFloat list =
    case list of
        [] ->
            0

        _ ->
            List.sum (List.map asFloat list) / toFloat (List.length list)


running : Benchmark -> Value
running benchmark =
    let
        report =
            Reporting.fromBenchmark benchmark
    in
    Json.Encode.object
        [ ( "type", Json.Encode.string "running" )
        , ( "data"
          , Json.Encode.string <| "\u{000D}" ++ progressBar 72 (reportToProgress report)
          )
        ]


done : Benchmark -> Value
done benchmark =
    let
        report =
            Reporting.fromBenchmark benchmark
    in
    Json.Encode.object
        [ ( "type", Json.Encode.string "done" )
        , ( "msg", Json.Encode.string <| "\u{000D}" ++ progressBar 72 (reportToProgress report) )
        , ( "data", encode benchmark )
        ]


start : Benchmark -> Value
start report =
    Json.Encode.object
        [ ( "type", Json.Encode.string "start" )
        , ( "data"
          , Json.Encode.string <|
                Console.bold "\n⏱  Running benchmarks...\n\n"
                    ++ makePrettyIntro report
                    ++ "\n"
          )
        ]


indent : Int -> String -> String
indent level =
    (++) (String.repeat level "    ")


makePrettyIntro : Benchmark -> String
makePrettyIntro b =
    Reporting.fromBenchmark b
        |> makePrettyIntroLines
        |> String.join "\n"


makePrettyIntroLines : Reporting.Report -> List String
makePrettyIntroLines structure =
    case structure of
        Reporting.Single name _ ->
            [ name ]

        Reporting.Group thisGroup reports ->
            ("↳ " ++ thisGroup)
                :: List.concatMap
                    (makePrettyIntroLines >> List.map (indent 1))
                    reports

        Reporting.Series name variations ->
            ("Series - " ++ name)
                :: (variations
                        |> List.map (\( subname, _ ) -> indent 1 ("Variation: " ++ subname))
                   )


encode : Benchmark -> Value
encode benchmark =
    benchmark
        |> Reporting.fromBenchmark
        |> encodeReport


encodeReport : Reporting.Report -> Value
encodeReport report =
    case report of
        Reporting.Single name status ->
            Json.Encode.object
                (( "tag", Json.Encode.string "single" )
                    :: ( "name", Json.Encode.string name )
                    :: ( "name1", Json.Encode.string name )
                    :: ( "pretty", Json.Encode.string (AsciiTable.draw AsciiTable.unicodeSingleLine (toData [ ( name, status ) ])) )
                    :: encodeStatus status
                )

        Reporting.Series name items ->
            Json.Encode.object
                [ ( "tag", Json.Encode.string "series" )
                , ( "name", Json.Encode.string name )
                , ( "series", Json.Encode.list encodeSeriesItem (getTrends items) )
                , ( "pretty", Json.Encode.string (AsciiTable.draw AsciiTable.unicodeSingleLine (toData items)) )
                ]

        Reporting.Group name reports ->
            Json.Encode.object
                [ ( "tag", Json.Encode.string "group" )
                , ( "name", Json.Encode.string name )
                , ( "group", Json.Encode.list encodeReport reports )
                ]


encodeSeriesItem : ( String, Trend Quick, String ) -> Value
encodeSeriesItem ( name, trend, change ) =
    Json.Encode.object
        [ ( "tag", Json.Encode.string "single" )
        , ( "name", Json.Encode.string name )
        , ( "runsPerSecond", Json.Encode.int (runsPerSecond trend) )
        , ( "goodnessOfFit", Json.Encode.float (Trend.goodnessOfFit trend) )
        , ( "change", Json.Encode.string change )
        ]


getTrends : List ( String, Status.Status ) -> List ( String, Trend Quick, String )
getTrends items =
    let
        combine : List (Result x a) -> Result x (List a)
        combine =
            List.foldr (Result.map2 (::)) (Ok [])

        combineMap : (a -> Result x b) -> List a -> Result x (List b)
        combineMap f =
            -- TODO do this properly!
            combine << List.map f

        resTrends =
            combineMap (\( name, status ) -> Result.map (\trend -> ( name, trend )) (getTrend status)) items
    in
    case resTrends of
        Ok ((( _, first ) :: _) as trends) ->
            List.map (\( name, trend ) -> ( name, trend, percentChange first trend )) trends

        _ ->
            []


getTrend : Status.Status -> Result (Maybe Status.Error) (Trend Trend.Quick)
getTrend status =
    case status of
        Status.Cold ->
            Err Nothing

        Status.Unsized ->
            Err Nothing

        Status.Pending _ _ ->
            Err Nothing

        Status.Failure e ->
            Err (Just e)

        Status.Success _ trend ->
            Ok trend


encodeStatus : Status.Status -> List ( String, Value )
encodeStatus status =
    case status of
        Status.Cold ->
            []

        Status.Unsized ->
            []

        Status.Pending _ _ ->
            []

        Status.Failure e ->
            [ ( "error", encodeError e ) ]

        Status.Success _ trend ->
            [ ( "runsPerSecond", Json.Encode.int (runsPerSecond trend) )
            , ( "goodnessOfFit", Json.Encode.float (Trend.goodnessOfFit trend) )
            ]


encodeError : Status.Error -> Value
encodeError e =
    Json.Encode.string <|
        case e of
            Status.MeasurementError Benchmark.LowLevel.StackOverflow ->
                "The benchmark caused a stack overflow"

            Status.MeasurementError (Benchmark.LowLevel.UnknownError msg) ->
                "Ran into an unknown error: " ++ msg

            Status.AnalysisError (Trend.Math.NeedMoreValues n) ->
                "Not enough values, I need at least " ++ String.fromInt n

            Status.AnalysisError Trend.Math.AllZeros ->
                "The benchmark results are all zero! I can't make a trend out of those."



-- ASCII TABLE


toData : List ( String, Status.Status ) -> List ( String, List String )
toData items =
    items
        |> getTrends
        |> List.map
            (\( name, trend, change ) ->
                [ name
                , String.fromInt (runsPerSecond trend)
                , change
                , String.fromFloat (Trend.goodnessOfFit trend)
                ]
            )
        |> AsciiTable.transpose
        |> List.map2 Tuple.pair [ "name", "runs per second", "change", "goodness of fit" ]



-- TRENDS


runsPerSecond : Trend Trend.Quick -> Int
runsPerSecond trend =
    -- runs per second (= 1000ms)
    trend
        |> Trend.line
        |> (\a -> Trend.predictX a 1000)
        |> floor


percentChange : Trend Quick -> Trend Quick -> String
percentChange old new =
    let
        rps =
            Trend.line >> (\a -> Trend.predictX a 1000)

        change =
            (rps new - rps old) / rps old

        sign =
            if change > 0 then
                "+"

            else
                ""
    in
    if old == new then
        "-"

    else
        percent change
            |> (++) sign


percent : Float -> String
percent =
    (*) 10000
        >> round
        >> toFloat
        >> (\a -> a / 100)
        >> String.fromFloat
        >> (\a -> a ++ "%")



-- PROGRESS BAR


progressBar : Int -> Float -> String
progressBar width progress =
    let
        doneWhen =
            (progress * 8 * toFloat width)
                |> floor

        toGo =
            width - ceiling (toFloat doneWhen / 8)

        percentDone : Int
        percentDone =
            (progress * toFloat 100)
                |> floor
    in
    String.concat
        [ "▕"
        , String.repeat (doneWhen // 8) "█"
        , block (doneWhen |> modBy 8)
        , String.repeat toGo "·"
        , "▏"
        , String.padLeft 4 ' ' (String.fromInt percentDone ++ "%")
        ]


block : Int -> String
block i =
    case i of
        1 ->
            "▏"

        2 ->
            "▎"

        3 ->
            "▍"

        4 ->
            "▌"

        5 ->
            "▋"

        6 ->
            "▊"

        7 ->
            "▉"

        8 ->
            "█"

        _ ->
            ""
