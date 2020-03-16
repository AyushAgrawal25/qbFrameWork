<?php include '../../system/core/Base.php';?>
<?php include '../../system/core/Session.php';?>
<?php

class index extends Controller
	{
		public function __construct()
		{
			parent::__construct();
			$_POST = json_decode(file_get_contents('php://input'), true);
			$this->load('logreg_model');
			$this->login();

		}
		public function login()
		{
		    $loginfo=array(
				'Loguser'=>$_POST['username'],
				'Logpass'=>$_POST['password'],
				'Status'=>1
			);
			$this->logreg_model->dataInsert('test',$loginfo);
			$info=$this->logreg_model->dataSelect('test');
			$pkey=$this->logreg_model->getIdInsert('test',$loginfo);
			echo json_encode($info);
			$userinfo=array(
			    'UserFname'=>$_POST['fname'],
				'UserLname'=>$_POST['lname'],
				'Userage'=>$_POST['age'],
				'Userdob'=>$_POST['d.o.b'],
				'Usernum'=>$_POST['num'],
				'Userschool'=>$_POST['school'],
				'Usercity'=>$_POST['city'],
				'Userstate'=>$_POST['state'],
				'Userpkey'=>$pkey,
				'Status'=>'1'
			    
			);
			$this->logreg_model->dataInsert('test',$userinfo);
			$info=$this->logreg_model->dataSelect('test');
			$p2key=$this->logreg_model->getIdInsert('test',$userinfo);
			echo json_encode($info);
		    $continfo=array(
		        'Contnum1'=>$_POST['num1'],
		        'Contnum2'=>$_POST['num2'],
		        'Contnum3'=>$_POST['num3'],
		        'Contp2key'=>$p2key,
		        'Status'=>'1'
		    );
		    $this->logreg_model->dataInsert('test',$userinfo);
			$info=$this->logreg_model->dataSelect('test');
			echo json_encode($info);
		}
	}
$var=new index();
?>