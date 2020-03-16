<?php include '../../system/core/Base.php';?>
<?php include '../../system/core/Session.php';?>
<?php

class index extends Controller
	{
		public function __construct()
		{
			parent::__construct();
			$_POST = json_decode(file_get_contents('php://input'), true);
			$this->load('registration_model');
			$this->registration();

		}
		public function registration()
		{
		    $testinfo=array(
				'TestId'=>$_POST['id'],
				'TestFname'=>$_POST['fname'],
				'TestLname'=>$_POST['lname'],
				'Status'=>'1'
			);
			$this->registration_model->dataInsert('test',$testinfo);
			$info=$this->registration_model->dataSelect('test');
			echo json_encode($info);
		}
	}
$var=new index();
?>