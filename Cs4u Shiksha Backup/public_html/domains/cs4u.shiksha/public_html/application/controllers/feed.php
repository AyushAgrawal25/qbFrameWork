<?php include '../../system/core/Base.php';?>
<?php include '../../system/core/Session.php';?>
<?php

class index extends Controller
	{
		public function __construct()
		{
			parent::__construct();
			$_POST = json_decode(file_get_contents('php://input'), true);
			$this->load('feed_model');
		        $Feed = $this->feed_model->feed(0);
		        //print_r($Feed);
                echo json_encode($Feed);
		}
		
	}
$var=new index();
?>