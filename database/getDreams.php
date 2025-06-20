<?php
// getDreams.php主要功能是獲取所有夢境記錄。

require 'cors.php';
require 'db.php';

$sql = "SELECT * FROM dreams ORDER BY id DESC";
$result = $conn->query($sql);

$dreams = [];

while ($row = $result->fetch_assoc()) {
  $dreams[] = $row;
}

echo json_encode($dreams);

$conn->close();
?>
