<?php
require_once('../../config/autoload.php');

$id=$_GET["id"];


$requirement  = new Requirement(); 
$requirements = $requirement->getrequirements($id);

echo json_encode($requirements);
?>