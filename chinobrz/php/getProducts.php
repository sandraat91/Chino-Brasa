<?php
    $conexion = new mysqli("localhost", "root", "", "chinobr");

    if ($conexion->connect_error) {
        die("Error de conexión a la base de datos: " . $conexion->connect_error);
    }

    $sql = "SELECT * FROM producto";
    $result = $conexion->query($sql);

    $products = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    $conexion->close();

    header('Content-Type: application/json');
    echo json_encode($products);
?>