<?php
require_once('../../config/autoload.php');

$id = $_POST['id'];
Session::unsetsingle($id);

$val =Session::get($id);

if(empty($val)){
	echo "successifully destroyed";
	}else{
	echo "Failed to destroy session with id" . $val;	
	}
?>