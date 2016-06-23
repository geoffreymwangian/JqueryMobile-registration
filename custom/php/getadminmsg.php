<?php
require_once('../../config/autoload.php');
 $id = json_decode(($_GET['hteacher_id']));

	$message = new Message();
	$results  = $message-> getadminMessage($id);
	echo json_encode($results);
?>