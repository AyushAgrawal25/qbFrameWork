var myApp = angular.module("myApp", ['ngMessages']);
myApp.controller('myCtrl', function($scope) {
    $scope.data1=["ayush","ishan","aman"];
    $scope.countries=["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    $scope.data2=["aman","raj","sanskar"];
	$scope.functest=function()
	{
		alert($scope.firstname);
	}
	$scope.combo=function()
	{
	    alert("sdajhgku");
	}
	$scope.myClick=function(data)
	{
	   $scope.value=data;
	}
	$scope.element;
	
});

myApp.service('qbBasics',qbBasics);
qbBasics.$inject=['$compile'];
function qbBasics($compile)
{
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
        var parName=pName.toUpperCase();
        var reqElement;
        while(con)
        {
            if((par[0].nodeName)===parName)
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
    this.findParentByClassName=function(pElement,pClassName){
        var par=angular.element(pElement).parent();
        var con=true;
        var reqElement;
        while(con)
        {
            if(par.hasClass(pClassName))
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
    
    this.contentsAlign=function(elem,hAlign,vAlign,widthType,heightType,contentsTotalWidth,contentHeight){
        var contsWidth=[];
        var contsHeight=[];
        var contents=angular.element(elem).children();
        if(hAlign)
        {
            if(hAlign=="left")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="left";
                 });
            }
            
            else if(hAlign==="middle")
            {
                if(widthType==="responsive")
                {
                    var totalWidth=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
    	                totalWidth=totalWidth+thisWidth;
    	                contsWidth[i]=thisWidth;
    	                i++;
	                });
	                var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                var paddingWidth=(parentWidth-totalWidth)/2;
	                var paddingPer=(paddingWidth/parentWidth)*100;
	                angular.element(elem).css("padding-left",paddingPer+"%");
	                angular.element(elem).css("padding-right",paddingPer+"%");
	                i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var widthPer=(contsWidth[i]/totalWidth)*100;
	                    angular.element(vCont).css("width",widthPer+"%");
	                    i++;
	                });
                }
                else if(widthType==="static")
                {
                    var totalWidth=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
    	                totalWidth=totalWidth+thisWidth;
    	                contsWidth[i]=thisWidth;
    	                i++;
	                });
	                var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                var paddingWidth=(parentWidth-totalWidth)/2;
	                angular.element(elem).css("padding-left",paddingWidth+"px");
	                angular.element(elem).css("padding-right",paddingWidth+"px");
                }
            }
            
            else if(hAlign==="right")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="right";
                 });
            }
        }
        
        if(vAlign)
        {
            if(vAlign==="top")
            {
                
            }
            else if(vAlign==="centre")
            {
                if(heightType==="responsive")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
    	                contsHeight[i]=thisHeight;
    	                if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
    	                i++;
	                });
	            
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                var paddingPer=(paddingHeight/parentHeight)*100;
	                angular.element(elem).css("padding-top",paddingPer+"%");
	                angular.element(elem).css("padding-bottom",paddingPer+"%");
	                
	                i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var heightPer=(contsHeight[i]/lHeight)*100;
	                    angular.element(vCont).css("height",heightPer+"%");
	                    i++;
	                });
                }
                else if(heightType==="static")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
	                    if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
	                });
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                angular.element(elem).css("padding-top",paddingHeight+"px");
	                angular.element(elem).css("padding-bottom",paddingHeight+"px");
                }
            }
            else if(vAlign==="bottom")
            {
                
            }
        }
    }
    
    this.contentsAlignResize=function(elem,hAlign,vAlign,widthType,heightType,contentsTotalWidth,contentHeight){
        var contsWidth=[];
        var contents=angular.element(elem).children();
        if(hAlign)
        {
            if(hAlign=="left")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="left";
                 });
            }
            
            else if(hAlign==="middle")
            {
                if(hAlign==="middle")
	            {
	                if(widthType==="static")
	                {
	                    if(contentsTotalWidth)
	                    {
	                        var parentWidth=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('width'));
	                        var paddingWidth=(parentWidth-contentsTotalWidth)/2;
                            angular.element(elem).css("padding-left",paddingWidth+"px");
    		                angular.element(elem).css("padding-right",paddingWidth+"px");
	                    }
	                }
	            }
            }
            
            else if(hAlign==="right")
            {
                angular.forEach(contents, function(vCont, kCont){
                     angular.element(vCont)[0].style.float="right";
                 });
            }
        }
        
        if(vAlign)
        {
            if(vAlign==="top")
            {
                
            }
            else if(vAlign==="centre")
            {
                if(heightType==="static")
                {
                    var lHeight=0;
	                var i=0;
	                angular.forEach(contents, function(vCont, kCont){
	                    var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
	                    if(lHeight<thisHeight)
    	                {
    	                    lHeight=thisHeight;
    	                }
	                });
	                var parentHeight=parseFloat(window.getComputedStyle(angular.element(elem)[0], null).getPropertyValue('height'));
	                var paddingHeight=(parentHeight-lHeight)/2;
	                angular.element(elem).css("padding-top",paddingHeight+"px");
	                angular.element(elem).css("padding-bottom",paddingHeight+"px");
                }
            }
            else if(vAlign==="bottom")
            {
                
            }
            
        }
    }
    
    this.compile=function(ele){
        var scope=angular.element(document.querySelector("qb-compile")).children().scope().qbCompileFun();
        var qbCompileEle=$compile(ele)(scope);
        return qbCompileEle;
    }   
}
myApp.service('qbAlert',function (){
    this.call=function(qbAlertData){
        var qbAlertEles={
            title:"",
            body:"",
            buttonYes:"",
            buttonNo:"",
            buttonCancel:""
        }
        if(qbAlertData.title.content)
        {
            var qbAlertTitle=angular.element("<div class=\"qb-alert-title\"></div>");
            if(qbAlertData.title.class)
            {
                angular.element(qbAlertTitle).addClass(qbAlertData.title.class);
            }
            qbAlertTitle.append(qbAlertData.title.content);
            qbAlertEles.title=qbAlertTitle;
        }
        
        if(qbAlertData.body.content)
        {
            var qbAlertBody=angular.element("<div class=\"qb-alert-body\"></div>");
            if(qbAlertData.body.class)
            {
                angular.element(qbAlertBody).addClass(qbAlertData.body.class);
            }
            qbAlertBody.append(qbAlertData.body.content);
            qbAlertEles.body=qbAlertBody;
        }
        
        if(qbAlertData.buttonYes.content)
        {
            if(qbAlertData.buttonYes.function)
            {
                var qbAlertButtonYes=angular.element("<button class=\"qb-alert-button-yes\" ng-click=\""+qbAlertData.buttonYes.function+"\"></button>");
                qbAlertButtonYes.append(qbAlertData.buttonYes.content);
            }
            else 
            {
                var qbAlertButtonYes=angular.element("<button class=\"qb-alert-button-yes\" ng-click=\"qbAlertButtonYesFun()\"></button>");
                qbAlertButtonYes.append(qbAlertData.buttonYes.content);
            }
            if(qbAlertData.buttonYes.class)
            {
                qbAlertButtonYes.addClass(qbAlertData.buttonYes.class);
            }
            qbAlertEles.buttonYes=qbAlertButtonYes;
        }
        
        if(qbAlertData.buttonNo.content)
        {
            if(qbAlertData.buttonNo.function)
            {
                var qbAlertButtonNo=angular.element("<button class=\"qb-alert-button-no\" ng-click=\""+qbAlertData.buttonNo.function+"\"></button>");
                qbAlertButtonNo.append(qbAlertData.buttonNo.content);
            }
            else 
            {
                var qbAlertButtonNo=angular.element("<button class=\"qb-alert-button-no\" ng-click=\"qbAlertButtonNoFun()\"></button>");
                qbAlertButtonNo.append(qbAlertData.buttonNo.content);
            }
            if(qbAlertData.buttonNo.class)
            {
                qbAlertButtonNo.addClass(qbAlertData.buttonNo.class);
            }
            qbAlertEles.buttonNo=qbAlertButtonNo;
        }
        
        if(qbAlertData.buttonCancel.content)
        {
            if(qbAlertData.buttonCancel.function)
            {
                var qbAlertButtonCancel=angular.element("<button class=\"qb-alert-button-cancel\" ng-click=\"qbAlertCancelFun();"+qbAlertData.buttonCancel.function+"\"></button>");
                qbAlertButtonCancel.append(qbAlertData.buttonCancel.content);
            }
            else
            {
                var qbAlertButtonCancel=angular.element("<button class=\"qb-alert-button-cancel\" ng-click=\"qbAlertCancelFun()\"></button>");
                qbAlertButtonCancel.append(qbAlertData.buttonCancel.content);
            }
            qbAlertEles.buttonCancel=qbAlertButtonCancel;
        }
        
        var qbAlertDiv=angular.element(document.querySelector("qb-alert"));
        qbAlertDiv.children().scope().qbAlertActiveFun(qbAlertEles);
        
        var qbAlertTest=angular.element(document.querySelector("#qbAlertTest"));
    }
});

