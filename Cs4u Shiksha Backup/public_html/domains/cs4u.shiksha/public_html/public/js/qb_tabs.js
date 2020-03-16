var myApp = angular.module("myApp", ['ngMessages']);

myApp.controller('myCtrl', ['$scope','$compile','qbAlert','qbWizard','qbTemp','php', function ($scope,$compile,qbAlert,qbWizard,qbTemp,php) {
    var alertEle;
    $scope.phpPostData;
    $scope.phpPost=function(){
        var filterData={
            table:"location_master",
            column:"Location_Master_City",
            fcolumn:"Status",
            fvalue:"1"
        }
        $scope.phpPostData=php.post("filter/filter",filterData);
    }
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
	$scope.yesFun=function()
	{
	    alert("Called Yes");
	}
	$scope.noFun=function()
	{
	    alert("Called No");
	}
	$scope.noFun=function()
	{
	    alert("Called No");
	}
	$scope.changeName=function(){
	    console.log(alertEle.scope.name);
	}
	$scope.changeFun=function(){
	    var inputEle=angular.element("<div><div>Enter New Name</div> <input ng-model=\"name\">{{name}}</div>");
	    alertEle=qbAlert.call({
	        title:{
	            content:"Input Change Test"
	        },
	        body:{
	            content:inputEle
	        },
	        buttonYes:{
	            content:"Change",
	            function:"changeName()"
	        },
	        buttonNo:{
	            content:"No",
	            function:"noFun()"
	        },
	        buttonCancel:{
	            content:"Abort"
	        }
	    });
	}
	$scope.myActiveFun=function()
	{
	    $scope.qbWiz=qbWizard.call();
	    var text=angular.element("<div><input type=\"text\"></div>");
	    qbAlert.call({
	        title:{
	            content:"Ayush",
	            class:"Ayush Agr Ayush",
	        },
	        body:{
	            content:"ZaranTech",
	            class:"Ayush Agr"
	        },
	        buttonYes:{
	            content:"Okay!",
	            class:"Ayush Agr",
	            function:"yesFun()"
	        },
	        buttonNo:{
	            content:"Noops!",
	            class:"Ayush Agr",
	            function:"noFun()"
	        },
	        buttonCancel:{
	            content:"Abort",
	            class:"Ayush Agr",
	            function:"myCancelFun()"
	        }
	    });
	}
	
	$scope.myCancelFun=function(){
	    alert("Called Cancel");
	    $scope.qbWiz.enable();
	}
}]);

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
        var qbAlertElement=qbAlertDiv.children().scope().qbAlertActiveFun(qbAlertEles);
        return qbAlertElement;
    }
});

