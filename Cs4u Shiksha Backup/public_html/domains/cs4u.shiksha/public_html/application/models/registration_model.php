<?php include '../../system/core/Model.php';?>
<?php

	class registration_model extends Model
	{
		public function __construct()
		{
			parent::__construct();
		}
		function dataInsert($table,$info)
		{
			$this->insert($table,$info);
		}
		
		function dataSelect($table,$filter=array())
		{
			if(!empty($filter))
				$this->where($filter);
			$info=$this->select($table);
			return $info;
		}
		
	}
?>