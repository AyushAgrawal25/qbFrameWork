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
		public function referral()
		{
			//Select available business type with number of bussiness show it in home page.
			$referralinfo=array(
				'Referrer'=>$_POST['Referrer'],
				'Code'=>rand(1000,100000),
				'Status'=>'1'
			);
			$this->index_model->insert('referrals',$referralinfo);
			//echo json_encode($info);	
		}
	}
$var=new index();
?>