<?php
// Connect to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$database = "portfolio";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Prepare and execute SQL query
$sql = "INSERT INTO base_data (name, email, subject, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    echo "Data inserted successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close the database connection
$stmt->close();
$conn->close();
?>
