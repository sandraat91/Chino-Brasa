<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $comentario = $_POST['comentario'];
    $usuario = $_SESSION['usuario']; // Obtén el nombre del usuario de la sesión

    $sql = "INSERT INTO comments (usuario, comentario) VALUES ('$usuario', '$comentario')";

    if ($conn->query($sql) === TRUE) {
        echo "Comentario guardado exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>