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

//final one 23-03-19
myApp.directive('qbFilter',qbFilter);
qbFilter.$inject=['$http'];
function qbFilter($http)
{
	return {
		restrict: 'E',
		scope:{
		    val: "=",
		    fvar: "="
		},
		link: function(scope,element,attr){
		    scope.datafetch=function(fvariable){
		        if(!attr.fvalue)
		        {
		            if(fvariable)
                    {
                        if(attr.defaultSelect)
                        {
                            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:fvariable};
            		        
            	            $http({
                            method:'POST',url:'../controllers/filter.php',data:filter_data
                                }).then(function mySucces(response){
                                    angular.element(element).children().scope().responses=response.data;
                                    //alert(scope.responses);
                                },function myError(response){
                                    alert(response.statusText);
                            });
                        }
                        else
                        {
                            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:fvariable};
        		            angular.element(element).children().children().children().attr("hidden","");
        		            $http({
                            method:'POST',url:'../controllers/filter.php',data:filter_data
                                }).then(function mySucces(response){
                                    angular.element(element).children().scope().responses=response.data;
                                    if(angular.element(element).children().scope().responses)
                                    {
                                        angular.element(element).children().children().children().html("");
                                        angular.element(element).children().children().scope().val=angular.element(element).children().scope().responses[0];
                                        angular.element(element).children().scope().changefun();
                                    }
                                },function myError(response){
                                    alert(response.statusText);
                            });
                        }
                    }
                    else
                    {
                        angular.element(element).children().scope().changefun();
                    }
		        }
		    };
		    
		    scope.datadetach=function(fvariable){
		        angular.element(element).children().scope().responses="";
		        var myFilters = angular.element(document.querySelectorAll("qb-filter"));
    		    angular.forEach(myFilters, function(value, key){
    		        if(angular.element(value).attr("fetch-id")==attr.filterId)
    		        {
    		            angular.element(value).children().scope().datadetach(fvariable);
    		        }
    		    });
		    };
		    scope.changefun=function(){
		        scope.val=angular.element(element).children().children().scope().val;
		        var fvariable=angular.element(element).children().children().scope().val;
		        angular.element(element).children().scope().findfilter(fvariable);
		    };
		    scope.clickfun=function(){
		        
		    };
		    scope.findfilter=function(fvariable){
		        var myFilters = angular.element(document.querySelectorAll("qb-filter"));
    		    angular.forEach(myFilters, function(value, key){
    		        if(angular.element(value).attr("fetch-id")==attr.filterId)
    		        {
    		            //alert(angular.element(value).attr("filter-id"));
    		            if(fvariable)
    		                angular.element(value).children().scope().datafetch(fvariable);
    		            else
    		                angular.element(value).children().scope().datadetach(fvariable);
    		        }
    		    });
		    };
		    scope.dataload=function(){
		        if(attr.fvalue)
		        {
		            if(attr.defaultSelect)
        		    {
        		        //try to make default selection i got one solution .
            		    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
    		        
    		            $http({
                        method:'POST',url:'../controllers/filter.php',data:filter_data
                            }).then(function mySucces(response){
                                angular.element(element).children().scope().responses=response.data;
                            },function myError(response){
                                alert(response.statusText);
                        });
        		    }
        		    else
        		    {
        		        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
    		            angular.element(element).children().children().children().attr("hidden","");
    		            $http({
                        method:'POST',url:'../controllers/filter.php',data:filter_data
                            }).then(function mySucces(response){
                                angular.element(element).children().scope().responses=response.data;
                                if(angular.element(element).children().scope().responses)
                                {
                                    angular.element(element).children().children().children().html("");
                                    angular.element(element).children().children().scope().val=angular.element(element).children().scope().responses[0];
                                    angular.element(element).children().scope().changefun();
                                }
                            },function myError(response){
                                alert(response.statusText);
                        });
        		    }
		        }
		        else if(!attr.defaultSelect)
		        {
		            angular.element(element).children().children().children().html("");
		        }
		    };
		},
		template: function(element,attr){
	        return "<div style='padding:10px' ng-if=\"dataload\" ng-init=\"dataload()\" > <select ng-model=\"val\" ng-change=\"changefun()\"> <option value=\"\">"+attr.defaultSelect+"</option> <option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select> </div>";
		}
	}
}
//last seen on 23-03-19
myApp.directive('qbSorters',qbSorters);
qbSorters.$inject=['$http'];
function qbSorters($http)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var sorts=angular.element(element).children().children();
		    var sort1=angular.element(element).children().children().children().scope();
		    $http({
                    method:'POST',url:'../controllers/filter.php',data:sort1.filter_data
                        }).then(function mySucces(response){
		    				sort1.responses=response.data;
                        },function myError(response){
                            alert(response.statusText);
                    });
		    if(!(sort1.dSelect))
		    {
		        sort1.val=sort1.responses[0];
		    }
		    element.on(
                        "change",
                        function handleClickEvent( event ) {
                            var sort=angular.element(event.target);
                            if(sort.scope().act)
                            {
                                var sortNext=sort.parent().next().children();
                                var filter=sortNext.scope();
                                if((filter.fvar)||(filter.vartype))
                                {
                                    var filter_data={table:filter.table,column:filter.column,fcolumn:filter.fcolumn,fvalue:filter.fvar};
                                    $http({
                                        method:'POST',url:'../controllers/filter.php',data:filter_data
                                            }).then(function mySucces(response){
                    		    				sortNext.scope().responses=response.data;
                                            },function myError(response){
                                                alert(response.statusText);
                                        });
                                    if(sortNext.scope().dSelect)
                                    {
                                        sortNext.scope().val="";
                                    }
                                    else
                                    {
                                        sortNext.scope().val=sortNext.scope().responses[0];   
                                    }
                                }
                                else if(!(scope.vartype))
                                {
                                    $http({
                                        method:'POST',url:'../controllers/filter.php',data:filter.filter_data
                                            }).then(function mySucces(response){
                    		    				sortNext.scope().responses=response.data;
                                            },function myError(response){
                                                alert(response.statusText);
                                        });
                                    if(sortNext.scope().dSelect)
                                    {
                                        sortNext.scope().val="";
                                    }
                                    else
                                    {
                                        sortNext.scope().val=sortNext.scope().responses[0];   
                                    }
                                }
                            }
                        });
		    
		},
		template: function(element,attr){
		    return "<div ng-transclude > </div>";
		}
	}
 }
 
 //old qb sorters.
