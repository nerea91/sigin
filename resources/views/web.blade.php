<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Fichajes</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet">
        <link href="css/app.css" rel="stylesheet">

        <!-- Styles -->
    </head>
    <body>
       <div id='app'></div>
       <script>
        // before React is loaded
        if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
        }
        </script>
       <script src="js/app.js"></script>
    </body>
</html>
