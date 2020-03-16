
<html>
<head>
<title>testing</title>
</head>
<style>
h1
{
	margin:0px;
}
div.main
{
	height:99%;
	width:99%;
	margin:0px;
	padding:0.5%;
	border:2px solid black;
	text-align:center;
}
div.top
{
	height:auto;
	width:auto;
	margin:0px;
	padding:0px;
	border:2px solid black;
	text-align:center;
	font-family:algerian;
}
div.top1
{
	height:auto;
	width:auto;
	margin:0px;
	padding:0px;
	border:2px solid black;	
	text-align:center;
	overflow:hidden;
}
div.top2
{
	height:auto;
	width:auto;
	margin:0px;
	padding:0px;
	border:2px solid black;
	text-align:center;
	overflow: hidden;
}
div.middle
{
	height:auto;
	width:auto;
	margin:0px;
	padding:0px;
	border:2px solid red;
	text-align:center;
	overflow:hidden;
}
div.left
{
	height:auto;
	width:30%;
	margin:0px;
	padding:0px;
	border:2px solid black;
	float:left;
	text-align:left;
}	
div.mid
{
	height:auto;
	width:40%;
	margin:0px;
	padding:0px;
	border:2px solid black;
	float:left;
	text-align:center;
}
div.right
{
	height:auto;
	width:29%;
	margin:0px;
	padding:0px;
	border:2px solid black;
	float:left;
	text-align:center;
}
div.bottom
{
	height:auto;
	width:auto;
	margin:0px;
	padding:0px;
	border:2px solid black;
	text-align:center;
}
li
{
	float:left;
	list-style-type:none;
}
input.textbox
{
	height:2%;
	width:17%;
	border:inset;
}
input.date
{
	height:2%;
	width:4%;
	border:inset;
}
div.post
{
	height:auto;
	width:auto;
	border:2px inset black;
}
div.comments
{
	height:auto;
	width:auto;
	border:2px inset black;
}
div.replies
{
	height:auto;
	width:auto;
	border:2px inset black;
}
div.comment
{
	height:auto;
	width:auto;
	border:2px inset black;
}
div.reply
{
	height:auto;
	width:auto;
	border:2px inset black;	
}
input.postupdate
{
	height:auto;
	width:90%;
	border:2px solid black;
}
input.button
{
	height:3%;
	width:15%;
	border:inset;	
}
</style>
<body>
<div class="main">
	<div class="top">
		<h1>WE ARE IN TOUCH</h1>
	</div>
	<div class="top1">
		<ul>
			<li>
				<a href="hello">link1</a>
			</li>
			<li>
					<a href="hello">link2</a>
			</li>
			<li>
					<a href="hello">link3</a>
			</li>
		</ul>
	</div>
	<div class="top2">
			<ul>
					<li>
						<a href="hello">link1</a>
					</li>
					<li>
							<a href="hello">link2</a>
					</li>
					<li>
							<a href="hello">link3</a>
					</li>
				</ul>
	</div>
	<div class="middle">
		<div class="left">
			LOGIN:
			<br>
			User name:<input class="textbox" type="text"></input>
			<br>
			password:<input class="textbox" type="password"></input>
			<br>
			<hr>
			REGISTRATION:
			<br>
			User Name:<input class="textbox" type="text"></input>
			<br>
			password:<input class="textbox" type="password"></input>
			<br>
			First Name:<input class="textbox" type="text"></input>
			<br>
			Last Name:<input class="textbox" type="text"></input>
			<br>
			Date of birth:<input class="date" type:"number"></input>
						  <input class="date" type:"number"></input>
						  <input class="date" type:"number"></input>
			<br>			  
			gender:<input class="textbox" type:"text"></input>
		</div>
		<div class=" mid">
			<div class="postu">
				<input class="postupdate" type="text"></input>
				<input class="postupdate" type="text"></input>
				<input class="button" type="button" value="post"></input>
			</div>
			<div class="post"> 
					this is a post
					<div class="comments">
						comments
						<div class="comment">
							single comment
							<div class="replies">
								replies
									<div class="reply">
											single reply
									</div>
							</div>
						</div>
					</div>
			</div>
			
			
		</div>
		<div class="right">
			right
		</div>
	</div>
	<div class="bottom">bye</div>
</div>
</body>
</html>
