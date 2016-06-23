<?php
class Dbase{

private $_host = "127.0.0.1";
private $_user = "root";
private $_password = "";
private $_name = "tum";

private $_conndb = false;
private $_last_query = null;
private $_affected_rows = 0;

public $_insert_keys = array();
public $_insert_values = array();
public $_update_sets = array();

public $_id;

	public function __construct(){
		$this->connect();
	}
	
	private function connect(){
		$this->_conndb = mysqli_connect($this->_host, $this->_user, $this->_password);
		if(!$this->_conndb){		
			die("database connection failed: <br>" .mysql_error());	
	     }
		 else{
			 $_select = mysqli_select_db($this->_conndb,$this->_name );
			 if(!$_select){
				 die("database selection failed: <br>".mysql_error());
				 }
		}
		//mysqli_set_charset("utf8", $connection);
    }//Connect ends here
	
	
	
	
public function close(){
	
		if(!mysqli_close($connection)){
		 die("closing connection failed");
		}
	}//closing connection ends here
	
public function escape($value){
		if(function_exists("mysql_real_escape_string")){
			if(get_magic_quotes_gpc()){
				$value = stripslashes($value);
			}
		$value = mysql_real_escape_string($value0);
			}
			else{
				
			if(!get_magic_quotes_gpc()){
					$value = addslashes($value);
				}				
	      }
	return $value;
 }
		
	public function query($sql){	
	
	 $this->_last_query = $sql;
	 $result = mysqli_query($this->_conndb, $sql);
	 $this->displayQuery($result);
	 return $result;	
	
	} // end of query
	
	
	public function displayQuery($result){
	if(!$result){
		$output = "database query failed :". mysqli_error($this->_conndb);
		$output .= "last sql query was: ".$this->_last_query;
		die($output);		
		}	
		else{
			$this->_affected_rows = mysqli_affected_rows($this->_conndb);
	
			}
	} //End of query results
	
	
	public function fetchAll($sql){
		
		$result =  $this->query($sql);
		$out =  array();
		while($row =  mysqli_fetch_assoc($result)){
			$out[] =  $row;
		}
		mysqli_free_result($result);
		return $out;
	}
	
	public function fetchOne($sql){
		$out = $this->fetchAll($sql);
		return array_shift($out);			
	}
    
	public function lastId(){
		return mysql_insert_id($connection);	
	}	
	
public function fetchAlll($sql){

  $result =  $this->query($sql);
  $out =  array();
  $cnt =0;
  while($row =  mysqli_fetch_assoc($result)){
    $out[$cnt]['msg'] =  $row['msg'];
    $out[$cnt]['time_sent'] =  $row['time_sent'];
	 $out[$cnt]['from_id_username'] =  $row['from_id_username'];
    $out[$cnt]['from_id'] =  $row['from_id'];

    $cnt++;
  }
  mysqli_free_result($result);
  return $out;
}

}
?>

