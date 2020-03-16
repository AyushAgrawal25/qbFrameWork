<?php
class parser
{
	function __construct()
	{
	
	}
	public function parse($view, $var=array())
	{
		$path="application/views/".$view.".php";
		if(file_exists($path))
		{
			$contents=file_get_contents($path);
			foreach($var as $key=>$var1)
			{
				$$key=$var1;
				if(!is_array($$key))
				{
					$contents=preg_replace('/\['.$key.'\]/','<?php echo $'.$key.'?>',$contents);
				}
				else
				{
					$contents=preg_replace('/\['.$key.'\]/','<?php foreach($'.$key.' as $key=>$row){ ?>',$contents);
					$contents=preg_replace('/\[\/'.$key.'\]/','<?php } ?>',$contents);
					foreach($var1 as $key1=>$row)
					{
						foreach($row as $key2=>$value)
						{
							$contents=preg_replace('/\['.$key2.'\]/','<?php echo $row[\''.$key2.'\']?>',$contents);
						}
					}
				}
			}
			$contents=preg_replace('/\[u BASEURL\]/','<?php echo baseurl()?>',$contents);
			
			eval('?>'.$contents.'<?php');
		}
		else
		{
			exit($view.'.php dose not exist..');
		}
	}
}