<?php
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos

// Si la solicitud es de tipo OPTIONS, respondemos solo con los encabezados de CORS y terminamos la ejecución
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "usuarios_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    // Devuelve un error si no se puede conectar a la base de datos
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Obtener los datos del cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['username'], $data['email'], $data['password'])) {
        $user = $data['username'];
        $email = $data['email'];
        $pass = password_hash($data['password'], PASSWORD_BCRYPT);

        // Preparar y ejecutar la consulta
        $stmt = $conn->prepare("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $user, $email, $pass);

        if ($stmt->execute()) {
            // Responder con éxito en formato JSON
            echo json_encode(["success" => "User registered successfully."]);
        } else {
            // Responder con error en formato JSON
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        // Responder si faltan campos
        echo json_encode(["error" => "Required fields missing."]);
    }
}

$conn->close();
?>