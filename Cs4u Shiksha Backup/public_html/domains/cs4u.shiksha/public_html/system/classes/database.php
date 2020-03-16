<?php

class Database extends PDO
{
	var $var_columns	= array();
	var $var_distinct	= FALSE;
	var $var_max		= "";
	var $var_max_alias		= "";
	var $var_min		= "";
	var $var_min_alias		= "";
	var $var_avg		= "";
	var $var_avg_alias		= "";
	var $var_sum		= "";
	var $var_sum_alias		= "";
	var $var_count		= "";
	var $var_count_alias		= "";
	var $var_where		= "";
	var $var_orwhere	= "";
	var $var_like		= "";
	var $var_in			= "";
	var $var_is_null	= "";
	var $var_or_is_null	= "";
	var $var_is_not_null= "";
	var $var_or_is_not_null="";
	var $var_groupby	= "";
	var $var_having		= "";
	var $var_orderby	= "";
	var $var_limit		= "";
	
	var $var_from		= "";
	var $var_join		= "";
	var $var_insert		= "";
	var $var_update		= "";
	var $var_delete		= "";
	var	$var_select		= "";
	var $var_function	=FALSE;
	
	
	public function __construct() 
	{
		
		parent::__construct('mysql:host='.HOST.';dbname='.DATABASE.';charset=utf8',USER,PASSWORD);
	}
	/*functions start*/
	//column
	public function columns($columns)
	{
		$this->var_columns=$columns;
	}
	//distinct
	public function distinct($column)
	{
		$this->var_distinct=$column;
		$this->var_function=TRUE;
	}
	//max min avg sum
	public function MAX($column,$alias="")
	{
		$this->var_max=$column;
		$this->var_max_alias=$alias;
		$this->var_function=TRUE;
	}
	public function MIN($column,$alias="")
	{
		$this->var_min=$column;
		$this->var_min_alias=$alias;
		$this->var_function=TRUE;
	}
	public function AVG($column,$alias="")
	{
		$this->var_avg=$column;
		$this->var_avg_alias=$alias;
		$this->var_function=TRUE;
	}
	public function SUM($column,$alias="")
	{
		$this->var_sum=$column;
		$this->var_sum_alias=$alias;
		$this->var_function=TRUE;
	}
	public function COUNT($column,$alias="")
	{
		$this->var_count=$column;
		$this->var_count_alias=$alias;
		$this->var_function=TRUE;
	}
	//where
	/*
	Syntex
	$this->db->where($array);
	$this->db->where('column','value')
	$this->db->where('column>','value');
	$this->db->where('column=>','value');
	$this->db->where('column<','value');
	$this->db->where('column=<','value');
	*/
	public function where($column,$value='')
	{
		$finalColumn='';
		if (!is_array($column))
		{
			if(!empty($value))
			{
				$column = array($column => $value);
			}
			else
			{
				if($value==0)
				{
					$column = array($column => $value);
				}
				else
				{
					if (strpos($column, '<') !== false)
					{
						if (strpos($column, '<=') !== false)
						{	
							$column=str_replace('<=','<=\'',$column);
							$finalColumn.=$column.'\'';
						}
						else
						{
							$column=str_replace('<','<\'',$column);
							$finalColumn.=$column.'\'';
						}
					}
					else
					{
						if (strpos($column, '>') !== false)
						{
							if (strpos($column, '>=') !== false)
							{
								$column=str_replace('>=','>=\'',$column);
								$finalColumn.=$column.'\'';
							}
							else
							{
								$column=str_replace('>','>\'',$column);
								$finalColumn.=$column.'\'';
							}
						}
						else
						{
							if (strpos($column, '=') !== false)
							{
								if (strpos($column, '!=') !== false)
								{
									$column=str_replace('!=','=\'',$column);
									$finalColumn.=$column.'\'';	
								}
								else
								{
									$column=str_replace('=','=\'',$column);
									$finalColumn.=$column.'\'';
								}
							}
						}
					}
				}
			}
		}
		else
		{
		
		}
		if(is_array($column))
		{
			foreach($column as $key => $value)
			{
				$finalColumn.=$key.'=\''.$value.'\' AND ';
			}
		}
		$finalColumn = preg_replace('/ AND $/', '', $finalColumn);
		if(!empty($this->var_where))
		{
			$this->var_where.=' AND '.$finalColumn.' ';
		}
		else
		{
			$this->var_where=$finalColumn.' ';
		}
	}
	//or where
	/*
	Syntex
	$this->db->or_where($array);
	$this->db->or_where('column','value')
	$this->db->or_where('column>','value');
	$this->db->or_where('column=>','value');
	$this->db->or_where('column<','value');
	$this->db->or_where('column=<','value');
	*/
	public function or_where($column,$value='')
	{
		$finalColumn='';
		if ( ! is_array($column))
		{
			if(!empty($value))
			{
				$column = array($column => $value);
			}
			else
			{
				if($value==0)
				{
					$column = array($column => $value);
				}
				else
				{
					if (strpos($column, '<') !== false)
					{
						if (strpos($column, '<=') !== false)
						{	
							$column=str_replace('<=','<=\'',$column);
							$finalColumn.=$column.'\'';
						}
						else
						{
							$column=str_replace('<','<\'',$column);
							$finalColumn.=$column.'\'';
						}
					}
					else
					{
						if (strpos($column, '>') !== false)
						{
							if (strpos($column, '>=') !== false)
							{
								$column=str_replace('>=','>=\'',$column);
								$finalColumn.=$column.'\'';
							}
							else
							{
								$column=str_replace('>','>\'',$column);
								$finalColumn.=$column.'\'';
							}
						}
						else
						{
							if (strpos($column, '=') !== false)
							{
								if (strpos($column, '!=') !== false)
								{
									$column=str_replace('!=','=\'',$column);
									$finalColumn.=$column.'\'';	
								}
								else
								{
									$column=str_replace('=','=\'',$column);
									$finalColumn.=$column.'\'';
								}
							}
						}
					}
				}
			}
		}
		if(is_array($column))
		{
			foreach($column as $key => $value)
			{
				$finalColumn.=$key.'=\''.$value.'\' AND ';
			}
		}
		$finalColumn = preg_replace('/ OR $/', '', $finalColumn);
		if(!empty($this->var_where))
		{
			$this->var_where.=' OR '.$finalColumn.' ';
		}
		else
		{
			$this->var_where=$finalColumn.' ';
		}
	}
	
