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

//Last updated 10-07-2019
myApp.directive('qbShowMenus',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
	        if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
	        
	        var trans=angular.element("<div></div>");
	        trans.append(transclude());
		    
		    scope.qbMenusOpenFun=function(){
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-open");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-close");
		        var qbMenusIcons=qbBasics.findChildren(angular.element(element),"qb-menus-icon");
		        angular.forEach(qbMenusIcons, function(value, key){
		            if((angular.element(value).attr("icon-type"))==="open")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-close");
		                angular.element(value).children().removeClass("qb-menus-icon-open");
		            }
		            else if((angular.element(value).attr("icon-type"))==="close")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-open");
		                angular.element(value).children().removeClass("qb-menus-icon-close");
		            }
                });
		    };
		    
		   scope.qbMenusCloseFun=function(){
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-close");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-open");
		        var qbMenusIcons=qbBasics.findChildren(angular.element(element),"qb-menus-icon");
		        angular.forEach(qbMenusIcons, function(value, key){
		            if((angular.element(value).attr("icon-type"))==="open")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-open");
		                angular.element(value).children().removeClass("qb-menus-icon-close");
		            }
		            else if((angular.element(value).attr("icon-type"))==="close")
		            {
		                angular.element(value).children().addClass("qb-menus-icon-close");
		                angular.element(value).children().removeClass("qb-menus-icon-open");
		            }
                });
		    };
		    
		    scope.qbMenusMobShowFun=function(){
		        angular.element(element).children().children()[0].style.display="block";
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-close");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-open");
		        
		    };
		    
		    scope.qbMenusDeskShowFun=function(){
		        angular.element(element).children().children()[0].style.display="none";
		        angular.element(angular.element(element).children().children()[1]).addClass("qb-menus-open");
		        angular.element(angular.element(element).children().children()[1]).removeClass("qb-menus-close");
		    };
		    
		    
		    var isResponsive=attr.responsive;
		    var win = angular.element(window);
		    win.bind('resize', function () {
		        if(isResponsive)
		        {
                    var scWidth= window.innerWidth;
                    if(scWidth>600)
                    {
                        angular.element(element).children().scope().qbMenusDeskShowFun();
                    }
                    else
                    {
                        angular.element(element).children().scope().qbMenusMobShowFun();
                        angular.element(element).children().scope().qbMenusCloseFun();
                    }
		        }
            });
		    
		    scope.qbShowTopMenusLoadFun=function(){   
    	        if(window.innerWidth<600)
    	        {
    	            angular.element(element).children().scope().qbMenusMobShowFun();
    	        }
    	        else
    	        {
    	            angular.element(element).children().scope().qbMenusDeskShowFun();
    	        }
    	        
    	        var qbMenuHeight=parseFloat(window.getComputedStyle(angular.element(angular.element(element).children().children()[1]).children()[0], null).getPropertyValue('height'));
    	        /*var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-sub-menus-top-type");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            var qbMenuId=angular.element(value).parent().attr("qb-menu-in-sub-menus-id");
		           angular.element(value).css("top",(qbMenuHeight*qbMenuId)+"px");
                });*/
                
                var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-menus");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                angular.element(value).addClass("qb-sub-sub-menus-top-type");
		                var qbMenuId=angular.element(value).parent().attr("qb-menu-in-sub-menus-id");
    		            angular.element(value).css("top",(qbMenuHeight*qbMenuId)+"px");
		            }
		            /*else if(angular.element(value).parent().hasClass("qb-menu-in-top-menus"))
		            {
		                angular.element(value).addClass("qb-top-sub-menus");
		            }*/
                });
                
		    };
		    
		    scope.qbShowLeftMenusLoadFun=function(){
    	        if(window.innerWidth<600)
    	        {
    	            angular.element(element).children().scope().qbMenusMobShowFun();
    	        }
    	        else
    	        {
    	            angular.element(element).children().scope().qbMenusDeskShowFun();
    	        }
    	        
		        var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-menus");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                angular.element(value).addClass("qb-sub-sub-menus-left-type");
		            }
		            else if(angular.element(value).parent().hasClass("qb-menu-in-left-menus"))
		            {
		                angular.element(value).addClass("qb-left-sub-menus");
		            }
		        });
		    };
		    
		    
		    scope.qbShowIconMenusLoadFun=function(){
    	        angular.element(element).children().scope().qbMenusMobShowFun();
    	        
		        var qbSubMenusAll=angular.element(element)[0].querySelectorAll(".qb-sub-menus");
		        angular.forEach(qbSubMenusAll, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                angular.element(value).addClass("qb-sub-sub-menus-icon-type");
		            }
		            else if(angular.element(value).parent().hasClass("qb-menu-in-icon-menus"))
		            {
		                angular.element(value).addClass("qb-icon-sub-menus");
		            }
		        });
		        isResponsive=false;
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-show-menus\">"+
		                "<div class=\"qb-show-menus-icon-div\" ng-click=\"qbShowMenusClickFun()\" ng-transclude> </div>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbMenusHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menus-heading\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbMenusIcon',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    if((attr.iconType)==="open")
		    {
		        angular.element(element).children().addClass("qb-menus-icon-open");
		    }
		    else if((attr.iconType)==="close")
		    {
		        angular.element(element).children().addClass("qb-menus-icon-close");
		    }
		    
		    scope.qbMenusIconClickFun=function(){
		        var qbShowMenus=qbBasics.findParent(angular.element(element),"qb-show-menus");
		        if((attr.iconType)==="open")
    		    {
    		        angular.element(qbShowMenus).children().scope().qbMenusOpenFun();
    		    }
    		    else if((attr.iconType)==="close")
    		    {
    		        angular.element(qbShowMenus).children().scope().qbMenusCloseFun();
    		    }   
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menus-icon\" ng-click=\"qbMenusIconClickFun()\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);
myApp.directive('qbMenus',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.qbMenusLoadFun=function(){
		        if((attr.qbMenuType)==="top")
		        {
		            angular.element(element).children().scope().qbTopMenusLoadFun();
		        }
		        else if((attr.qbMenuType)==="left")
		        {
		            angular.element(element).children().scope().qbLeftMenusLoadFun();
		        }
		        else if((attr.qbMenuType)==="icon")
		        {
		            angular.element(element).children().scope().qbIconMenusLoadFun();
		        }
		    };
		    
		    scope.qbIconMenusLoadFun=function(){
		        var qbMainMenuDiv=angular.element("<div class=\"qb-menus qb-icon-menus\" style=\"overflow:hidden\"></div>");
		        if(attr.classes)
		        {
		            qbMainMenuDiv.addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuEle=angular.element(value).children().scope().qbMenuLoadFun();
                        if(qbMenuEle)
                        {
                            qbMainMenuDiv.append(angular.element(qbMenuEle).html());
                        }
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                var qbMenuInLeftMenusIdies=0;
                var qbMenuInLeftMenus=angular.element(qbMainMenuDiv).children();
                angular.forEach(qbMenuInLeftMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-icon-menus");
                        angular.element(value).attr("qb-menu-in-icon-menus-id",qbMenuInLeftMenusIdies);
                        qbMenuInLeftMenusIdies++;
                    }
                });
                
		        angular.element(element).children().empty();
		        var qbShowMenus=document.querySelectorAll("qb-show-menus");
		        angular.forEach(qbShowMenus, function(value, key){
                    if((angular.element(value).attr("qb-menus-id"))===(angular.element(element).attr("qb-menus-id")))
                    {
		                angular.element(value).children().append(angular.element(qbMainMenuDiv));
		                angular.element(value).children().scope().qbShowIconMenusLoadFun();
                    }
                });
		        
		    };
		    
		    scope.qbLeftMenusLoadFun=function(){
		        var qbMainMenuDiv=angular.element("<div class=\"qb-menus qb-left-menus\" style=\"overflow:hidden\"></div>");
		        if(attr.classes)
		        {
		            qbMainMenuDiv.addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuEle=angular.element(value).children().scope().qbMenuLoadFun();
                        if(qbMenuEle)
                        {
                            qbMainMenuDiv.append(angular.element(qbMenuEle).html());
                        }
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                var qbMenuInLeftMenusIdies=0;
                var qbMenuInLeftMenus=angular.element(qbMainMenuDiv).children();
                angular.forEach(qbMenuInLeftMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-left-menus");
                        angular.element(value).attr("qb-menu-in-left-menus-id",qbMenuInLeftMenusIdies);
                        qbMenuInLeftMenusIdies++;
                    }
                });
                
		        angular.element(element).children().empty();
		        var qbShowMenus=document.querySelectorAll("qb-show-menus");
		        angular.forEach(qbShowMenus, function(value, key){
                    if((angular.element(value).attr("qb-menus-id"))===(angular.element(element).attr("qb-menus-id")))
                    {
		                angular.element(value).children().append(angular.element(qbMainMenuDiv));
		                angular.element(value).children().scope().qbShowLeftMenusLoadFun();
                    }
                });
		        
		    };
		    
		    scope.qbTopMenusLoadFun=function(){
		        var qbMainMenuDiv=angular.element("<div class=\"qb-menus qb-top-menus\" style=\"overflow:hidden\"></div>");
		        if(attr.classes)
		        {
		            qbMainMenuDiv.addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuEle=angular.element(value).children().scope().qbMenuLoadFun();
                        if(qbMenuEle)
                        {
                            qbMainMenuDiv.append(angular.element(qbMenuEle).html());
                        }
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                var screenWidth=window.innerWidth;
                var qbMenuInTopMenuWidth;
                if(screenWidth>600)
                {
                    qbMenuInTopMenuWidth=(screenWidth/i);
                }
                else
                {
                    qbMenuInTopMenuWidth=screenWidth;
                }
                var qbMenuInTopMenusIdies=0;
                var qbMenuInSubMenus=angular.element(qbMainMenuDiv).children();
                angular.forEach(qbMenuInSubMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-top-menus");
                        angular.element(value).css("width",qbMenuInTopMenuWidth+"px");
                        angular.element(value).attr("qb-menu-in-top-menus-id",qbMenuInTopMenusIdies);
                        qbMenuInTopMenusIdies++;
                    }
                });
                
                var qbTopSubMenus=angular.element(qbMainMenuDiv).children().children();
                angular.forEach(qbTopSubMenus, function(value, key){
		            if(angular.element(value).parent().hasClass("qb-menu-in-top-menus"))
		            {
		                if(angular.element(value).hasClass("qb-sub-menus"))
		                {
		                    angular.element(value).addClass("qb-top-sub-menus");
		                }
		            }
		        });
		        
		        var qbShowMenus=document.querySelectorAll("qb-show-menus");
		        angular.forEach(qbShowMenus, function(value, key){
                    if((angular.element(value).attr("qb-menus-id"))===(angular.element(element).attr("qb-menus-id")))
                    {
		                angular.element(value).children().append(angular.element(qbMainMenuDiv));
		                angular.element(value).children().scope().qbShowTopMenusLoadFun();
                    }
                });
                angular.element(element).empty();
            };
		    
		    scope.qbSubMenusLoadFun=function(){
		        angular.element(element).children().empty();
		        angular.element(element).children().append(transclude());
		        var qbMenuContents=angular.element(element).children().children();
		        var i=0;
		        var qbSubMenusEle=angular.element("<div class=\"qbsubmenus\"><div class=\"qb-sub-menus\"></div></div>");
		        if(attr.classes)
		        {
		            qbSubMenusEle.children().addClass(qbBasics.classCons(attr.classes));
		        }
		        angular.forEach(qbMenuContents, function(value, key){
                    if((angular.element(value)[0].nodeName)==="QB-MENU")
                    {
                        var qbMenuRet=angular.element(value).children().scope().qbMenuLoadFun();
                        qbSubMenusEle.children().append(qbMenuRet.html());
                        angular.element(value).children().attr("qb-menu-id","qb-menu-"+i);
                        i++;
                    }
                });
                
                var qbMenuInSubMenusIdies=0;
                var qbMenuInSubMenus=angular.element(qbSubMenusEle).children().children();
                angular.forEach(qbMenuInSubMenus, function(value, key){
                    if(angular.element(value).hasClass("qb-menu"))
                    {
                        angular.element(value).addClass("qb-menu-in-sub-menus");
                        angular.element(value).attr("qb-menu-in-sub-menus-id",qbMenuInSubMenusIdies);
                        qbMenuInSubMenusIdies++;
                    }
                });
                
                var qbSubSubMenus=angular.element(qbSubMenusEle).children().children().children();
                angular.forEach(qbSubSubMenus, function(value, key){
                    if(angular.element(value).parent().hasClass("qb-menu-in-sub-menus"))
		            {
		                if(!(angular.element(value).hasClass("qb-menu-heading")))
		                {
		                    angular.element(value).addClass("qb-sub-sub-menus");
		                }
		            }
		        });
		        
		        return qbSubMenusEle;
    	    };
    	    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menus\">"+
		                "<div ng-if=\"qbMenusLoadFun\" ng-init=\"qbMenusLoadFun()\"></div>"+
		           "</div>";
		}
	}
}]);

