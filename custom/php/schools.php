<?php
require_once('../../config/autoload.php');
$ObjSchools = new School();
$schools  = $ObjSchools-> getSchools();
	echo json_encode($schools);
?>