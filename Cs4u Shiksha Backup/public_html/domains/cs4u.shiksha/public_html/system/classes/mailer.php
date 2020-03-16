<?php

class mailer
{
	function __construct()
	{
		ini_set("SMTP","fastlinux.cms500.com");
		ini_set("smtp_port",'465');
		$to="";
		$from="";
		$subject="";
		$message="";
		$wordrap=0;
		$header="";
		$name="";
	}
	public function username($username)
	{
		ini_set("username", $username);
		$this->from=$username;
	}
	public function password($password)
	{
		ini_set("password", $password);
	}
	public function from($from)
	{
		$this->from=$from;
	}
	public function sender($name)
	{
		$this->name=$name;
	}
	public function replyto($replyto)
	{
		$this->replyto=$replyto;
	}
	public function to($to)
	{
		$this->to=$to;
	}
	
	public function subject($subject)
	{
		$this->subject= $subject;
	}
	public function message($msg)
	{
		$this->message= $msg;
	}
	public function wordwrap($wordrap)
	{
		$this->wordwrap = $wordrap;
	}
	public function send()
	{
		// Always set content-type when sending HTML email
		$this->headers = "MIME-Version: 1.0" . "\r\n";
		$this->headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

		// More headers
		if(!empty($this->from))
			$this->headers .= 'From: '.$this->name.' <'.$this->from.'>' . "\r\n";
		if(!empty($this->cc))
			$this->headers .= 'Cc: '.$this->cc.'' . "\r\n";
		if(!empty($this->bcc))
			$this->headers .= 'Bcc: '.$this->bcc.'' . "\r\n";
		if(!empty($this->replyto))
			$this->headers .= 'Reply-To: '.$this->replyto.'' . "\r\n".'X-Mailer: PHP/' . phpversion();
		
		if(!empty($this->wordwrap))
			$this->massage=wordwrap($this->massage,$this->wordwrap,"<br>\n");
			
		if(mail($this->to,$this->subject,$this->message,$this->headers))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	public function errorinfo()
	{
		return $mail->ErrorInfo;
	}

}