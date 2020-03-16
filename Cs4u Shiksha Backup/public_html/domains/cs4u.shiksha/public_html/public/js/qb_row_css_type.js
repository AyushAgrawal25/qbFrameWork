var myApp = angular.module("myApp", ['ngMessages']);
myApp.controller('myCtrl', function($scope) {
    $scope.data1=["ayush","ishan","aman"];
    $scope.datas;
    $scope.data2=["aman","raj","sanskar"];
	$scope.functest=function()
	{
		alert($scope.firstname);
	}
	$scope.combo=function()
	{
	    return $scope.datas
	}
	$scope.myClick=function(data)
	{
	   $scope.value=data;
	}
	$scope.element;
	
});

myApp.service('qbBasics',function(){
    this.classCons= function (classes) {
        var allClass=classes.split(',');
        var classL="";
        var k=0;
        angular.forEach(allClass, function(value, key){
            if(!(classL))
                classL=allClass[k];
            else
                classL=classL+" "+allClass[k];
            k++;
        });
        return classL;
    }
    this.findParent=function(pElement,pName){
        var par=pElement.parent();
        var con=true;
        var reqElement;
        while(con)
        {
            if((par[0].nodeName)===pName)
            {
                reqElement=par;
                con=false;
            }
            else if((par[0].nodeName)==="BODY")
            {
                con=false;
                reqElement=undefined;
            }
            else
                par=par.parent();
        }
        if(reqElement===undefined)
            alert("Undefined Parent Name");
        return reqElement;
    }
    this.findChildren=function(cElement,cName){
        var child=cElement.children();
        var reqChildren=[];
        var con=true;
        var found=false;
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                var j=0;
                angular.forEach(child, function(value, key){
                    if((angular.element(value)[0].nodeName)===(cName.toUpperCase()))
                    {
                        reqChildren[i]=child[j];
                        i++;
                        found=true;
                    }
                    j++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();    
                }
            }
            else
            {
                con=false;
                //alert("Undefined Children NodeName");
            }
        }
        return reqChildren;
    }
    this.findElement=function(eName){
        var qbContainer=angular.element(document.querySelector(eName));
        var con=true;
        var found=false;
        var reqElement;
        /*var child=qbContainer.children();
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                angular.forEach(child, function(value, key){
                    if((angular.element(value)[0].nodeName)===(eName.toUpperCase()))
                    {
                       reqElement=child[i];
                        found=true;
                    }
                    i++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();    
                }
            }
            else
            {
                con=false;
                alert("Undefined Element NodeName");
            }
        }*/
        return qbContainer;
    }
    
    this.findQbChildren=function(eObject){
        var child=eObject.children();
        var reqChildren=[];
        var con=true;
        var found=false;
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var i=0;
                var j=0;
                angular.forEach(child, function(value, key){
                    var childName=angular.element(value)[0].nodeName;
                    if(((childName[0])==="Q")&&((childName[1])==="B")&&((childName[2])==="-"))
                    {
                        reqChildren[i]=child[j];
                        i++;
                        found=true;
                    }
                    j++;
                });
                if(found)
                {
                    con=false;
                }
                else
                {
                    child=child.children();    
                }
            }
            else
            {
                con=false;
                //alert("Undefined Children NodeName");
            }
        }
        return reqChildren;
    }
});

//last seen on 23-03-19
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