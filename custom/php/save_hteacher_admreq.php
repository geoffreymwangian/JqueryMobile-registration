<?php
require_once('../../config/autoload.php');

$item=$_POST["item"];
$value = $_POST["value"];
$id = (int)$_POST["id"];

$requirement  = new Requirement(); 
$requirements = $requirement->saveRequirement($item, $value, $id);

echo json_encode($requirements);
?>