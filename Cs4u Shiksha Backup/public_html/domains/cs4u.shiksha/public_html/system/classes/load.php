<?php
class load
{
	public function view($file,$var=array())
	{
		$view=new View();
		if($var)
		{
			$view->load($file,$var);
		}
		else
		{
			$view->load($file);
		}
	}
	public function model($file)
	{
		$model=new Model();
		$model->load($file);
	}
}