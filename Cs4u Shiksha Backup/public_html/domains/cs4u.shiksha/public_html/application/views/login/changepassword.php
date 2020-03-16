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
			$this->changepassword();
		}
		public function changepassword()
		{
			$peopleinfo=array(
				'Password'=>md5($_POST['UPassword'])
			);
			$filterpeople=array(
					'UserId'=>$_POST['Email']
			);
			$this->index_model->update('users',$peopleinfo,$filterpeople);
			$this->success($_POST['Email']);
		}
		public function success($uid)
		{
			$this->mailer->username("reset@my-deal.in");
			$this->mailer->password("7oT0+0^pH&Z{");
			$this->mailer->from("account@my-deal.in");
			$this->mailer->sender("MY DEAL");
			$this->mailer->to("$uid");
			$this->mailer->subject("Password change successufully");
			$this->mailer->message(baseurl()."index/activate/$uid/".md5(md5(date('m/d/Y')).md5($uid)));
			$this->mailer->send();
	
		}
	}
$var=new index();
?>