<?php
class input
{
	function __construct()
	{
	}
	public function post($field,$index=NULL)
	{
		if(isset($_POST[$field]))
		{
			if(is_array($_POST[$field]))
			{
				return $_POST[$field][$index];
			}
			else
			{
				return $_POST[$field];
			}
		}
		else
		{
			if(isset($_FILES[$field]))
			{
				global $file;
			$file['name']=$_FILES[$field]['name'];
			$file['type']=$_FILES[$field]['type'];
			$file['size']=$_FILES[$field]['size'];
			$file['tmp_name']=$_FILES[$field]['tmp_name'];
			if(is_null($index))
			{
				return $_FILES[$field]['tmp_name'];
			}
			if($index=='name')
			{
				return $_FILES[$field]['name'];
			}
			if($index=='type')
			{
				return $_FILES[$field]['type'];
			}
			if($index=='size')
			{
				return $_FILES[$field]['size'];
			}
			if($index=='tmp_name')
			{
				return $_FILES[$field]['tmp_name'];
			}
			if($index=='error')
			{
				$errormsg="";
				switch ($_FILES[$field]['error']) 
				{
					case UPLOAD_ERR_OK:
						return $errormsg;
					break;
					case UPLOAD_ERR_INI_SIZE:
						$errormsg="The uploaded file exceeds the upload_max_filesize directive in php.ini.";
						return $errormsg;	
						break;
					case UPLOAD_ERR_FORM_SIZE:
						$errormsg="The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.";
						return $errormsg;
						break;
					case UPLOAD_ERR_PARTIAL:
						$errormsg="The uploaded file was only partially uploaded.";
						return $errormsg;
						break;
					case UPLOAD_ERR_NO_FILE:
						$errormsg="No file was uploaded.";
						return $errormsg;
						break;
					case UPLOAD_ERR_NO_TMP_DIR:
						$errormsg="Missing a temporary folder.";
						return $errormsg;
						break;
					case UPLOAD_ERR_CANT_WRITE:
						$errormsg="Failed to write file to disk.";
						return $errormsg;
						break;
					case UPLOAD_ERR_EXTENSION:
						$errormsg="A PHP extension stopped the file upload.";
						return $errormsg;
						break;
						default:$errormsg="Unknown Error.";
						return $errormsg;
					}
				}
			}
		}
	}
}