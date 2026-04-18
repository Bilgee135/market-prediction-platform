<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

$path = $_GET['path'] ?? '';

// Strip any leading slash
$path = ltrim($path, '/');

// Only allow alphanumeric, hyphens, slashes, and query strings - nothing else
if (!preg_match('/^[a-zA-Z0-9\-_\/\?=&]+$/', $path)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid path']);
    exit;
}

$url = 'http://localhost:5000/api/' . $path;

$response = @file_get_contents($url);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Backend unavailable']);
    exit;
}

echo $response;
?>