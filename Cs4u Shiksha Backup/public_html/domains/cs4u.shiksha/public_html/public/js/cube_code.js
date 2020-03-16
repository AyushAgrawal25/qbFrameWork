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
	    alert("working");
	};
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
            if((par[0].nodeName)===(pName.toUpperCase()))
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
    this.isQbType=function(eName){
        var eleName=angular.element(eName)[0].nodeName;
        if(((eleName[0])==="Q")&&((eleName[1])==="B")&&((eleName[2])==="-"))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    this.findElement=function(eName){
        width=angular.element(eName).children()[0].offsetWidth;
        
    }
    
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
           return "<input type=\"text\" ng-model=\"fdata\"> <select ng-model=\"scolumn\"><option ng-repeat=\"column in columns\" value={{column}}>{{column}}</option></select> {{scolumn}} <table><tr><th ng-repeat=\"heading in headings\">{{heading}}</th></tr> <tr ng-repeat=\"data in datas| filter:fdata| orderBy:scolumn\"><td ng-repeat=\"column in columns\">{{data[column]}}</td></tr></table>"    ;
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
		   scope.func=function(){
		       alert("called");
			    var str = scope.val;
				var patt = new RegExp(attr.exp);
				var res = patt.test(str); 
				alert(res);
		   };
		},
		template: function(element,attr){
		    return "<input type=\"text\" ng-model=\"val\" ng-keyup=\"func()\"> {{val}}"
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

myApp.directive('qbAcc', function() {
	return {
		restrict: 'E',
		transclude: "true",
		link: function(scope,element,attr){
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var accordion=angular.element(event.target);
							if((accordion.hasClass("accordion"))&&((accordion.parent().parent()[0].nodeName.toLowerCase())==="accordions"))
							{
								var children=accordion.children();
								var classval=0;
								angular.forEach(children, function(value, key){
									if(angular.element(value).hasClass("content-close"))
										classval=1;
									else if(angular.element(value).hasClass("content-open"))
										classval=2;
								});
								var accordions=accordion.parent().parent().children();
								angular.forEach(accordions, function(val1, key){
									var accs=angular.element(val1).children();
									angular.forEach(accs, function(val2,key){
									   var accord=angular.element(val2).children();
    								   angular.forEach(accord, function(val3,key1){
    								        if(angular.element(val3).hasClass("content-open"))
    										    angular.element(val3).removeClass("content-open").addClass("content-close");
			    						});
		    						});
                                });
								if(classval===1)
								{
    							    var child=accordion.children();
    							    angular.forEach(child, function(value, key){
    							        if(angular.element(value).hasClass("content-close"))
    							            angular.element(value).removeClass("content-close").addClass("content-open");
    							    });
    							}
    	                    }
    	                    else if((accordion.parent().hasClass("accordion"))&&(accordion.hasClass("accordion-header"))&&((accordion.parent().parent().parent()[0].nodeName.toLowerCase())==="accordions"))
    	                    {
    	                        var children=accordion.parent().children();
								var classval=0;
								angular.forEach(children, function(value, key){
									if(angular.element(value).hasClass("content-close"))
										classval=1;
									else if(angular.element(value).hasClass("content-open"))
										classval=2;
								});
								var accordions=accordion.parent().parent().parent().children();
								angular.forEach(accordions, function(val1, key){
									var accs=angular.element(val1).children();
									angular.forEach(accs, function(val2,key){
									   var accord=angular.element(val2).children();
    								   angular.forEach(accord, function(val3,key1){
    								        if(angular.element(val3).hasClass("content-open"))
    										    angular.element(val3).removeClass("content-open").addClass("content-close");
			    						});
		    						});
                                });
								
								if(classval===1)
								{
    							    var child=accordion.parent().children();
    							    angular.forEach(child, function(value, key){
    							        if(angular.element(value).hasClass("content-close"))
    							            angular.element(value).removeClass("content-close").addClass("content-open");
    							    });
    							}
    	                    }
    	                    else if((accordion.parent().parent().hasClass("accordion"))&&((accordion.parent().parent().parent().parent()[0].nodeName.toLowerCase())==="accordions"))
    	                    {
    	                        var children=accordion.parent().parent().children();
								var classval=0;
								angular.forEach(children, function(value, key){
									if(angular.element(value).hasClass("content-close"))
										classval=1;
									else if(angular.element(value).hasClass("content-open"))
										classval=2;
								});
								var accordions=accordion.parent().parent().parent().parent().children();
								angular.forEach(accordions, function(val1, key){
									var accs=angular.element(val1).children();1
									angular.forEach(accs, function(val2,key){
									   var accord=angular.element(val2).children();
    								   angular.forEach(accord, function(val3,key1){
    								        if(angular.element(val3).hasClass("content-open"))
    										    angular.element(val3).removeClass("content-open").addClass("content-close");
			    						});
		    						});
                                });
								
								if(classval===1)
								{
    							    var child=accordion.parent().parent().children();
    							    angular.forEach(child, function(value, key){
    							        if(angular.element(value).hasClass("content-close"))
    							            angular.element(value).removeClass("content-close").addClass("content-open");
    							    });
    							}    
    	                    }
							return;
                });
		},
		template : function(element,attr){
    		return "<div class=\"accordion \"><div class=\"accordion-header\"> <span class=\"accordion-heading\">"+attr.heading+"</span> <span class=\"icon-close\">+</span> </div><div class=\"content-close\" ng-transclude></div></div>";
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

myApp.directive('qbIconBar', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.icons=attr.icons.split(',');  
		},
		template: function(element,attr){
		    return "<div class=\"icon-bar\"><a ng-repeat=\"icon in icons\" href=\"#\"><i class=\"fa fa-{{icon}}\"></i></a> </div>";
		}
	}
  });
  
/*myApp.directive('qbTabs', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var valu=0;
		    scope.headings=[];
		    scope.tabFlag=0;
		    angular.element(element).scope().tabFlag=0;
		    //alert(angular.element(element).scope().tabFlag);
		    var tabsP=angular.element(element).children();
		    angular.forEach(tabsP, function(val2, key){
	            if(!(angular.element(val2).hasClass("tabs")))
                {
                    var tabs=angular.element(val2).children();
	                angular.forEach(tabs, function(val3, key){
	                    scope.headings.push(angular.element(val3).children().scope().heading);
		          });
	            }
	        });
	        element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var head=angular.element(event.target).scope().heading;
                            var tabsP=angular.element(element).children();
            		        angular.forEach(tabsP, function(val2, key){
            	                if(!(angular.element(val2).hasClass("tabs")))
                                {
                                    var tabs=angular.element(val2).children();
            	                    angular.forEach(tabs, function(val3, key){
            	                        var tab=angular.element(val3).children();
            	                        if((angular.element(val3).children().scope().heading)===head)
            	                            {
            	                                if(tab.hasClass("tabContentClose"))
                	                            tab.removeClass("tabContentClose").addClass("tabContentOpen");
            	                            }
            	                        else
            	                        {
            	                            tab.removeClass("tabContentOpen").addClass("tabContentClose");
            	                        }
            		                 });
            	                }
            	           });      
                        });
		},
		template: function(element,attr){
		    return "<div class=\"tabs\"> <div ng-repeat=\"heading in headings\" class=\"tab\">{{heading}}</div> </div> <div ng-transclude ></div>";
		}
	}
  });
  
myApp.directive('qbTab', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		        scope.heading=attr.heading;
		        scope.class="tabContentClose";
		        scope.val=5;
		        var valu=0;
		        var defs=angular.element(element).parent().parent().children().children().children();
		        angular.forEach(defs, function(val3, key){
                    if(valu==0)
	                {
	                    angular.element(val3).scope().class="tabContentOpen";
		                valu++;
		            }
		        });
		    },
		template: function(element,attr){
		    return "<div ng-transclude class={{class}}></div>";
		}
	}
});*/

