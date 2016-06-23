<?php
class School extends Application 
{
	
	private $_table = 'schools';
	
	public function getSchools(){
	$sql = "SELECT * FROM {$this->_table } ORDER BY 'school_name' ASC";
		return $this->db->fetchAll($sql);	
	
	}
	
	public function getSchool($id){
	$sql = "SELECT * FROM {$this->_table } where school_id='$id'";
		return $this->db->fetchAll($sql);	
	
	}
	
	public function gethteachSchool($id){
		$sql = "SELECT * FROM {$this->_table } where head='$id'";
		return $this->db->fetchOne($sql);
		
		}
	
	public function getschoolname($sql){
		
		return $this->db->fetchone($sql);
		
		} 
		
		public function saveResults($schoolname,$category,$direction){
			
			 $sql = "INSERT INTO {$this->_table} (school_name , category, loca_description)
		 VALUES('$schoolname', '$category', '$direction')";
		 
		 return $this->db->query($sql);
			
			}
	
	
}



?>