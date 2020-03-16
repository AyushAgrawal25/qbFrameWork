<html>
<head>
<title>
registration
</title>
<head>
<style>
div.a
{
	height:7%;
	width:99%;
	padding:0%;
	margin:0.5%;
	border:2px solid black;
	text-align:center;
	font-family:algerian;
	font-size:40px;
}
div.a1
{
	height:6.5%;
	width:99%;
	padding:0%;
	margin:0.5%;
	border:2px solid black;
	text-align:center;
	font-family:algerian;
	background-color:#111;
	
}
div.a2
{
	height:50.5%;
	width:99%;
	padding:0%;
	margin-left:0.5%;
	border:2px solid black;
	text-align:center;
	font-family:algerian;
	
}
div.b
{
	height:59%;
	width:96.3%;
	padding:1.5%;
	margin-left:0.5%;
	border:2px solid black;
	background-color:lightgray;
	text-align:center;
	font-family:algerian;
	clear:both;
	
}
div.c
{
	height:10%;
	width:99%;
	padding:0%;
	margin-top:0%;
	margin-left:0.5%;
	margin-right:0.5%;
	margin-bottom:0.5%;
	border:2px solid black;
	text-align:center;
	font-family:algerian;
	
}
div.d
{
	height:57.3%;
	width:22.5%;
	padding:0px;
	margin:0%;
	border:0.5px solid black;
	position:absolute;
	left:3%;
	background-color:white;
	text-align:center;
	font-family:algerian;
	overflow:auto;
	clear:both;
	color:#111;
	border-radius:25px;	
}
div.e
{
	overflow:auto;
	height:48.3%;
	width:40.7%;
	padding:2%;
	margin:0%;
	border:2px solid black;
	position:absolute;
	text-align:center;
	font-family:algerian;
	left:28%;
	background-color:white;
	border-radius:25px;
}
div.f
{
	height:57.3%;
	width:21.5%;
	padding:0%;
	margin:0%;
	border:2px solid black;
	position:absolute;
	right:3%;
	background-color:white;
	text-align:center;
	font-family:algerian;
	border-radius:25px;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #111;
    height:auto;
    width:auto;
}

li {
    float: left;
}

li a {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 9.5px 14px ;
}

li a:hover {
    background-color: RGB(87,187,28);
}
input
{
	border:inset;
	font-family:cooper;
}
input.small
{
	height:5%;
	width:9%;
}
select
{
	height:7%;
	width:20%;
	border:inset;
}
div.post
{
	height:15%;
	width:85%;
	border:2px solid black;
}
input.jerry
{
	height:100%;
	width:100%;
	border:2px solid black;
}
input.tom
{
	background-color:lightgray;
	position:absolute;
	right:6%;
	top:12%;
	color:#111;
}
input.tom:hover
{
	background-color:rgb(87,187,28);
}
input.comment
{
	height:15%;
	width:95%;
	background-color:lightgray;
	border:2px inset black;
}
div.para
{
	height:100%;
	width:95%;
	border:2px inset black;
}
div.commen
{
	height:20%;
	width:95%;
	border:2px inset black;
	background-color:lightgray;
}
div.reply
{
	height:10%;
	width:91%;
	border:2px inset black;
	background-color:lightgray;
	margin:4%;
}
input.comm
{
	/*position:auto;
	top:83%;
	left:85%;*/
	float:right;
		
}
body
{
	background-color:white;
}
div.appreciate
{
	height:10%;
	width:95.7%;
	background-color:#111;
	float:left;
	
}
input.look
{
	height:100%;
	width:20%;
	background-color:#111;
	border:none;
	color:white;
	float:left;
}
input.look:hover
{
	background-color:rgb(87,187,28);
}
div.comment1
{
	height:10%;
	width:95%;
}
</style>
<body>

<div class="a">
WE ARE IN TOUCH
</div>
<div class="a1">
<ul>
<li><a href="http://www.cs4u.shiksha/application/views/#/index" value="web">web</a></li>
<li><a href="https://www.youtube.com/" value="search">search</a></li>
</ul>
</div>
<div class="a2">
    hello
    {{feed}}
</div>
<div class="b">
	<div class="d">
	<h2>LOGIN</h2>
	<hr>
	user name:<input type="text" ng-model="login.UserName"></input>
	<br><br>
	password:<input type="password" ng-model="login.Password"></input>
	<br>
	<br>
	<input type="SUBMIT" ng-click="FunLogin()"></input>
	
	<h2>Registration</h2>
	<hr>
	User Name:<input type="text" ng-model="registration.UserName"></input>
	<br><br>
	First name:<input type="text" ng-model="registration.FirstName"></input>
	<br><br>
	Last name:<input type="text" ng-model="registration.LastName"></input>
	<br><br>
	date of birth:<input class="small" type="text" ng-model="registration.DOD"></input>
			<input class="small" type="text" ng-model="registration.DOM"></input>
			<input class="small" type="text" ng-model="registration.DOY"></input>
	<br><br>
	gender:<select>
	       		<option value="male">male</option>
			<option value="female">female</option>
			<option value="others">others</option>	
	       </select>
	<br>
	<br>
	<input type="SUBMIT" value="register" ng-click="FunRegistration()"></input>
	
	</div>
	<div class="e">
		<div class="post"><input class="jerry" type="text" ng-model="Post"></div>
		<br>
		<input class="tom" type="SUBMIT" ng-click="Post()" value="POST"></input>
		<div class="para"> <p>You will only succed when you fail.....................mark my words</p></div>
		<!--<input class="comment" type="text" ng-model="Comment">
		</input>
		<br>
		<input class="comm" type="SUBMIT" ng-click="Comment()" value="Comment"></input>
		<br>
		<br>
		<div class="commen">
		</div>-->
		<div class="appreciate">
			<input class="look" type="SUBMIT" ng-click="appreciated() "value="appreciated"></input>
			<input class="look" type="SUBMIT" ng-click="comment()" value="comment"></input>
			<input class="look" type="SUBMIT" ng-click="share()" value="share"></input>
		</div>
	<div class="commen">
		comments
	</div>	
	
	<div class="reply">
		reply
	</div>
	</div>
	<div class="f">
	</div>
</div>
<div class="c">
    hello
</div>
</div>
</body>
</html>