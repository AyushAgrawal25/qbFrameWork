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
			$this->useCoupon();
		}
		public function useCoupon()
		{
			$usedcouponsinfo=array(
				'UCouponId'=>$_POST['UserCoupon'],
				'Status'=>'1'
			);
			$this->index_model->insert('usedcoupons',$usedcouponsinfo);
		}
		
	}
$var=new index();
?>