myApp.directive('qbTabs',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.initclass=function(classes,heading){
		        //alert(heading+classes);
		    };
		    
		    scope.headings=[];
		    scope.headClasses=[];
		    var rt=1;
		    var headings=[];
		    var defHeading;
    		var child=qbBasics.findChildren(angular.element(element),"QB-TAB");
		    var headingEles=qbBasics.findChildren(angular.element(element),"qb-tab-heading");
		    var int1=0;
		    angular.forEach(angular.element(headingEles), function(value, key){
		        scope.headings.push(angular.element(value).children().html());
		        headings[int1]=angular.element(value).children().html();
		        if(angular.element(value).attr("classes"))
		        {
		            var tabHclass=qbBasics.classCons(angular.element(value).attr("classes"));
		            scope.headClasses.push(tabHclass);
		        }
		        else
		        {
		            scope.headClasses.push("nothing");
		        }
		        int1++;
		    });
		    
		    //find def heading
		    angular.forEach(child, function(value, key){
		        if((angular.element(value).attr("default"))&&(rt))
		        {
		            var tabHead=qbBasics.findChildren(angular.element(value),"qb-tab-heading");
		            defHeading=angular.element(tabHead).children().html();
		            angular.element(value).children().css("display","block");
		            rt=0;
		        }
		        else
		        {
		            angular.element(value).children().css("display","none");
		        }
		    });
		    if(rt)
		    {
		        angular.forEach(child, function(value, key){
		            if(rt)
		            {
		                var tabHead=qbBasics.findChildren(angular.element(value),"qb-tab-heading");
		                defHeading=angular.element(tabHead).children().html();
		                angular.element(value).children().css("display","block");
		                rt=0;
		            }
		        });    
		    }
		    
		    scope.tabopen=function(heading){
		        var i=0;
		        var childHead=angular.element(element).children().children();
		        angular.forEach(childHead, function(value, key){
		            if(angular.element(value).hasClass("qb-tab-heading"))
    		        {
    		            if(scope.headings[i]===heading)
    		            {
    		                angular.element(value).addClass("qb-tab-heading-active");
    		            }
    		            else
    		            {
    		                angular.element(value).removeClass("qb-tab-heading-active");
    		            }
    		        }
    		        i++;
    		    });
    		    var contents=qbBasics.findChildren(angular.element(element),"qb-tab-content");
		        angular.forEach(child, function(value, key){
		            var tabHeading=angular.element(qbBasics.findChildren(angular.element(value),"qb-tab-heading")).children().html();
    		        if(tabHeading===heading)
    		        {
    		            angular.element(value).children().scope().tabopen();
    		        }
    		        else
    		        {
    		            angular.element(value).children().scope().tabclose();
    		        }
    		    });
		    };
		    
		    scope.loadfun=function(heading){
		        var i=0;
		        var childHead=angular.element(element).children().children();
		        angular.forEach(childHead, function(value, key){
		            if(angular.element(value).hasClass("qb-tab-heading"))
    		        {
    		            if(scope.headings[i]===defHeading)
    		            {
    		                angular.element(value).addClass("qb-tab-heading-active");
    		            }
    		        }
    		        i++;
    		    });
    		    
    		    var j=0;
    		    angular.forEach(childHead, function(value, key){
		            if(angular.element(value).hasClass("qb-tab-heading"))
    		        {
    		            if(scope.headings[j]===heading)
    		            {
    		                angular.element(value).html(scope.headings[j]);
    		                if(scope.headClasses[j]!="nothing")
    		                {
    		                    var headEleClass=scope.headClasses[j];
    		                    angular.element(value).addClass(headEleClass);
    		                }
    		            }
    		        }
    		        j++;
    		    });
    		    angular.element(element).children().children().append("<div style=\"clear:both\"></div>");
		        //alert(angular.element(element).children()[0].offsetHeight);
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tabs\"> <div ng-repeat=\"heading in headings\" class=\"qb-tab-heading ng-isolate-scope ng-scope\" ng-click=\"tabopen(heading)\" ng-init=\"loadfun(heading)\"></div> </div> <div style=\"clear:both\"></div> <div class=\"nothing\" ng-transclude ></div>";
		}
	}
}]);
myApp.directive('qbTab',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.tabopen=function(){
		        angular.element(element).children().css("display","block");
		    };
		   
		    scope.tabclose=function(){
		        angular.element(element).children().css("display","none");
		    };
		    angular.element(element).children().children().append("<div style=\"clear:both\"></div>");
		},
		template: function(element,attr){ 
		    return "<div ng-transclude class=\"qb-tab\"></div>";
		}
	}
}]);
myApp.directive('qbTabHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
	        
		},
		template: function(element,attr){ 
		    return "<div style=\"display:none;\" ng-init=\"initfun()\" ng-transclude></div>";
		}
	}
}]);
myApp.directive('qbTabContent',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-content\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbMenus', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var menusP=angular.element(element).children();
		    angular.forEach(menusP, function(val1, key){
		        if(angular.element(val1).hasClass("sideNavClose"))
		        {
		            angular.element(val1).prepend("<a href=\"javascript:void(0)\" class=\"closebtn\">&times; </a>");
		        }
		    });
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var btn=angular.element(event.target);
                            var menusP=angular.element(element).children();
                            if(btn.hasClass("openbtn"))
                            {
                                btn.next().addClass("sideNavOpen").removeClass("sideNavClose");
                            }
                            else if(btn.hasClass("closebtn"))
                            {
                    		    angular.forEach(menusP, function(val1, key){
                    		        if(angular.element(val1).hasClass("sideNavOpen"))
                    		        {
                    		            angular.element(val1).addClass("sideNavClose").removeClass("sideNavOpen");
                    		        }
                    		    });   
                            }
                        });
		},
		template: function(element,attr){
		    return "<span class=\"openbtn\">&#9776; open</span> <div class=\"sideNavClose\" ng-transclude> </div>";
		}
	}
  });
/*myApp.directive('qbMenu', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.menu=attr.menu;          
		},
		template: function(element,attr){
		    return "<a href="+attr.link+">"+attr.name+"</a>";
		}
	}
 });*/
 myApp.directive('qbTopNavBar', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var navsP=angular.element(element).children();
		    angular.forEach(navsP, function(val1, key){
		        if(angular.element(val1).hasClass("topnav"))
		        {
		            angular.element(val1).append("<a href=\"javascript:void(0);\" class=\"icon\"><i class=\"fa fa-bars\"></i></a>");
		        }
		    });
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var openbtn=angular.element(event.target);
                            if(openbtn.hasClass("icon"))
                            {
                                angular.element(element).children()[0].addClass("responsive");
                            }
                        });
		    
		},
		template: function(element,attr){
		    return "<div class=\"topnav\" ng-transclude ></div> <a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\"><i class=\"fa fa-bars\"></i></a>";
		}
	}
 });
 myApp.directive('qbTopNav', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.menu=attr.menu;          
		},
		template: function(element,attr){
		    return "<a href="+attr.link+"><i class=\"fa fa-fw fa-"+attr.name+"\"></i> "+attr.name+"</a>";
		}
	}
 });
