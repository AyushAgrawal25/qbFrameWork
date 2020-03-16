<?php

class file
{
	function __construct()
	{
		$errormsg="";
		ini_set("file_uploads","On");
		ini_set("output_buffering","On");
	}
	public function test()
	{
	    echo dirname(__FILE__);   
	}
	/*public function upload($source,$config)
	{
		global $file;
		$flag=true;
		$replace=false;
		if (file_exists(BASEURL.str_replace('\\', '/', str_replace('system/functions', 'public', dirname(__FILE__)).$config['upload_path']).basename($file['name']))) 
		{
			if(isset($config['replace']))
			{
				if($config['replace']=="Yes")
				{
					unlink(str_replace('\\', '/', local_url().$config['upload_path']).basename($file['name']));
				}
				else
				{
					$flag=false;
					$this->errormsg="file already exist.<br>";
				}
			}
			else
			{
				$flag=false;
				$this->errormsg="file already exist.<br>";
			}
		}
		// Check file size
		if(isset($config["max_size"]))
			if ($config["max_size"]<$file["size"]) {
				$flag=false;
				$this->errormsg.="file should not be larger then ".$file["size"].".<br>";
			}
		// Allow certain file formats
		if(isset($config["types"]))
		{
		    $types=explode("|",$config["types"]);
		    $invalidtype=true;
		    foreach ($types as $type) {
               if(strlen(strstr($type,str_replace("image/",'',$file["type"]))))
               {
                   $invalidtype=false;
               }
               if($invalidtype)
               {
                   $this->errormsg.="Invalid file type".".<br>";
				    $flag=false;
               }
            }
		}
			/*if(!strlen(strstr($config["types"],str_replace("image/",'',$file["type"])))) 
			{
				$this->errormsg.="file type should be ".str_replace("image/",'',$file["type"]).".<br>";
				$flag=false;
			}
		
		if($flag)
		{
			$finalname=basename($file['name']);
			$ext=explode("/",$file["type"]);
			if(isset($config["name"]))
			{
				$finalname=$config["name"];
			}
			if(isset($config["type"]))
			{
				$finaltype=$config["type"];
			}
			if(move_uploaded_file($source,str_replace('\\', '/', str_replace('system/functions', 'public', dirname(__FILE__)).$config['upload_path']).$finalname.'.'.$ext[1]))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
		
	}
	public function upload_error()
	{
		return $this->errormsg;
	}
	*/
}