	//like
	public function like($column,$value='')
	{
		$finalLike='';
		if(!empty($this->var_where))
		{
			if ( ! is_array($column))
			{
				if(!empty($value))
				{
					$column = array($column => $value);
				}
			}
			if(!empty($value))
			{
				foreach($column as $key => $value)
				{
					$finalLike.=' AND '.$key.' LIKE \'%'.$value.'%\'';
				}
			}		
		}
		else
		{
			if(!empty($this->var_like))
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' AND '.$key.' LIKE \'%'.$value.'%\'';
					}
				}
			}
			else
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' '.$key.' LIKE \'%'.$value.'%\'';
					}
				}
			}
		}
		if(!empty($this->var_like))
		{
			$this->var_like.=$finalLike.' ';
		}
		else
		{
			$this->var_like=$finalLike.' ';
		}
	}
	//or like
	public function or_like($column,$value='')
	{
		$finalLike='';
		if(!empty($this->var_where))
		{
			if ( ! is_array($column))
			{
				if(!empty($value))
				{
					$column = array($column => $value);
				}
			}
			if(!empty($value))
			{
				foreach($column as $key => $value)
				{
					$finalLike.=' OR '.$key.' LIKE \'%'.$value.'%\'';
				}
			}		
		}
		else
		{
			if(!empty($this->var_like))
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' OR '.$key.' LIKE \'%'.$value.'%\'';
					}
				}
			}
			else
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' '.$key.' LIKE \'%'.$value.'%\'';
					}
				}
			}
		}
		if(!empty($this->var_like))
		{
			$this->var_like.=$finalLike.' ';
		}
		else
		{
			$this->var_like=$finalLike.' ';
		}
	}
	//not like
	public function not_like($column,$value='')
	{
		$finalLike='';
		if(!empty($this->var_where))
		{
			if ( ! is_array($column))
			{
				if(!empty($value))
				{
					$column = array($column => $value);
				}
			}
			if(!empty($value))
			{
				foreach($column as $key => $value)
				{
					$finalLike.=' AND '.$key.' NOT LIKE \'%'.$value.'%\'';
				}
			}		
		}
		else
		{
			if(!empty($this->var_like))
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' AND '.$key.' NOT LIKE \'%'.$value.'%\'';
					}
				}
			}
			else
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' '.$key.' NOT LIKE \'%'.$value.'%\'';
					}
				}
			}
		}
		if(!empty($this->var_like))
		{
			$this->var_like.=$finalLike.' ';
		}
		else
		{
			$this->var_like=$finalLike.' ';
		}
	}
	//or not like
	public function or_not_like($column,$value='')
	{
		$finalLike='';
		if(!empty($this->var_where))
		{
			if ( ! is_array($column))
			{
				if(!empty($value))
				{
					$column = array($column => $value);
				}
			}
			if(!empty($value))
			{
				foreach($column as $key => $value)
				{
					$finalLike.=' OR '.$key.' NOT LIKE \'%'.$value.'%\'';
				}
			}		
		}
		else
		{
			if(!empty($this->var_like))
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' OR '.$key.' NOT LIKE \'%'.$value.'%\'';
					}
				}
			}
			else
			{
				if ( ! is_array($column))
				{
					if(!empty($value))
					{
						$column = array($column => $value);
					}
				}
				if(!empty($value))
				{
					foreach($column as $key => $value)
					{
						$finalLike.=' '.$key.' NOT LIKE \'%'.$value.'%\'';
					}
				}
			}
		}
		if(!empty($this->var_like))
		{
			$this->var_like.=$finalLike.' ';
		}
		else
		{
			$this->var_like=$finalLike.' ';
		}
	}
	
	//IS NULL
	public function is_null($column)
	{
		$finalIsNull='';
		if(!empty($this->var_where))
		{
			$finalIsNull=' AND '.$column.' IS NULL ';		
		} 
		else
		{
			$finalIsNull=$column.' IS NULL ';
		}
		if(!empty($this->var_like))
		{
			$this->var_is_null.=$finalIsNull.' ';
		}
		else
		{
			$this->var_is_null=$finalIsNull.' ';
		}
	}
	
	//OR IS NULL
	public function or_is_null($column)
	{
		$finalOrIsNull='';
		if(!empty($this->var_where))
		{
			$finalOrIsNull=' OR '.$column.' IS NULL ';		
		} 
		else
		{
			$finalOrIsNull=$column.' IS NULL ';
		}
		if(!empty($this->var_or_is_null))
		{
			$this->var_or_is_null.=$finalOrIsNull.' ';
		}
		else
		{
			$this->var_or_is_null=$finalOrIsNull.' ';
		}
	}
	
	//IS NOT NULL
	public function is_not_null($column)
	{
		$finalIsNotNull='';
		if(!empty($this->var_where))
		{
			$finalIsNotNull=' AND '.$column.' IS NOT NULL ';		
		} 
		else
		{
			$finalIsNotNull=$column.' IS NULL ';
		}
		if(!empty($this->var_is_not_null))
		{
			$this->var_is_not_null.=$finalIsNotNull.' ';
		}
		else
		{
			$this->var_is_not_null=$finalIsNotNull.' ';
		}
	}
	
	//OR IS NOT NULL
	public function or_is_not_null($column)
	{
		$finalIsNull='';
		if(!empty($this->var_where))
		{
			$finalIsNull=' OR '.$column.' IS NOT NULL ';		
		} 
		else
		{
			$finalIsNull=$column.' IS NOT NULL ';
		}
		if(!empty($this->var_or_is_not_null))
		{
			$this->var_or_is_not_null.=$finalIsNull.' ';
		}
		else
		{
			$this->var_or_is_not_null=$finalIsNull.' ';
		}
	}
	/*operators start*/
	//IN operator with or without AND
	public function in($column,$value)
	{
		$finalIn='';
		if(!empty($this->var_where))
		{
			if (!empty($value))
			{
				if(is_array($value))
				{
					$finalIn.=' AND '.$column.' IN('.'\''.implode('\',\'',$value).'\''.')';
				}
				else
				{
					$finalIn.=' AND '.$column.' IN('.'\''.$value.'\''.')';
				}
			}		
		}
		else
		{
			if(!empty($this->var_in))
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' AND '.$column.' IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' AND '.$column.' IN('.'\''.$value.'\''.')';
					}
				}	
			}
			else
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' '.$column.' IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' '.$column.' IN('.'\''.$value.'\''.')';
					}
				}	
			}
		}
		if(!empty($this->var_in))
		{
			$this->var_in.=$finalIn.' ';
		}
		else
		{
			$this->var_in=$finalIn.' ';
		}
	}
	//IN operator with OR
	public function or_in($column,$value)
	{
		$finalIn='';
		if(!empty($this->var_where))
		{
			if (!empty($value))
			{
				if(is_array($value))
				{
					$finalIn.=' OR '.$column.' IN('.'\''.implode('\',\'',$value).'\''.')';
				}
				else
				{
					$finalIn.=' OR '.$column.' IN('.'\''.$value.'\''.')';
				}
			}		
		}
		else
		{
			if(!empty($this->var_in))
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' OR '.$column.' IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' OR '.$column.' IN('.'\''.$value.'\''.')';
					}
				}	
			}
			else
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' '.$column.' IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' '.$column.' IN('.'\''.$value.'\''.')';
					}
				}	
			}
		}
		if(!empty($this->var_in))
		{
			$this->var_in.=$finalIn.' ';
		}
		else
		{
			$this->var_in=$finalIn.' ';
		}
	}
	//NOTIN operator with or without AND
	public function not_in($column,$value)
	{
		$finalIn='';
		if(!empty($this->var_where))
		{
			if (!empty($value))
			{
				if(is_array($value))
				{
					$finalIn.=' AND '.$column.' NOT IN('.'\''.implode('\',\'',$value).'\''.')';
				}
				else
				{
					$finalIn.=' AND '.$column.' NOT IN('.'\''.$value.'\''.')';
				}
			}		
		}
		else
		{
			if(!empty($this->var_in))
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' AND '.$column.' NOT IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' AND '.$column.' NOT IN('.'\''.$value.'\''.')';
					}
				}	
			}
			else
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' '.$column.' NOT IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' '.$column.' NOT IN('.'\''.$value.'\''.')';
					}
				}	
			}
		}
		if(!empty($this->var_in))
		{
			$this->var_in.=$finalIn.' ';
		}
		else
		{
			$this->var_in=$finalIn.' ';
		}
	}
	//NOTIN operator with OR
	public function or_not_in($column,$value)
	{
		$finalIn='';
		if(!empty($this->var_where))
		{
			if (!empty($value))
			{
				if(is_array($value))
				{
					$finalIn.=' OR '.$column.' NOT IN('.'\''.implode('\',\'',$value).'\''.')';
				}
				else
				{
					$finalIn.=' OR '.$column.' NOT IN('.'\''.$value.'\''.')';
				}
			}		
		}
		else
		{
			if(!empty($this->var_in))
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' OR '.$column.' NOT IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' OR '.$column.' NOT IN('.'\''.$value.'\''.')';
					}
				}	
			}
			else
			{
				if (!empty($value))
				{
					if(is_array($value))
					{
						$finalIn.=' '.$column.' NOT IN('.'\''.implode('\',\'',$value).'\''.')';
					}
					else
					{
						$finalIn.=' '.$column.' NOT IN('.'\''.$value.'\''.')';
					}
				}	
			}
		}
		if(!empty($this->var_in))
		{
			$this->var_in.=$finalIn.' ';
		}
		else
		{
			$this->var_in=$finalIn.' ';
		}
	}
	/*operators end*/
	//group by
	public function groupby($column)
	{
		$this->var_groupby=$column;
	} 
	//having
	public function having()
	{
		$this->var_having();
	}
	//order by
	public function orderby($column,$order='')
	{
		$this->var_orderby=$column;
		$this->var_order=$order;
	}
	public function limit($limit=null,$offset=null)
	{
		if($limit!=null)
		{
			if($offset!=null)
			{
				$this->var_limit=' '.'LIMIT '.$offset.','.$limit;
			}
			else
			{
				$this->var_limit=' '.'LIMIT '.$limit;
			}
		}
		//
		 $limit.' '.$offset.' limit function call<br>';
	}
	/*join*/
	//From
	public function from($table = '', $columns)
	{
		$this->prepareFrom($table,$columns);
	}
	private function prepareFrom($table = '', $columns)
	{
		$this->var_from='SELECT ';
		if(!empty($this->var_max))
		{
			if(!empty($this->var_max_alias))
			{
				$this->var_from.='MAX('.$this->var_avg.') as '.$this->var_avg_alias;	
			}
			else
			{
				$this->var_from.='MAX('.$this->var_avg.')';	
			}
			if(!empty($this->var_function))
				$this->var_from.=',';
		}
		if(!empty($this->var_min))
		{
			if(!empty($this->var_min_alias))
			{
				$this->var_from.='MIN('.$this->var_min.') as '.$this->var_min_alias;	
			}
			else
			{
				$this->var_from.='MIN('.$this->var_avg.')';	
			}
			if(!empty($this->var_function))
				$this->var_from.=',';
		}
		if(!empty($this->var_avg))
		{
			if(!empty($this->var_avg_alias))
			{
				$this->var_from.='AVG('.$this->var_avg.') as '.$this->var_avg_alias;	
			}
			else
			{
				$this->var_from.='AVG('.$this->var_avg.')';	
			}
			if(!empty($this->var_function))
				$this->var_from.=',';
		}
		if(!empty($this->var_sum))
		{
			if(!empty($this->var_sum_alias))
			{
				$this->var_from.='SUM('.$this->var_sum.') as '.$this->var_sum_alias;	
			}
			else
			{
				$this->var_from.='SUM('.$this->var_sum.')';	
			}
			if(!empty($this->var_function))
				$this->var_from.=',';
		}
		if(!empty($this->var_count))
		{
			if(!empty($this->var_count_alias))
			{
				$this->var_from.='COUNT('.$this->var_count.') as '.$this->var_count_alias;	
			}
			else
			{
				$this->var_from.='COUNT('.$this->var_count.')';	
			}
			
			if(!empty($this->var_function))
				$this->var_from.=',';
		}
		if($this->var_distinct==TRUE)
		{
			$this->var_from.='DISTINCT('.$this->var_distinct.')';
			if(!empty($this->var_function))
				$this->var_from.=',';
		}
		$this->var_from.=$columns.' FROM '.$table;
	}
	//Join
	public function join($table='',$filter='',$type='')
	{
		$this->prepareJoin($table,$filter,$type);
	}
	private function prepareJoin($table='',$filter='',$type='')
	{
		if($this->var_join=='')
		{
			$this->var_join=' '.$type.' JOIN '.$table.' ON '.$filter;
		}
		else
		{
			$this->var_join.=' '.$type.' JOIN '.$table.' ON '.$filter;
		}
	}
	/*functions end*/
	
	/*Start DML*/
	//Insert
	public function insert($table,$data)
	{
		ksort($data);
		$columns=implode(",",array_keys($data));
		$values=':'.implode(', :',array_keys($data));
		$query=$this->prepare("INSERT INTO $table($columns) VALUES ($values)");
		foreach($data as $key => $value)
		{
			$query->bindValue(':'.$key,$value);
		}
		$query->execute() or die(print_r($query->errorInfo(), true));
		$this->reset_query();
	}
	public function insertGetId($table,$data)
	{
		ksort($data);
		$columns=implode(",",array_keys($data));
		$values=':'.implode(', :',array_keys($data));
		$query=$this->prepare("INSERT INTO $table($columns) VALUES ($values)");
		foreach($data as $key => $value)
		{
			$query->bindValue(':'.$key,$value);
		}
		$query->execute() or die(print_r($query->errorInfo(), true));
		$lastId = $this->lastInsertId();
		$this->reset_query();
		return $lastId;
	}
	//Update
	public function update($table,$columns)
	{
		//$columns=column1=value1,column2=value2;
		$sql=$this->prepareUpdate($table,$columns);
		
		//$sql="UPDATE table_name SET column1=value1,column2=value2 WHERE some_column=some_value"
		//echo 'update start <br>';
		//echo $sql;
		//echo 'update end <br>';
		$query=$this->prepare($sql);
		$query->execute();
		$this->reset_query();
	}
	private function prepareUpdate($table,$columns)
	{
		$sql='UPDATE '.$table.' SET ';
		$updateColumns='';
		foreach($columns as $key => $value)
		{
			$updateColumns.=$key.'=\''.$value.'\' , ';
		}
		$updateColumns = preg_replace('/ , $/', '', $updateColumns);
		$sql.=$updateColumns;
		//
		if(!empty($this->var_where))
		{
			$sql.=' WHERE '.$this->var_where.' ';
		}
		
		//LIKE
		if(!empty($this->var_where))
		{
			if(!empty($this->var_like))
			{
				$sql.=' '.$this->var_like;
			}
		}
		else
		{
			if(!empty($this->var_like))
			{
				$sql.=' WHERE '.$this->var_like;
			}
		}
		
		//IN
		if(!empty($this->var_where))
		{
			if(!empty($this->var_in))
			{
				$sql.=' '.$this->var_in;
			}
		}
		else
		{
			if(!empty($this->var_in))
			{
				$sql.=' WHERE '.$this->var_in;
			}
		}
		
		if(!empty($this->var_groupby))
		{
			if(!empty($this->var_having))
			{
				$sql.=' GROUP BY '.$this->var_groupby.' HAVING '.$this->var_having;
			}
			else
			{
				$sql.=' GROUP BY '.$this->var_groupby;
			}
		}
		
		if(!empty($this->var_orderby))
		{
			$sql.=' ORDER BY '.$this->var_orderby;
			if(!empty($this->var_order))
			{
				$sql.=' '.$this->var_order;
			}
			else
			{
				$sql.=' ASC';
			}
		}
		return $sql;
	}
	//Delete
	public function delete($table)
	{
		$sql=$this->prepareDelete($table);
		$query=$this->prepare($sql);
		$query->execute();
		$this->reset_query();
	}
	private function prepareDelete($table)
	{
	$sql='DELETE FROM '.$table;
		//
		if(!empty($this->var_where))
		{
			$sql.=' WHERE '.$this->var_where.' ';
		}
		
		//LIKE
		if(!empty($this->var_where))
		{
			if(!empty($this->var_like))
			{
				$sql.=' '.$this->var_like;
			}
		}
		else
		{
			if(!empty($this->var_like))
			{
				$sql.=' WHERE '.$this->var_like;
			}
		}
		
		//IN
		if(!empty($this->var_where))
		{
			if(!empty($this->var_in))
			{
				$sql.=' '.$this->var_in;
			}
		}
		else
		{
			if(!empty($this->var_in))
			{
				$sql.=' WHERE '.$this->var_in;
			}
		}
		if(!empty($this->var_groupby))
		{
			if(!empty($this->var_having))
			{
				$sql.=' GROUP BY '.$this->var_groupby.' HAVING '.$this->var_having;
			}
			else
			{
				$sql.=' GROUP BY '.$this->var_groupby;
			}
		}
		
		if(!empty($this->var_orderby))
		{
			$sql.=' ORDER BY '.$this->var_orderby;
			if(!empty($this->var_order))
			{
				$sql.=' '.$this->var_order;
			}
			else
			{
				$sql.=' ASC';
			}
		}
		return $sql;
	}
	//Select
	public function select($table = '')
	{
		if($table)
		{
			$sql=$this->prepareSelect($table);
		}
		else
		{
			$sql=$this->var_from.$this->var_join.$this->prepareJoinFilter();
		}
		//echo $sql;
		//echo'<br>';
		$query=$this->prepare(str_replace(",FROM"," FROM",$sql));
		$query->setFetchMode(PDO::FETCH_ASSOC);
		$query->execute();
		$result=$query->fetchAll();
		$count=$query->rowCount();
		$this->reset_query();
		return $result;
	}
	private function prepareSelect($table)
	{
		$sql='SELECT ';
		if(!empty($this->var_max))
		{
			if(!empty($this->var_max_alias))
			{
				$sql.='MAX('.$this->var_max.') as '.$this->var_max_alias;	
			}
			else
			{
				$sql.='MAX('.$this->var_max.')';	
			}
			if(!empty($this->var_function))
				$sql.=',';
		}
		if(!empty($this->var_min))
		{
			if(!empty($this->var_min_alias))
			{
				$sql.='MIN('.$this->var_min.') as '.$this->var_min_alias;	
			}
			else
			{
				$sql.='MIN('.$this->var_min.')';	
			}
			if(!empty($this->var_function))
				$sql.=',';
		}
		if(!empty($this->var_avg))
		{
			if(!empty($this->var_avg_alias))
			{
				$sql.='AVG('.$this->var_avg.') as '.$this->var_avg_alias;	
			}
			else
			{
				$sql.='AVG('.$this->var_avg.')';	
			}
			if(!empty($this->var_function))
				$sql.=',';
		}
		if(!empty($this->var_sum))
		{
			if(!empty($this->var_sum_alias))
			{
				$sql.='SUM('.$this->var_sum.') as '.$this->var_sum_alias;	
			}
			else
			{
				$sql.='SUM('.$this->var_sum.')';	
			}
			if(!empty($this->var_function))
				$sql.=',';
		}
		if(!empty($this->var_count))
		{
			if(!empty($this->var_count_alias))
			{
				$sql.='COUNT('.$this->var_count.') as '.$this->var_count_alias;	
			}
			else
			{
				$sql.='COUNT('.$this->var_count.')';	
			}
			
			if(!empty($this->var_function))
				$sql.=',';
		}
		if($this->var_distinct==TRUE)
		{
			$sql.='DISTINCT('.$this->var_distinct.')';
			if(!empty($this->var_function))
				$sql.=',';
		}
		
		//
		if(!empty($this->var_columns))
		{
			//$columns=implode(",",array_keys($this->var_columns))
			$sql.=$this->var_columns.' FROM '.$table.' ';
		}
		else
		{
			if($this->var_function==TRUE)
			{
				$sql.='FROM '.$table.' ';
			}
			else
			{
				$sql.='* FROM '.$table.' ';
			}
		}
		
		//
		if(!empty($this->var_where))
		{
			$sql.=' WHERE '.$this->var_where.' ';
		}
		
		//
		if(!empty($this->var_where))
		{
			if(!empty($this->var_like))
			{
				$sql.=' '.$this->var_like;
			}
		}
		else
		{
			if(!empty($this->var_like))
			{
				$sql.=' WHERE '.$this->var_like;
			}
		}
		
		//IN
		if(!empty($this->var_where))
		{
			if(!empty($this->var_in))
			{
				$sql.=' '.$this->var_in;
			}
		}
		else
		{
			if(!empty($this->var_in))
			{
				$sql.=' WHERE '.$this->var_in;
			}
		}
		
		//IS NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_is_null))
			{
				$sql.=' '.$this->var_is_null;
			}
		}
		else
		{
			if(!empty($this->var_is_null))
			{
				$sql.=' WHERE '.$this->var_is_null;
			}
		}
		
		//OR IS NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_or_is_null))
			{
				$sql.=' '.$this->var_or_is_null;
			}
		}
		else
		{
			if(!empty($this->var_or_is_null))
			{
				$sql.=' WHERE '.$this->var_or_is_null;
			}
		}
		
		//OR IS NOT NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_is_not_null))
			{
				$sql.=' '.$this->var_is_not_null;
			}
		}
		else
		{
			if(!empty($this->var_or_is_null))
			{
				$sql.=' WHERE '.$this->var_is_not_null;
			}
		}
		
		//OR IS NOT NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_or_is_not_null))
			{
				$sql.=' '.$this->var_or_is_not_null;
			}
		}
		else
		{
			if(!empty($this->var_or_is_not_null))
			{
				$sql.=' WHERE '.$this->var_or_is_not_null;
			}
		}
		
		//GROUP BY
		if(!empty($this->var_groupby))
		{
			if(!empty($this->var_having))
			{
				$sql.=' GROUP BY '.$this->var_groupby.' HAVING '.$this->var_having;
			}
			else
			{
				$sql.=' GROUP BY '.$this->var_groupby;
			}
		}
		
		//ORDER BY
		if(!empty($this->var_orderby))
		{
			$sql.=' ORDER BY '.$this->var_orderby;
			if(!empty($this->var_order))
			{
				$sql.=' '.$this->var_order;
			}
			else
			{
				$sql.=' ASC';
			}
		}
		if(!empty($this->var_limit))
		{
			//echo'step one<br>';
			$sql.=$this->var_limit;
		}
		return $sql;
	}
	private function prepareJoinFilter()
	{
		$sqlFilter=' ';
		//
		if(!empty($this->var_where))
		{
			$sqlFilter.=' WHERE '.$this->var_where.' ';
		}
		
		//
		if(!empty($this->var_where))
		{
			if(!empty($this->var_like))
			{
				$sqlFilter.=' '.$this->var_like;
			}
		}
		else
		{
			if(!empty($this->var_like))
			{
				$sqlFilter.=' WHERE '.$this->var_like;
			}
		}
		
		//IN
		if(!empty($this->var_where))
		{
			if(!empty($this->var_in))
			{
				$sqlFilter.=' '.$this->var_in;
			}
		}
		else
		{
			if(!empty($this->var_in))
			{
				$sqlFilter.=' WHERE '.$this->var_in;
			}
		}
		//IS NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_is_null))
			{
				$sqlFilter.=' '.$this->var_is_null;
			}
		}
		else
		{
			if(!empty($this->var_is_null))
			{
				$sqlFilter.=' WHERE '.$this->var_is_null;
			}
		}
		
		//OR IS NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_or_is_null))
			{
				$sqlFilter.=' '.$this->var_or_is_null;
			}
		}
		else
		{
			if(!empty($this->var_or_is_null))
			{
				$sqlFilter.=' WHERE '.$this->var_or_is_null;
			}
		}
		
		//OR IS NOT NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_is_not_null))
			{
				$sqlFilter.=' '.$this->var_is_not_null;
			}
		}
		else
		{
			if(!empty($this->var_or_is_null))
			{
				$sqlFilter.=' WHERE '.$this->var_is_not_null;
			}
		}
		
		//OR IS NOT NULL
		
		if(!empty($this->var_where))
		{
			if(!empty($this->var_or_is_not_null))
			{
				$sqlFilter.=' '.$this->var_or_is_not_null;
			}
		}
		else
		{
			if(!empty($this->var_or_is_not_null))
			{
				$sqlFilter.=' WHERE '.$this->var_or_is_not_null;
			}
		}
		if(!empty($this->var_groupby))
		{
			if(!empty($this->var_having))
			{
				$sqlFilter.=' GROUP BY '.$this->var_groupby.' HAVING '.$this->var_having;
			}
			else
			{
				$sqlFilter.=' GROUP BY '.$this->var_groupby;
			}
		}
		
		if(!empty($this->var_orderby))
		{
			$sqlFilter.=' ORDER BY '.$this->var_orderby;
			if(!empty($this->var_order))
			{
				$sqlFilter.=' '.$this->var_order;
			}
			else
			{
				$sqlFilter.=' ASC';
			}
		}
		if(!empty($this->var_limit))
		{
			//echo'step two<br>';
			$sqlFilter.=$this->var_limit;
		}
		return $sqlFilter;
	}
	/*End DML*/
	//reset all variables
	private function reset_query()
	{
		$this->var_columns	= array();
		$this->var_distinct	= FALSE;
		$this->var_max		= "";
		$this->var_min		= "";
		$this->var_avg		= "";
		$this->var_sum		= "";
		$this->var_count	= "";
		$this->var_where	= "";
		$this->var_orwhere	= "";
		$this->var_like		= "";
		$this->var_in		= "";
		$this->var_is_null	= "";
		$this->var_or_is_null	= "";
		$this->var_is_not_null= "";
		$this->var_or_is_not_null="";
		$this->var_groupby	= "";
		$this->var_having	= "";
		$this->var_orderby	= "";
		$this->var_limit	= "";
		
		$this->var_from		= "";
		$this->var_join		= "";
		$this->var_insert	= "";
		$this->var_update	= "";
		$this->var_delete	= "";
		$this->var_select	= "";
		$this->var_function	=FALSE;
	}
}