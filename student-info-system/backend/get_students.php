<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM students ORDER BY id");
$students = [];

while ($row = $stmt->fetch()) {
    $students[] = [
        "id" => $row['id'],
        "name" => $row['first_name'] . " " . $row['last_name'],
        "number" => $row['id'],
        "phone" => $row['phone'],
        "email" => $row['email']
    ];
}

echo json_encode($students);
?>
