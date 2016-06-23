<?php
class Requirement extends Application
{
	private $_table = '	adm_requirement';
	
	
	public function saveRequirement($item, $value, $id){
		
	 $sql ="INSERT INTO {$this->_table }(school_id,requirement,no)  VALUES('$id','$item','$value') ";

	
	return $this->db->query($sql);
		}
		
		
	public function getrequirements($id){
			
			$sql = "SELECT * FROM {$this->_table } WHERE school_id = $id";
			return $this->db->fetchAll($sql);
			
		}
}

?>