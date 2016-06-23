<?php
class Session {

	private static $_sessionStarted = false;
	
	public function __construct(){
		if(self::$_sessionStarted == false){
			
			session_start();
			
			self::$_sessionStarted == true;
			}
	}
	
	
	public static function set($key, $value)
	{
		$_SESSION[$key] = $value;	
		$_sessionStarted == true;
	    
	}
	
	public static function get($key)
	{
		if(isset($_SESSION[$key])){
			return $_SESSION[$key];	
		}else{
			return false;
			}
	}
	
	
	public static function unsetsingle($value){
		
		if(isset($_SESSION[$value])){
	
			session_unset($_SESSION[$value]);
		}
		else{
			echo "";
			}
		
			
	}
	
	public static function destroy($value)
	{
		if(self::$_sessionStarted == true){
			session_unset($_SESSION[$value]);
			
			}
		
	}
	
	
	
}

?>