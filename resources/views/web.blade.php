<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet">
        <link href="css/app.css" rel="stylesheet">

        <!-- Styles -->
        <style>

            html, body {
                width: 100%;
                height: 100%;
            }

            body{
                background: url('img/background.jpg')
            }
            #entry{
                text-align: center;
            }
            .cat{
                margin-top: 1em;
            }
            .cat img {
                max-width: 600px;
                max-height: 500px;
                -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
            }
            #cat-img{
                display: none;
            }

            .days{
                display: flex;
                flex-direction: column;
                scroll-behavior: smooth;
            }

            .day, .hour{
                align-self: center;
            }

            .hour > input {
                margin-right: 1em;
            }

            .mb-1em{
                margin-bottom: 1em;
            }
            .mb-05em{
                margin-bottom: 0.5em;
            }
            #days-container{
                margin: auto;
                width: 650px;
                background: antiquewhite;
                padding-bottom: 2em;
                padding-top: 2em;
            }
        </style>
    </head>
    <body>
       <div id='app'></div>
       <script src="js/app.js"></script>
    </body>
</html>
