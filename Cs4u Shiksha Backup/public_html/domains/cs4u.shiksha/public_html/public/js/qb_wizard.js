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
                },function myError(response){
                    alert(response.statusText);
                });
    }
}

myApp.directive('qbWizard',qbWizard);
qbWizard.$inject=['$compile','qbBasics'];
function qbWizard($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbWizardPanelEles;
		    var qbWizardPanels=[];
		    
		    var qbWizardPanelHeaderEles;
		    var qbWizardPanelHeaders=[];
		    
		    var qbWizardPanelContentEles;
		    var qbWizardPanelContents=[];
		    
		    angular.element(document).ready(function(){
		        var qbDefNum=0;
		        qbWizardPanelEles=qbBasics.findChildren(element,"qb-wizard-panel");
		        var num=0;
		        angular.forEach(qbWizardPanelEles, function(value, key){
		            var panelData=angular.element(value).children().scope().qbWizardPanelPropertyFun();
		            panelData.panelId="qb-wizard-panel-"+num;
		            panelData.ele.addClass(panelData.class);
		            if(panelData.default)
		            {
		                qbDefNum=num;
		            }
		            qbWizardPanels.push(panelData);
		            num++;
		        });
		        
		        qbWizardPanelHeaderEles=qbBasics.findChildren(element,"qb-wizard-panel-header");
		        num=0;
		        angular.forEach(qbWizardPanelHeaderEles, function(value, key){
		            var panelHeaderData=angular.element(value).children().scope().qbWizardPanelHeaderPropertyFun();
		            panelHeaderData.panelId="qb-wizard-panel-"+num;
		            panelHeaderData.ele.addClass(panelHeaderData.class);
		            
		            var refEle=angular.element("<div qb-wizard-panel-id=\"qb-wizard-panel-"+num+"\" ng-click=\"qbWizardPanelHeaderClickFun($event)\"></div>");
		            refEle.addClass(panelHeaderData.class);
		            refEle.append(panelHeaderData.ele.html());
		            var compiledRefEle=$compile(qbBasics.compile(refEle))(scope);
		            angular.element(angular.element(element).children().children()[0]).append(compiledRefEle);
		            panelHeaderData.refEle=compiledRefEle;
		            
		            qbWizardPanelHeaders.push(panelHeaderData);
		            num++;
		        });
		        
		        qbWizardPanelContentEles=qbBasics.findChildren(element,"qb-wizard-panel-content");
		        num=0;
		        angular.forEach(qbWizardPanelContentEles, function(value, key){
		            var panelContentData=angular.element(value).children().scope().qbWizardPanelContentPropertyFun();
		            panelContentData.panelId="qb-wizard-panel-"+num;
		            panelContentData.ele.addClass(panelContentData.class);
		            qbWizardPanelContents.push(panelContentData);
		            num++;
		        });
		        
		        num=0;
		        angular.forEach(qbWizardPanels, function(value,key){
		            if(num===qbDefNum)
		            {
		                scope.qbWizardPanelOpenFun(num);
		            }
		            else
		            {
		                scope.qbWizardPanelCloseFun(num);
		            }
		            num++;
		        });
		        
		    });
		    
		    scope.qbWizardPanelHeaderClickFun=function(event){
		        var qbTargetPanelId=angular.element(event.target).attr("qb-wizard-panel-id");
		        var num=0;
		        angular.forEach(qbWizardPanels, function(value,key){
		            var qbWizardPanel=value;
		            if((qbWizardPanel.panelId)===qbTargetPanelId)
		            {
		                scope.qbWizardPanelOpenFun(num);
		            }
		            else 
		            {
		                scope.qbWizardPanelCloseFun(num);
		            }
		            num++;
		        });
		    }
		    
		    scope.qbWizardPanelOpenFun=function(qbWizardPanelNum){
		        scope.qbWizardPanelHeaderActivate(qbWizardPanelHeaders[qbWizardPanelNum]);
		        qbWizardPanelContents[qbWizardPanelNum].open();
		    }
		    
		    scope.qbWizardPanelCloseFun=function(qbWizardPanelNum){
		        scope.qbWizardPanelHeaderDeactivate(qbWizardPanelHeaders[qbWizardPanelNum]);
		        qbWizardPanelContents[qbWizardPanelNum].close();
		    }
		    
		    scope.qbWizardPanelHeaderActivate=function(qbWizardPanelHeader){
		        qbWizardPanelHeader.refEle.addClass(qbWizardPanelHeader.activeClass);
		        qbWizardPanelHeader.refEle.removeClass(qbWizardPanelHeader.inactiveClass);
		    }
		    
		    scope.qbWizardPanelHeaderDeactivate=function(qbWizardPanelHeader){
		        qbWizardPanelHeader.refEle.addClass(qbWizardPanelHeader.inactiveClass);
		        qbWizardPanelHeader.refEle.removeClass(qbWizardPanelHeader.activeClass);
		    }
		    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard\">"+
		                "<div class=\"qb-wizard-headers\"></div>"+
		                "<div class=\"qb-wizard-contents\" ng-transclude></div>"+
		           "</div>";
		}
	}
}

myApp.directive('qbWizardPanel',['qbBasics', function(qbBasics) {
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
		    scope.qbWizardPanelPropertyFun=function(){
		        var panelData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            panelId:"",
		            default:qbDefault,
		            fun:function(){
		                console.log(angular.element(element).children());
		            }
		        }
		        return panelData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard-panel\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbWizardPanelHeader',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbWizardPanelHeaderPropertyFun=function(){
		        var panelData={
		            class:angular.element(element).attr("qb-class"),
		            ele:angular.element(element).children(),
		            refEle:"",
		            activeClass:angular.element(element).attr("qb-active-class"),
		            inactiveClass:angular.element(element).attr("qb-inactive-class"),
		            panelId:""
		        }
		        return panelData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard-panel-header\" style=\"display:none\" ng-transclude></div>";
		}
	}
}]);

myApp.directive('qbWizardPanelContent',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var openClass=angular.element(element).attr("qb-open-class");
		    var closeClass=angular.element(element).attr("qb-close-class");
		    scope.qbWizardPanelContentPropertyFun=function(){
		        var panelData={
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
		            panelId:""
		        }
		        return panelData;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-wizard-panel-content\" ng-transclude></div>";
		}
	}
}]);
