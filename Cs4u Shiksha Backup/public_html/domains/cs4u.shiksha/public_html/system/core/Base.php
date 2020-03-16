<?php include '../../application/config/autoload.php';?>
<?php include '../../application/config/config.php';?>
<?php include 'Constant.php';?>
<?php include '../../system/classes/image.php';?>
<?php include '../../system/classes/file.php';?>
<?php include '../../system/classes/mailer.php';?>


<?php

class Base
{
	public function __construct()
	{
		global $autoload;
		foreach ($autoload['classes'] as &$class)
		{
			if($class=='database')
			{
				//$this->db=new $class;
			}
			else
			{
				$this->$class=new $class;
			}
		}
	}
	function load($model)
	{
		require("../../application/models/".$model.".php");
		$this->$model=new $model;
	}
}

class View
{
	public function __construct()
	{
		//parent::__construct();
	}
	function load($view)
	{
		require("../../application/views/".$view.".php");
		$this->$view=new $view;
	}
}
class LoadModel
{
	function load($model)
	{
		require("../../application/models/".$model.".php");
		$this->$model=new $model;
	}
}
class LoadView
{
	function load($view)
	{
		require("../../application/views/".$view.".php");
		$this->$view=new $view;
	}
}
class Controller extends Base
{
	public function __construct()
	{
		parent::__construct();
		$this->view=new View;
		$this->session=new Session;
	}
}

?>