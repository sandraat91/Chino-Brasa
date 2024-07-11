<?php
$conexion = new mysqli("localhost", "root", "", "chinobr");

if ($conexion->connect_error) {
    die("Error de conexión a la base de datos: " . $conexion->connect_error);
}

$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'];

$sql = "SELECT * FROM producto WHERE id = $product_id";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
    $product_name = $product['nombre'];
    $product_price = $product['precio'];
    $subtotal = $product_price * $quantity;

    $sql = "INSERT INTO carrito (cantidad, producto, subtotal) VALUES ($quantity, '$product_name', $subtotal)";
    
    if ($conexion->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Producto agregado al carrito"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al agregar producto al carrito: " . $conexion->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Producto no encontrado"]);
}

$conexion->close();
?>

