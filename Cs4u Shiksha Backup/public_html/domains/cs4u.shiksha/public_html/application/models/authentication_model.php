<?php include '../../system/core/Model.php';?>
<?php

	class authentication_model extends Model
	{
		public function __construct()
		{
			parent::__construct();
		}
		function dataInsert($table,$info)
		{
			$this->insert($table,$info);
		}
		function dataUpdate($table,$info,$filter)
		{
			$this->where($filter);
			$this->update($table,$info);
		}
		function dataDelete($table,$filter)
		{
			$this->where($filter);
			$this->delete($table);
		}
		function dataInsertGetId($tablename,$info)
		{
			$lastId=$this->insertGetId($tablename,$info);
			return $lastId;
		}
		
		function dataSelect($table,$filter=array())
		{
			if(!empty($filter))
				$this->where($filter);
			$info=$this->select($table);
			return $info;
		}
		function dataSelectDistinct($table,$filter=array(),$column)
		{
			if(!empty($filter))
				$this->where($filter);
				$this->distinct($column);
			$info=$this->select($table);
			return $info;
		}
		function getId($table,$column)
		{
			$this->MAX($column);
			$arr=$this->select($table);
			$id=$arr[0];
			return $id['MAX('.$column.')'];
		}
	    function TestModel()
	    {
	        $peoples=$this->dataSelect('users');
	        foreach($peoples as $people)
	        {
	            $filter=array(
				    'Contact_UserName'=>$people['UserName'],
				    'Status'=>'1'
			    );
	           $people['Contact']=$this->dataSelect('users_contacts',$filter);
	           $final[]=$people;
	        }
	        return $final;
	    }
	}
?>