<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "usuarios_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die("<script>alert('Connection failed: " . $conn->connect_error . "');</script>");
} else {
    echo "<script>alert('Connection successful.');</script>";
}
?>