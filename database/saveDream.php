<?php
// saveDream.php主要功能是儲存新的夢境記錄。

require 'cors.php';
require 'db.php';
// 儲存新夢想
$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'] ?? '';
$inspiration = $data['inspiration'] ?? '';
$motivation = $data['motivation'] ?? '';
$priority = $data['priority'] ?? '';

if (!$title || !$inspiration || !$motivation || !$priority) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "缺少欄位"]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO dreams (title, inspiration, motivation, priority) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $title, $inspiration, $motivation, $priority);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "寫入失敗"]);
}

$stmt->close();
$conn->close();
?>
