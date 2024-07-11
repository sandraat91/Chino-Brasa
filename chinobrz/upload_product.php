<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Conexión a la base de datos (ajusta los valores según tu configuración)
    $conexion = new mysqli("localhost", "root", "", "chinobr");

    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Error de conexión a la base de datos: " . $conexion->connect_error);
    }

    // Recibir datos del formulario
    $productId = $_POST['product-id'];
    $productName = $_POST['product-name'];
    $productDescription = $_POST['product-description'];
    $productPrice = $_POST['product-price'];

    // Manejo de la imagen
    if (isset($_FILES['product-image']) && $_FILES['product-image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['product-image']['tmp_name'];
        $fileName = $_FILES['product-image']['name'];
        $fileSize = $_FILES['product-image']['size'];
        $fileType = $_FILES['product-image']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $allowedfileExtensions = array('jpg', 'gif', 'png');

        if (in_array($fileExtension, $allowedfileExtensions)) {
            $uploadFileDir = 'uploads/';
            $dest_path = $uploadFileDir . $fileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                // Insertar los datos en la base de datos
                $sql = "INSERT INTO products (id, name, description, price, image) VALUES ('$productId', '$productName', '$productDescription', '$productPrice', '$dest_path')";

                if ($conexion->query($sql) === TRUE) {
                    echo "Producto agregado exitosamente.";
                } else {
                    echo "Error al agregar el producto: " . $conexion->error;
                }
            } else {
                echo "Error al mover el archivo de imagen.";
            }
        } else {
            echo "Formato de archivo no permitido.";
        }
    } else {
        echo "No se subió ninguna imagen o hubo un error en la subida.";
    }

    // Cerrar la conexión a la base de datos
    $conexion->close();
}
?>
