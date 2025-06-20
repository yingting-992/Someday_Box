<?php
// deleteDream.php主要功能是刪除指定ID的夢境記錄。

require 'cors.php';
require 'db.php';

$id = $_GET['id'] ?? '';
if (!$id) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "缺少 id"]);
  exit;
}

$stmt = $conn->prepare("DELETE FROM dreams WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "刪除失敗"]);
}

$stmt->close();
$conn->close();
?>
