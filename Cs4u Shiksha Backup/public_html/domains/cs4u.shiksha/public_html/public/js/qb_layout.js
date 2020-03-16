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

//header needs update
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

//old one not in use
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
/*
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
});*/

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

/*
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
*/