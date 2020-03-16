<?php
if ( ! function_exists('baseurl'))
{
	function baseurl()
	{
		return BASEURL;
	}
}
if ( ! function_exists('redirect'))
{
	function redirect($url)
	{
		header('Location: '.BASEURL.$url);
	}
}
if ( ! function_exists('import'))
{
	function import($filename)
	{
		include("application/views/".$filename.".php");;
	}
}
if ( ! function_exists('current_url'))
{
	function current_url()
	{
		$pageURL = 'http';
 		/*if ($_SERVER["HTTPS"] == "on") 
 		{
 			$pageURL .= "s";
 		}
		*/
 		$pageURL .= "://";
 		if ($_SERVER["SERVER_PORT"] != "80") 
 		{
 			$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 		} 
 		else 
 		{
  			$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 		}
 		return $pageURL;
	}
	
	if ( ! function_exists('param_url'))
	{
		function param_url($param)
		{
			$pageURL = 'http';
			/*if ($_SERVER["HTTPS"] == "on") 
			{
				$pageURL .= "s";
			}
			*/
			$pageURL .= "://";
			if ($_SERVER["SERVER_PORT"] != "80") 
			{
				$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
			} 
			else 
			{
				$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
			}
			$arr_url=explode("/",$pageURL);
			if($param==1)
			{
				if(sizeof($arr_url)>6)
					return $arr_url[6];
			}
			if($param==2)
			{
				if(sizeof($arr_url)>7)
					return $arr_url[7];
			}
			if($param==3)
			{
				if(sizeof($arr_url)>8)
					return $arr_url[8];
			}
		}
	}
}
