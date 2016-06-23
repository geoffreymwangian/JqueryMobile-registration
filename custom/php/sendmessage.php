<?php
require_once('../../config/autoload.php');

$msg =$_POST["message"];
$from = $_POST["id_from"];
$to = $_POST["id_to_send_msg"];
$uname = $_POST["user_from"];
//$time = date('Y-m-d H:i:s');

$message  = new Message(); 
$messages = $message->saveMessage($from, $to, $msg, $uname);

echo json_encode($messages);
?>