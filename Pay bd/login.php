<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost","root","","paybd");
if($conn->connect_error){
    die(json_encode(["status"=>"error","message"=>"ডাটাবেস কানেকশন ব্যর্থ"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$phone = $data['phone'];
$password = $data['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE phone=?");
$stmt->bind_param("s",$phone);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows === 0){
    echo json_encode(["status"=>"error","message"=>"অ্যাকাউন্ট পাওয়া যায়নি, আগে রেজিস্টার করুন"]);
    exit;
}

$user = $result->fetch_assoc();
if(password_verify($password, $user['password'])){
    echo json_encode(["status"=>"success","message"=>"লগইন সফল হয়েছে","user"=>$user]);
}else{
    echo json_encode(["status"=>"error","message"=>"ভুল ফোন বা পাসওয়ার্ড"]);
}
?>
