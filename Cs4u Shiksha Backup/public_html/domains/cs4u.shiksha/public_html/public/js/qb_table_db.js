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

//not final last seen on 23-03-19
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
           return "<input type=\"text\" ng-model=\"fdata\"> <select ng-model=\"scolumn\"><option ng-repeat=\"column in columns\" value={{column}}>{{column}}</option></select> {{scolumn}} <table><tr><th ng-repeat=\"heading in headings\">{{heading}}</th></tr> <tr ng-repeat=\"data in datas| filter:fdata| orderBy:scolumn\"><td ng-repeat=\"column in columns\">{{data[column]}}</td></tr></table>"    ;
        }
    };
}

//data estractor
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