/*myApp.directive('qbModal', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var btn=angular.element(event.target);
                            if(btn.hasClass("modal-btn-open"))
                            {
                                var modal=btn.next();
                                if(modal.hasClass("modal-close"))
                                {
                                    modal.addClass("modal-open").removeClass("modal-close");
                                }
                            }
                            else if(btn.hasClass("modal-btn-close"))
                            {
                                var modal=btn.parent().parent();
                                if(modal.hasClass("modal-open"))
                                {
                                    modal.addClass("modal-close").removeClass("modal-open");
                                }
                            }
                        });
		},
		template: function(element,attr){
		    return "<span class=\"modal-btn-open\"> Open Modal </span> <div class=\"modal-close\"> <div class=\"modal-content\"> <span class=\"modal-btn-close\">&times;</span> <p>Some text in the Modal..</p> </div> </div>";
		}
	}
 });  */
myApp.directive('qbModal', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    element.on(
                        "click",
                        function handleClickEvent( event ) {
                            var btn=angular.element(event.target);
                            if((btn[0].nodeName)=="BUTTON")
                            {
                                var modal=btn.next();
                                if(modal.hasClass("modal-close"))
                                {
                                    modal.addClass("modal-open").removeClass("modal-close");
                                }
                            }
                            else if(btn.hasClass("modal-btn-close"))
                            {
                                var modal=btn.parent().parent();
                                if(modal.hasClass("modal-open"))
                                {
                                    modal.addClass("modal-close").removeClass("modal-open");
                                }
                            }
                        });
		},
		template: function(element,attr){
		    return "<button> Open Modal </button> <div class=\"modal-close\"> <div class=\"modal-content\"> <span class=\"modal-btn-close\">&times;</span> <p ng-transclude></p> </div> </div>";
		}
	}
 });
 
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

myApp.directive('qbAutoComplete',qbAutoComplete)
qbAutoComplete.$inject=['$http'];
function qbAutoComplete($http)
{
    return {
        scope:{
		    val: "<",
		    fvar: "="
		},
		transclude: true,
		link: function(scope,element,attr){
		    var fvalue=attr.fvalue;
			var fvar=scope.fvar;
			if(fvalue)
			{
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
			}
			else if(fvar)
			{
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.fvar};
		    }
		    $http({
                method:'POST',url:'../controllers/filter.php',data:filter_data
                    }).then(function mySucces(response){
		    			scope.responses=response.data;
                    },function myError(response){
                        alert(response.statusText);
                });
            scope.loadfun=function(){
                var divs=angular.element(element).children().children();
                angular.forEach(divs, function(val1, key){
		            if(angular.element(val1).hasClass("ac-div-close"))
		            {
		                var divopt=angular.element(val1);
		                divopt.addClass("ac-div").removeClass("ac-div-close");
		            }
		        });
            };
            scope.unloadfun=function(){
                var divs=angular.element(element).children().children();
                angular.forEach(divs, function(val1, key){
		            if(angular.element(val1).hasClass("ac-div"))
		            {
		                var divopt=angular.element(val1);
		                divopt.addClass("ac-div-close").removeClass("ac-div");
		            }
		        });
            };
            scope.testfun=function(){
                alert("hfjkfgks");
            };
            scope.clickfun=function(response){
                scope.val=response;
                var divs=angular.element(element).children().children();
                angular.forEach(divs, function(val1, key){
		            if(angular.element(val1).hasClass("ac-div"))
		            {
		                var divopt=angular.element(val1);
		                divopt.addClass("ac-div-close").removeClass("ac-div");
		            }
		        });
            };
		},
		template: function(element,attr){
		    return "<span class=\"autoComplete\" ng-blur=\"unloadfun()\"> <input class=\"ac-textbox\" type=\"text\" ng-model=\"val\" ng-keypress=\"loadfun()\" ><div class=\"ac-div-close\" ng-repeat=\"response in responses| filter:val\" ng-click=\"clickfun(response)\">{{response}}</div> </span>";    
		}
	};
}

myApp.directive('qbFilter',qbFilter);
qbFilter.$inject=['$http'];
function qbFilter($http)
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
		    				var myFilters = angular.element(document.querySelectorAll("qb-filter"));
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

/*myApp.directive('qbRow', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var win = angular.element(window);
		    var height=0;
		    scope.heights=[];
		    var childs=angular.element(element).children().children();
		    angular.forEach(childs, function(value, key){
		        scope.heights.push(angular.element(value)[0].offsetHeight);
		    });
		   if(window.innerWidth>600)
		   {
		       angular.forEach(childs, function(value, key){
    		        var height2=angular.element(value)[0].offsetHeight;
    		        if(height<height2)
    		            height=height2;
    		    });
		       
		       angular.forEach(childs, function(val, key){
        	       angular.element(val).css('height',height+'px');
        	    }); 
		    }
		    
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            var some=0;
		            var j=0;
		            angular.forEach(childs, function(val, key){
		                var oldHeight=scope.heights[j];
            	        angular.element(val).css('height',oldHeight + 'px');
            	        j++;
            	    });
		        }
		        else if(scWidth>600)
		        {
		            angular.forEach(childs, function(value, key){
        		        var height2=angular.element(value)[0].offsetHeight;
        		        if(height<height2)
        		            height=height2;
        		    });
		            
		            angular.forEach(childs, function(val, key){
            	       angular.element(val).css('height',height+'px');
            	    }); 
		        }
            });
		},
		template: function(element,attr){
		    return "<div ng-transclude></div>";    
		}
	}
});*/

/*myApp.directive('qbRow', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.width)
		    {
		        //angular.element(element).css('width',attr.width);
		        angular.element(element).children().css('width',attr.width);
		    }
		    else
		    {
		        //angular.element(element).css('width','100 %');
		        angular.element(element).children().css('width','100 %'); 
		    }
		    var child=angular.element(element).children().children();
		    scope.heights=[];
		    scope.height=0;
		    var height=0;
		    angular.forEach(child, function(value, key){
		        if((angular.element(value)[0].nodeName)==="QB-CELL")
		        {
		            scope.heights.push(angular.element(value).children()[0].offsetHeight);
		            scope.height=angular.element(value).children()[0].offsetHeight+scope.height;   
		        }
		        else
		        {
		            scope.heights.push(angular.element(value)[0].offsetHeight);
		            scope.height=angular.element(value)[0].offsetHeight+scope.height;
		        }
		    });
		    angular.forEach(child, function(value, key){
		        if((angular.element(value)[0].nodeName)==="QB-CELL")
		            var height2=angular.element(value).children()[0].offsetHeight;
		        else
		            var height2=angular.element(value)[0].offsetHeight;
		        if(height<height2)
		            height=height2;
		    });
		    if(window.innerWidth>600)
		    {
		       angular.forEach(child, function(val, key){
		           if((angular.element(val)[0].nodeName)==="QB-CELL")
		                //angular.element(val).children().css('height',height+'px');
		                angular.element(val).children().css('height','100%');
		           else
        	            //angular.element(val).css('height',height+'px');
        	            angular.element(val).css('height','100%');
        	    }); 
		    }
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            var some=0;
		            var j=0;
		            angular.forEach(child, function(val, key){
		                var oldHeight=scope.heights[j];
		                if((angular.element(val)[0].nodeName)==="QB-CELL")
		                    angular.element(val).children().css('height',oldHeight + 'px');
		                else
            	            angular.element(val).css('height',oldHeight + 'px');
            	        j++;
            	    });
		        }
		        else if(scWidth>600)
		        {
		            angular.forEach(child, function(val, key){
		               if((angular.element(val)[0].nodeName)==="QB-CELL")
            	            angular.element(val).children().css('height',height+'px');
            	        else
            	            angular.element(val).css('height',height+'px');
            	    }); 
		        }
            });
		    
		},
		template: function(element,attr){
		    return "<div ng-transclude></div>";    
		}
	}
});*/

