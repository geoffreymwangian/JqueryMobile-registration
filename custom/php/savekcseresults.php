
<?php
require_once('../../config/autoload.php');

 $year = (int)$_POST['year'];
 $no = (int)$_POST['stdno'];
 $mean = (int)$_POST['resmean'];
 $perf = $_POST['perf'];
 $schid = (int)$_POST['schid'];

$ObjResults = new Results();
$results  = $ObjResults-> saveResults($year,$no,$mean,$perf,$schid);

echo json_encode($results);
?>