myApp.service('qbWizard',function (){
    this.call=function(qbAlertData){
        console.log("hello!");
        var qbWiz={
            name:"ayush",
            enable:function(){
                console.log("Ayush");
            }
        }
        return qbWiz;
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

myApp.service('php',php);
php.$inject=['$http'];
function php($http)
{
    this.post=function(link,parameters){
        var linkParts=link.split("/");
        var phpPostData={
            transactionType:linkParts[1]
        }
        
        angular.forEach(parameters, function(value, key){
            phpPostData[key]=value;
        });
        
        $http({
            method:'POST',url:'../controllers/'+linkParts[0]+'.php',data:phpPostData
                }).then(function mySucces(response){
                     data=response.data;
                     console.log(data);
                },function myError(response){
                    alert(response.statusText);
                });
    }
}
//new project 11-10-2019
myApp.directive('tabs',tabs);
tabs.$inject=['$compile','qbBasics'];
function tabs($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbTabEles;
		    var qbTabs=[];
		    
		    var qbTabHeaderEles;
		    var qbTabHeaders=[];
		    
		    var qbTabContentEles;
		    var qbTabContents=[];
		    
		    //qbHeadingsStyle Data Formation.
		    var qbTabHeadersStyle={};
		    var qbTabHeadersStyleAttrs=attr.qbHeadersStyle.split(";");
		    angular.forEach(qbTabHeadersStyleAttrs, function(value,key){
		        var qbTabHeadingsStyleKey=value.split(":")[0];
		        var qbTabHeadingsStyleValue=value.split(":")[1];
		        qbTabHeadersStyle[qbTabHeadingsStyleKey]=qbTabHeadingsStyleValue;
		    });
		    
		    var qbTabsContainerStyles={
		        qbTabs:{},
		        qbTabHeaders:{},
		        qbTabContents:{}
		    }
		    
		    angular.element(document).ready(function(){
		        var qbDefNum=0;
		        qbTabEles=qbBasics.findChildren(element,"tab");
		        var num=0;
		        angular.forEach(qbTabEles, function(value, key){
		            var tabData=angular.element(value).children().scope().qbTabPropertyFun();
		            tabData.tabId="qb-tab-"+num;
		            tabData.ele.addClass(tabData.class);
		            if(tabData.default)
		            {
		                qbDefNum=num;
		            }
		            qbTabs.push(tabData);
		            num++;
		        });
		        
		        qbTabHeaderEles=qbBasics.findChildren(element,"tab-header");
		        num=0;
		        angular.forEach(qbTabHeaderEles, function(value, key){
		            var tabHeaderData=angular.element(value).children().scope().qbTabHeaderPropertyFun();
		            tabHeaderData.tabId="qb-tab-"+num;
		            tabHeaderData.ele.addClass(tabHeaderData.class);
		            
		            var refEle=angular.element("<div qb-tab-id=\"qb-tab-"+num+"\" style=\"float:left\" ng-click=\"qbTabHeaderClickFun($event)\"></div>");
		            refEle.addClass(tabHeaderData.class);
		            refEle.append(tabHeaderData.ele.html());
		            var compiledRefEle=$compile(qbBasics.compile(refEle))(scope);
		            angular.element(angular.element(element).children().children()[0]).append(compiledRefEle);
		            tabHeaderData.refEle=compiledRefEle;
		            
		            qbTabHeaders.push(tabHeaderData);
		            num++;
		        });
		        
		        qbTabContentEles=qbBasics.findChildren(element,"tab-content");
		        num=0;
		        angular.forEach(qbTabContentEles, function(value, key){
		            var tabContentData=angular.element(value).children().scope().qbTabContentPropertyFun();
		            tabContentData.tabId="qb-tab-"+num;
		            tabContentData.ele.addClass(tabContentData.class);
		            qbTabContents.push(tabContentData);
		            num++;
		        });
		        
		        num=0;
		        angular.forEach(qbTabs, function(value,key){
		            if(num===qbDefNum)
		            {
		                scope.qbTabOpenFun(num);
		            }
		            else
		            {
		                scope.qbTabCloseFun(num);
		            }
		            num++;
		        });
		        
		        //designing of tab headers
		        scope.designer=function(styleData){
		            
		        }
		        
		        var styleData={
		            elem:angular.element(element).children().children()[0],
		            hAlign:"left",
		            vAlign:"right",
		        };
		    });
		    
		    scope.qbTabHeaderClickFun=function(event){
		        var qbTargetTabId=angular.element(event.target).attr("qb-tab-id");
		        var num=0;
		        angular.forEach(qbTabs, function(value,key){
		            var qbTab=value;
		            if((qbTab.tabId)===qbTargetTabId)
		            {
		                scope.qbTabOpenFun(num);
		            }
		            else 
		            {
		                scope.qbTabCloseFun(num);
		            }
		            num++;
		        });
		    }
		    
		    scope.qbTabOpenFun=function(qbTabNum){
		        scope.qbTabHeaderActivate(qbTabHeaders[qbTabNum]);
		        qbTabContents[qbTabNum].open();
		    }
		    
		    scope.qbTabCloseFun=function(qbTabNum){
		        scope.qbTabHeaderDeactivate(qbTabHeaders[qbTabNum]);
		        qbTabContents[qbTabNum].close();
		    }
		    
		    scope.qbTabHeaderActivate=function(qbTabHeader){
		        qbTabHeader.refEle.addClass(qbTabHeader.activeClass);
		        qbTabHeader.refEle.removeClass(qbTabHeader.inactiveClass);
		    }
		    
		    scope.qbTabHeaderDeactivate=function(qbTabHeader){
		        qbTabHeader.refEle.addClass(qbTabHeader.inactiveClass);
		        qbTabHeader.refEle.removeClass(qbTabHeader.activeClass);
		    }
		    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\" style=\"width:100%\">"+
		                "<div class=\"qb-tab-headers\" style=\"width:100%\"></div>"+
		                "<div class=\"qb-tab-contents\" ng-transclude></div>"+
		           "</div>";
		}
	}
}

myApp.directive('tab',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbDefault;
		    if(attr.default)
		    {
		        if((attr.default)==="true")
		        {
		            qbDefault=true;
		        }
		        else
		        {
		            qbDefault=false;
		        }
		    }
		    else 
		    {
		        qbDefault=false;
		    }
		    scope.qbTabPropertyFun=function(){
		        var tabData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            tabId:"",
		            default:qbDefault
		        }
		        return tabData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('tabHeader',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbTabHeaderPropertyFun=function(){
		        var tabHeaderData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            refEle:"",
		            activeClass:angular.element(element).attr("qb-active-class"),
		            inactiveClass:angular.element(element).attr("qb-inactive-class"),
		            tabId:""
		        }
		        return tabHeaderData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-header\" style=\"display:none\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('tabContent',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var openClass=angular.element(element).attr("qb-open-class");
		    var closeClass=angular.element(element).attr("qb-close-class");
		    scope.qbTabContentPropertyFun=function(){
		        var tabContentData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            open:function(){
		                angular.element(element).children().addClass(openClass);
		                angular.element(element).children().removeClass(closeClass);
		            },
		            close:function(){
		                angular.element(element).children().addClass(closeClass);
		                angular.element(element).children().removeClass(openClass);
		            },
		            tabId:""
		        }
		        return tabContentData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-content\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbTabs',['qbBasics', function(qbBasics) {
    return {
	    scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbTabs=qbBasics.findChildren(angular.element(element),"QB-TAB");
		    var qbTabHeadings=qbBasics.findChildren(angular.element(element),"QB-TAB-HEADING");
		    var qbTabContents=qbBasics.findChildren(angular.element(element),"QB-TAB-CONTENT");
		    var numOfHeadings=qbTabHeadings.length;
		    scope.qbidies=[];
		    var i=0;
		    angular.forEach(qbTabs, function(value, key){
		        scope.qbidies.push("qb-tab-"+i);
		        angular.element(qbTabs[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        angular.element(qbTabHeadings[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        angular.element(qbTabContents[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        i++;
		    });
		    
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
            var headingAllign="";
            var headingSizeType="";
            var headingTotalWidth="";
            var headingComputedWidth="";
            var headingGivenWidth="";
            
            var headingPaddingRight="";
            var headingPaddingLeft="";
            var headingMarginRight="";
            var headingMarginLeft="";
            var headingBorderRight="";
            var headingBorderLeft="";
            
            if(attr.qbHeadingsStyle)
		    {
		        var qbHeadStyles=attr.qbHeadingsStyle.split(";");
		        angular.forEach(qbHeadStyles, function(value, key){
		            var qbHeadStyle="";
		            qbHeadStyle=value.split(":");
		            if((qbHeadStyle[0])==="allign")
		            {
		                if((qbHeadStyle[1])==="left")
		                {
		                    headingAllign="left";
		                }
		                else if((qbHeadStyle[1])==="right")
		                {
		                    headingAllign="right";
		                }
		                else if((qbHeadStyle[1])==="centre")
		                {
		                    headingAllign="centre";
		                }
		            }
		            else if((qbHeadStyle[0])==="size")
		            {
		                if((qbHeadStyle[1])==="equal")
		                {
		                    headingSizeType="equal";
		                    //angular.element(element).children().scope().headingSize(headSize,"equal");
		                }
		                else if((qbHeadStyle[1])==="auto")
		                {
		                    headingSizeType="auto";
		                }
		                else if((qbHeadStyle[1])==="fullfill")
		                {
		                    headingSizeType="fullfill";
		                }
		            }
		            else if((qbHeadStyle[0])==="total-width") 
		            {
		                if(qbHeadStyle[1])
		                {
		                    headingTotalWidth=parseFloat(qbHeadStyle[1]);
		                }
		            }
		        });
		        if(headingTotalWidth)
		        {
    	            var headingCont=angular.element(angular.element(element).children().children()[0]);
    	            headingComputedWidth=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('width'));
    	            headingGivenWidth=headingComputedWidth/100*headingTotalWidth;
    	            
    	            headingPaddingRight=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-right'));
    	            headingPaddingLeft=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-left'));
		        }
		        else
		        {
    	            var headingCont=angular.element(angular.element(element).children().children()[0]);
    	            headingComputedWidth=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('width'));
    	            headingGivenWidth=headingComputedWidth;
    	            
    	            headingPaddingRight=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-right'));
    	            headingPaddingLeft=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('padding-left'));
		        }
		    } 
		    
		    
		    var headingSize=0;
		    scope.headingStyle=function(headWidth){
		        //size type
		        if(headingSizeType==="fullfill")
		        {
		            if(headingTotalWidth)
        	        {
        	            var headingWidth=(headingGivenWidth)/(numOfHeadings);
        	            
        	            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		                angular.forEach(headingDivs, function(value, key){
        	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
        	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
        	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
        	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
        	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
        	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
        	                
        	                var thisCalculatedWidth=headingWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight);
        	                angular.element(value).css("width",thisCalculatedWidth+"px");
        	            });
        	        }
        	        else
        	        {
        	            var headingWidth=(headingGivenWidth)/(numOfHeadings);
        	            
        	            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		                angular.forEach(headingDivs, function(value, key){
        	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
        	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
        	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
        	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
        	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
        	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
        	                
        	                var thisCalculatedWidth=headingWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight);
        	                angular.element(value).css("width",thisCalculatedWidth+"px");
        	            });
        	        }
		        }
		        else if(headingSizeType==="equal")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            if(headWidth>headingSize)
    		        {
    		            headingSize=headWidth;
    		        }
    		        angular.forEach(headingDivs, function(value, key){
    	                //all values of padding margin border
    	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
    	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
    	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
    	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
    	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
    	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
    	                
    	                var thisTotalWidth=thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight+headingSize;
    	                angular.element(value).css("width",thisTotalWidth+"px");
    	            });   
		        }
		        else if(headingSizeType==="auto")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("width","auto");
    	            });
		        }
		        
		        //total width
		        if(headingTotalWidth)
		        {
		            
		        }
		        
		        // allignment
		        if(headingAllign==="left")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingRight=(headingComputedWidth-headingGivenWidth)+headingPaddingRight;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-right",paddingRight+"px");
    	            
    	        }
		        else if(headingAllign==="right")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingLeft=(headingComputedWidth-headingGivenWidth)+headingPaddingLeft;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-left",paddingLeft+"px");
		        }
		        else if(headingAllign==="centre")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingRight=((headingComputedWidth-headingGivenWidth)/2)+headingPaddingRight;
    	            var paddingLeft=((headingComputedWidth-headingGivenWidth)/2)+headingPaddingLeft;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-right",paddingRight+"px");
    	            angular.element(angular.element(element).children().children()[0]).css("padding-left",paddingLeft+"px");
		        }
		    };
		    
		    scope.headingloadfun=function(qbId){
		        var times=0;
		        var defattr=false;
		        var qbtabid="";
		        angular.forEach(qbTabs, function(value, key){
        	        if(((angular.element(value).attr("default"))==="open")&&(!times))
        	        {
        	           defattr=true;
        	           qbtabid=angular.element(value).children().attr("qb-tab-id");
        	           times=1;
        	        }
        	    });
        	    if(!(defattr))
        	    {
        	        qbtabid=angular.element(qbTabs[0]).children().attr("qb-tab-id");
        	    }
    		    angular.forEach(qbTabHeadings, function(value, key){
    		        var headId=angular.element(value).children().attr("qb-tab-id");
    		        if(headId===qbId)
    		        {
    		            angular.element(value).children().scope().openHeadingClass();
    		            var tabHeading=angular.element(value).children().scope().getHeading();
    		            var tabHeadingClass=angular.element(value).children().scope().headingClass();
    		            var thisHeadings=angular.element(element).children().children().children();
    		            angular.forEach(thisHeadings, function(value1, key1){
    		                if(angular.element(value1).scope().qbid)
    		                {
    		                    if((angular.element(value1).scope().qbid)===qbId)
    		                    {
    		                        angular.element(value1).attr("qb-tab-id",qbId);
    		                        angular.element(value1).addClass(tabHeadingClass);
    		                        angular.element(value1).append(tabHeading);
    		                        
    		                        var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('padding-left'));
                	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('padding-right'));
                	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('margin-left'));
                	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('margin-right'));
                	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('border-left'));
                	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('border-right'));
                	                
                	                var thisTotalWidth=thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight+headingSize;
                	                angular.element(element).children().scope().headingStyle(thisTotalWidth);
    		                    }
    		                }
    		            }); 
    		        }
    		        if(qbtabid===qbId)
    		        {
    		            angular.element(element).children().scope().clickfun(qbtabid);
    		        }
    		    }); 
		    };
		    
		    scope.clickfun=function(qbId){
		        angular.forEach(qbTabContents, function(value, key){
		            if((angular.element(value).children().attr("qb-tab-id"))===qbId)
		            {
		                angular.element(value).children().scope().tabopen();          
		            }
		            else
		            {
		                angular.element(value).children().scope().tabclose();
		            }
		        }); 
		        var thisHeadings=angular.element(element).children().children().children();
                angular.forEach(thisHeadings, function(value1, key){
                    if(angular.element(value1).hasClass("qb-tab-heading-active"))
                    {
                        angular.element(value1).removeClass("qb-tab-heading-active").addClass("qb-tab-heading-inactive");
                    }
                    if(angular.element(value1).scope().qbid)
                    {
                        if((angular.element(value1).scope().qbid)===qbId)
                        {
                            angular.element(value1).addClass("qb-tab-heading-active").removeClass("qb-tab-heading-inactive");
                        }
                    }
                });
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-tabs\">"+ 
		                "<div class=\"qb-tab-headings\" style=\"overflow:hidden;width:auto\">"+
		                    " <div ng-repeat=\"qbid in qbidies\" class=\"qb-tab-heading qb-tab-heading-inactive ng-isolate-scope ng-scope\" ng-init=\"headingloadfun(qbid)\" ng-click=\"clickfun(qbid)\" ></div> "+
		                "</div>"+
		                "<div class=\"qb-tab-contents\" ng-transclude ></div>"+
		            "</div>";
		}
	}
}]);
myApp.directive('qbTab',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
	    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\" ng-transclude ></div>";
		}
	}
}]);
myApp.directive('qbTabHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.headingClass=function(){
		        if(attr.classes)
    		    {
    		        var headingClass=qbBasics.classCons(attr.classes);
    		        return headingClass;
    		    }
    		    else
    		    {
    		        return undefined;
    		    }
		    };
		    scope.getHeading=function(){
		        return transclude();
		    };
		    scope.openHeadingClass=function(){
		        if(attr.qbTabOpenClasses)
		        {
		            var headingClass=qbBasics.classCons(attr.qbTabOpenClasses);
    		        return headingClass;
		        }
		        else
		        {
		            return undefined; 
		        }
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
		    scope.tabopen=function(){
		        angular.element(element).children().addClass("qb-tab-content-open").removeClass("qb-tab-content-close");
		    };
		    
		    scope.tabclose=function(){
		        angular.element(element).children().addClass("qb-tab-content-close").removeClass("qb-tab-content-open");
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-content\" ng-transclude></div>";
		}
	}
}]);