myApp.directive('qbContainer', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var scHeight= window.innerHeight;
		    var cHeight=0;
		    var rHeight=0;
		    var child=angular.element(element).children().children();
		    if(window.innerWidth>600)
		    {
        	    angular.forEach(child, function(value, key){
        	        if(((angular.element(value)[0].nodeName)=="QB-TOP-MENUS")||((angular.element(value)[0].nodeName)=="QB-HEADER"))
        	            cHeight=cHeight + angular.element(value).children()[0].offsetHeight;
        	        else
        	            cHeight=cHeight + angular.element(value)[0].offsetHeight;
        	    });
        	    rHeight=scHeight-cHeight;
        	    angular.forEach(child, function(value, key){
        	        if((angular.element(value)[0].nodeName)==="QB-ROW")
        	        {
        	            angular.element(value).children().css('height',rHeight);
        	        }
        	    });
		    }
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
		        var scHeight= window.innerHeight;
		        var cHeight=0;
    	        if(scWidth>600)
		        {
		            angular.forEach(child, function(value, key){
            	    if(((angular.element(value)[0].nodeName)=="QB-TOP-MENUS")||((angular.element(value)[0].nodeName)=="QB-HEADER"))
            	        cHeight=cHeight + angular.element(value).children()[0].offsetHeight;
            	    else
            	        cHeight=cHeight + angular.element(value)[0].offsetHeight;
            	   });
            	   rHeight=scHeight-cHeight;
		           angular.forEach(child, function(value, key){
            	        if((angular.element(value)[0].nodeName)==="QB-ROW")
            	        {
            	            angular.element(value).children().css('height',rHeight);
            	        }
            	    }); 
		        }
		        else if(scWidth<600)
		        {
		            angular.forEach(child, function(value, key){
            	        if((angular.element(value)[0].nodeName)==="QB-ROW")
            	        {
            	            angular.element(value).children().css('height','100%');
            	        }
            	    });
		        }
            });
		},
		template: function(element,attr){
		    return "<div ng-transclude></div>";    
		}
	}
});

myApp.directive('qbrow', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.width)
		    {
		        angular.element(element).children().css('width',attr.width);
		    }
		    else
		    {
		        angular.element(element).children().css('width','100 %'); 
		    }
		    
		    var child=angular.element(element).children().children();
		    scope.heights=[];
		    scope.height=0;
		    var height=0;
		    angular.forEach(child, function(value, key){
		        if((angular.element(value)[0].nodeName)==="QB-CELL")
		        {
		            scope.heights.push(angular.element(value).children()[0].offsetHeight);
		            scope.height=angular.element(value).children()[0].offsetHeight+scope.height;   
		        }
		        else
		        {
		            scope.heights.push(angular.element(value)[0].offsetHeight);
		            scope.height=angular.element(value)[0].offsetHeight+scope.height;
		        }
		    });
		    if(window.innerWidth>600)
		    {
		       angular.forEach(child, function(val, key){
		           if((angular.element(val)[0].nodeName)==="QB-CELL")
		                angular.element(val).children().css('height','100%');
		           else
        	            angular.element(val).css('height','100%');
        	    }); 
		    }
		    
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            var some=0;
		            var j=0;
		            angular.forEach(child, function(val, key){
		                var oldHeight=scope.heights[j];
		                if((angular.element(val)[0].nodeName)==="QB-CELL")
		                    angular.element(val).children().css('height',oldHeight + 'px');
		                else
            	            angular.element(val).css('height',oldHeight + 'px');
            	        j++;
            	    });
		        }
		        else if(scWidth>600)
		        {
		            angular.forEach(child, function(val, key){
		               if((angular.element(val)[0].nodeName)==="QB-CELL")
            	            angular.element(val).children().css('height','100%');
            	        else
            	            angular.element(val).css('height','100%');
            	    }); 
		        }
            });
		},
		template: function(element,attr){
		    return "<div ng-transclude></div>";    
		}
	}
});

myApp.directive('qbColumn', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    scope.heights=[];
		    scope.height=0;
		    var child=angular.element(element).children().children();
		    
		    var times=0;
		    var height;
		    var hTotal;
		    var hper;
		    angular.forEach(child, function(value, key){
		        if((angular.element(value)[0].nodeName)==="QB-CELL")
		        {
		            var hper2=angular.element(value).attr('height');
		        }
		        if(!(times))
		        {
		            hper=hper2;
		            height=angular.element(value).children()[0].offsetHeight;
		        }
		        else if(hper>hper2)
		        {
		            hper=hper2;
		            height=angular.element(value).children()[0].offsetHeight;
		        }
		        times++;
		    });
		    hTotal=(height*100)/hper;
		    angular.forEach(child, function(value, key){
		        var disHPer=angular.element(value).attr('height');
		        var disH=disHPer*hTotal/100;
		        if((angular.element(value)[0].nodeName)==="QB-CELL")
		        {
		            angular.element(value).children().css('height',disH + "px");
		        }
		    });
		    
		    if(window.innerWidth>600)
		    {
		        angular.element(element).children().css('width',attr.width);
		    }
		    else
		    {
		        angular.element(element).children().css('width','100%');
		    }
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            angular.element(element).children().css('width','100%');
		        }
		        else
		        {
		            angular.element(element).children().css('width', attr.width);
		        }
            });
		    
		},
		template: function(element,attr){
		    return "<div style=\"float:left;\" ng-transclude></div>";    
		}
	}
});

/*myApp.directive('qbCell', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        var classes=attr.classes.split(',');
		        var classL="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(classL))
		                classL=classes[k];
		            else
		                classL=classL+" "+classes[k];
		            k++;
		        });
		        angular.element(element).children().addClass(classL);
		    }
		    if((attr.height)&&((angular.element(element).parent().parent()[0].nodeName)==="QB-COLUMN"))
		    {
		        angular.element(element).children().css('heigth',attr.heigth+'%');
		    }
		    else
		    {
		        var cellH=angular.element(element).parent()[0].offsetHeight;
		        //alert(cellH);
		        angular.element(element).children().css('heigth',cellH)
		    }
		    
		    if((angular.element(element).parent().parent()[0].nodeName)==="QB-COLUMN")
		    {
		        angular.element(element).children().css('width','100%');
		    }
		    else
		    {
		        angular.element(element).children().css('width',attr.width);
		    }
		},
		template: function(element,attr){
		    return "<div style=\"float:left;\" ng-transclude></div>";    
		}
	}
});*/
myApp.directive('qbCell',['qbBasics', function(qbBasics) {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        var classL=qbBasics.classCons(attr.classes);
		        angular.element(element).children().addClass(classL);
		    }
		    if((attr.height)&&((angular.element(element).parent().parent()[0].nodeName)==="QB-COLUMN"))
		    {
		        angular.element(element).children().css('heigth',attr.heigth+'%');
		    }
		    else
		    {
		        var cellH=angular.element(element).parent()[0].offsetHeight;
		        //alert(cellH);
		        angular.element(element).children().css('heigth',cellH);
		    }
		    
		    if((angular.element(element).parent().parent()[0].nodeName)==="QB-COLUMN")
		    {
		        angular.element(element).children().css('width','100%');
		    }
		    else
		    {
		        angular.element(element).children().css('width',attr.width);
		    }
		},
		template: function(element,attr){
		    return "<div style=\"float:left;\" ng-transclude></div>";    
		}
	}
}]);
myApp.directive('qbDiv', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var pClasses=attr.pClasses.split(' ');
		    var rClasses=attr.rClasses.split(' ');
		    var classes=attr.class.split(' ');
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        if(window.innerWidth >attr.maxWidth)
		        {
		            angular.forEach(pClasses, function(val, key){
            	       alert(angular.element(val));
            	    });
		        }
		    });
		    
		},
		template: function(element,attr){
		    return "<div ng-transclude></div>";    
		}
	}
});

