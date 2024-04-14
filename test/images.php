<?php
header('Content-Type: application/json');
$imagesDirectory = 'images/';
$images = scandir($imagesDirectory);
$imageList = [];

foreach ($images as $img) {
    // Skipping directories and only adding image files
    if (is_file($imagesDirectory . $img) && preg_match('/\.(jpg|jpeg|png|gif)$/i', $img)) {
        $imageList[] = $imagesDirectory . $img;
    }
}

echo json_encode($imageList);
?>
