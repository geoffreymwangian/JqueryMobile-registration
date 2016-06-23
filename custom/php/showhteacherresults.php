<?php
require_once('../../config/autoload.php');
$id = json_decode(($_GET['hteach_schid']), true);

	$ObjResults = new Results();
	$results  = $ObjResults-> gethteacherPerformanceyear($id);
	echo json_encode($results);
?>