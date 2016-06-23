<?php
require_once('../../config/autoload.php');
$schoolid = Session::get('schoolid');

if(isset($_SESSION['schoolid'])){
$data = "The selected school has admission requirements with an id of".$schoolid;
echo json_encode($data);
}
?>