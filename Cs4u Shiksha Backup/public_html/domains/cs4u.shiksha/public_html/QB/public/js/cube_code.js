var myApp = angular.module("myApp", []);
myApp.controller('myCtrl', function($scope) {
	$scope.names=['Ayush','Ayush','Ayush','Ayush'];
	$scope.color=5;
	$scope.wid;
	$scope.heading={};
	$scope.columns={};
	$scope.responses;
	$scope.filter_data;
	$scope.datas={};
	$scope.fval;
	$scope.val;
	$scope.firstname=12;
	$scope.functest=function()
	{
		alert($scope.firstname);
	}
	$scope.combo=function()
	{
	    return $scope.datas
	}
	$scope.element;
	
});
myApp.directive('tabledb',tabledb)
tabledb.$inject=['$http'];
function tabledb($http)
{
    return {
        restrict: 'E',
        scope:{
            datas: "="    
        },
        link: function(scope,element,attr){
            scope.datas="hello";
            scope.columns=attr.columns.split(',');
            scope.headings=attr.headings.split(',');
            var filter_data={table:attr.table};
            $http({
                method:'POST',url:'../controllers/tabledb.php',data:filter_data
                        }).then(function mySucces(response){
		    				scope.datas=response.data;
                        },function myError(response){
                            alert(response.statusText);
            });
        },
        template: function(element,attr){
           return "<table><tr><th ng-repeat=\"heading in headings\">{{heading}}</th></tr> <tr ng-repeat=\"data in datas\"><td ng-repeat=\"column in columns\">{{data[column]}}</td></tr></table>"    ;
        }
    };
}

myApp.directive('filter',filter);
filter.$inject=['$http'];
function filter($http)
{
	return {
		restrict: 'E',
		scope:{
		    val: "=",
		    fvar: "="
		},
		link: function(scope,element,attr){
			element.bind("click",function(){
			    var fvalue=attr.fvalue;
			    var fvar=scope.fvar;
			    if(fvalue)
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
			    else if(fvar)
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.fvar};
		    	$http({
                    method:'POST',url:'../controllers/filter.php',data:filter_data
                        }).then(function mySucces(response){
		    				scope.responses=response.data;
                        },function myError(response){
                            alert(response.statusText);
                    });
		    });
		},
		template: function(element,attr){
	        return "<select ng-model='val'><option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select>"
		//return "{{responses}} "
		}
	}
}


myApp.directive('dp',dp);
dp.$inject=['$http'];
function dp($http)
{
	return {
		restrict: 'E',
		scope:{
		    data: "=",
		    fvar: "="
		},
		link: function(scope,element,attr){
			    var fvalue=attr.fvalue;
			    var fvar=scope.fvar;
			    scope.responses=00;
			    if(fvalue)
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
			    else if(fvar)
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.fvar};
		    	$http({
                    method:'POST',url:'../controllers/filter.php',data:filter_data
                        }).then(function mySucces(response){
		    				scope.data=response.data;
                        },function myError(response){
                            alert(response.statusText);
                    });
		}
	}
}
myApp.directive('regexp',function(){
	return {
		restrict: 'E',
		scope:{},
		transclude:true,
		link: function(scope,element,attr){
		   element.bind("click",function(){
			    var str = scope.val;
				var patt = new RegExp(attr.exp);
				var res = patt.test(str); 
				alert(res);
		   });
		},
		template: function(element,attr){
		    return "<input type=\"text\" ng-model=\"val\"> {{val}}"
		}
	};
});
myApp.directive('datacard', function() {
	return {
		restrict: 'E',
		transclude: 'true',
		link: function(scope, element, attr){
		       element.bind("click", function(){
		       scope.color++; 
		       alert(scope.color);
		       scope.wid=element.parent()[0].offsetWidth;
			   scope.temp=scope.name;
			   scope.variable=0;
		    });
		},
		replace: 'true',
		template : function(element,attr){
    		return "<div style='color:{{color}}; border:20px; border-style:solid;'> ayush {{color}} </div>"
		}
    };
});

