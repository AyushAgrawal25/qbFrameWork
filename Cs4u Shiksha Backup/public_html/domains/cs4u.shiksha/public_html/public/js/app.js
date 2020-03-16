angular.module('Authentication',[]);
var app=angular.module('MyApp',['ui.router','Authentication']);
app.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('index',{url:'/index',templateUrl:'registration.php',controller:'LoginCtrl'})
		.state('auth',{url:'/auth',templateUrl:'authentication.php'})
		
		$urlRouterProvider.otherwise('/index');
});