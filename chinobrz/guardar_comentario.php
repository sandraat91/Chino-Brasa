<?php
session_start();

// Verificar si se ha enviado un comentario por método POST
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['comentario'])) {
    // Configuración de la conexión a la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "chinobr";

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Obtener el comentario y el nombre de usuario del formulario
    $comentario = $_POST['comentario'];
    $nombreUsuario = isset($_POST['nombreUsuario']) ? $_POST['nombreUsuario'] : "Usuario Anónimo";

    // Validar que el nombre de usuario no esté vacío
    if (empty($nombreUsuario)) {
        $nombreUsuario = "Usuario Anónimo"; // Definir un valor predeterminado en caso de estar vacío
    }

    // Prevenir inyección SQL utilizando prepared statements
    $stmt = $conn->prepare("INSERT INTO comments (nombre_usuario, comentario) VALUES (?, ?)");
    $stmt->bind_param("ss", $nombreUsuario, $comentario);

    if ($stmt->execute()) {
        $response = array('message' => 'Comentario guardado exitosamente');
    } else {
        $response = array('message' => 'Error al guardar el comentario: ' . $stmt->error);
    }

    // Cerrar conexión
    $stmt->close();
    $conn->close();

    // Devolver respuesta como JSON
    echo json_encode($response);
} else {
    echo json_encode(array('message' => 'Error: Método de solicitud incorrecto o comentario no especificado.'));
}
?>
