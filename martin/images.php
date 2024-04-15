<?php
header('Content-Type: application/json');
$imagesDirectory = 'images/';
$images = scandir($imagesDirectory);
$imageList = [];

foreach ($images as $img) {
    if (is_file($imagesDirectory . $img) && preg_match('/\.(jpg|jpeg|png|gif)$/i', $img)) {
        list($width, $height) = getimagesize($imagesDirectory . $img);
        $imageList[] = [
            'url' => $imagesDirectory . $img,
            'width' => $width,
            'height' => $height
        ];
    }
}

shuffle($imageList); // Shuffle the list of images to randomize their order

$maxImages = 30; // Maximum number of images to return
$imageList = array_slice($imageList, 0, $maxImages); // Limit the array to the first 10 shuffled images

echo json_encode($imageList);
?>
