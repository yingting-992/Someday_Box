<?php
$host = "localhost";
$db = "dreams";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "資料庫連線失敗"]);
  exit;
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=dreams;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "資料庫連線失敗：" . $e->getMessage()
    ]);
    exit;
}

?>
