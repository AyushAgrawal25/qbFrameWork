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

//last updated on 24-04-2019
myApp.directive('qbAccordions',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    var qbAccordions=qbBasics.findChildren(angular.element(element),"QB-ACCORDION");
		    var qbAccHeadings=qbBasics.findChildren(angular.element(element),"QB-ACC-HEADING");
		    var qbAccContents=qbBasics.findChildren(angular.element(element),"QB-ACC-CONTENT");
		    scope.qbidies=[];
		    var i=0;
		    angular.forEach(qbAccordions, function(value, key){
		        scope.qbidies.push("qb-acc-"+i);
		        angular.element(qbAccordions[i]).children().attr("qb-acc-id",scope.qbidies[i]);
		        angular.element(qbAccHeadings[i]).children().attr("qb-acc-id",scope.qbidies[i]);
		        angular.element(qbAccContents[i]).children().attr("qb-acc-id",scope.qbidies[i]);
		        i++;
		    });
	        scope.initiatefun=function(accId){
	            angular.forEach(qbAccordions, function(value, key){
	                if((angular.element(value).children().attr("qb-acc-id"))==accId)
	                {
	                    if((angular.element(value).children().scope().state)==="close")
	                    {
	                        angular.element(value).children().scope().openacc();
	                    }
	                    else
	                    {
	                        angular.element(value).children().scope().closeacc();
	                    }
	                }
	                else
	                {
	                    angular.element(value).children().scope().closeacc();
	                }
    		    });
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-accordions\" ng-transclude></div>";
		}
	}
}]);
myApp.directive('qbAccordion',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.state="close";
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.openacc=function(){
		        scope.state="open";
		        var acCont=qbBasics.findChildren(angular.element(element),"qb-acc-content");
		        angular.element(acCont).children().addClass("qb-accordion-content-open").removeClass("qb-accordion-content-close");
		    };
		    
		    scope.closeacc=function(){
		        scope.state="close";
		        var acCont=qbBasics.findChildren(angular.element(element),"qb-acc-content");
		        angular.element(acCont).children().addClass("qb-accordion-content-close").removeClass("qb-accordion-content-open");
		    };
		    if(attr.default==="open")
		    {
	            angular.element(element).children().scope().openacc();
		    }
		    else
		    {
		        angular.element(element).children().scope().closeacc();
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-accordion\" ng-transclude></div>";
		}
	}
}]);
myApp.directive('qbAccHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
	        if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.clickfun=function(){
		        var accs=qbBasics.findParent(angular.element(element),"qb-accordions");
		        var accId=angular.element(element).children().attr("qb-acc-id");
		        angular.element(accs).children().scope().initiatefun(accId);
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-accordion-heading\" ng-click=\"clickfun()\" ng-transclude ></div>";
		}
	}
}]);
myApp.directive('qbAccContent',['qbBasics', function(qbBasics) {
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
		    return "<div class=\"qb-accordion-content\" ng-transclude></div>";
		}
	}
}]);


//last seen on 23-03-19
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