/*myApp.directive('qbSorters', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var sorts=angular.element(element).children().children();
		    var sort1=angular.element(element).children().children().children().scope();
		    sort1.responses=sort1.datas;
		    if(!(sort1.dSelect))
		    {
		        sort1.val=sort1.responses[0];
		    }
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var sort=angular.element(event.target);
                            if(sort.scope().act)
                            {
                                var sortNext=sort.parent().next().children();
                                sortNext.scope().responses=sortNext.scope().datas;
                                if(sortNext.scope().dSelect)
                                {
                                    sortNext.scope().val="";
                                }
                                else
                                {
                                    sortNext.scope().val=sortNext.scope().responses[0];   
                                }
                            }
                        });
		    
		},
		template: function(element,attr){
		    return "<div ng-transclude > </div>";
		}
	}
 });*/

myApp.directive('qbSorter',qbSorter);
qbSorter.$inject=['$http'];
function qbSorter($http)
{
    return {
        scope:{
		    fvar:"=",
		    val:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    scope.dSelect=attr.dSelect;
		    if(attr.fvalue)
			{
		        scope.vartype=0;
		        scope.filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
		    }
		    else
		    {
		        scope.vartype=1;
		        scope.filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.fvar};
		        scope.table=attr.table;
		        scope.column=attr.column;
		        scope.fcolumn=attr.fcolumn;
		    }
		    scope.dSelect=attr.dSelect;
		    scope.act="false";
		    scope.changefun=function(){
		        scope.act="true";
		    };
		    if(attr.dSelect)
		    {
		        scope.val="";
		    }
		    else
		    {
		        var opt=angular.element(element).children().children()[0];
		        opt.remove();
		    }
		},
		template: function(element,attr){
		    //return "<select ng-init=\"val ={{dValue}}\" ng-model=\"val\" ng-options=\"response for response in responses\" ></select>";
		    return "<select ng-change=\"changefun()\" ng-model='val'><option value=\"\">"+attr.dSelect+"</option><option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select>";
		    //return "{{datas[0]}}";
		}
	}
} 

