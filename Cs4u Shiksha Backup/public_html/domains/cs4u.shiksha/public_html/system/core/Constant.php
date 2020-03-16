<?php
//configration informations
global $config;
define("BASEURL",$config['baseurl']);

//mailer configration
define("MAILHOST",$config['mailhost']);
define("MAILPORT",$config['mailport']);

//router infromations

//databadse informations

//file information
global $file;
define("FILEWIDTH",$file['width']);
define("FILEHEIGHT",$file['height']);
define("FILETYPE",$file['type']);
define("XAXIS",$file['X']);
define("YAXIS",$file['Y']);
?>