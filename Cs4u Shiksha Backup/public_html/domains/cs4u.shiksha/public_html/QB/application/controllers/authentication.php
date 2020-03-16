<?php include '../../system/core/Base.php';?>
<?php include '../../system/core/Session.php';?>
<?php

class index extends Controller
	{
		public function __construct()
		{
			parent::__construct();
			$_POST = json_decode(file_get_contents('php://input'), true);
			$this->load('authentication_model');
			$this->test();
			if($_POST['transitiontype']=='Login')
			 $this->Login();
			if($_POST['transitiontype']=='Registration')
			 $this->Registration();
            if($_POST[‘transitiontype’]=='ForgetPassword')
			 $this->ForgetPassword();
            if($_POST[‘transitiontype’]=='ForPass')
			 $this->ForPass();
		}
		public function test()
		{
		    $info=$this->authentication_model->TestModel();
		    echo json_encode($info);
		}
		public function Login()
		{
		    $userlog=array(
				'UserName'=>$_POST['UserName'],
				'Password'=>$_POST['Password'],
				'Status'=>'1'
			);
			$info=$this->authentication_model->dataSelect('users',$userlog);
			if(!empty($info))
			 echo 1;
			else
			 echo 0;
			 
			 //echo json_encode($userlog);
		}
		public function Registration()
		{
		    $userinfo=array(
				'UserName'=>$_POST['UserName'],
				'Password'=>$_POST['Password'],
                'FName'=>$_POST['FName'],
                'LName'=>$_POST['LName'],
                'DOD'=>$_POST['DOD'],
                'DOM'=>$_POST['DOM'],
                'DOY'=>$_POST['DOY'],
                'Gender'=>$_POST['Gender'],
                'Status'=>'1'
			);
			$this->authentication_model->dataInsert('users',$userinfo);
			echo json_encode($_POST);
		}
        public function ForgetPassword()
		{
		    $filterinfo=array(
				'UserName'=>$_POST['UserName'],
				'Status'=>'1'
			);
		}
        public function ForPass()
		{
		    $filterinfo=array(
				'UserName'=>$_POST['UserName'],
				'Status'=>'1'
			);
			$datainfo=array(
				'Password'=>$_POST['Password'],
				'Status'=>'1'
			);
			$this->authentication_model->dataUpdate('users',$datainf,$filterinfo);
		}

	}

$var=new index();
?>
