<?php include '../../system/core/Base.php';?>
<?php include '../../system/core/Session.php';?>
<?php

class index extends Controller
	{
		public function __construct()
		{
			parent::__construct();
			$_POST = json_decode(file_get_contents('php://input'), true);
			$this->load('index_model');
			$this->home();
		}
		public function home()
		{
			//Select available business type with number of bussiness show it in home page.(need to create not exist now)
			$info['BusinessType']=$this->index_model->selectBusinessGroupByType(Session::get('City'));
			echo json_encode($info);	
		}
		
	}
$var=new index();
?>