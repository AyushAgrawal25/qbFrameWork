<?php include '../../system/core/Model.php';?>
<?php

	class feed_model extends Model
	{
		public function __construct()
		{
			parent::__construct();
		}
		function dataInsert($table,$info)
		{
			$this->insert($table,$info);
		}
		function dataUpdate($table,$info,$filter)
		{
			$this->where($filter);
			$this->update($table,$info);
		}
		function dataDelete($table,$filter)
		{
			$this->where($filter);
			$this->delete($table);
		}
		function dataInsertGetId($tablename,$info)
		{
			$lastId=$this->insertGetId($tablename,$info);
			return $lastId;
		}
		
		function dataSelect($table,$filter=array())
		{
			if(!empty($filter))
				$this->where($filter);
			$info=$this->select($table);
			return $info;
		}
		
		function getId($table,$column)
		{
			$this->MAX($column);
			$arr=$this->select($table);
			$id=$arr[0];
			return $id['MAX('.$column.')'];
		}
	    function TestModel()
	    {
	        $this->from('shares','shares.*,pf.People_Id as P_From,pb.People_Id as P_By,pf.People_FName as P_From_FName,pf.People_LName as P_From_LName,pb.People_FName as P_By_FName,pb.People_LName as P_By_LName,uf.UserName as P_From_UserName,ub.UserName as P_By_UserName,uf.User_People_Id as P_From_User_People_Id,ub.User_People_Id as P_By_User_People_Id,posts.*,caption_master.Master_Caption_Id');
			$this->join('peoples pf','pf.People_Id=shares.Shared_From','inner');
			$this->join('peoples pb','pb.People_Id=shares.Shared_By','inner');
			$this->join('posts','posts.Post_Id=shares.Share_Post_Id','inner');
			$this->join('caption_master','posts.Post_Master_Caption_Id=caption_master.Master_Caption_Id','inner');
			$this->join('users uf','uf.User_People_Id=pf.People_Id','inner');
			$this->join('users ub','ub.User_People_Id=pb.People_Id','inner');
			$this->limit(5,$offset);
			$shares=$this->select();
			return $shares;
	    }
	    function feed($offset)
	    {
	        //$this->where('shares.Status',!0);
	        $this->in('shares.Status',1);
	        $this->from('shares','shares.*,pf.People_Id as P_From,pb.People_Id as P_By,pf.People_FName as P_From_FName,pf.People_LName as P_From_LName,pb.People_FName as P_By_FName,pb.People_LName as P_By_LName,uf.UserName as P_From_UserName,ub.UserName as P_By_UserName,uf.User_People_Id as P_From_User_People_Id,ub.User_People_Id as P_By_User_People_Id,posts.*,caption_master.Master_Caption_Id');
			$this->join('peoples pf','pf.People_Id=shares.Shared_From','inner');
			$this->join('peoples pb','pb.People_Id=shares.Shared_By','inner');
			$this->join('posts','posts.Post_Id=shares.Share_Post_Id','inner');
			$this->join('caption_master','posts.Post_Master_Caption_Id=caption_master.Master_Caption_Id','inner');
			$this->join('users uf','uf.User_People_Id=pf.People_Id','inner');
			$this->join('users ub','ub.User_People_Id=pb.People_Id','inner');
            $this->limit(5,$offset);
			$shares=$this->select();
	       
	        foreach($shares as $share)
            {
                $Comments=array();
	            $this->where('comments.Comment_Share_Id',$share['Share_Id']);
			    $this->where('comments.Status',1);
			    $this->from('comments','peoples.People_Id,users.UserName,users.User_People_Id,peoples.*,comments.*');
			    $this->join('peoples','peoples.People_Id=comments.Comment_People_Id','inner');
			    $this->join('users','peoples.People_Id=users.User_People_Id','inner');
			    $comments=$this->select();
                
                $this->where('Comment_Share_Id',$share['Share_Id']);
	            $this->where('Status',1);
	            $this->columns('Comment_Share_Id');
	            $this->COUNT('Comment_Id','Count_Comments');
	            $this->groupby('Comment_Share_Id');
	            $Count_Comments=$this->select('comments');
	            $share['Count_Comments']=$Count_Comments[0]['Count_Comments'];
	        
                foreach($comments as $comment)
	            {
		            
		            $this->where('replies.Reply_Comment_Id',$comment['Comment_Id']);
			        $this->where('replies.Status',1);
			        $this->from('peoples','peoples.People_Id,users.UserName,users.User_People_Id,replies.*');
			        $this->join('users','peoples.People_Id=users.User_People_Id','inner');
			        $this->join('replies','peoples.People_Id=replies.Reply_People_Id','inner');
		    	    $Replies=$this->select();
		            $comment['Replies']=$Replies;
		            $Comments[]=$comment;
	            }
	        $share['Comments']=$Comments;
	        $url_filter=array(
		        "Url_Post_Id"=>$share['Share_Post_Id'],
		        "Status"=>1
	        );
	        $Urls=$this->dataSelect('urls',$url_filter);
	        $share['Urls']=$Urls;
			
			$Contents=array();
			$Contributions=array();
			$post_contents_filter=array(
		        "Post_Content_Post_Id"=>$share['Share_Post_Id'],
		        "Status"=>1
	        );
			$post_contents=$this->dataSelect('post_contents',$post_contents_filter);
			foreach($post_contents as $post_content)
			{
				if($post_content['Post_Content_People_Id']==$share['Post_People_Id'])
				{
					$post_content_type_Ids_filter=array(
						"Master_Post_Content_Id"=>$post_content['Post_Content_Type_Id'],
						"Status"=>1
					);
					$post_content_type_Ids=$this->dataSelect('post_contents_master',$post_content_type_Ids_filter);
					$contents_filter=array(
						"Content_Id"=>$post_content['Post_Content_Content_Id'],
						Status=>1
					);
					foreach($post_content_type_Ids as $post_content_type_Id)
					{
						$contents=$this->dataSelect($post_content_type_Id['Master_Post_Content_Type'],$contents_filter);   
						foreach($contents as $content)
							$Contents[]=$content;
					}
				}
				else
				{
					$post_content_type_Ids_filter=array(
						"Master_Post_Content_Id"=>$post_content['Post_Content_Type_Id'],
						"Status"=>1
					);
					$post_content_type_Ids=$this->dataSelect('post_contents_master',$post_content_type_Ids_filter);
					$contents_filter=array(
						"Content_Id"=>$post_content['Post_Content_Content_Id'],
						Status=>1
					);
					foreach($post_content_type_Ids as $post_content_type_Id)
					{
						$contributions=$this->dataSelect($post_content_type_Id['Master_Post_Content_Type'],$contents_filter);   
						foreach($contributions as $contribution)
						{
							$contribution['Contibutor_Id']=$post_content['Post_Content_People_Id'];
							$Contributions[]=$contribution;
						}
							
					}
					
				}
			}
			$share['Contents']=$Contents;
			$share['Contributions']=$Contributions;
			
	        $this->where('views.View_Share_Id',$share['Share_Id']);
			$this->where('views.Status',1);
			$this->from('peoples','peoples.People_Id,users.UserName,users.User_People_Id,views.*');
			$this->join('users','peoples.People_Id=users.User_People_Id','inner');
			$this->join('views','peoples.People_Id=views.View_People_Id','inner');
			$Views=$this->select();
	        $share['Views']=$Views;
	        
	        $this->where('View_Share_Id',$share['Share_Id']);
	        $this->where('Status',1);
	        $this->columns('View_Share_Id');
	        $this->COUNT('View_Id','Count_Views');
	        $this->groupby('View_Share_Id');
	        $Count_Views=$this->select('views');
	        $share['Count_Views']=$Count_Views[0]['Count_Views'];
	        
	        $this->where('captions.Caption_Share_Id',$share['Share_Id']);
	        $this->where('captions.Status',1);
	        $this->from('peoples','peoples.People_Id,users.UserName,users.User_People_Id,captions.*');
	        $this->join('users','peoples.People_Id=users.User_People_Id','inner');
	        $this->join('captions','peoples.People_Id=captions.Caption_People_Id','inner');
	        $Captions=$this->select();
	        $share['Captions']=$Captions;
	        
	        $this->where('Caption_Share_Id',$share['Share_Id']);
	        $this->where('Status',1);
	        $this->columns('Caption_Share_Id');
	        $this->COUNT('Caption_Id','Count_Captions');
	        $this->groupby('Caption_Share_Id');
	        $Count_Captions=$this->select('captions');
	        $share['Count_Captions']=$Count_Captions[0]['Count_Captions'];
	        
	        $Shares[]=$share;
            }
        return $Shares;
	    }
	}
?>