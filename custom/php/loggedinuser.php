<?php
require_once('../../config/autoload.php');

$users = new Users();
$id = json_decode(($_GET['id']), true);
$user = $users->getcredentials($id);

echo json_encode($user);
?>