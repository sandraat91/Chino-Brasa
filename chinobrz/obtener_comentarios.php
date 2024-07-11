<?php
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

// Consulta SQL para obtener todos los comentarios con los nombres de los usuarios
$sql = "SELECT c.id, c.nombre_usuario, c.comentario, c.fecha, u.nombre AS nombreUsuario 
        FROM comments c
        LEFT JOIN usuario u ON c.usuario_id = u.id 
        ORDER BY c.fecha DESC";

$resultado = $conn->query($sql);

// Verificar si hay resultados
if ($resultado->num_rows > 0) {
    // Crear un array para almacenar los comentarios
    $comentarios = array();

    // Obtener los datos de cada comentario
    while ($row = $resultado->fetch_assoc()) {
        $comentario = array(
            'id' => $row['id'],
            'nombreUsuario' => $row['nombreUsuario'], // Nombre del usuario
            'comentario' => $row['comentario'],
            'fecha' => $row['fecha']
        );

        // Agregar el comentario al array
        $comentarios[] = $comentario;
    }

    // Devolver los comentarios como JSON
    echo json_encode($comentarios);
} else {
    // No hay comentarios aún
    echo json_encode(array());
}

// Cerrar la conexión
$conn->close();
?>