//Work On Progress Last Seen 16-07-19
/*
myApp.directive('qbTabs',['qbBasics', function(qbBasics) {
    return {
	    scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbTabs=qbBasics.findChildren(angular.element(element),"QB-TAB");
		    var qbTabHeadings=qbBasics.findChildren(angular.element(element),"QB-TAB-HEADING");
		    var qbTabContents=qbBasics.findChildren(angular.element(element),"QB-TAB-CONTENT");
		    var numOfHeadings=qbTabHeadings.length;
		    scope.qbidies=[];
		    var i=0;
		    angular.forEach(qbTabs, function(value, key){
		        scope.qbidies.push("qb-tab-"+i);
		        angular.element(qbTabs[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        angular.element(qbTabHeadings[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        angular.element(qbTabContents[i]).children().attr("qb-tab-id",scope.qbidies[i]);
		        i++;
		    });
		    
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
            var headingAllign="";
            var headingSizeType="";
            var headingTotalWidth="";
            var headingComputedWidth="";
            var headingGivenWidth="";
            if(attr.qbHeadingsStyle)
		    {
		        var qbHeadStyles=attr.qbHeadingsStyle.split(";");
		        angular.forEach(qbHeadStyles, function(value, key){
		            var qbHeadStyle="";
		            qbHeadStyle=value.split(":");
		            if((qbHeadStyle[0])==="allign")
		            {
		                if((qbHeadStyle[1])==="left")
		                {
		                    headingAllign="left";
		                }
		                else if((qbHeadStyle[1])==="right")
		                {
		                    headingAllign="right";
		                }
		                else if((qbHeadStyle[1])==="centre")
		                {
		                    headingAllign="centre";
		                }
		            }
		            else if((qbHeadStyle[0])==="size")
		            {
		                if((qbHeadStyle[1])==="equal")
		                {
		                    headingSizeType="equal";
		                    //angular.element(element).children().scope().headingSize(headSize,"equal");
		                }
		                else if((qbHeadStyle[1])==="auto")
		                {
		                    headingSizeType="auto";
		                }
		                else if((qbHeadStyle[1])==="fullfill")
		                {
		                    headingSizeType="fullfill";
		                }
		            }
		            else if((qbHeadStyle[0])==="total-width") 
		            {
		                if(qbHeadStyle[1])
		                {
		                    headingTotalWidth=qbHeadStyle[1];
		                }
		            }
		        });
		        if(headingTotalWidth)
		        {
		            var tempEle=angular.element("<div> hhd shuks kjh</div>");
		            tempEle[0].style.width=headingTotalWidth;
		            angular.element(element).append(tempEle);
		            headingGivenWidth=window.getComputedStyle(angular.element(element).children()[1], null).getPropertyValue('width');
    	            tempEle.remove();
    	            
    	            angular.element(element).children().children()[0].style.width="100%";
    	            var headingCont=angular.element(angular.element(element).children().children()[0]);
    	            headingComputedWidth=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('width'));
		        }
		        else
		        {
		            angular.element(element).children().children()[0].style.width="100%";
    	            var headingCont=angular.element(angular.element(element).children().children()[0]);
    	            headingComputedWidth=parseFloat(window.getComputedStyle(headingCont[0], null).getPropertyValue('width'));
		            headingGivenWidth=window.getComputedStyle(angular.element(element).children()[1], null).getPropertyValue('width');
		        }
		    } 
		    
		    
		    var headingSize=0;
		    scope.headingStyle=function(headWidth){
		        //size type
		        if(headingSizeType==="fullfill")
		        {
		            if(headingTotalWidth)
        	        {
        	            console.log(headingGivenWidth);
        	            var headingWidth=(headingGivenWidth)/(numOfHeadings);
        	            
        	            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		                angular.forEach(headingDivs, function(value, key){
        	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
        	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
        	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
        	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
        	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
        	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
        	                
        	                var thisCalculatedWidth=headingWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight);
        	                angular.element(value).children().css("width",thisCalculatedWidth+"px");
        	            });
        	        }
        	        else
        	        {
        	            console.log(headingGivenWidth);
        	            var headingWidth=(headingGivenWidth)/(numOfHeadings);
        	            
        	            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		                angular.forEach(headingDivs, function(value, key){
        	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
        	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
        	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
        	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
        	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
        	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
        	                
        	                var thisCalculatedWidth=headingWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight);
        	                angular.element(value).children().css("width",thisCalculatedWidth+"px");
        	            });
        	        }
		        }
		        else if(headingSizeType==="equal")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            if(headWidth>headingSize)
    		        {
    		            headingSize=headWidth;
    		        }
    		        angular.forEach(headingDivs, function(value, key){
    	                //all values of padding margin border
    	                var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-left'));
    	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('padding-right'));
    	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-left'));
    	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('margin-right'));
    	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-left'));
    	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value)[0], null).getPropertyValue('border-right'));
    	                
    	                var thisTotalWidth=thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight+headingSize;
    	                angular.element(value).children().css("width",thisTotalWidth+"px");
    	            });   
		        }
		        else if(headingSizeType==="auto")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("width","auto");
    	            });
		        }
		        
		        //total width
		        if(headingTotalWidth)
		        {
		            
		        }
		        
		        // allignment
		        if(headingAllign==="left")
		        {
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingRight=headingComputedWidth-headingGivenWidth;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-right",paddingRight+"px");
    	            
    	        }
		        else if(headingAllign==="right")
		        {
		            angular.element(element).children().children()[0].style.width="100%";
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var paddingLeft=headingComputedWidth-headingGivenWidth;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-left",paddingLeft+"px");
		        }
		        else if(headingAllign==="centre")
		        {
		            angular.element(element).children().children()[0].style.width="100%";
		            var headingDivs=angular.element(angular.element(element).children().children()[0]).children();
		            angular.forEach(headingDivs, function(value, key){
		                angular.element(value).css("float","left");
    	            });
    	            var padding=(headingComputedWidth-headingGivenWidth)/2;
    	            angular.element(angular.element(element).children().children()[0]).css("padding-right",padding+"px");
    	            angular.element(angular.element(element).children().children()[0]).css("padding-left",padding+"px");
		        }
		    };
		    
		    scope.headingloadfun=function(qbId){
		        var times=0;
		        var defattr=false;
		        var qbtabid="";
		        angular.forEach(qbTabs, function(value, key){
        	        if(((angular.element(value).attr("default"))==="open")&&(!times))
        	        {
        	           defattr=true;
        	           qbtabid=angular.element(value).children().attr("qb-tab-id");
        	           times=1;
        	        }
        	    });
        	    if(!(defattr))
        	    {
        	        qbtabid=angular.element(qbTabs[0]).children().attr("qb-tab-id");
        	    }
    		    angular.forEach(qbTabHeadings, function(value, key){
    		        var headId=angular.element(value).children().attr("qb-tab-id");
    		        if(headId===qbId)
    		        {
    		            angular.element(value).children().scope().openHeadingClass();
    		            var tabHeading=angular.element(value).children().scope().getHeading();
    		            var tabHeadingClass=angular.element(value).children().scope().headingClass();
    		            var thisHeadings=angular.element(element).children().children().children();
    		            angular.forEach(thisHeadings, function(value1, key1){
    		                if(angular.element(value1).scope().qbid)
    		                {
    		                    if((angular.element(value1).scope().qbid)===qbId)
    		                    {
    		                        angular.element(value1).attr("qb-tab-id",qbId);
    		                        angular.element(value1).children().addClass(tabHeadingClass);
    		                        angular.element(value1).children().append(tabHeading);
    		                        
    		                        var thisPaddingLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('padding-left'));
                	                var thisPaddingRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('padding-right'));
                	                var thisMarginLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('margin-left'));
                	                var thisMarginRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('margin-right'));
                	                var thisBorderLeft=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('border-left'));
                	                var thisBorderRight=parseFloat(window.getComputedStyle(angular.element(value1)[0], null).getPropertyValue('border-right'));
                	                
                	                var thisTotalWidth=thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderLeft+thisBorderRight+headingSize;
                	                angular.element(element).children().scope().headingStyle(thisTotalWidth);
    		                    }
    		                }
    		            }); 
    		        }
    		        if(qbtabid===qbId)
    		        {
    		            angular.element(element).children().scope().clickfun(qbtabid);
    		        }
    		    }); 
		    };
		    
		    scope.clickfun=function(qbId){
		        angular.forEach(qbTabContents, function(value, key){
		            if((angular.element(value).children().attr("qb-tab-id"))===qbId)
		            {
		                angular.element(value).children().scope().tabopen();          
		            }
		            else
		            {
		                angular.element(value).children().scope().tabclose();
		            }
		        }); 
		        var thisHeadings=angular.element(element).children().children().children();
                angular.forEach(thisHeadings, function(value1, key){
                    if(angular.element(value1).children().hasClass("qb-tab-heading-active"))
                    {
                        angular.element(value1).children().removeClass("qb-tab-heading-active").addClass("qb-tab-heading-inactive");
                    }
                    if(angular.element(value1).scope().qbid)
                    {
                        if((angular.element(value1).scope().qbid)===qbId)
                        {
                            angular.element(value1).children().addClass("qb-tab-heading-active").removeClass("qb-tab-heading-inactive");
                        }
                    }
                });
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-tabs\">"+ 
		                "<div class=\"qb-tab-headings\">"+
		                    " <div ng-repeat=\"qbid in qbidies\" class=\" ng-isolate-scope ng-scope\" ng-init=\"headingloadfun(qbid)\" ng-click=\"clickfun(qbid)\" ><div class=\"qb-tab-heading qb-tab-heading-inactive\"></div></div> "+
		                "</div>"+
		                "<div class=\"qb-tab-contents\" ng-transclude ></div>"+
		            "</div>";
		}
	}
}]);
myApp.directive('qbTab',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
	    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab\" ng-transclude ></div>";
		}
	}
}]);
myApp.directive('qbTabHeading',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    scope.headingClass=function(){
		        if(attr.classes)
    		    {
    		        var headingClass=qbBasics.classCons(attr.classes);
    		        return headingClass;
    		    }
    		    else
    		    {
    		        return undefined;
    		    }
		    };
		    scope.getHeading=function(){
		        return transclude();
		    };
		    scope.openHeadingClass=function(){
		        if(attr.qbTabOpenClasses)
		        {
		            var headingClass=qbBasics.classCons(attr.qbTabOpenClasses);
    		        return headingClass;
		        }
		        else
		        {
		            return undefined; 
		        }
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
		    scope.tabopen=function(){
		        angular.element(element).children().addClass("qb-tab-content-open").removeClass("qb-tab-content-close");
		    };
		    
		    scope.tabclose=function(){
		        angular.element(element).children().addClass("qb-tab-content-close").removeClass("qb-tab-content-open");
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-tab-content\" ng-transclude></div>";
		}
	}
}]);
*/
//its not working last seen on 23-03-19
/*myApp.directive('qbTabs',['qbBasics', function(qbBasics) {
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
		    return "<div class=\"qb-tabs\"> <div ng-repeat=\"heading in headings\" class=\"qb-tab-heading ng-isolate-scope ng-scope\" ng-click=\"tabopen(heading)\" ng-init=\"loadfun(heading)\"></div> </div> <div class=\"nothing\" ng-transclude ></div>";
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
		    return "<div class=\"qb-tab\" ng-transclude ></div>";
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
}]);*/

//last seen on 23-03-19
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


//it might work testing left
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