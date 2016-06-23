<?php
class Users extends Application
{
	private $_table = 'user';
	
	public function getUser($username, $password){
		$sql = "SELECT * FROM {$this->_table } where username='$username' AND password='$password'"; 
		return $this->db->fetchOne($sql);	
	}
	
	
	public function getcredentials($id){
		//$sql = "SELECT * FROM {$this->_table } where id='$schoolid' ORDER BY 'year' DESC";
		$sql ="SELECT * FROM {$this->_table } where id = '$id'";
		return $this->db->fetchOne($sql);
		
		}
		
	public function setLoggedin($username, $password){
		
		$sql= "UPDATE {$this->_table } SET loggedin=1 WHERE username='$username' AND password='$password'";
		$new = $this->db->query($sql);
		$sql2 = "SELECT * FROM {$this->_table } where username='$username' AND password='$password'";
        return $this->db->fetchOne($sql2);
	}
	public function getallUsers(){
		$sql ="SELECT * FROM {$this->_table }";
		return $this->db->fetchAll($sql);
		
	}
	
	
	public function saveuser($username,$email, $password){
		 $sql ="INSERT INTO {$this->_table }(username,email,password,level)  VALUES('$username','$email','$password','3') ";
		 
		 return $this->db->query($sql);
		
		}
		
		
		
	
}

?>
