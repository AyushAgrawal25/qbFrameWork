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
			$this->businesses($_GET['businessType'],$_GET['City']);
		}
		public function businesses($businessType,$businessCity)
		{
			$info['businesses']=$this->index_model->selectBusinessByType($businessType,$businessCity);
			$info['filter']=$this->index_model->filterBusiness();
			$info['cities']=$this->index_model->filterCities();
			$info['mybusinesses']=$this->index_model->selectBusiness(Session::get('peopleid'));
			echo json_encode($info);
		}
		
	}
$var=new index();
?>