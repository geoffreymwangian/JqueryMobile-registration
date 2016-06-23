<?php
require_once('../../config/autoload.php');
$user = new Users();
$users  = $user-> getallUsers();
	echo json_encode($users);
?>