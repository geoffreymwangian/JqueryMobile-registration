<?php

require_once('../../config/autoload.php');

$username = stripslashes( $_POST['username']);
$password = stripslashes($_POST['password']); 
	
	$user = new Users();
	$users =$user->getUser($username, $password);
	if(empty($users)){
		//$output = NULL; 
		echo json_encode(($users), null);
		}else
		{
		$users = $user->setLoggedin($username, $password);
		echo json_encode($users);
		
        }

?>