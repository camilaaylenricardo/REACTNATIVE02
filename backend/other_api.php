<?php
include 'config.php'; // Incluye la conexión

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si existen las variables POST
    if (isset($_POST['email'], $_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                echo "<script>alert('Login successful.');</script>";
            } else {
                echo "<script>alert('Invalid password.');</script>";
            }
        } else {
            echo "<script>alert('User not found.');</script>";
        }

        $stmt->close();
    } else {
        echo "<script>alert('Required fields missing.');</script>";
    }
}

$conn->close();
?>