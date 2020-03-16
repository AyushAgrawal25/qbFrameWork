<?php include '../../application/config/database.php';
define("HOST",$database['host']);
define("DATABASE",$database['database']);
define("USER",$database['user']);
define("PASSWORD",$database['password']);
?>
<?php include '../../system/classes/database.php';?>

<?php
class Model extends Database
{
	public function __construct()
	{
		parent::__construct();
	}
}
?>