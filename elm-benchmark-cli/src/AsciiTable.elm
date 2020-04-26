module AsciiTable exposing (draw, transpose, unicodeSingleLine)


data =
    [ ( "name", [ "List.foldl", "Array.foldl" ] )
    , ( "runsPerSecond", [ "101642", "98175" ] )
    , ( "goodnessOfFit", [ "0.999", "0.99" ] )
    ]


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


draw : Config -> List ( String, List String ) -> String
draw config dict =
    let
        withWidth =
            addWidth dict

        rows : List (List ( Int, String ))
        rows =
            withWidth
                |> List.map (\( _, w, vs ) -> List.map (\v -> ( w, v )) vs)
                |> transpose
    in
    String.join "\n"
        [ drawHeader config withWidth
        , String.join "\n" (List.map (drawRow config) rows)
        , drawFooter config withWidth
        ]


addWidth : List ( String, List String ) -> List ( String, Int, List String )
addWidth =
    List.map (\( k, v ) -> ( k, maxWidth k v + 2, v ))


maxWidth : String -> List String -> Int
maxWidth key values =
    values
        |> List.map String.length
        |> List.maximum
        |> Maybe.withDefault 0
        |> max (String.length key)


drawHeader : Config -> List ( String, Int, List String ) -> String
drawHeader config items =
    let
        topLine =
            config.top.left
                ++ (List.map (\( _, w, _ ) -> String.repeat w config.header.horizontal) items |> String.join config.top.middle)
                ++ config.top.right

        centerLine =
            config.header.vertical
                ++ (List.map (\( k, w, _ ) -> String.pad w ' ' k) items |> String.join config.header.vertical)
                ++ config.header.vertical

        bottomLine =
            config.middle.left
                ++ (List.map (\( _, w, _ ) -> String.repeat w config.header.horizontal) items |> String.join config.middle.middle)
                ++ config.middle.right
    in
    String.join "\n" [ topLine, centerLine, bottomLine ]


drawRow : Config -> List ( Int, String ) -> String
drawRow config items =
    config.header.vertical
        ++ (List.map (\( w, v ) -> String.pad w ' ' v) items |> String.join config.header.vertical)
        ++ config.header.vertical


drawFooter : Config -> List ( String, Int, List String ) -> String
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
