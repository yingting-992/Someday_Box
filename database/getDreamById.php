<?php
// getDreamById.php主要功能是根據指定的ID查詢夢境記錄。

require 'cors.php';
require 'db.php';
// 指定 ID 查夢想
$id = $_GET['id'] ?? '';
if (!$id) {
  http_response_code(400);
  echo json_encode(["error" => "缺少 id"]);
  exit;
}

$stmt = $conn->prepare("SELECT * FROM dreams WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
  echo json_encode($row);
} else {
  http_response_code(404);
  echo json_encode(null);
}

$stmt->close();
$conn->close();
?>
