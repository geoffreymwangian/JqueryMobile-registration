<?php
require_once('../../config/autoload.php');
$schoolid = $id = json_decode(($_GET['id']), true);
$ObjSchools = new School();
$school  = $ObjSchools-> getSchool($schoolid);
echo json_encode($school[0]);
?>