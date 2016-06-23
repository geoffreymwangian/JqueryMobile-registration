<?php

require_once('../../config/autoload.php');

$username = stripslashes( $_POST['textinput']);
$email = stripslashes( $_POST['email']);
$password = stripslashes( $_POST['passwordinput']);
	
	$user = new Users();
	$users =$user->saveuser($username,$email, $password);
	
	echo json_encode($users);
	

?>