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
			$this->generateCoupon();
		}
		public function generateCoupon()
		{
			$couponinfo=array(
				'UserCouponBusinessId'=>$_POST['CouponBusinessId'],
				'UserCouponPeopleId'=>$_POST['PeopleId'],
				'CouponCode'=>rand(1000,100000),
				'Status'=>'1'
			);	
			$this->index_model->insert('user_coupons',$couponinfo);
		}
		
	}
$var=new index();
?>