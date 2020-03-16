<?php
class Session
{
	public static function set($key,$value)
	{
		if(!isset($_SESSION))
		{
			session_start();
		}
		$_SESSION[$key]=$value;
	}
	public static function get($key)
	{
		if(!isset($_SESSION))
		{
			session_start();
		}
		if(isset($_SESSION[$key]))
		return $_SESSION[$key];
		else
		return $key.' SESSION does not exist.';
	}
	public static function issessionset($key)
	{
		if(!isset($_SESSION))
		{
			session_start();
		}
		if(isset($_SESSION[$key]))
		return true;
		else
		return false;
	}
	public static function display()
	{
		if(!isset($_SESSION))
		{
			session_start();
		}
		echo '<pre>';
		print_r($_SESSION);
		echo '</pre>';
	}
	public static function destroy()
	{
		if(!isset($_SESSION))
		{
			session_start();
		}
		session_destroy();
	}
}