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

//latest version 29-05-2019
myApp.directive('qbModal',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.qbModalLoadFun=function(){
		        var qbModalEle=angular.element("<div></div>");
		        qbModalEle.append(transclude());
		        var qbModalEleConts=qbModalEle.children();
		        angular.forEach(qbModalEleConts, function(value, key){
		            if((angular.element(value)[0].nodeName)==="QB-MODAL-CLOSE-BUTTON")
		            {
		                var qbModalCloseButton=angular.element("<button class=\"qb-modal-close-button\"></button>");
		                qbModalCloseButton.append(angular.element(value).html());
		                qbModalCloseButton.bind("click",function(event){
		                    angular.element(element).children().scope().qbModalCloseFun();
		                });
		                var qbModalChildren=angular.element(element).children().children();
		                angular.forEach(qbModalChildren, function(vModal, key){
		                    if(angular.element(vModal).hasClass("qb-modal-content"))
		                    {
		                        angular.element(vModal).append(qbModalCloseButton);
		                    }
		                });
		            }
		            else if((angular.element(value)[0].nodeName)==="QB-MODAL-CONTENT")
		            {
		                var qbModalChildren=angular.element(element).children().children();
		                angular.forEach(qbModalChildren, function(vModal, key){
		                    if(angular.element(vModal).hasClass("qb-modal-content"))
		                    {
		                        angular.element(vModal).append(angular.element(value).html());
		                    }
		                });
		            }
		            else if((angular.element(value)[0].nodeName)==="QB-MODAL-OPEN-BUTTON")
		            {
		                var qbModalOpenButton=angular.element("<button class=\"qb-modal-open-button\"></button>");
		                qbModalOpenButton.append(angular.element(value).html());
		                qbModalOpenButton.bind("click",function(event){
		                    angular.element(element).children().scope().qbModalOpenFun();
		                });
		                angular.element(angular.element(element).children()).prepend(qbModalOpenButton);
		            } 
		        });
		    };
		    
		    scope.qbModalOpenFun=function(){
		        var qbModalChildren=angular.element(element).children().children();
		        angular.forEach(qbModalChildren, function(vModal, key){
                    if(angular.element(vModal).hasClass("qb-modal-content"))
                    {
                        angular.element(vModal).addClass("qb-modal-content-open");
                        angular.element(vModal).removeClass("qb-modal-content-close");
                    }
                });
		    };
		    
		    scope.qbModalCloseFun=function(){
		        var qbModalChildren=angular.element(element).children().children();
		        angular.forEach(qbModalChildren, function(vModal, key){
                    if(angular.element(vModal).hasClass("qb-modal-content"))
                    {
                        angular.element(vModal).addClass("qb-modal-content-close");
                        angular.element(vModal).removeClass("qb-modal-content-open");
                    }
                });
		    };
		},
		template: function(element,attr){
		    return "<div class=\"qb-modal\" ng-if=\"qbModalLoadFun\" ng-init=\"qbModalLoadFun()\">"+
		                "<div class=\"qb-modal-content qb-modal-content-close\">"+
		                "</div>"+
		           "</div>"
		}
    }
}]);

//working last seen on 23-03-19
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
/*myApp.directive('qbModal', function() {
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
 });*/