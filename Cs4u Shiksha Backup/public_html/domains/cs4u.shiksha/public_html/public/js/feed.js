var app=angular.module("MyApp",[]);
	app.controller("MyCtrl",function($scope,$rootScope,$http){
		$scope.hello="Hiii";
	
	          $http({
                method:'GET',url:'../controllers/feed.php'
                    }).then(function mySucces(response){
                        //$scope.feed=response.data;
                        $scope.feed=response.data;
                        //alert(JSON.stringify(response.data));
                    },function myError(response){
                        alert(response.statusText);
                });
	});
	