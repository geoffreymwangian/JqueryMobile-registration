<?php
require_once('../../config/autoload.php');

echo $year = (int)$_POST['year'];
 $no = (int)$_POST['stdno'];
 $mean = (float)$_POST['mean'];
 $perf = $_POST['perf'];
 $schid = (int)$_POST['id'];

$ObjResults = new Results();
$results  = $ObjResults-> updateperformance($year,$no,$mean,$perf,$schid);
echo json_encode($results);
?>