<!-- this page should include in final recharge view page!>
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
			$this->wallet();
		}
		public function wallet()
		{
			//Select available business type with number of bussiness show it in home page.
			$info['Points']=$this->index_model->CalWalletPoints(Session::get('peopleid'));
			echo json_encode($info);	
		}
	}
$var=new index();
?>