//old qb sorter.
/*myApp.directive('qbSorter', function() {
    return {
        scope:{
		    datas:"=",
		    val:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    scope.dSelect=attr.dSelect;
		    scope.act="false";
		    scope.changefun=function(){
		        scope.act="true";
		    };
		    if(attr.dSelect)
		    {
		        scope.val="";
		    }
		    else
		    {
		        var opt=angular.element(element).children().children()[0];
		        opt.remove();
		    }
		},
		template: function(element,attr){
		    //return "<select ng-init=\"val ={{dValue}}\" ng-model=\"val\" ng-options=\"response for response in responses\" ></select>";
		    return "<select ng-change=\"changefun()\" ng-model='val'><option value=\"\">"+attr.dSelect+"</option><option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select>";
		    //return "{{datas[0]}}";
		}
	}
});*/

myApp.directive('qbFilterOld',qbFilterOld);
qbFilterOld.$inject=['$http'];
function qbFilterOld($http)
{
	return {
		restrict: 'E',
		scope:{
		    val: "=",
		    fvar: "=",
		    datas: "=",
		    responses: "="
		},
		link: function(scope,element,attr){
		    scope.fetchId=attr.fetchId;
		    scope.dSelect=attr.dSelect;
		    if(attr.dSelect)
    		{
    		    scope.val="";
    		}
    	    else
    		{
    		    var opt=angular.element(element).children().children()[0];
    		    opt.remove();
    		    scope.flag="1";
    		    if(scope.responses)
    		        scope.val=scope.responses[0];
    		}
		   
		    scope.changefun=function(){
		        if(attr.fvalue)
    			{
    		        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
    		    }
    		    else
    		    {
    		        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.val};
    		    }
    		    $http({
                    method:'POST',url:'../controllers/filter.php',data:filter_data
                        }).then(function mySucces(response){
		    				scope.datas=response.data;
		    				var myFilters = angular.element(document.querySelectorAll("qb-filter-old"));
                		    angular.forEach(myFilters, function(value, key){
                		        if((angular.element(value).children().scope().fetchId)==attr.filterId)
                		        {
                		            var myFilter=angular.element(value).children().scope();
                		            myFilter.responses=scope.datas;
                		            if(myFilter.flag)
                		            {
                		                myFilter.val=scope.datas[0];
                		            }
                		        }
                		    });
                        },function myError(response){
                            alert(response.statusText);
                    });
                
		    };
		    
		},
		template: function(element,attr){
		    return "<select ng-change=\"changefun()\" ng-model='val'><option value=\"\">"+attr.dSelect+"</option><option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select>";
		}
	}
}

