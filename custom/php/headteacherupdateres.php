<?php
require_once('../../config/autoload.php');
$id = json_decode(($_GET['id']));

	$ObjResults = new Results();
	$results  = $ObjResults-> gethteacherresult($id);
	echo json_encode($results);
?>