/*
myApp.directive('qbTopMenus', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    
		},
		template: function(element,attr){
		    return "<ul class=\"qb-top-menu\" ng-transclude></ul>";    
		}
	}
});

myApp.directive('qbSubMenus', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var child=angular.element(element).children().children();
		},
		template: function(element,attr){
		    return "<ul ng-transclude ng-click=\"clickfun()\"></ul>";    
		}
	}
});

myApp.directive('qbMenu', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var term=0;
		    if(attr.openIcon)
		    {
		        var classes=attr.openIcon.split(',');
		        var openIcon="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(openIcon))
		                openIcon=classes[k];
		            else
		                openIcon=openIcon+" "+classes[k];
		            k++;
		        });
		    }
		    else
		        var openIcon="fa fa-caret-down";
		        
		    if(attr.closeIcon)
		    {
		        var classes=attr.closeIcon.split(',');
		        var closeIcon="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(closeIcon))
		                closeIcon=classes[k];
		            else
		                closeIcon=closeIcon+" "+classes[k];
		            k++;
		        });
		    }
		    else
		        var closeIcon="fa fa-caret-right";
		    
		    var child=angular.element(element).children().children();
		    var anchor=angular.element("<a href=\""+attr.href+"\">"+attr.title+"</a>");
		    var i=0;
		    var t;
		    var target;
		    angular.element(element).children()[0].prepend(anchor[0]);
		    if((child[0].nodeName)==="QB-ICON")
		    {
		        angular.element(element).children()[0].append(anchor[0]);
		        if((child[1].nodeName)==="QB-SUB-MENUS")
		        {
		            angular.element(element).children()[0].insertBefore(anchor[0],child[1]);
		        }
		    }
		    else if((child[0].nodeName)==="QB-SUB-MENUS")
		    {
		        angular.element(element).children()[0].prepend(anchor[0]);
		    }
		    
		    angular.forEach(angular.element(element).children().children(), function(value, key){
		        if((angular.element(value)[0].nodeName)==="QB-SUB-MENUS")
		        {
		            target=angular.element(element).children().children()[i];
		            t=i;
		        }
		        i++;
		    });
            
		    if((target.nodeName)==="QB-SUB-MENUS")
		    {
		        //for adding class.
		        angular.forEach(angular.element(element).children().children(), function(value, key){
    		        if((angular.element(value)[0].nodeName)==="QB-SUB-MENUS")
    		        {
    		            angular.element(value).children().css('display','none');
    		        }
    		    });
		        
		        //for open-icon
		        var icon=angular.element("<i class=\""+openIcon+"\"></i>");
		        angular.element(element).children()[0].insertBefore(icon[0],target);
		    }
		    
		    scope.clickfun=function(){
		        if((target.nodeName)==="QB-SUB-MENUS")
    		    {
		            if(!(term))
		            {
		                // for adding and removing class
        		        angular.forEach(angular.element(element).children().children(), function(value, key){
            		        if((angular.element(value)[0].nodeName)==="QB-SUB-MENUS")
            		        {
            		            angular.element(value).children().css('display','block');
            		        }
            		    });
        		        
        		        //for close icon
        		        if((angular.element(element).children().children()[t].nodeName)==="I")
            		        angular.element(element).children().children()[t].remove();
            		    var icon=angular.element("<i class=\""+closeIcon+"\"></i>");
    		            angular.element(element).children()[0].insertBefore(icon[0],target);
    		            term++;
		            }
		            else if(term==1)
		            {
		                // for adding and removing class
        		        angular.forEach(angular.element(element).children().children(), function(value, key){
            		        if((angular.element(value)[0].nodeName)==="QB-SUB-MENUS")
            		        {
            		            angular.element(value).children().css('display','none');
            		        }
            		    });
		                
		                //for open icon
            		    var icon=angular.element("<i class=\""+openIcon+"\"></i>");
            		    if((angular.element(element).children().children()[t].nodeName)==="I")
            		        angular.element(element).children().children()[t].remove();
    		            angular.element(element).children()[0].insertBefore(icon[0],target);
    		            term--;
		            }
    		    }    
		    };
		    
		    if((angular.element(element).parent().parent()[0].nodeName)==="QB-SUB-MENUS")
		        angular.element(element).children[0].addClass("qb-menu-c-1").removeClass("qb-menu");
		},
		template: function(element,attr){ 
		    return "<ul class=\"qb-menu\" ng-transclude ng-click=\"clickfun()\"> </ul>";
		}
	}
 });

myApp.directive('qbIcon', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var child=angular.element(element).children();
		    if(attr.classes)
		    {
		        var classes=attr.classes.split(',');
		        var classL="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(classL))
		                classL=classes[k];
		            else
		                classL=classL+" "+classes[k];
		            k++;
		        });
		        angular.element(element).children().addClass(classL);
		    }
		},
		template: function(element,attr){ 
		    return "<i></i>";
		}
	}
 });
*/

/*myApp.directive('qbMenu', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var child=angular.element(element).children().children();
		    var anchor=angular.element("<a href=\""+attr.href+"\">"+attr.title+"</a>");
		    angular.element(element).children()[0].insertBefore(anchor[0],child[1]);
		    var term=0;
		    if(attr.openIcon)
		    {
		        var classes=attr.openIcon.split(',');
		        var openIcon="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(openIcon))
		                openIcon=classes[k];
		            else
		                openIcon=openIcon+" "+classes[k];
		            k++;
		        });
		    }
		    else
		        var openIcon="fa fa-caret-down";
		        
		    if(attr.closeIcon)
		    {
		        var classes=attr.closeIcon.split(',');
		        var closeIcon="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(closeIcon))
		                closeIcon=classes[k];
		            else
		                closeIcon=closeIcon+" "+classes[k];
		            k++;
		        });
		    }
		    else
		        var closeIcon="fa fa-caret-right";
		    
		    var i=0;
		    var t;
		    var target;
		    angular.forEach(angular.element(element).children().children(), function(value, key){
		        if((angular.element(value)[0].nodeName)==="QB-SUB-MENUS")
		        {
		            target=child[i];
		            t=i;
		        }
		        i++;
		    });
		    if((target.nodeName)==="QB-SUB-MENUS")
		    {
		        //for adding class.
		        target.children().css('display','none');
		        
		        //for open-icon
		        var icon=angular.element("<i class=\""+openIcon+"\"></i>");
		        angular.element(element).children()[0].insertBefore(icon[0],target);
		    }
		    scope.clickfun=function(){
    		    if((target.nodeName)==="QB-SUB-MENUS")
    		    {
		            if(!(term))
		            {
		                // for adding and removing class
        		        target.children().css('display','block');
        		        
        		        //for close icon
        		        
            		    if((angular.element(element).children().children()[t].nodeName)==="I")
            		        angular.element(element).children().children()[t].remove();
            		    var icon=angular.element("<i class=\""+closeIcon+"\"></i>");
    		            angular.element(element).children()[0].insertBefore(icon[0],target);
    		            term++;
		            }
		            else if(term==1)
		            {
		                // for adding and removing class
        		        target.children().css('display','none');
        		        
        		        //for open icon
            		    var icon=angular.element("<i class=\""+openIcon+"\"></i>");
            		    if((angular.element(element).children().children()[t].nodeName)==="I")
            		        angular.element(element).children().children()[t].remove();
    		            angular.element(element).children()[0].insertBefore(icon[0],target);
    		            term--;
		            }
    		    }    
		    };
		    
		    if((angular.element(element).parent().parent()[0].nodeName)==="QB-SUB-MENUS")
		        angular.element(element).children[0].addClass("qb-menu-c-1").removeClass("qb-menu");
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menu\" ng-transclude ng-click=\"clickfun()\"> </div>";
		}
	}
 });
*/