myApp.directive('jqtest', function() {
	return {
		restrict: 'E',
		transclude: "true",
		link: function(scope,element,attr){
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var myElement = angular.element(document.querySelectorAll(".a2"));
                            angular.forEach(myElement, function(value, key){
                                 angular.element(value)
                                 .removeClass("a2")
                                 .addClass("a1");
                            });
                            var ele=angular.element(event.target);
                            ele.removeClass("a1").addClass("a2");
                            //alert(myElement);
                             /*if ( angular.element(event.target).is( "jqtest" ) ) {
                            }*/
                            return;
                });
		},
		template : function(element,attr){
    		return "<div class=\"a2\" ng-transclude></div>";
		}
    };
});
myApp.directive('acc', function() {
	return {
		restrict: 'E',
		transclude: "true",
		link: function(scope,element,attr){
		    element.on(
                        "mouseover",
                        function handleClickEvent( event ) {
                            var myElement = angular.element(document.querySelectorAll(".accordion"));
                            angular.forEach(myElement, function(value, key){
                                 angular.element(value)
                                 .removeClass("accordion")
                                 .addClass("accordionh");
                            });
                            
                            var ele=angular.element(event.target);
                            ele.removeClass("accordionh").addClass("accordion");
                            //alert(myElement);
                             /*if ( angular.element(event.target).is( "jqtest" ) ) {
                            }*/
                            return;
                });
		},
		template : function(element,attr){
    		return "<div class=\"a1\" ng-transclude></div>";
		}
    };
});
myApp.directive('row', function() {
	return {
		scope: {
			functest:"&"
		},
		transclude: true,
		link: function(scope,element,attr){
			scope.wid=element.parent()[0].offsetWidth;
			var width=0;
			var arr=attr.border.split(',');
			var margin_width=attr.margin;
			var padding_width=attr.padding;
			for(var i=0; i<=1; i++)
			{
				switch(arr[i])
				{
					case "solid":
					case "liquid":        
					case "dotted": scope.border_style=arr[i];
							break;
					default: for(var per=1; per<=100; per++)
							{
								if(per==arr[i])
								{
									var width=per;
									scope.border_wid=per;
									width=width+attr.margin;
									width=width+attr.padding;
									break;
								}
							}
				}
			}
			scope.border_width=(scope.wid*scope.border_wid)/100;
			scope.margin_width=attr.margin;
			scope.padding_width=attr.padding;
			scope.div_width=100-width;	
			//element.bind('mouseover',function () {
            //        alert('You clicked me');
			//     });
			//element.append("<strong>{{fval}}</strong>");
			element.bind("click",function(){
				scope.functest();
			});
		},
		template: function(element,attr){
			return "<div class="+attr.class+" style='color:green; width:{{div_width}}px; border-style:{{border_style}}; border-width:{{border_width}}px; margin:{{margin_width}}%; padding:{{padding_width}}%' ng-transclude>{{border_wid}} , {{margin_width}}, {{padding_width}} </div>";
		}
	}
});
myApp.directive('myDialog', function() {
    return {
		scope: {
			color: "@"
		},
		transclude: true,
		link: function(scope,element,attr){
			scope.wid=element.parent()[0].offsetWidth;
			var width=0;
			var arr=attr.border.split(',');
			var margin_width=attr.margin;
			var padding_width=attr.padding;
			for(var i=0; i<=1; i++)
			{
				switch(arr[i])
				{
					case "solid":
					case "liquid":
					case "dotted": scope.border_style=arr[i];
							break;
					default: for(var per=1; per<=100; per++)
							{
								if(per==arr[i])
								{
									var width=per;
									scope.border_wid=per;
									width=width+attr.margin;
									width=width+attr.padding;
									break;
								}
							}
				}
			}
			scope.border_width=scope.wid*scope.border_wid/100;
			scope.margin_width=attr.margin;
			scope.padding_width=attr.padding;
			scope.div_width=100-width;
			//element.append("<strong> {{firstname}} </strong>");
		},
		template: function(element,attr){
			return "<div class="+attr.class+" style='color:green; width:{{div_width}}px; border-style:{{border_style}}; border-width:{{border_width}}px; margin:{{margin_width}}%; padding:{{padding_width}}%' ng-transclude>{{border_wid}} , {{margin_width}}, {{padding_width}} {{div_width}} {{color}} </div>";
		}
	}
  });