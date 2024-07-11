<?php
// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configurar el directorio de destino para las imágenes subidas
    $targetDir = "uploads/"; // Asegúrate de que este directorio exista y tenga permisos de escritura
    
    // Obtener los datos del formulario
    $excessId = $_POST['excess-id'];
    $excessName = $_POST['excess-name'];
    $excessDescription = $_POST['excess-description'];
    $excessPrice = $_POST['excess-price'];
    
    // Obtener información del archivo de imagen
    $fileName = basename($_FILES["excess-image"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
    
    // Verificar si el archivo es una imagen real
    $allowTypes = array('jpg', 'jpeg', 'png', 'gif');
    if (in_array($fileType, $allowTypes)) {
        // Intentar subir el archivo al servidor
        if (move_uploaded_file($_FILES["excess-image"]["tmp_name"], $targetFilePath)) {
            // Aquí podrías almacenar la información en tu base de datos
            // Por ejemplo, insertar los datos y la ruta de la imagen en una tabla
            
            // Respuesta de éxito
            echo "El excedente se ha agregado correctamente.";
        } else {
            // Respuesta si no se pudo mover el archivo
            echo "Ha ocurrido un error al subir el archivo.";
        }
    } else {
        // Respuesta si el archivo no es una imagen válida
        echo "Solo se permiten archivos JPG, JPEG, PNG y GIF.";
    }
} else {
    // Respuesta si no se recibió un formulario POST
    echo "Error: El formulario no se ha enviado correctamente.";
}
?>
