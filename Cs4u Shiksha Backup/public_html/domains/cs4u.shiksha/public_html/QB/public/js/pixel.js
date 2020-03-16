var myApp = angular.module("myApp", []);
myApp.controller('myCtrl', function($scope) {
	$scope.datas=['Ayush' , 'Aman'];
	$scope.color='blue';
});

myApp.directive('datacard', function() {
	return {
    restrict: 'E',
    transclude: 'true',
    template : '<span ng-transclude></span>',
    link: function(scope, element, attr){
          element.append("<strong>"+attr.name+"</strong>");
    	}
    };
});

myApp.directive('row', function() {
	return {
    restrict: 'E',
	transclude: true,
    template: function(element, attr){
		var arr=attr.border.split(',');
		var margin_width=attr.margin;
		var border_style;
		var border_wid;
		for(var i=0; i<=1; i++)
		{
			switch(arr[i])
			{
				case "solid":
				case "liquid":
				case "dotted": border_style=arr[i];
						break;
				default: for(var per=1; per<=100; per++)
						{
							if(per==arr[i])
							{
								border_wid=per-attr.margin;
								break;
							}
						}
			}
		}
		var border_width=(window.screen.availWidth*border_wid)/100;
		return "<div style='color:green; border-style:"+border_style+"; border-width:"+border_width+"px; margin:"+margin_width+"%'> "+border_wid+" </div>";	}
	};
});
myApp.directive('myDialog', function() {
    return {
      restrict: 'E',
      transclude: true,
	  scope: false,
      template: '<div style="color:{{color}};" ng-transclude></div>'
    };
  });