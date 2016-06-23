<?php

require_once('../../config/autoload.php');

$username = stripslashes( $_GET['username']);
$password = stripslashes($_GET['password']); 
	
	$user = new Users();
	$users =$user->getUser($username, $password);
	
	if(empty($users)){
		echo " ";
		}else
		{
		echo json_encode($users);
		
}
?>