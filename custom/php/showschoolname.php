<?php
require_once('../../config/autoload.php');
$schoolid = Session::get('schoolid');


if(isset($_SESSION['schoolid'])){
	$sql = 'SELECT school_name from schools WHERE school_id ='.$schoolid;
	$school = new School();
	
	$row = $school->getschoolname($sql);
	
	echo $row['school_name'];
}
else{
	echo "not set";
	}
?>