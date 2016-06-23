<?php
class Message extends Application
{
	private $_table = '	messages';
	
	public function saveMessage($from, $to, $msg,$uname){
		$comm = $from.$to; 
		$sql = "INSERT INTO {$this->_table} (from_id,to_id,	messg,comm,from_id_username)
		 VALUES('$from', '$to', '$msg','$comm','$uname')";
		
		 return $this->db->query($sql);
		 }

	public function getMessage($send, $receive){
		
		 $sql ="SELECT * FROM {$this->_table} WHERE comm =$send or comm =$receive ORDER BY time_sent DESC"; 
		
		return $this->db->fetchAll($sql);
		}
	
	public function getadminMessage($id){
		 $sql = "SELECT group_concat(messg) as msg, time_sent, from_id,from_id_username from {$this->_table} where to_id = $id group by from_id"; 
		
		return $this->db->fetchAll($sql);
		
		}

}
?>