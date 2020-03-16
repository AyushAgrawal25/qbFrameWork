var myApp = angular.module("myApp", []);
myApp.controller('myCtrl', function($scope) {
	$scope.names=['Ayush' , 'Aman', 'Ankit', 'Sanskar', 'Pratik', 'Ishan'];
	$scope.color='blue'
	$scope.wid;
	$scope.response;
	$scope.data=['Ayush','Aman'];
	$scope.fval;
	$scope.functest=function()
	{
		alert($scope.firstname);
	}
});
myApp.directive('filter',filter);
filter.$inject=['$http'];
function filter($http)
{
	return {
		restrict: 'E',
		scope:{
			fvalue: "=",
			val: "="
		},
		link: function(scope,element,attr){
			scope.fval=scope.fvalue;
			var filter_data={'table':attr.table,'column':attr.column,'fcolumn':attr.fcolumn,'fvalue':scope.fvalue};
			$http({
                method:'POST',url:'filter.php',data:filter_data
                    }).then(function mySucces(response){
						scope.datas=response.data;
						alert(response.data);
                    },function myError(response){
                        alert(response.statusText);
                });
		},
		template: function(element,attr){
			return "<select ng-model=\"val\"><option ng-repeat=\"data in datas\" value={{data}}>{{data}}</option></select> {{val}}"
		}
	}
}