/*
myApp.directive('qbTopMenu', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var win = angular.element(window);
		    var scWidth= window.innerWidth;
		    var icon=angular.element("<i class=\"fa fa-bars\"></i>");
		    if(scWidth<600)
		    {
		        angular.element(element).children()[1].css('display','none');
		        angular.element(element).parent().parent().append("<i class=\"fa fa-bars\"></i>");
		    }
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
		        alert(angular.element(element).parent().parent()[0].nodeName);
		        if(scWidth<600)
    		    {
    		        angular.element(element).children()[1].css('display','none');
    		        angular.element(element).parent().parent().append("<i class=\"fa fa-bars\"></i>");
    		        var wid=angular.element(element).parent().parent().children()[0].offsetWidth-angular.element(element).parent().parent().children()[2].offsetWidth;
    		        angular.element(element).parent().parent().children()[0].css('width',wid);
    		    }
    		    else
    		    {
    		        angular.element(element).parent().parent().children()[1].css('display','block');
    		        angular.element(element).parent().parent().children()[2].remove();
    		        
    		    }
		    });
		},
		template: function(element,attr){
		    return "<div class=\"qb-top-menu\" ng-transclude></div>";    
		}
	}
});
*/

// Made only of div
/*myApp.directive('qbHeader', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var i=0;
		    var mterm=0;
		    var myElement=angular.element(element).children().children(); 
		    angular.forEach(myElement, function(value, key){
    		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
    		    {
    	            mterm=1;
    	            //angular.element(value).children()[0].remove();
                }
                if((angular.element(value)[0].nodeName)==="I")
		        {
		            angular.element(value).css('display','none');
		        }
		    });
		    var turn=0;
		    scope.topmenu=function()
		    {
		        //console.log("called");
		        if(turn==0)
		        {
		            console.log("called"+turn);
		            angular.forEach(angular.element(element).children().children(), function(value, key){
            		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
            		    {
            	            angular.element(value).css('display','block');
                        }
        		    });
        		    turn++;
		        }
		        else if(turn==1)
		        {
		            //console.log("called"+turn);
		            angular.forEach(angular.element(element).children().children(), function(value, key){
            		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
            		    {
            	            angular.element(value).css('display','none');
                        }
        		    });
        		    turn--;
		        }
		    };
		    var leftMenu = angular.element(document.querySelector("qb-left-menu"));
		    scope.leftmenu=function(){
		        leftMenu.children().scope().menuopen();
		    };
		    
		    var rightMenu = angular.element(document.querySelector("qb-right-menu"));
		    scope.rightmenu=function(){
		        rightMenu.children().scope().menuopen();
		    };
		    
		    var win = angular.element(window);
		    var scWidth= window.innerWidth;
	        if(scWidth<600)
	        {
	            angular.forEach(myElement, function(value, key){
    		        if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
    		        {
    		            angular.element(value).css('display','none');
    		        }
    		    });
    		    angular.forEach(angular.element(element).children().children(), function(value, key){
    		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
    		        {
    		            angular.element(value).css('display','block');
    		        }
    		    });
	        }
	        else
	        {
	            angular.forEach(myElement, function(value, key){
    		        if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
    		        {
    		            angular.element(value).css('display','block');
    		        }
    		    });
    		    angular.forEach(angular.element(element).children().children(), function(value, key){
    		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
    		        {
    		            angular.element(value).css('display','none');
    		        }
    		    });
	        }
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            angular.forEach(myElement, function(value, key){
        		        if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
        		        {
        		            angular.element(value).css('display','none');
        		        }
        		    });
        		    angular.forEach(angular.element(element).children().children(), function(value, key){
        		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
        		        {
        		            angular.element(value).css('display','block');
        		        }
        		    });
		        }
		        else if(scWidth>600)
		        {
		            angular.forEach(myElement, function(value, key){
            		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
        		        {
        		            angular.element(value).css('display','block');
        		        }
        		    });
        		    angular.forEach(angular.element(element).children().children(), function(value, key){
        		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
        		        {
        		            angular.element(value).css('display','none');
        		        }
        		    });
		        }
            });
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-header\"> <i style=\"float:left;\" class=\"fa fa-bars\" ng-click=\"leftmenu()\"></i>"+attr.title+"<i style=\"float:right;\" class=\"fa fa-bars\" ng-click=\"topmenu()\"></i> <i style=\"float:right;\" class=\"fa fa-bars\" ng-click=\"rightmenu()\"></i> </div><div style=\"float:left; width:100%;\" ng-transclude></div>";
		}
	}
 });
 */