myApp.directive('qbMenu',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.qbMenuLoadFun=function(){
		        var qbDiv=angular.element("<div></div>");
		        qbDiv.append(transclude());
		        var qbSubMenus=qbDiv.children();
		        var qbSubMenusExist=false;
		        angular.forEach(qbSubMenus, function(value, key){
	                if((angular.element(value)[0].nodeName)==="QB-MENUS")
	                {
	                    qbSubMenusExist=true;
	                }
	            }); 
	            if(qbSubMenusExist)
	            {
	                var qbSubMenusEle=angular.element("<div class=\"qbsubmenus\"></div>");
	                angular.forEach(qbSubMenus, function(value, key){
    	                if((angular.element(value)[0].nodeName)==="QB-MENUS")
    	                {
    	                    if((angular.element(value).attr("qb-menu-type"))==="sub")
    	                    {
    	                        var qbSubMenusRet=angular.element(value).children().scope().qbSubMenusLoadFun();
    	                        qbSubMenusEle.append(qbSubMenusRet.html());
    	                    }
    	                }
    	            }); 
    	            
    	            var qbMenuDiv=angular.element("<div></div>");
    	            var qbMenuHeading=angular.element(element).children().children();
    	            var qbSubMenusDiv=qbBasics.findChildren(angular.element(qbDiv),"QB-MENUS");
    	            qbDiv.children().remove();
    	            qbMenuHeading.append(qbDiv.html());
    	            qbMenuDiv.append(qbSubMenusDiv);
    	            angular.element(element).children().append(qbMenuDiv.html());
    	            
                    var qbMenuEle=angular.element("<div class=\"\"><div class=\"qb-menu\"></div></div>");
                    qbMenuEle.children().append(qbMenuHeading);
                    qbMenuEle.children().append(qbSubMenusEle.html());
                    if(attr.classes)
                    {
                        qbMenuEle.children().addClass(qbBasics.classCons(attr.classes));
                    }
                    return qbMenuEle;
	            }
	            else
	            {
	                angular.element(element).children().empty();
	                var qbAnchor=angular.element("<div class=\"qb-menu-heading\"><a href=\""+attr.qbLink+"\"></a></div>");
                    qbAnchor.children().append(qbDiv.html());
                    angular.element(element).children().append(qbAnchor);
                    var qbMenuEle=angular.element(element);
                    if(attr.classes)
                    {
                        qbMenuEle.children().addClass(qbBasics.classCons(attr.classes));
                    }
                    return qbMenuEle;
	            }
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menu\">"+
		                "<div class=\"qb-menu-heading\"></div>"+
		           "</div>";
		}
	}
}]);
//new one needs update

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
myApp.directive('qbMenu',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var term=0;
		    if(attr.openIcon)
		    {
		        var openIcon=qbBasics.classCons(attr.openIcon);
		    }
		    else
		        var openIcon="fa fa-caret-down";
		        
		    if(attr.closeIcon)
		    {
		        var closeIcon=qbBasics.classCons(attr.closeIcon);
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
		        }
		    };
		    
		    if((angular.element(element).parent().parent()[0].nodeName)==="QB-SUB-MENUS")
		        angular.element(element).children().addClass("qb-menu-c-1").removeClass("qb-menu");
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-menu\" ng-transclude ng-click=\"clickfun()\"> </div>";
		}
	}
}]);

myApp.directive('qbCloseIcon', function() {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.menuclose=function()
		    {
		        angular.element(element).parent().scope().menuclose();
		    };
		    
		    if(attr.classes)
		    {
		        var classL=qbBasics.classCons(attr.classes); 
		        angular.element(element).children().addClass(classL);
		    }
		    else
		    {
		        angular.element(element).children().addClass("fa fa-close");
		    }
		},
		template: function(element,attr){ 
		    return "<i ng-click=\"menuclose()\"></i>";
		}
	}
 });
 myApp.directive('qbIcon',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var child=angular.element(element).children();
		    if(attr.classes)
		    {
		        var classL=qbBasics.classCons(attr.classes); 
		        angular.element(element).children().addClass(classL);
		    }
		},
		template: function(element,attr){ 
		    return "<i></i>";
		}
	}
 }]);

//old menu before new one
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