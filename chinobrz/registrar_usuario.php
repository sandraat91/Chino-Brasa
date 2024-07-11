<?php
// Verificar si se han enviado datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "chinobr");

    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Error de conexión a la base de datos: " . $conexion->connect_error);
    }

    // Recibir datos del formulario de registro
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $contrasena = $_POST['contrasena'];

    // Hash de la contraseña (seguridad)
    $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);

    // Preparar la consulta SQL
    $stmt = $conexion->prepare("INSERT INTO usuario (nombre, apellido, correo, telefono, contrasena) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param('sssss',$nombre, $apellido, $correo, $telefono, $contrasena_hash);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        //<--echo "¡Registro exitoso!";
        echo "<script>$(function() { $('#popupRegistroExitoso').modal('show'); });</script>";
    } else {
        echo "Error al registrar el usuario: " . $conexion->error;
    }

    // Cerrar la conexión
    $stmt->close();
    $conexion->close();
} else {
    echo "Error: Método de solicitud incorrecto.";
}
?>
