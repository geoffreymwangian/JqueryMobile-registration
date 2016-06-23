<?php

if(!isset($_SESSION)){
	session_start();
}

defined("SITE_URL") 
 || define("SITE_URL", "http//".$_SERVER['SERVER_NAME']);


//directory separator
defined("DS") 
 ||define("DS", DIRECTORY_SEPARATOR);

//root path
defined("ROOT_PATH") ||	
define("ROOT_PATH", realpath(dirname(__FILE__).DS."..".DS) );

// classes
defined("CLASSES_DIR") ||		
define("CLASSES_DIR", "classes");
	
//add all above dir to include path
set_include_path(implode(PATH_SEPARATOR, array(
realpath(ROOT_PATH.DS.CLASSES_DIR),
get_include_path()
)));

?>