<?php
class Results extends Application 
{
	
	private $_table = 'kcse_results';
	private $_table2 = 'kcse_result_year';
	
	public function getPerformanceyear($schoolid){
	$sql = "SELECT * FROM {$this->_table2 } where school_id='$schoolid' ORDER BY 'year' DESC";
		return $this->db->fetchAll($sql);	
	}
	
	public function gethteacherPerformanceyear($id){
	$sql = "SELECT * FROM {$this->_table2 } where school_id='$id' ORDER BY year DESC";
		return $this->db->fetchAll($sql);	
	}
	
	
	public function saveResults($year,$no,$mean,$perf,$schid){
		
		 $sql = "INSERT INTO {$this->_table2} (school_id , year, mean_score ,total_students ,performance)
		 VALUES('$schid', '$year', '$mean','$no','$perf')";
		
		 return $this->db->query($sql);
		}
		
	 public function gethteacherresult($id){
		 $sql = "SELECT * FROM {$this->_table2 } where id='$id' ";
		 
		 return $this->db->fetchone($sql);
		 }
		 
		 
	public function updateperformance($year,$no,$mean,$perf,$schid){
		
		 $sql = "UPDATE {$this->_table2 } SET
		year='$year',total_students='$no', mean_score='$mean',performance='$perf' WHERE id='$schid'";
		
		return $this->db->query($sql);
		}		 
		 
	
}



?>