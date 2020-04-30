module AsciiTable exposing (Column, draw, intColumn, percentColumn, stringColumn, transpose, unicodeSingleLine)

import Console


type Column
    = Column { align : Align, name : String, values : List ( Int, String ), width : Int }


type Align
    = AlignRight
    | AlignCenter


intColumn : String -> List Int -> Column
intColumn name rawValues =
    let
        splitter : String -> List String -> String
        splitter input accum =
            if String.length input < 3 then
                String.join " " (input :: List.reverse accum)

            else
                splitter (String.dropRight 3 input) (String.right 3 input :: accum)

        values1 =
            List.map
                (\v ->
                    let
                        asString =
                            String.fromInt v
                                |> (\x -> splitter x [])
                    in
                    ( String.length asString, Console.yellow asString )
                )
                rawValues

        widestValue =
            List.map Tuple.first values1
                |> List.maximum
                |> Maybe.withDefault 0

        values2 =
            values1
                |> List.map (\( w, v ) -> ( w, Console.yellow (String.padLeft (widestValue - w) ' ' v) ))

        width =
            max (String.length name) widestValue
    in
    Column
        { align = AlignCenter
        , name = name
        , values = values2
        , width = width + 2
        }


stringColumn : String -> List String -> Column
stringColumn name rawValues =
    let
        values =
            List.map
                (\asString ->
                    ( String.length asString, asString )
                )
                rawValues

        width =
            (String.length name :: List.map Tuple.first values)
                |> List.maximum
                |> Maybe.withDefault (String.length name)
    in
    Column
        { align = AlignCenter
        , name = name
        , values = values
        , width = width + 2
        }


percentColumn : String -> List Float -> Column
percentColumn name rawValues =
    let
        values =
            List.map
                (\v ->
                    let
                        asString =
                            "0." ++ String.padRight 3 '0' (String.fromInt (round (1000 * v)))
                    in
                    ( String.length asString, Console.yellow asString )
                )
                rawValues

        width =
            (String.length name :: List.map Tuple.first values)
                |> List.maximum
                |> Maybe.withDefault (String.length name)
    in
    Column
        { align = AlignCenter
        , name = name
        , values = values
        , width = width + 2
        }


type alias Side =
    { left : String
    , middle : String
    , right : String
    }


type alias Config =
    { top : Side
    , middle : Side
    , bottom : Side
    , header : { horizontal : String, vertical : String }
    , separator : { horizontal : String, vertical : String }
    }


unicodeSingleLine : Config
unicodeSingleLine =
    { top = { left = "┌", middle = "┬", right = "┐" }
    , middle = { left = "├", middle = "┼", right = "┤" }
    , bottom = { left = "└", middle = "┴", right = "┘" }
    , header = { vertical = "│", horizontal = "─" }
    , separator = { vertical = "│", horizontal = "─" }
    }


draw : Config -> List Column -> String
draw config columns =
    let
        withWidth =
            List.map (\(Column c) -> ( c.name, c.width, c.values )) columns

        rows =
            columns
                |> List.map (\(Column c) -> List.map (\( width, v ) -> { hasWidth = width, wantsWidth = c.width, value = v, align = c.align }) c.values)
                |> transpose
    in
    String.join "\n"
        [ drawHeader config withWidth
        , String.join "\n" (List.map (drawRow config) rows)
        , drawFooter config withWidth
        ]


maxWidth : String -> List String -> Int
maxWidth key values =
    values
        |> List.map String.length
        |> List.maximum
        |> Maybe.withDefault 0
        |> max (String.length key)


padWithStyle : Int -> Int -> Char -> (String -> String) -> String -> String
padWithStyle hasWidth wantsWidth char style input =
    let
        diff =
            toFloat (wantsWidth - hasWidth) / 2

        left =
            Basics.floor diff

        right =
            Basics.ceiling diff
    in
    String.repeat left (String.fromChar char)
        ++ style input
        ++ String.repeat right (String.fromChar char)


padRightWithStyle : Int -> Int -> Char -> (String -> String) -> String -> String
padRightWithStyle hasWidth wantsWidth char style input =
    let
        diff =
            wantsWidth - hasWidth
    in
    String.repeat diff (String.fromChar char) ++ style input


drawHeader : Config -> List ( String, Int, a ) -> String
drawHeader config items =
    let
        topLine =
            config.top.left
                ++ (List.map (\( _, w, _ ) -> String.repeat w config.header.horizontal) items |> String.join config.top.middle)
                ++ config.top.right

        centerLine =
            config.header.vertical
                ++ (List.map (\( k, w, _ ) -> padWithStyle (String.length k) w ' ' Console.bold k) items |> String.join config.header.vertical)
                ++ config.header.vertical

        bottomLine =
            config.middle.left
                ++ (List.map (\( _, w, _ ) -> String.repeat w config.header.horizontal) items |> String.join config.middle.middle)
                ++ config.middle.right
    in
    String.join "\n" [ topLine, centerLine, bottomLine ]


drawRow : Config -> List { hasWidth : Int, wantsWidth : Int, value : String, align : Align } -> String
drawRow config items =
    let
        mapper { hasWidth, wantsWidth, value, align } =
            case align of
                AlignCenter ->
                    padWithStyle hasWidth wantsWidth ' ' identity value

                AlignRight ->
                    padRightWithStyle hasWidth wantsWidth ' ' identity value

        values =
            List.map mapper items
    in
    config.header.vertical
        ++ (values |> String.join config.header.vertical)
        ++ config.header.vertical


drawFooter : Config -> List ( String, Int, a ) -> String
drawFooter config items =
    config.bottom.left
        ++ (List.map (\( _, w, _ ) -> String.repeat w config.header.horizontal) items |> String.join config.bottom.middle)
        ++ config.bottom.right


transpose : List (List a) -> List (List a)
transpose list =
    case list of
        [ [] ] ->
            []

        [] :: _ ->
            []

        rows ->
            List.filterMap List.head rows :: transpose (List.filterMap List.tail rows)
