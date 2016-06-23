<?php
require_once('../../config/autoload.php');
$id = json_decode(($_GET['id']), true);

	$ObjResults = new Results();
	$results  = $ObjResults-> getPerformanceyear($id);
	echo json_encode($results);
?>