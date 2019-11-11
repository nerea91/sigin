<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="css/app.css" rel="stylesheet">

        <!-- Styles -->
        <style>
            #entry{
                text-align: center;
            }
            .cat{
                margin-top: 1em;
            }
            .cat img {
                max-width: 600px;
                max-height: 500px;
            }
            #cat-img{
                display: none;
            }
        </style>
    </head>
    <body>
       <div id='app'></div>
       <script src="js/app.js"></script>
    </body>
</html>
