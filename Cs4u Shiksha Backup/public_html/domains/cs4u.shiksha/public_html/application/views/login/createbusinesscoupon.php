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
			$this->createBusinessCoupon($_POST['BusinessId']);
		}
		public function createBusinessCoupon($BusinessId)
		{
			//Select available business type with number of bussiness show it in home page.
			$updateinfo=array(
				'Status'=>'0'
			);
			$updatefilterinfo=array(
				'CouponBusinessId'=>$BusinessId
			);	
			$this->index_model->update('business_coupons',$updateinfo,$updatefilterinfo);
			//insert business_coupons
			$couponinfo=array(
				'CouponBusinessId'=>$BusinessId,
				'Type'=>$_POST['Type'],
				'Discount'=>$_POST['Discount'],
				'DiscountType'=>$_POST['DiscountType'],
				'Discription'=>$_POST['Discription'],
				'Note'=>$_POST['Note'],
				'Status'=>'1'
			);	
			$BusinessCouponId=$this->index_model->insertGetId('business_coupons',$couponinfo);
			if($_POST['Type']!='Reguler')
			{
				$categorycouponinfo=array(
					'CategoryBusinessCouponId'=>$BusinessCouponId,
					'NoOfCoupons'=>$_POST['NoOfCoupons'],
					'StartDate'=>$_POST['StartDate'],
					'EndDate'=>$_POST['EndDate'],
					'Status'=>'1'
				);	
				$this->index_model->insert('category_coupons',$categorycouponinfo);
			}
		}
		
	}
$var=new index();
?>