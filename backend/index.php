<?php

require __DIR__ . "/inc/bootstrap.php";

header('Access-Control-Allow-Origin:*');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uri = explode( '/', $uri );

if (!isset($uri[3])) {

    header("HTTP/1.1 404 Not Found");

    exit();

}

require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
require PROJECT_ROOT_PATH . "/Controller/Api/SongController.php";


/*
    
*/
if ($uri[2] == "song"){
    $objFeedController = new SongController();
}

if ($uri[2] == "user"){
    $objFeedController = new UserController();
}

//$objFeedController = new UserController();
$strMethodName = $uri[3] . 'Action';

$objFeedController->{$strMethodName}();

?>