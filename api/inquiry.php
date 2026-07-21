<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$service = trim((string) ($_POST['service'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $service === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Invalid email address']);
    exit;
}

$payload = [
    'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'email' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
    'service' => htmlspecialchars($service, ENT_QUOTES, 'UTF-8'),
    'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
];

echo json_encode([
    'ok' => true,
    'message' => 'Inquiry accepted for routing',
    'data' => $payload,
]);
