<?php
require_once('../../config/autoload.php');
$idfrom = (int)$_GET['id_from'];
$idto = (int)$_GET['id_to_send'];

$receive = $idto.$idfrom;
$send  = $idfrom.$idto;

//$new  = var_dump($_GET);
 //$idfrom = json_encode($_GET[id_from']);

$idto = json_encode($_GET["id_to_send"]);
$messages = new Message();
$message  = $messages->getMessage($send, $receive);

echo json_encode($message);
?>