/*myApp.directive('qbFilter',qbFilter);
qbFilter.$inject=['$http'];
function qbFilter($http)
{
	return {
		restrict: 'E',
		scope:{
		    val: "=",
		    fvar: "="
		},
		link: function(scope,element,attr){
		    var fvalue=attr.fvalue;
		    scope.fvalue=attr.fvalue;
		    scope.vartype=0;
			    var fvar=scope.fvar;
			    scope.table=attr.table;
			    scope.column=attr.column;
			    scope.fcolumn=attr.fcolumn;
			    if(fvalue)
			    {
			        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
			        scope.vartype=1;
			    }
			    else if(fvar)
			    {
			        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.fvar};
			        scope.vartype=2;
			    }
		    	$http({
                    method:'POST',url:'../controllers/filter.php',data:filter_data
                        }).then(function mySucces(response){
		    				scope.responses=response.data;
                        },function myError(response){
                            alert(response.statusText);
                    });
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var myFilter;
                            var myFilterN;
                            if((angular.element(event.target).parent().parent()[0].nodeName.toLowerCase())==="qb-filter")
                            {
                                var myFilter=angular.element(event.target).parent().parent();
                                if((myFilter.next())==="qb-filter")
                                {
                                    var myFilterN=myFilter.next();
                                }
                            }
                            else if((angular.element(event.target).parent()[0].nodeName.toLowerCase())==="qb-filter")
                            {
                                var myFilter=angular.element(event.target).parent();
                                if((myFilter.next())==="qb-filter")
                                {
                                    var myFilterN=myFilter.next();
                                }
                            }
                            var fScope=myFilterN.scope();
                            alert(fScope.column);
                            if(fScope.vartype===1)
            			    {
            			        var filter_Data={table:fScope.table,column:fScope.column,fcolumn:fScope.fcolumn,fvalue:fScope.fvalue};
            			    }
            			    else if(fScope.vartype===2)
            			    {
            			        var filter_Data={table:fScope.table,column:fScope.column,fcolumn:fScope.fcolumn,fvalue:fScope.fvar};
            			    }
            		    	$http({
                                method:'POST',url:'../controllers/filter.php',data:filter_Data
                                    }).then(function mySucces(response){
            		    				fScope.responses=response.data;
                                    },function myError(response){
                                        alert(response.statusText);
                                });
                            
                    });
		},
		template: function(element,attr){
	        return "<div style='padding:10px'> <select ng-model='val'><option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select> </div>";
		}
	}
}*/

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
		    var fvalue=attr.fvalue;
		    scope.fvalue=attr.fvalue;
		    scope.vartype=0;
			    var fvar=scope.fvar;
			    scope.table=attr.table;
			    scope.column=attr.column;
			    scope.fcolumn=attr.fcolumn;
			    if(fvalue)
			    {
			        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
			        scope.vartype=1;
			    }
			    else if(fvar)
			    {
			        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.fvar};
			        scope.vartype=2;
			    }
		    	$http({
                    method:'POST',url:'../controllers/filter.php',data:filter_data
                        }).then(function mySucces(response){
		    				scope.responses=response.data;
                        },function myError(response){
                            alert(response.statusText);
                    });
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
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var myFilters=angular.element(event.target).parent().parent().children();
                            angular.forEach(myFilters, function(value, key){
                                if(angular.element(value).hasClass("filter"))
                                {
                                    var myFilter=angular.element(value).children().scope();
                                    if(myFilter.vartype===1)
                                    {
                    			        var filter_Data={table:myFilter.table,column:myFilter.column,fcolumn:myFilter.fcolumn,fvalue:myFilter.fvalue};
                    			        $http({
                                        method:'POST',url:'../controllers/filter.php',data:filter_Data
                                            }).then(function mySucces(response){
                    		    				alert(response.data);
                                            },function myError(response){
                                                alert(response.statusText);
                                        });
                                    }
                    			    else if(myFilter.vartype===2)
                    			    {
                    			        var filter_Data={table:myFilter.table,column:myFilter.column,fcolumn:myFilter.fcolumn,fvalue:myFilter.fvar};
                    			        $http({
                                        method:'POST',url:'../controllers/filter.php',data:filter_Data
                                            }).then(function mySucces(response){
                    		    				alert(response.data);
                                            },function myError(response){
                                                alert(response.statusText);
                                        });
                    			    }
                                }
                            });/**/
                            return;
                });
		},
		template: function(element,attr){
	        return "<select ng-model='val'><option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select>"
		}
	}
}