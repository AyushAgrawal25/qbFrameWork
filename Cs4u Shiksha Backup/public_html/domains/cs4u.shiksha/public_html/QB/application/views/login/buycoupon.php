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
			$this->buycoupon();
		}
		public function buycoupon()
		{
			//Select available business type with number of bussiness show it in home page.
			$buycouponinfo=array(
				'BuyCouponCouponId'=>$_POST['udf2'],
				'BuyCouponPeopleId'=>$_POST['udf1'],
				'Amt'=>$_POST['amount'],
				'Status'=>'1'
			);
			$this->index_model->insert('buycoupon',$buycouponinfo);
			if($_POST['udf3'])
			{	
				$walletinfo=array(
						'WalletPeopleId'=>$_POST['udf1'],
						'Points'=>$_POST['udf3'],
						'TransType'=>"Redeem",
						'Status'=>'1'
				);
				$this->index_model->insert('wallets',$walletinfo);
			}
			
			$this->mailer->username("recharge@my-deal.in");
			$this->mailer->password("1_recharge_1");
			$this->mailer->from("recharge@my-deal.in");
			$this->mailer->sender("MY DEAL");
			$this->mailer->to($payu['email']);
			$this->mailer->subject("Recharge Successful-MY DEAL");
			$this->mailer->message($payu['firstname'].' '.$payu['lastname'].' '."you have buy coupon succsufuly");
			$this->mailer->send();
			$this->payu($_POST);
			$info['val']=1;
			echo json_encode($info);	
		}
		public function payu($payu)
		{
			$payudata=array(
				'mihpayid'=>$payu['mihpayid'],
				'mode'=>$payu['mode'],
				'status'=>$payu['status'],
				'unmappedstatus'=>$payu['unmappedstatus'],
				//'key'=>$payu['key'],
				'txnid'=>$payu['txnid'],
				'amount'=>$payu['amount'],
				'addedon'=>$payu['addedon'],
				'productinfo'=>$payu['productinfo'],
				'firstname'=>$payu['firstname'],
				'lastname'=>$payu['lastname'],
				'address1'=>$payu['address1'],
				'address2'=>$payu['address2'],
				'city'=>$payu['city'],
				'state'=>$payu['state'],
				'country'=>$payu['country'],
				'zipcode'=>$payu['zipcode'],
				'email'=>$payu['email'],
				'phone'=>$payu['phone'],
				'udf1'=>$payu['udf1'],
				'udf2'=>$payu['udf2'],
				'udf3'=>$payu['udf3'],
				'hash'=>$payu['hash'],
				'field1'=>$payu['field1'],
				'field2'=>$payu['field2'],
				'field3'=>$payu['field3'],
				'field4'=>$payu['field4'],
				'field5'=>$payu['field5'],
				'field6'=>$payu['field6'],
				'field7'=>$payu['field7'],
				'field8'=>$payu['field8'],
				'field9'=>$payu['field9'],
				'PG_TYPE'=>$payu['PG_TYPE'],
				'bank_ref_num'=>$payu['bank_ref_num'],
				'bankcode'=>$payu['bankcode'],
				'error'=>$payu['error'],
				'error_Message'=>$payu['error_Message'],
				'payuMoneyId'=>$payu['payuMoneyId']
			);
			$this->index_model->insert('payu',$payudata);
			
		}
	}
$var=new index();
?>