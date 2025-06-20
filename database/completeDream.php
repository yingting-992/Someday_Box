<?php
// completeDream.php主要功能是更新夢境的完成狀態。
// 它接收一個JSON格式的請求，包含夢境的ID和完成狀態，然後更新資料庫中的相應記錄。

require_once 'cors.php'; // 跨域請求處理
require_once 'DB.php';   // 資料庫連線設定

header('Content-Type: application/json; charset=utf-8');

// 以下原本的程式碼...
$input     = json_decode(file_get_contents('php://input'), true);
$id        = $input['id'] ?? null;
$completed = $input['completed'] ?? null;

if (!$id || !isset($completed)) {
    echo json_encode(['success' => false, 'message' => '缺少必要欄位 id 或 completed']);
    exit;
}

try {
    if ($completed == 1) {
        $sql = "UPDATE dreams SET completed = 1, complete_date = NOW() WHERE id = ?";
    } else {
        $sql = "UPDATE dreams SET completed = 0, complete_date = NULL WHERE id = ?";
    }

    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([$id]);

    echo json_encode(['success' => $result]);
} catch (Throwable $e) {
    echo json_encode(['success' => false, 'message' => '伺服器錯誤：' . $e->getMessage()]);
}
?>
