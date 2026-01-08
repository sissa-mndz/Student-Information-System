<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$first = $data['first_name'];
$last = $data['last_name'];
$email = $data['email'];
$phone = $data['phone'];

$sql = "INSERT INTO students (id, first_name, last_name, email, phone)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        email = VALUES(email),
        phone = VALUES(phone)";

$stmt = $pdo->prepare($sql);
$stmt->execute([$id, $first, $last, $email, $phone]);

echo json_encode(["status" => "success"]);
?>
