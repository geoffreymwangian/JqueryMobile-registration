<?php
require_once('../../../config/autoload.php');
$id = json_decode(($_GET['id']), true);
$ObjSchools = new School();
$schools  = $ObjSchools-> getSchool($id);
	echo json_encode($schools);
?>