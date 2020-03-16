<html>
<head>
<title>
Registration
</title>
</head>
<style>
div.a
{
	height:100%;
	width:100%;
	border:2px solid black;
	font-family:algerian;
	text-align:center;
	font-size:70%;
	background-color:lightgray;
}
input
{
	border:inset;
}
input.dob
{
	height:3.5%;
	width:3.5%;
}
</style>
<body>
    <pre>
    {{testing}}
    </pre>
<div class="a">
<h1>registration<h1>
<hr>


Username:<input type="text" ng-model="registration.UserName"></input>
<br>
<br>
Password:<input type="password" ng-model="registration.Password"></input>
<br><br>
First name:<input type="text" ng-model="registration.FName"></input>
<br><br>
Last name:<input type="text" ng-model="registration.LName"></input>
<br><br>
Date of birth:
<input class="dob" type="text"ng-model="registration.DOD"></input>
<input class="dob" type="text" ng-model="registration.DOM"></input>
<input class="dob" type="text" ng-model="registration.DOY"></input>
<br><br>
Gender:<input type="text" ng-model="registration.Gender"></input>
<br><br>
<input type="SUBMIT" ng-click="FunRegistration()" value="Register">
<hr>
User Name:<input type="text" ng-model="login.UserName">
<br>
<br>
Password:<input type="text" ng-model="login.Password">
<br>
<br>
<input type="SUBMIT" ng-click="FunLogin()" value="Login">
</div>
</body>
</html>