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
			$this->filter();
		}
		public function filter()
		{
		    $datas=$this->authentication_model->dataSelect($_POST['table']);
		    echo json_encode($datas);
		}
	}

$var=new index();
?>