myApp.directive('qbHeader',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var i=0;
		    var mterm=0;
		    var myElement=angular.element(element).children().children(); 
		    angular.forEach(myElement, function(value, key){
    		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
    		    {
    	            mterm=1;
    	            //angular.element(value).children()[0].remove();
                }
                if((angular.element(value)[0].nodeName)==="I")
		        {
		            angular.element(value).css('display','none');
		        }
		    });
		    var turn=0;
		    scope.topmenu=function()
		    {
		        //console.log("called");
		        if(turn==0)
		        {
		            console.log("called"+turn);
		            angular.forEach(angular.element(element).children().children(), function(value, key){
            		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
            		    {
            	            angular.element(value).css('display','block');
                        }
        		    });
        		    turn++;
		        }
		        else if(turn==1)
		        {
		            //console.log("called"+turn);
		            angular.forEach(angular.element(element).children().children(), function(value, key){
            		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
            		    {
            	            angular.element(value).css('display','none');
                        }
        		    });
        		    turn--;
		        }
		    };
		    scope.leftmenu=function(){
		        var leftMenu = angular.element(document.querySelector("qb-left-menu"));
		        leftMenu.children().scope().menuopen();
		    };
		    
		    scope.rightmenu=function(){
		       var rightMenu = angular.element(document.querySelector("qb-right-menu"));
		       rightMenu.children().scope().menuopen();
		    };
		    
		    var win = angular.element(window);
		    var scWidth= window.innerWidth;
	        if(scWidth<600)
	        {
	            angular.forEach(myElement, function(value, key){
    		        if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
    		        {
    		            angular.element(value).css('display','none');
    		        }
    		    });
    		    angular.forEach(angular.element(element).children().children(), function(value, key){
    		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
    		        {
    		            angular.element(value).css('display','block');
    		        }
    		    });
	        }
	        else
	        {
	            angular.forEach(myElement, function(value, key){
    		        if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
    		        {
    		            angular.element(value).css('display','block');
    		        }
    		    });
    		    angular.forEach(angular.element(element).children().children(), function(value, key){
    		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
    		        {
    		            angular.element(value).css('display','none');
    		        }
    		    });
	        }
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            angular.forEach(myElement, function(value, key){
        		        if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
        		        {
        		            angular.element(value).css('display','none');
        		        }
        		    });
        		    angular.forEach(angular.element(element).children().children(), function(value, key){
        		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
        		        {
        		            angular.element(value).css('display','block');
        		        }
        		    });
		        }
		        else if(scWidth>600)
		        {
		            angular.forEach(myElement, function(value, key){
            		    if((angular.element(value)[0].nodeName)==="QB-TOP-MENU")
        		        {
        		            angular.element(value).css('display','block');
        		        }
        		    });
        		    angular.forEach(angular.element(element).children().children(), function(value, key){
        		        if(((angular.element(value)[0].nodeName)==="I")&&(mterm==1))
        		        {
        		            angular.element(value).css('display','none');
        		        }
        		    });
		        }
            });
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-header\"> <i style=\"float:left;\" class=\"fa fa-bars\" ng-click=\"leftmenu()\"></i>"+attr.title+"<i style=\"float:right;\" class=\"fa fa-bars\" ng-click=\"topmenu()\"></i> <i style=\"float:right;\" class=\"fa fa-bars\" ng-click=\"rightmenu()\"></i> </div><div style=\"float:left; width:100%;\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbTopMenu', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var parent=angular.element(element).parent().parent();
		    if(typeof parent !== 'undefined' && parent.length > 0)
		    {
		        var child=angular.element(element).children();
		        if((angular.element(element).parent().parent()[0].nodeName)=="QB-HEADER")
		        {
		            angular.forEach(child, function(value, key){
        		        if(angular.element(value).hasClass("menu-title"))
        		        {
        		            angular.element(value).remove();
        		        }
        		    });
		        }
		        else
		        {
		            var scWidth= window.innerWidth;
		            if(scWidth>600)
		            {
		               angular.forEach(child, function(value, key){
            		        if(angular.element(value).hasClass("menu-title"))
            		        {
            		            angular.element(value).css('display','none');
            		        }
            		    }); 
		            }
		            else
		            {
		                angular.forEach(child, function(value, key){
            		        if(angular.element(value).hasClass("qb-top-menu"))
            		        {
            		            angular.element(value).css('display','none');
            		        }
            		    });
		            }
		        }
		    }
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        var scWidth=window.innerWidth;
		        if(typeof parent !== 'undefined' && parent.length > 0)
    		    {
    		        if((angular.element(element).parent().parent()[0].nodeName)!="QB-HEADER")
    		        {
    		            if(scWidth<600)
        		        {
        		            angular.forEach(child, function(value, key){
                		        if(angular.element(value).hasClass("menu-title"))
                		        {
                		            angular.element(value).css('display','block');
                		        }
                		    }); 
                		    
        		            angular.forEach(child, function(value, key){
                		        if(angular.element(value).hasClass("qb-top-menu"))
                		        {
                		            angular.element(value).css('display','none');
                		        }
                		    });
        		        }
        		        else
        		        {
        		            angular.forEach(child, function(value, key){
                		        if(angular.element(value).hasClass("menu-title"))
                		        {
                		            angular.element(value).css('display','none');
                		        }
                		    }); 
                		    
        		            angular.forEach(child, function(value, key){
                		        if(angular.element(value).hasClass("qb-top-menu"))
                		        {
                		            angular.element(value).css('display','block');
                		        }
                		    });
        		        }
    		        }
    		    }
		    });
		    var turn=0;
		    scope.clickmenu=function()
		    {
		        //console.log("called");
		        if(turn==0)
		        {
		            console.log("called"+turn);
		            angular.forEach(angular.element(element).children(), function(value, key){
            		    if(angular.element(value).hasClass("qb-top-menu"))
            		    {
            	            angular.element(value).css('display','block');
                        }
        		    });
        		    turn++;
		        }
		        else if(turn==1)
		        {
		            //console.log("called"+turn);
		            angular.forEach(angular.element(element).children(), function(value, key){
            		    if(angular.element(value).hasClass("qb-top-menu"))
            		    {
            	            angular.element(value).css('display','none');
                        }
        		    });
        		    turn--;
		        }
		    };
		    
		},
		template: function(element,attr){
		    return "<div class=\"menu-title\">"+attr.title+"<i style=\"float:right\" class=\"fa fa-bars\" ng-click=\"clickmenu()\"></i></div><div class=\"qb-top-menu\" ng-transclude></div>";    
		}
	}
});
/*
myApp.directive('qbRightMenu', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var scWidth= window.innerWidth;
		    angular.forEach(angular.element(element).children().children().children(), function(value, key){
	            if((angular.element(value)[0].nodeName)==="I")
	            {
	                angular.element(value).css('display','none');
	                angular.element(value).css('float','right');
	            }
	        });
            if(scWidth<600)
            {
               angular.element(element).children().addClass("qb-right-menu-res").removeClass("qb-right-menu-def");
            }
            
            var win = angular.element(window);
            win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            angular.element(element).children().css('display','none');
		            angular.element(element).children().addClass("qb-right-menu-res").removeClass("qb-right-menu-def");
		        }
		        else
		        {
		            if((angular.element(element).children()[0].offsetWidth)==0)
		            {
		                angular.element(element).children().css('display','block');
		                angular.element(element).children().css('width','100%');
		            }
		            angular.element(element).children().addClass("qb-right-menu-def").removeClass("qb-right-menu-res");
		        }
            });
            
            if(attr.sideWidth)
            {
                var sideWidth=attr.sideWidth;
            }
            else
            {
                var sideWidth="auto";
            }
            
		    scope.menuopen=function()
		    {
		        alert("called");
		        angular.element(element).children().css('width',sideWidth);
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="I")
    	            {
    	                angular.element(value).css('display','block');
    	            }
    	        });
		    };
		    
		    scope.menuclose=function()
		    {
		        angular.element(element).children().css('width','0');
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="I")
    	            {
    	                angular.element(value).css('display','none');
    	            }
    	        });
		    };
		},
		template: function(element,attr){
		    return "<div class=\"qb-right-menu-def\" ng-transclude> </div>";    
		}
	}
});*/

