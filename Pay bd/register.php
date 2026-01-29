<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost","root","","paybd");
if($conn->connect_error){
    die(json_encode(["status"=>"error","message"=>"ডাটাবেস কানেকশন ব্যর্থ"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$phone = $data['phone'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$profileImg = "img/default-profile.jpg";

$check = $conn->prepare("SELECT id FROM users WHERE phone=?");
$check->bind_param("s",$phone);
$check->execute();
$check->store_result();

if($check->num_rows > 0){
    echo json_encode(["status"=>"error","message"=>"এই ফোন নম্বরটি আগে থেকে রেজিস্টার করা আছে"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO users (name, phone, password, profileImg) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss",$name,$phone,$password,$profileImg);

if($stmt->execute()){ echo json_encode(["status"=>"success","message"=>"রেজিস্ট্রেশন সফল হয়েছে"]); }
else{ echo json_encode(["status"=>"error","message"=>"কোনো সমস্যা হয়েছে"]); }
?>
