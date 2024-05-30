<?php
session_start();

$query = "SELECT * FROM comments ORDER BY id DESC";
$result = $conn->query($query);

$comments = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
}

echo json_encode($comments);

$conn->close();
?>