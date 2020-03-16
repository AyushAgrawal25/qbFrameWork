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

myApp.directive('qbAlert',qbAlert);
qbAlert.$inject=['$compile','qbBasics'];
function qbAlert($compile,qbBasics)
{
    return {
		transclude: true,
		link: function(scope,element,attr){
		    var qbAlertDiv=angular.element(element).children()[0];
		    var qbFocusEles;
		    var hasFocus=0;
		    
		    if(attr.qbAlertBackcoverClass)
		    {
		        angular.element(element).children().addClass(attr.qbAlertBackcoverClass);
		    }
		    if(attr.qbAlertClass)
		    {
		        angular.element(qbAlertDiv).children().addClass(attr.qbAlertBackcoverClass);
		    }
		    
		    scope.qbAlertActiveFun=function(qbAlertEles){
		        var qbWidth=0;
		        if(attr.qbWidth[(attr.qbWidth.length)-1]==="%")
		        {
		            qbWidth=parseFloat(attr.qbWidth)*(window.innerWidth)/100;
		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
		        }
		        else if((attr.qbWidth[(attr.qbWidth.length)-2]+attr.qbWidth[(attr.qbWidth.length)-1])==="px")
		        {
		            qbWidth=parseFloat(attr.qbWidth);
		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
		        }
		        
		        var qbHeight=0;
		        if(attr.qbHeight[(attr.qbHeight.length)-1]==="%")
		        {
		            qbHeight=parseFloat(attr.qbHeight)*(window.innerHeight)/100;
		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
		        }
		        else if((attr.qbHeight[(attr.qbHeight.length)-2]+attr.qbHeight[(attr.qbHeight.length)-1])==="px")
		        {
		            qbHeight=parseFloat(attr.qbHeight);
		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
		        }
		        
		        angular.element(qbAlertDiv).children().css("display","block");
    		    angular.element(qbAlertDiv).addClass("qb-alert-backcover-active").removeClass("qb-alert-backcover-inactive");
		        qbBasics.contentsAlign(qbAlertDiv,"middle","centre","static","static",qbWidth,attr.qbHeight);
		        
    		    var win = angular.element(window);
    		    win.bind("resize",function(){
    		        if(attr.qbWidth[(attr.qbWidth.length)-1]==="%")
    		        {
    		            qbWidth=parseFloat(attr.qbWidth)*(window.innerWidth)/100;
    		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
    		        }
    		        else if((attr.qbWidth[(attr.qbWidth.length)-2]+attr.qbWidth[(attr.qbWidth.length)-1])==="px")
    		        {
    		            qbWidth=parseFloat(attr.qbWidth);
    		            angular.element(qbAlertDiv).children().css("width",qbWidth+"px");
    		        }
    		        
    		        if(attr.qbHeight[(attr.qbHeight.length)-1]==="%")
    		        {
    		            qbHeight=parseFloat(attr.qbHeight)*(window.innerHeight)/100;
    		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
    		        }
    		        else if((attr.qbHeight[(attr.qbHeight.length)-2]+attr.qbHeight[(attr.qbHeight.length)-1])==="px")
    		        {
    		            qbHeight=parseFloat(attr.qbHeight);
    		            angular.element(qbAlertDiv).children().css("height",qbHeight+"px");
    		        }
    		        qbBasics.contentsAlignResize(qbAlertDiv,"middle","centre","static","static",qbWidth,attr.qbHeight);
    		    });
    		    
    		    angular.element(qbAlertDiv).children().empty();
    		    angular.forEach(qbAlertEles, function(value, key){
    		        if(value)
    		        {
    		            angular.element(qbAlertDiv).children().append($compile(angular.element(value))(scope));
    		        }
    		    });
    		    
		        angular.element(qbAlertDiv).children()[0].focus();
		        
		        qbFocusEles=qbAlertDiv.querySelectorAll("button, [href], input, select, textarea, *[tabindex='-1']");
		       
		    };
		    
		    scope.qbAlertCancelFun=function(){
		        angular.element(qbAlertDiv).addClass("qb-alert-backcover-inactive").removeClass("qb-alert-backcover-active");
		        angular.element(qbAlertDiv).children().css("display","none");
    		    angular.element(qbAlertDiv).children().empty();
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-alert-backcover qb-alert-backcover-inactive\" tabindex=\"-1\">"+
		                "<div class=\"qb-alert\" tabindex=\"-1\"></div>"+
		            "</div>";
		}
	}   
}


myApp.directive('qbAlert2',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.loadfun=function(){
		        //insert before
		        if(attr.qbIcon)
		        {
		            var iconClass=qbBasics.classCons(attr.qbIcon);
		            angular.element(element).children().children().addClass(iconClass);
		        }
		        else
		        {
		            angular.element(element).children().children().addClass("fa fa-close")
		        }
		        
		        angular.element(element).children().children()[0].addEventListener("click",function(event){
		            angular.element(element).children()[0].style.display="none";
		        });
		        angular.element(element).children().prepend(transclude());
		        var qbAlertName=angular.element("<strong>"+attr.qbName+"</strong>");
		        angular.element(element).children().prepend(qbAlertName);
		    };
		    
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-alert\"  ng-if=\"loadfun\" ng-init=\"loadfun()\" >"+
                        "<i class=\"qb-alert-icon\"></i>"+
                    "</div>";
		}
	}
}]);
//created on 22-04-2019
myApp.directive('qbAlert',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.loadfun=function(){
		        //insert before
		        if(attr.qbIcon)
		        {
		            var iconClass=qbBasics.classCons(attr.qbIcon);
		            angular.element(element).children().children().addClass(iconClass);
		        }
		        else
		        {
		            angular.element(element).children().children().addClass("fa fa-close")
		        }
		        
		        angular.element(element).children().children()[0].addEventListener("click",function(event){
		            angular.element(element).children()[0].style.display="none";
		        });
		        angular.element(element).children().prepend(transclude());
		        var qbAlertName=angular.element("<strong>"+attr.qbName+"</strong>");
		        angular.element(element).children().prepend(qbAlertName);
		    };
		    
		    scope.closefun=function(){
		        alert("l;kqjckh");
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-alert\"  ng-if=\"loadfun\" ng-init=\"loadfun()\" >"+
                        "<i class=\"qb-alert-icon\" ng-click=\"closefun()\"></i>"+
                    "</div>";
		}
	}
}]);