myApp.directive('qbRightMenu', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var scWidth=window.innerWidth;
		    if(scWidth<600)
		    {
		       angular.element(element).children().addClass("qb-right-menu-res").removeClass("qb-right-menu-def");
		    }
		    angular.forEach(angular.element(element).children().children(), function(value, key){
	            if((angular.element(value)[0].nodeName)==="QB-CLOSE-ICON")
	            {
	                angular.element(value).children().css('display','none');
	                angular.element(value).children().css('float','right');
	            }
	        });
		    var win = angular.element(window);
            win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            if((angular.element(element).children()[0].offsetWidth))
		            {
		                angular.element(element).children().css('width','0');
		            }
		            angular.element(element).children().addClass("qb-right-menu-res").removeClass("qb-right-menu-def");
		        }
		        else
		        {
		            if((angular.element(element).children()[0].offsetWidth)=='0')
		            {
		                angular.element(element).children().css('width','100%');
		            }
		            angular.element(element).children().addClass("qb-right-menu-def").removeClass("qb-right-menu-res");
		        }
            });
            
            if(attr.sideWidth)
            {
                var sideWidth=attr.sideWidth;
            }
            else
            {
                var sideWidth="auto";
            }
            
            scope.menuopen=function()
		    {
		        angular.element(element).children().css('width',sideWidth);
		        angular.forEach(angular.element(element).children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="QB-CLOSE-ICON")
    	            {
    	                angular.element(value).children().css('display','block');
    	            }
    	        });
		    };
		    
		    scope.menuclose=function()
		    {
		        angular.element(element).children().css('width','0');
		        angular.forEach(angular.element(element).children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="QB-CLOSE-ICON")
    	            {
    	                angular.element(value).children().css('display','none');
    	            }
    	        });
		    };
            
		},
		template: function(element,attr){
		    return "<div class=\"qb-right-menu-def\" ng-transclude> </div>";    
		}
	}
});
/*myApp.directive('qbLeftMenu', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var scWidth= window.innerWidth;
		    angular.forEach(angular.element(element).children().children().children(), function(value, key){
	            if((angular.element(value)[0].nodeName)==="I")
	            {
	                angular.element(value).css('display','none');
	                angular.element(value).css('float','right');
	            }
	        });
            if(scWidth<600)
            {
               angular.element(element).children().addClass("qb-left-menu-res").removeClass("qb-left-menu-def");
            }
            
            var win = angular.element(window);
            win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            angular.element(element).children().addClass("qb-left-menu-res").removeClass("qb-left-menu-def");
		        }
		        else
		        {
		            angular.element(element).children().addClass("qb-left-menu-def").removeClass("qb-left-menu-res");
		        }
            });
            
            if(attr.sideWidth)
            {
                var sideWidth=attr.sideWidth;
            }
            else
            {
                var sideWidth="auto";
            }
            
		    scope.menuopen=function()
		    {
		        angular.element(element).children().css('width',sideWidth);
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="I")
    	            {
    	                angular.element(value).css('display','block');
    	            }
    	        });
		    };
		    
		    scope.menuclose=function()
		    {
		        angular.element(element).children().css('width','0');
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="I")
    	            {
    	                angular.element(value).css('display','none');
    	            }
    	        });
		    };
		    
		},
		template: function(element,attr){
		    return "<div class=\"qb-left-menu-def\" ng-transclude> </div>";    
		}
	}
});*/
myApp.directive('qbLeftMenu', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var scWidth=window.innerWidth;
		    if(scWidth<600)
		    {
		       angular.element(element).children().addClass("qb-left-menu-res").removeClass("qb-left-menu-def");
		    }
		    angular.forEach(angular.element(element).children().children(), function(value, key){
	            if((angular.element(value)[0].nodeName)==="QB-CLOSE-ICON")
	            {
	                angular.element(value).children().css('display','none');
	                angular.element(value).children().css('float','right');
	            }
	        });
		    var win = angular.element(window);
            win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            if((angular.element(element).children()[0].offsetWidth))
		            {
		                angular.element(element).children().css('width','0');
		            }
		            angular.element(element).children().addClass("qb-left-menu-res").removeClass("qb-left-menu-def");
		        }
		        else
		        {
		            if((angular.element(element).children()[0].offsetWidth)=='0')
		            {
		                angular.element(element).children().css('width','100%');
		            }
		            angular.element(element).children().addClass("qb-left-menu-def").removeClass("qb-left-menu-res");
		        }
            });
            
            if(attr.sideWidth)
            {
                var sideWidth=attr.sideWidth;
            }
            else
            {
                var sideWidth="auto";
            }
            
            scope.menuopen=function()
		    {
		        angular.element(element).children().css('width',sideWidth);
		        angular.forEach(angular.element(element).children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="QB-CLOSE-ICON")
    	            {
    	                angular.element(value).children().css('display','block');
    	            }
    	        });
		    };
		    
		    scope.menuclose=function()
		    {
		        angular.element(element).children().css('width','0');
		        angular.forEach(angular.element(element).children().children(), function(value, key){
    	            if((angular.element(value)[0].nodeName)==="QB-CLOSE-ICON")
    	            {
    	                angular.element(value).children().css('display','none');
    	            }
    	        });
		    };
            
		
		},
		template: function(element,attr){
		    return "<div class=\"qb-left-menu-def\" ng-transclude> </div>";    
		}
	}
});

myApp.directive('qbSubMenus', function() {
    return {
        scope:{},
		transclude: true,
		link: function(scope,element,attr){
		    var child=angular.element(element).children().children();
		},
		template: function(element,attr){
		    return "<div class=\"qb-sub-menu\"ng-transclude ng-click=\"clickfun()\"></div>";    
		}
	}
});

/*myApp.directive('qbMenu', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var term=0;
		    if(attr.openIcon)
		    {
		        var classes=attr.openIcon.split(',');
		        var openIcon="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(openIcon))
		                openIcon=classes[k];
		            else
		                openIcon=openIcon+" "+classes[k];
		            k++;
		        });
		    }
		    else
		        var openIcon="fa fa-caret-down";
		        
		    if(attr.closeIcon)
		    {
		        var classes=attr.closeIcon.split(',');
		        var closeIcon="";
		        var k=0;
		        angular.forEach(classes, function(value, key){
		            if(!(closeIcon))
		                closeIcon=classes[k];
		            else
		                closeIcon=closeIcon+" "+classes[k];
		            k++;
		        });
		    }
		    else
		        var closeIcon="fa fa-caret-right";
		    
		    var child=angular.element(element).children().children();
		    var anchor=angular.element("<a href=\""+attr.href+"\">"+attr.title+"</a>");
		    var i=0;
		    var t;
		    var target;
		    var child=angular.element(element).children().children();
		    if(typeof child !== 'undefined' && child.length > 0)
		    {
		        if((child[0].nodeName)==="QB-ICON")
    		    {
    		        angular.element(element).children()[0].append(anchor[0]);
    		        if((child[1].nodeName)==="QB-SUB-MENUS")
    		        {
    		            angular.element(element).children().children()[2].remove();
    		            angular.element(element).children()[0].insertBefore(anchor[0],child[1]);
    		        }
    		    }
    		    else if((child[0].nodeName)==="QB-SUB-MENUS")
    		    {
    		        angular.element(element).children()[0].prepend(anchor[0]);
    		    }
    		    
    		    angular.forEach(angular.element(element).children().children(), function(value, key){
    		        if((angular.element(value)[0].nodeName)==="QB-SUB-MENUS")
    		        {
    		            target=angular.element(element).children().children()[i];
    		            t=i;
    		        }
    		        i++;
    		    });
                
    		    if((target.nodeName)==="QB-SUB-MENUS")
    		    {
    		        //for adding class.
    		        angular.forEach(angular.element(element).children().children(), function(value, key){
        		        if((angular.element(value)[0].nodeName)==="QB-SUB-MENUS")
        		        {
        		            angular.element(value).children().css('display','none');
        		        }
        		    });
    		        
    		        //for open-icon
    		        var icon=angular.element("<i class=\""+openIcon+"\"></i>");
    		        angular.element(element).children()[0].insertBefore(icon[0],target);
    		    }
		    }
		    else
		    {
		        angular.element(element).children()[0].prepend(anchor[0]);
		    }
		    
		    scope.clickfun=function(){
		        if(typeof child !== 'undefined' && child.length > 0)
		        {
		            if((target.nodeName)==="QB-SUB-MENUS")
        		    {
    		            if(!(term))
    		            {
    		                // for adding and removing class
            		