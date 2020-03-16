'use strict';
angular.module('Authentication')
 
.controller('LoginCtrl',
    ['$scope','$http','$location',
    function ($scope,$http,$location) {
        $scope.testing={'transitiontype':'Registration11'}
        $scope.registration={'transitiontype':'Registration'}
        $scope.login={'transitiontype':'Login'}
        $http({
                method:'POST',url:'../controllers/authentication.php',data:$scope.testing
                    }).then(function mySucces(response){
                        $scope.testing=response.data;
                        //alert(JSON.stringify(response.data));
                    },function myError(response){
                        alert(response.statusText);
                });
        $scope.FunRegistration=function()
        {
            //alert(JSON.stringify($scope.registration));
             $http({
                method:'POST',url:'../controllers/authentication.php',data:$scope.registration
                    }).then(function mySucces(response){
                        //$scope.result=response.data;
                        alert(JSON.stringify(response.data));
                    },function myError(response){
                        alert(response.statusText);
                });
                
        }
        $scope.FunLogin=function()
        {
             $http({
                method:'POST',url:'../controllers/authentication.php',data:$scope.login
                    }).then(function mySucces(response){
                       if(response.data==1)
                       {
	                        alert("valid user")
                       }
                       else
                       {
	                        alert("bhag jaa")
                       }
                       
                       //alert(JSON.stringify(response.data));
                    },function myError(response){
                        alert(response.statusText);
                });
        }

}]);