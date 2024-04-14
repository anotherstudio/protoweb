<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$folder = 'images/'; // Change this to the path of your image folder
$images = array_diff(scandir($folder), array('.', '..')); // Remove '.' and '..' from the list

header('Content-Type: application/json');
echo json_encode($images);
?>
