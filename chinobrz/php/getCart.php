<?php
$conexion = new mysqli("localhost", "root", "", "chinobr");

if ($conexion->connect_error) {
    die("Error de conexión a la base de datos: " . $conexion->connect_error);
}

$sql = "SELECT * FROM carrito";
$result = $conexion->query($sql);

$cart = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $cart[] = $row;
    }
}

$conexion->close();

header('Content-Type: application/json');
echo json_encode($cart);
?>
