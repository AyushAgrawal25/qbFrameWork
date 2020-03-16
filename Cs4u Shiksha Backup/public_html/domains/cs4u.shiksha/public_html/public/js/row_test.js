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
    
    this.clrTypEle=function(ele){
        var result=false;
        if(angular.element(ele).attr("style"))
        {
            var divStyle=angular.element(ele).attr("style");
            var allStyles=divStyle.split(';');
            angular.forEach(allStyles, function(value, key){
                if(value==="clear:both")
                result=true;
            });
        }
        return result;
    }
    
    this.pageDepth=function(elem){
        var times=[];
        var looptime=0;
        var childtime=0;
        var child=elem.children();
        var reqChildren=[];
        var con=true;
        while(con)
        {
            if(typeof child !== 'undefined' && child.length > 0)
            {
                var cht=0;
                angular.forEach(child, function(value, key){
                    var childName=angular.element(value)[0].nodeName;
                    if(((childName[0])==="Q")&&((childName[1])==="B")&&((childName[2])==="-"))
                    {
                        if(!cht)
                        {
                            times[childtime]=looptime;
                            childtime++;
                            cht=1;
                        }
                    }
                });
                child=child.children(); 
            }
            else
            {
                con=false;
            }
            looptime++;
        }
        alert(times);
    }
});

myApp.directive('qbContainer',['qbBasics',  function(qbBasics) {
    return {
        scope:{},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.loadfun=function(){
		        angular.element(element).children().append(transclude());
		        angular.element(element).children().append("<div style=\"clear:both\"></div>");
		        var qbChildren=qbBasics.findQbChildren(angular.element(element));
		        if(typeof qbChildren !== 'undefined' && qbChildren.length > 0)
		        {
		            angular.forEach(qbChildren, function(value, key){
		                angular.element(value).children().scope().transfun();
        		    });
		        }
		    };
		},
		template: function(element,attr){
		    return "<div ng-if=\"loadfun\" ng-init=\"loadfun()\"></div>";    
		}
	}
}]);

myApp.directive('qbRow',['qbBasics',  function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.transfun=function(){
		        if(attr.classes)
    		    {
    		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
    		    }
		        angular.element(element).children().append(transclude());
		        angular.element(element).children().append("<div style=\"clear:both\"></div>");
		        var qbChildren=qbBasics.findQbChildren(angular.element(element));
		        if(typeof qbChildren !== 'undefined' && qbChildren.length > 0)
		        {
		            angular.forEach(qbChildren, function(value, key){
		                if((angular.element(value)[0].nodeName)!="QB-TABS")
        		        angular.element(value).children().scope().transfun();
        		    });
		        }
		        
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            angular.element(element).children().scope().respMobFun();
		        }
		        else
		        {
		             angular.element(element).children().scope().respDskTopFun();
		        }
		    };
		    
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        var scWidth= window.innerWidth;
    	        if(scWidth<600)
		        {
		            angular.element(element).children().scope().respMobFun();
		        }
		        else
		        {
		             angular.element(element).children().scope().respDskTopFun();
		        }
            });
		    scope.respDskTopFun=function(){
		        var childs=angular.element(element).children().children();
		        if(typeof childs !== 'undefined' && childs.length > 0)
		        
		        {
		            var nHeight=0;
		            angular.forEach(childs, function(value, key){
        		        var oHeight=angular.element(value)[0].offsetHeight;
        		        if(oHeight>nHeight)
        		        {
        		            nHeight=oHeight;
        		        }
        		    });
        		    angular.forEach(childs, function(value, key){
        		        if(!(qbBasics.clrTypEle(angular.element(value))))
        		        {
        		            angular.element(value).css("height",nHeight);
        		        }
        		    });
		        }
		    };
		    scope.respMobFun=function(){
		        var childs=angular.element(element).children().children();
		        if(typeof childs !== 'undefined' && childs.length > 0)
		        {
        		    angular.forEach(childs, function(value, key){
        		        if(!(qbBasics.clrTypEle(angular.element(value))))
        		        {
        		            angular.element(value).css("height","auto");
        		        }
        		    });
		        }
		    };
		},
		template: function(element,attr){
		    return "<div></div>";
		}
	}
}]);

myApp.directive('qbFlex',['qbBasics',  function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    var height=0;
		    scope.transfun=function(){
		        if(attr.classes)
    		    {
    		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
    		    }
		        angular.element(element).children().append(transclude());
		        angular.element(element).children().append("<div style=\"clear:both\"></div>");
		        var qbChildren=qbBasics.findQbChildren(angular.element(element));
		        if(typeof qbChildren !== 'undefined' && qbChildren.length > 0)
		        {
		            angular.forEach(qbChildren, function(value, key){
        		        angular.element(value).children().scope().transfun();
        		        alert(angular.element(value).children()[0].offsetHeight);
        		    });
		        }
		        var childs=angular.element(element).children().children();
		        angular.forEach(childs, function(value, key){
                    height=height+(angular.element(value)[0].offsetHeight);
                });
		    };
		    scope.clickfun=function(){
		        alert(angular.element(element).children()[0].offsetHeight);
		    };
		},
		template: function(element,attr){
		    return "<div ng-click=\"clickfun()\"></div>";
		}
	}
}]);
myApp.directive('qbTabs',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		   if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.headings=[];
		    var rt=1;
		    var defHeading;
		    var headEles=[];
    		var child=qbBasics.findChildren(angular.element(element),"QB-TAB");
		    var headings=qbBasics.findChildren(angular.element(element),"qb-tab-heading");
		    var h=0;
		    angular.forEach(angular.element(headings).children(), function(value, key){
		        scope.headings.push(angular.element(value).html());
		        headEles[h]=angular.element(value).scope().transfun();
		        h++;
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
    		            alert(headEles[i]);
    		            angular.element(value).append(headEles[i]);
    		        }
    		        i++;
    		    });
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tabs\"></div> <div ng-repeat=\"heading in headings\" class=\"qb-tab-heading ng-isolate-scope ng-scope\" ng-click=\"tabopen(heading)\" ng-init=\"loadfun(heading)\"></div> <div class=\"nothing\" ng-transclude ></div>";
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
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\"></div>";
		}
	}
}]);
myApp.directive('qbTabHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.transfun=function(){
		        return transclude();
		    };
		},
		template: function(element,attr){ 
		    return "<div style=\"display:none;\" ng-transclude></div>";
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
