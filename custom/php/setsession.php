<?php
require_once('../../config/autoload.php');

$id = $_POST['id'];
$key = $_POST['var1'];
Session::set($key, $id);
echo Session::get('schoolid');
?>