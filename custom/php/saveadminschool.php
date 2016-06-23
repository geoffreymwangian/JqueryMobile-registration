<?php
require_once('../../config/autoload.php');

 $schoolname = $_POST['schname'];
 $category = $_POST['category'];
 $direction = $_POST['direc'];
 
$school = new School();
$results  = $school->saveResults($schoolname,$category,$direction);

echo json_encode($results);
?>