myApp.service('qbDataBase',qbDataBase);
qbDataBase.$inject=['$http'];
function qbDataBase($http)
{
    this.arrayData= function (tabName,colName,fColName,fVal) {
        var arrData;
        var filter_data={table:tabName,column:colName,fcolumn:fColName,fvalue:fVal};
        
        $http({
        method:'POST',url:'../controllers/filter.php',data:filter_data
            }).then(function mySucces(response){
               arrData=response.data;
               alert(arrData);
            },function myError(response){
                alert(response.statusText);
        });
    }   
}

// latest project 06-09-19
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
    		        var qbBar=qbBasics.findParent(angular.element(element),"qb-bar");
    		        var qbShowMenusAll=qbBar[0].querySelectorAll("qb-show-menus");
    		        angular.forEach(qbShowMenusAll, function(value, key){
    		            angular.element(value).children().scope().qbMenusCloseFun();
    		        }); 
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
		                var qbIconMenusAppendEle=qbBasics.compile(angular.element(qbMainMenuDiv));
		                angular.element(value).children().append(qbIconMenusAppendEle);
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
		                var qbLeftMenusAppendEle=qbBasics.compile(angular.element(qbMainMenuDiv));
		                angular.element(value).children().append(qbLeftMenusAppendEle);
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
                        var qbTopMenusAppendEle=qbBasics.compile(angular.element(qbMainMenuDiv));
		                angular.element(value).children().append(qbTopMenusAppendEle);
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
		    return "<div class=\"qb-menus\" style=\"display:none\">"+
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
	                var qbContent;
	                if(attr.qbLink)
	                {
	                    qbContent=angular.element("<div class=\"qb-menu-heading\"><a class=\""+attr.qbAnchorClass+"\" href=\""+attr.qbLink+"\"></a></div>");
	                    qbContent.children().append(qbDiv.html());
	                }
	                else
	                {
	                    qbContent=angular.element("<div class=\"qb-menu-heading\"></div>");
	                    qbContent.append(qbDiv.html());
	                }
                    angular.element(element).children().append(qbContent);
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