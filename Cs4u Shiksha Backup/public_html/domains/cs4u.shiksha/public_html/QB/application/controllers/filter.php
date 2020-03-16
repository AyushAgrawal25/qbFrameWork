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
		    $column=$_POST['column'];
		    $filter=array(
		            $_POST['fcolumn']=>$_POST['fvalue'],
		            'Status'=>1
		        );
		    $fdatas=$this->authentication_model->dataSelectDistinct($_POST['table'],$filter,$column);
		    foreach($fdatas as $fdata)
		    {
                $Filter[]=$fdata["$column"];
		    }
		    
		    echo json_encode($Filter);
		}
	}

$var=new index();
?>
