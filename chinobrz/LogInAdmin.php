<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "chinobr");

    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Error de conexión a la base de datos: " . $conexion->connect_error);
    }

    $email = $_POST['correoInicio'];
    $password = $_POST['contrasena'];

    // Usar una declaración preparada para evitar inyecciones SQL
    $stmt = $conexion->prepare('SELECT contraseña FROM administrador WHERE correo = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($stored_password);
        $stmt->fetch();

        // Verificar la contraseña
        if ($password === $stored_password) {
            $_SESSION['loggedin'] = true;
            $_SESSION['email'] = $email;
            header('Location: admiproduc.html'); // Redirige a la interfaz de administrador
            exit();
        } else {
            $error = 'Correo o contraseña no pertenecen a un administrador';
            echo '<script>alert("' . $error . '"); window.location.href = "admin.html";</script>';
        }
    } else {
        $error = 'Correo o contraseña no pertenecen a un administrador';
        echo '<script>alert("' . $error . '"); window.location.href = "admin.html";</script>';
    }

    $stmt->close();
    $conexion->close();
}
?>
