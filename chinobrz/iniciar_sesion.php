<?php
session_start();

// Verificar si se han enviado datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "chinobr");

    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Error de conexión a la base de datos: " . $conexion->connect_error);
    }

    // Recibir datos del formulario de inicio de sesión
    $correo = $_POST['correoInicio'];
    $contrasena = $_POST['contrasena'];

    // Buscar el usuario en la base de datos
    $stmt = $conexion->prepare("SELECT id, nombre, apellido, correo, contrasena FROM usuario WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();
    $_SESSION['id'] = $usuario['id'];
    
    // Verificar si el usuario existe y la contraseña es correcta
    if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
        // Iniciar sesión y almacenar datos del usuario en la sesión
        $_SESSION['id'] = $usuario['id'];
        $_SESSION['nombre'] = $usuario['nombre'];
        $_SESSION['apellido'] = $usuario['apellido'];
        $_SESSION['correo'] = $usuario['correo'];
        
        echo "¡Inicio de sesión exitoso!";
    } else {
        echo "Correo electrónico o contraseña incorrectos.";
    }

    // Cerrar la conexión
    $stmt->close();
    $conexion->close();
} else {
    echo "Error: Método de solicitud incorrecto.";
}
?>
