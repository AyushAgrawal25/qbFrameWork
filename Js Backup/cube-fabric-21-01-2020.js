var myApp = angular.module('qbApp', []);
myApp.controller('qbCtrl', function($scope,$interval) {
    var imgSections=document.querySelectorAll(".section");

    var qbLandscapeFun=function(imgWidth,imgHeight,type){
        if(type=="land")
        {
            var stageDiv=document.querySelector(".stage");
            var imgDivHeight=(stageDiv.offsetWidth*imgHeight)/(imgWidth*2);
            
            angular.forEach(imgSections,function(value,key){
                angular.element(value).css("display","table-cell");
                angular.element(value).css("width","50%");
                angular.element(value).css("height",imgDivHeight+"px");
            });
        }
        else if(type=="port")
        {
            var stageDiv=document.querySelector(".stage");
            var imgDivHeight=stageDiv.offsetWidth/(imgWidth/imgHeight);
            
            angular.forEach(imgSections,function(value,key){
                angular.element(value).css("display","table-row");
                angular.element(value).css("width","100%");
                angular.element(value).css("height",imgDivHeight+"px");
            });
        }
    }
    var qbSquareFun=function(imgWidth,imgHeight,type){
        if(type=="land")
        {
            var stageDiv=document.querySelector(".stage");
            var imgDivHeight=(stageDiv.offsetWidth*imgHeight)/(imgWidth*2);
            
            angular.forEach(imgSections,function(value,key){
                angular.element(value).css("display","table-cell");
                angular.element(value).css("width","50%");
                angular.element(value).css("height",imgDivHeight+"px");
            });
        }
        else if(type=="port")
        {
            var stageDiv=document.querySelector(".stage");
            var imgDivHeight=stageDiv.offsetWidth/(imgWidth/imgHeight);
            
            angular.forEach(imgSections,function(value,key){
                angular.element(value).css("display","table-row");
                angular.element(value).css("width","100%");
                angular.element(value).css("height",imgDivHeight+"px");
            });
        }
    }
    var qbPortraitFun=function(imgWidth,imgHeight,type){
        var stageDiv=document.querySelector(".stage");
        var widthFlag=0;
        var stageDivWidth=parseFloat(window.getComputedStyle(stageDiv, null).getPropertyValue('width'));
        var heightAccStage=(stageDivWidth*imgHeight)/(imgWidth*2);
        var heightAccWindow=window.innerHeight*0.8;
        var widthAccStage=stageDivWidth/2;
        var widthAccWindow=(window.innerHeight*0.8*imgWidth)/(imgHeight);

        var finalWidth;
        var finalHeight;

        if(widthAccStage>=widthAccWindow)
        {
            finalHeight=heightAccWindow;
            finalWidth=widthAccWindow;
        }
        else
        {
            widthFlag=1;
            finalHeight=heightAccStage;
            finalWidth=widthAccStage;
        }

        angular.forEach(imgSections,function(value,key){
            angular.element(value).css("display","table-cell");
            angular.element(value).css("width","50%");
            if(angular.element(value).children().hasClass("sec-content"))
            {
                angular.element(value).children().css("width",finalWidth+"px");
            }
            angular.element(value).css("height",finalHeight+"px");
        });
    }

    var qbSetImgFun=function(type){
        if(imgEle[0].width>imgEle[0].height)
        {
            qbLandscapeFun(imgEle[0].width,imgEle[0].height,type);
        }
        else if(imgEle[0].width==imgEle[0].height)
        {
            qbSquareFun(imgEle[0].width,imgEle[0].height,type);
        }
        else if(imgEle[0].width<imgEle[0].height)
        {
            qbPortraitFun(imgEle[0].width,imgEle[0].height,type);
        }
    }

    angular.element(window).bind("resize",function(){
        if(window.innerWidth>900)
        {
            qbSetImgFun("land");
        }
        else
        {
            qbSetImgFun("port");
        }
    })
    var imgEle=angular.element(document.querySelector("#imgEle"));
    imgEle.ready(function(){
        if(window.innerWidth>900)
        {
            qbSetImgFun("land");
        }
        else
        {
            qbSetImgFun("port");
        }
	})

	//Cropper Drag 
	
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
    
    this.setInnerWidth=function(ele,outterWidth){
        var cont=angular.element(ele)[0];
        
        var thisPaddingLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left'));
        var thisPaddingRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right'));
        var thisMarginLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left'));
        var thisMarginRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right'));
        var thisBorderLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left'));
        var thisBorderRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right'));
        
        var innerWidth=outterWidth-(thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderRight+thisBorderLeft);
        cont.style.width=innerWidth+"px";
	}
	
	this.getRespPercents=function(ele,outterWidth){
		var cont=angular.element(ele)[0];

		var thisPaddingLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left')))/outterWidth;
		var thisPaddingRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right')))/outterWidth;
		var thisMarginLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left')))/outterWidth;
		var thisMarginRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right')))/outterWidth;
		var thisBorderLeftPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left')))/outterWidth;
		var thisBorderRightPer=(parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right')))/outterWidth;

		var thisInnerWidth=1-(thisPaddingLeftPer+thisPaddingRightPer+thisMarginLeftPer+thisMarginRightPer+thisBorderLeftPer+thisBorderRightPer);

		return {
			paddingLeft: thisPaddingLeftPer,
			paddingRight: thisPaddingRightPer,
			marginLeft: thisMarginLeftPer,
			marginRight: thisMarginRightPer,
			borderLeft: thisBorderLeftPer,
			borderRight: thisBorderRightPer,
			innerWidth: thisInnerWidth
		}
	}

	this.setRespPercents=function(ele,outterWidth,respPercents){
		var cont=angular.element(ele)[0];

		angular.element(cont).css('padding-left',(respPercents.paddingLeft*outterWidth)+"px");
		angular.element(cont).css('padding-right',(respPercents.paddingRight*outterWidth)+"px");
		angular.element(cont).css('border-left',(respPercents.borderLeft*outterWidth)+"px");
		angular.element(cont).css('border-right',(respPercents.borderRight*outterWidth)+"px");
		angular.element(cont).css('margin-left',(respPercents.marginLeft*outterWidth)+"px");
		angular.element(cont).css('margin-right',(respPercents.marginRight*outterWidth)+"px");
		angular.element(cont).css('width',(respPercents.innerWidth*outterWidth)+"px");
	}
    
    this.getOutterWidth=function(ele){
        var cont=angular.element(ele)[0];
        
        var thisPaddingLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-left'));
        var thisPaddingRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('padding-right'));
        var thisMarginLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-left'));
        var thisMarginRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('margin-right'));
        var thisBorderLeft=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-left'));
        var thisBorderRight=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('border-right'));
        var thisWidth=parseFloat(window.getComputedStyle(cont, null).getPropertyValue('width'));
        
        var outterWidth=(thisWidth+thisPaddingLeft+thisPaddingRight+thisMarginLeft+thisMarginRight+thisBorderRight+thisBorderLeft);
        return outterWidth;
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



myApp.directive('qbdb',['qbDataBase', function(qbDataBase) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    qbDataBase.arrayData("location_master","Location_Master_State","Location_Master_Country","India");
		},
		template: function(element,attr){
		    return "<div></div>"
		}
	}
}]);
 
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

 
myApp.directive('qbFormInput',['qbBasics',  function(qbBasics) {
    return {
		scope: {
		    ngmodel:'='
		},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    angular.element(element).children().attr("name","ayush");
		    scope.validate=function()
		    {
		        var str = scope.ngmodel;
                var patt = new RegExp(attr.expression);
                var res = patt.test(str);
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-input-container\"> <span class=\"qb-input-label\"></span> <input type=\"text\" name=\""+attr.name+"\" ng-model=\"ngmodel\" class=\"qb-input\" ng-keyup=\"validate()\" required> <div class=\"qb-input-message\" ng-transclude> </div> </div>";
		}
	}
}]);

myApp.directive('qbFlex',['qbBasics',  function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    var height=0;
		    scope.loadfun=function(){
		        angular.element(element).children().append(transclude());
		        angular.element(element).children().append("<div style=\"clear:both\"></div>");
		        var childs=angular.element(element).children().children();
		        angular.forEach(childs, function(value, key){
                    height=height+(angular.element(value)[0].offsetHeight);
                });
		    };
		},
		template: function(element,attr){
		    return "<div ng-if=\"loadfun\" ng-init=\"loadfun()\" ng-click=\"clickfun()\"></div>";
		}
	}
}]);

myApp.directive('qbFilter',qbFilter);
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
		    scope.datafetch=function(fvariable){
		        if(!attr.fvalue)
		        {
		            if(fvariable)
                    {
                        if(attr.defaultSelect)
                        {
                            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:fvariable};
            		        
            	            $http({
                            method:'POST',url:'../controllers/filter.php',data:filter_data
                                }).then(function mySucces(response){
                                    angular.element(element).children().scope().responses=response.data;
                                    //alert(scope.responses);
                                },function myError(response){
                                    alert(response.statusText);
                            });
                        }
                        else
                        {
                            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:fvariable};
        		            angular.element(element).children().children().children().attr("hidden","");
        		            $http({
                            method:'POST',url:'../controllers/filter.php',data:filter_data
                                }).then(function mySucces(response){
                                    angular.element(element).children().scope().responses=response.data;
                                    if(angular.element(element).children().scope().responses)
                                    {
                                        angular.element(element).children().children().children().html("");
                                        angular.element(element).children().children().scope().val=angular.element(element).children().scope().responses[0];
                                        angular.element(element).children().scope().changefun();
                                    }
                                },function myError(response){
                                    alert(response.statusText);
                            });
                        }
                    }
                    else
                    {
                        angular.element(element).children().scope().changefun();
                    }
		        }
		    };
		    
		    scope.datadetach=function(fvariable){
		        angular.element(element).children().scope().responses="";
		        var myFilters = angular.element(document.querySelectorAll("qb-filter"));
    		    angular.forEach(myFilters, function(value, key){
    		        if(angular.element(value).attr("fetch-id")==attr.filterId)
    		        {
    		            angular.element(value).children().scope().datadetach(fvariable);
    		        }
    		    });
		    };
		    scope.changefun=function(){
		        scope.val=angular.element(element).children().children().scope().val;
		        var fvariable=angular.element(element).children().children().scope().val;
		        angular.element(element).children().scope().findfilter(fvariable);
		    };
		    scope.clickfun=function(){
		        
		    };
		    scope.findfilter=function(fvariable){
		        var myFilters = angular.element(document.querySelectorAll("qb-filter"));
    		    angular.forEach(myFilters, function(value, key){
    		        if(angular.element(value).attr("fetch-id")==attr.filterId)
    		        {
    		            //alert(angular.element(value).attr("filter-id"));
    		            if(fvariable)
    		                angular.element(value).children().scope().datafetch(fvariable);
    		            else
    		                angular.element(value).children().scope().datadetach(fvariable);
    		        }
    		    });
		    };
		    scope.dataload=function(){
		        if(attr.fvalue)
		        {
		            if(attr.defaultSelect)
        		    {
        		        //try to make default selection i got one solution .
            		    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
    		        
    		            $http({
                        method:'POST',url:'../controllers/filter.php',data:filter_data
                            }).then(function mySucces(response){
                                angular.element(element).children().scope().responses=response.data;
                            },function myError(response){
                                alert(response.statusText);
                        });
        		    }
        		    else
        		    {
        		        var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
    		            angular.element(element).children().children().children().attr("hidden","");
    		            $http({
                        method:'POST',url:'../controllers/filter.php',data:filter_data
                            }).then(function mySucces(response){
                                angular.element(element).children().scope().responses=response.data;
                                if(angular.element(element).children().scope().responses)
                                {
                                    angular.element(element).children().children().children().html("");
                                    angular.element(element).children().children().scope().val=angular.element(element).children().scope().responses[0];
                                    angular.element(element).children().scope().changefun();
                                }
                            },function myError(response){
                                alert(response.statusText);
                        });
        		    }
		        }
		        else if(!attr.defaultSelect)
		        {
		            angular.element(element).children().children().children().html("");
		        }
		    };
		},
		template: function(element,attr){
	        return "<div ng-if=\"dataload\" ng-init=\"dataload()\" > <select ng-model=\"val\" ng-change=\"changefun()\"> <option value=\"\">"+attr.defaultSelect+"</option> <option ng-repeat=\"response in responses\" value={{response}}>{{response}}</option></select> </div>";
		}
	}
}

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

//last seen on 22-07-2019
//heading styling
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

// new version last seen on 28-04-2019
myApp.directive('qbAutoCompletes',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.loadfun=function(){
		        var compNum=0;
		        angular.element(element).children().append(transclude());
		        var qbAutoCompletes=qbBasics.findChildren(angular.element(element).children(),"QB-AUTO-COMPLETE");
		        angular.forEach(qbAutoCompletes, function(value, key){
		            angular.element(value).children().attr("qb-auto-complete-id","qb-auto-complete-"+compNum);
		            compNum++;
		        });
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-auto-completes\" ng-if=\"loadfun\" ng-init=\"loadfun()\"></div>";
		}
	}
}]);

myApp.directive('qbAutoComplete',qbAutoComplete);
qbAutoComplete.$inject=['$http'];
function qbAutoComplete($http)
{
    return {
		scope: {
		    qbModel:"=",
		    qbScope:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    var sugs ; 
		    scope.listloadfun=function(){
		        if(attr.qbDatas)
		        {   
		            sugs=attr.qbDatas.split(",");
		            scope.sugidies={};
        	        var sugNum=0;
        	        angular.forEach(sugs, function(value, key){
        		        scope.sugidies[sugNum]=sugNum;
        		        sugNum++;
        		    });
		        }
		        else if(scope.qbScope)
		        {
		            sugs=scope.qbScope;
		            scope.sugidies={};
        	        var sugNum=0;
        	        angular.forEach(sugs, function(value, key){
        		        scope.sugidies[sugNum]=sugNum;
        		        sugNum++;
        		    });
		        }
		        if((attr.table)&&(attr.column)&&(attr.fcolumn)&&(attr.fvalue))
		        {
		            var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
	        
    	            $http({
                    method:'POST',url:'../controllers/filter.php',data:filter_data
                        }).then(function mySucces(response){
                            sugs=response.data;
                            scope.sugidies={};
                	        var sugNum=0;
                	        angular.forEach(sugs, function(value, key){
                		        scope.sugidies[sugNum]=sugNum;
                		        sugNum++;
                		    });
                        },function myError(response){
                            alert(response.statusText);
                    });   
		        }
		    };
		    
		    var sugDivs={};
		    var matchingSugDivs={};
		    var focusSugs={};
		    var noOfSugs;
		    scope.sugloadfun=function(sugId){
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
    		        if((angular.element(value).scope().sugid)==sugId)
    		        {
    		            angular.element(value).attr("qb-suggestion-id","qb-suggestion-"+sugId);
    		            angular.element(value).attr("qb-suggestion",sugs[sugId]);
    		            sugDivs[sugId]=angular.element(element).children().children().children()[sugId];
    		        }
    		    });   
		    };
		    
		    scope.$watch('qbModel', function (newval, oldval) {
		        var inpVal=newval;
                var matchingSug=[];
		        var sugNum2=0;
		        if(toEmpty)
		        {
		            toEmpty=0;
		            angular.forEach(angular.element(element).children().children().children(), function(value, key){
		                angular.element(value).empty();
		                angular.element(value)[0].style.display="none";
		            });
		        }
		        else if((inpVal)&&(inpVal.length))
		        {
		            angular.forEach(sugs, function(value, key){
		                var req=0;
    		            for(var i=0; i<inpVal.length; i++)
    		            {   
    		                var sugUpper=value.toUpperCase();
    		                var inpUpper=inpVal.toUpperCase();
    		                if(!(sugUpper[i]===inpUpper[i]))
    		                {
    		                    req=0;
    		                    break;
    		                }
    		                else
    		                {
    		                    req=1;
    		                }
    		            }
    		            if(req)
    		            {
    		                matchingSug[sugNum2]=value;
    		            }
    		            else
    		            {
    		                matchingSug[sugNum2]="";
    		            }
		                sugNum2++;
		            });   
		            
		            if(matchingSug)
		            {
		                var matchNum=0;
		                var focusNum=0;
		                angular.forEach(matchingSug, function(value, key){
                            if(value)
                            {
                                if(value===(angular.element(sugDivs[matchNum]).attr("qb-suggestion")))
                                {
                                       //sugDivs[matchNum].css("display","block");
                                       var sugBVal="";
                                       var sugNVal="";
                                       for(var j=0; j<value.length; j++)
                    		           {
                    		                if((inpVal.length)<=j)
                    		                {
                    		                    sugNVal=sugNVal+value[j];
                    		                }
                    		                else
                    		                {
                    		                    sugBVal=sugBVal+value[j];
                    		                }
                    		           }
                    		           
                                       var sugChild=angular.element("<strong>"+sugBVal+"</strong>"+sugNVal+" ");
                                       angular.element(sugDivs[matchNum]).empty();
                                       angular.element(sugDivs[matchNum])[0].style.display="block";
                                       angular.element(sugDivs[matchNum]).append(sugChild);
                                       matchingSugDivs[focusNum]=angular.element(sugDivs[matchNum]);
                                       focusSugs[focusNum]=value;
                                       focusNum++;
                                       noOfSugs=focusNum;
                                }
                            }
                            else
                            {
                                angular.element(sugDivs[matchNum])[0].style.display="none";
                            }
                            matchNum++;
            		    });
            		    angular.forEach(matchingSugDivs, function(value, key){
        	                angular.element(value).removeClass("qb-autocomplete-suggestion-active");
        	            });
        	            focus=-1;
		            }
		        }
		        else
		        {
		            angular.forEach(angular.element(element).children().children().children(), function(value, key){
		                angular.element(value).empty();
		                angular.element(value)[0].style.display="none";
		            }); 
		        }
		    });
		    
		    scope.sugclickfun=function(sugId,actionType){
		        focus=-1;
		        if(actionType=="focus")
		        {
    	            toEmpty=1;
		            scope.qbModel=focusSugs[sugId];
		        }
		        else
		        {
		            toFocus=1;
		            scope.qbModel=sugs[sugId];
		        }
		        angular.element(element).children().children()[0].focus();
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
                    angular.element(value).empty();
                    angular.element(value)[0].style.display="none";
                }); 
		    };
		    
		    var toFocus=0;
		    var toEmpty=0;
		    scope.blurfun=function(){
		        angular.forEach(angular.element(element).children().children().children(), function(value, key){
	                angular.element(value).empty();
	                angular.element(value)[0].style.display="none";
	            });
	            if(toFocus)
	            {
	                toFocus=0;
	                angular.element(element).children().children()[0].focus();
	            }
		    };
		    
		    var focus=-1;
		    var inp=angular.element(element).children().children()[0];
		    inp.addEventListener("keydown", function(e) {
                if (e.keyCode == 40) {
                    focus++;
                    if(noOfSugs>focus)
                    {
                        angular.element(element).children().scope().activesug(focus);
                    }
                    else
                    {
                        focus=0;
                        angular.element(element).children().scope().activesug(focus);
                    }            
                } 
                else if (e.keyCode == 38) {
                    focus--;
                    if(focus>-1)
                    {
                        angular.element(element).children().scope().activesug(focus);
                    }
                    else
                    {
                        focus=noOfSugs-1;
                        angular.element(element).children().scope().activesug(focus);
                    }
                } 
                else if (e.keyCode == 13) {
                    if(focus>-1)
                    {
                        angular.element(element).children().scope().sugclickfun(focus,"focus");
                        angular.element(element).children().children()[0].blur();
                        angular.element(element).children().children()[0].focus();
                    }
                }
            });
            
            scope.activesug=function(focusId){
                angular.forEach(matchingSugDivs, function(value, key){
	                angular.element(value).removeClass("qb-autocomplete-suggestion-active");
	            });
                angular.element(matchingSugDivs[focusId]).addClass("qb-autocomplete-suggestion-active");
            };
		    
		},
		template: function(element,attr){ 
		    return"<div class=\"qb-auto-complete\">"+ 
		        "<input type=\"text\" class=\"qb-auto-complete-input\" ng-model=\"qbModel\" ng-blur=\"blurfun()\">"+
    		    "<div class=\"qb-auto-complete-list\" ng-if=\"listloadfun\" ng-init=\"listloadfun()\" >"+
    		        "<div ng-mousedown=\"sugclickfun(sugid)\" class=\"qb-auto-complete-suggestion\" ng-repeat=\"sugid in sugidies\" ng-init=\"sugloadfun(sugid)\" ></div>"+
    		    "</div>"+
    		    "</div>";
		}
	}
}

myApp.directive('qbRow',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    var win = angular.element(window);
		    win.bind("resize",function(){
		        if(attr.responsive)
		        {
		            if(window.innerWidth>600)
		            {
		                var i=0;
		                angular.forEach(cellEles, function(vCell, key){
        	                angular.element(vCell).css("display","table-cell");
        	                angular.element(vCell).css("width",cellElesWidth[i]);
        	                i++;
        		        });
		            }
		            else
		            {
		                angular.forEach(cellEles, function(vCell, key){
        	                angular.element(vCell).css("display","block");
        	                angular.element(vCell).css("width","100%");
        		        }); 
		            }
		        }
		    });
		    
		    var rowEle;
		    var cellEles;
		    var cellElesWidth=[];
		    scope.rowloadfun=function(){
		        rowEle=angular.element(element).children().children();
		        angular.element(rowEle).append(transclude());
		        cellEles=angular.element(rowEle).children();
		        var numOfCells=cellEles.length;
		        var i=0;
		        angular.forEach(cellEles, function(vCell, key){
	                angular.element(vCell).addClass("qb-cell");
	                cellElesWidth[i]=angular.element(vCell).attr("qb-cell-width");
	                i++;
		        }); 
		        if(window.innerWidth>600)
	            {
	                var j=0;
	                angular.forEach(cellEles, function(vCell, key){
    	                angular.element(vCell).css("float","none");
    	                angular.element(vCell).css("display","table-cell");
    	                angular.element(vCell).css("width",cellElesWidth[j]);
    	                j++;
    		        });
	            }
	            else
	            {
	                angular.forEach(cellEles, function(vCell, key){
    	                angular.element(vCell).css("display","block");
    	                angular.element(vCell).css("width","100%");
    		        });
	            }
		    };
		},
		template: function(element,attr){ 
		    return  "<div class=\"qb-table\" style=\"display:table;table-layout:fixed\">"+
		                "<div class=\"qb-row\" style=\"display:table-row\" ng-if=\"rowloadfun\" ng-init=\"rowloadfun()\"></div>"+
		            "</div>";
		}
	}
}]);

myApp.directive('qbValid',['qbBasics', function(qbBasics) {
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    var cont="agrawal.ayush2500";
		    scope.blurfun=function(){
		        if(cont===scope.qbModel)
		        {
		            angular.element(angular.element(element).children()[1]).addClass("qb-tab-heading-active");
		        }
		    };
		},
		template: function(element,attr){ 
		    return "<div>"+
		                "<input ng-model=\"qbModel\" ng-blur=\"blurfun()\">"+
		           "</div>"+
		           "<div> already there</div>";
		}
	}
}]);

//qb form
myApp.directive('qbForm',['qbBasics', function(qbBasics) {
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
		    return  "<div class=\"qb-form\">"+
                    "</div>";
		}
	}
}]);
myApp.directive('qbInput',['qbBasics', function(qbBasics) {
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
		    return  "<div class=\"qb-input\">"+
                    "</div>";
		}
	}
}]);

//qb align last seen on 28-04-2019
myApp.directive('qbContentAlign',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
		    var horizontalAlign="";
		    var verticalAlign="";
		    var widthType="";
		    var heightType="";
		    var contentsTotalWidth=0;
		    var contents=angular.element(element).children();
		    angular.forEach(contents, function(vCont, kCont){
                var thisWidth=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('width'));
                contentsTotalWidth=contentsTotalWidth+thisWidth;
            });
            
            var largestH=0;
            angular.forEach(contents, function(vCont, kCont){
                var thisHeight=parseFloat(window.getComputedStyle(angular.element(vCont)[0], null).getPropertyValue('height'));
                if(thisHeight>largestH)
                {
                    largestH=thisHeight;
                }
            });
		    
		    if(!(qbBasics.isQbType(angular.element(element))))
		    {
		        var alignValues=attr.qbContentAlign.split(";");
		        if(contents)
		        {
    		        angular.forEach(alignValues, function(value, key){
    		            var alignValue=""; 
    		            alignValue=value.split(":");
    		            if((alignValue[0])=="vertical")
    		            {
    		                if(((alignValue[1])=="top")||((alignValue[1])=="centre")||((alignValue[1])=="bottom"))
    		                {
    		                    verticalAlign=alignValue[1];
    		                }
    		            }
    		            else if((alignValue[0])=="horizontal")
    		            {
    		                if(((alignValue[1])=="left")||((alignValue[1])=="middle")||((alignValue[1])=="right"))
    		                {
    		                    horizontalAlign=alignValue[1];
    		                }
    		            }
    		            else if((alignValue[0])=="width-type")
    		            {
    		                if(((alignValue[1])=="responsive")||((alignValue[1])=="static"))
    		                {
    		                    widthType=alignValue[1];
    		                }
    		            }
    		            else if((alignValue[0])=="height-type")
    		            {
    		                if(((alignValue[1])=="responsive")||((alignValue[1])=="static"))
    		                {
    		                    heightType=alignValue[1];
    		                }
    		            }
    		        });
    		        qbBasics.contentsAlign(angular.element(element),horizontalAlign,verticalAlign,widthType,heightType,contentsTotalWidth,largestH);
		        }
		    }
		    
		    var win = angular.element(window);
		    win.bind("resize",function(){
		        qbBasics.contentsAlignResize(angular.element(element),horizontalAlign,verticalAlign,widthType,heightType,contentsTotalWidth,largestH);
		    });
	
		}
	}
}]);

//qbSetContainerWidth last seen on 7-12-2019
myApp.directive('qbSetContainerWidth',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
			var contWidth=0;
			angular.forEach(angular.element(element).children(),function(contChild,key){
				contWidth+=qbBasics.getOutterWidth(contChild);
			});
			contWidth*=1.00001;
			angular.element(element).css('width',contWidth+"px");
		}
	}
}]);

//qbSetInnerWidth last seen on 8-12-2019
myApp.directive('qbSetInnerWidth',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
			var attrVal=attr.qbSetInnerWidth.split(";");
			var outterWidthPer=parseFloat(attrVal[1])/100;
			angular.element(element).ready(function(){
				var outterWidth=(angular.element(element).parent()[0].clientWidth)*(outterWidthPer);
				qbBasics.setInnerWidth(element,outterWidth);
				if(attrVal.includes("responsive"))
				{
					angular.element(window).bind('resize',function(){
						outterWidth=(angular.element(element).parent()[0].clientWidth)*(outterWidthPer);
						qbBasics.setInnerWidth(element,outterWidth);
					})
				}
			})
		}
	}
}]);

//qbRespContentAlign last seen on 08-12-2019
myApp.directive('qbRespContentAlign',['qbBasics', function(qbBasics) {
    return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl, transclude){
			var outterWidth=(angular.element(element).parent()[0].clientWidth*(parseFloat(attr.qbRespContentAlign)/100))
			var respPers=qbBasics.getRespPercents(element,outterWidth);
			
			angular.element(element).ready(function(){
				qbBasics.setRespPercents(element,outterWidth,respPers);
				angular.element(window).bind('resize',function(){
					outterWidth=angular.element(element).parent()[0].clientWidth;
					qbBasics.setRespPercents(element,outterWidth,respPers);
				})
			})
		}
	}
}]);

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
	                var qbSubMenusEle=angular.element("<div class=\"qbsubmenus "+attr.classes+"\"></div>");
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
    	            
                    var qbMenuEle=angular.element("<div><div class=\"qb-menu "+attr.classes+"\"></div></div>");
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
	                    qbContent=angular.element("<div class=\"qb-menu-heading "+attr.classes+"\"><a class=\""+attr.qbAnchorClass+"\" href=\""+attr.qbLink+"\"></a></div>");
	                    qbContent.children().append(qbDiv.html());
	                }
	                else
	                {
	                    qbContent=angular.element("<div class=\"qb-menu-heading "+attr.classes+"\"></div>");
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

myApp.directive('qbBar',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    
		    scope.qbBarLoadFun=function(){
    		    if(attr.qbBarType)
    		    {
    		        if((attr.qbBarType)==="menu")
    		        {
    		            angular.element(element).children().addClass("qb-menu-bar");
    		            angular.element(element).children().scope().qbBarOpenFun();
    		        }
    		        else if((attr.qbBarType)==="search")
    		        {
    		            angular.element(element).children().addClass("qb-search-bar");
    		            angular.element(element).children().scope().qbBarCloseFun();
    		        }
    		    }  
		    };
		    
		    scope.qbBarOpenFun=function(){
		        angular.element(element).children().addClass(qbBasics.classCons(attr.qbOpenClass));
		        angular.element(element).children().removeClass(qbBasics.classCons(attr.qbCloseClass));
		    };
		    
		    scope.qbBarCloseFun=function(){
		        angular.element(element).children().addClass(qbBasics.classCons(attr.qbCloseClass));
		        angular.element(element).children().removeClass(qbBasics.classCons(attr.qbOpenClass));
		    };
		    
		    
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-bar\" ng-if=\"qbBarLoadFun\" ng-init=\"qbBarLoadFun()\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbIcon',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope, element, attr, ctrl, transclude){
		    if(attr.classes)
		    {
		        angular.element(element).children().addClass(qbBasics.classCons(attr.classes));
		    }
		    scope.qbIconClickFun=function(){
		        var qbBars=document.querySelectorAll("qb-bar");
		        if((attr.qbIconType)==="search")
		        {
		            angular.forEach(qbBars, function(qbBar, key){
		                if(angular.element(qbBar).attr("qb-bar-type")==="menu")
		                {
    		                if((attr.qbIconId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarCloseFun();
    		                }
		                }
		                else if(angular.element(qbBar).attr("qb-bar-type")==="search")
		                {
    		                if((attr.qbTargetId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarOpenFun();
    		                }
		                }
		            });
		        }
		        else if((attr.qbIconType)==="back")
		        {
		            angular.forEach(qbBars, function(qbBar, key){
		                if(angular.element(qbBar).attr("qb-bar-type")==="menu")
		                {
    		                if((attr.qbTargetId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarOpenFun();
    		                }
		                }
		                else if(angular.element(qbBar).attr("qb-bar-type")==="search")
		                {
    		                if((attr.qbIconId)==(angular.element(qbBar).attr("qb-bar-id")))
    		                {
    		                    angular.element(qbBar).children().scope().qbBarCloseFun();
    		                }
		                }
		            });
		        }
		    };
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-icon\" ng-click=\"qbIconClickFun()\" ng-transclude>"+
		           "</div>"
		}   
    }
}]);

myApp.directive('qbAvatar',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		   angular.element(element).children().addClass(attr.qbAvatarClass);
		   angular.element(element).children().children().addClass(attr.qbImageClass);
		},
		template: function(element,attr){ 
		    return "<div style=\"overflow:hidden\">"+
		                "<img src=\""+attr.qbSrc+"\" class=\"qb-avatar-image\" height=\""+attr.qbHeight+"\" width=\""+attr.qbWidth+"\" style=\"object-fit:cover\">"+
		           "</div>";
		}
	}
}]);

myApp.directive('qbImg',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    console.log(angular.element(element).children()[0].getContext("2d"));
		},
		template: function(element,attr){ 
		    return  "<canvas id=\"canvas\">"+
		                "Ayush Agrawal"+
		            "</canvas>";
	    }
	}
}]);


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
		        
		        var qbAlertElement=angular.element(element).children().children().children();
		        var qbAlertRetrun={
		            scope:qbAlertElement.scope(),
		            elementRef:qbAlertElement
		        };
		        return qbAlertRetrun;
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

myApp.directive('qbTest',['qbBasics', function(qbBasics) {
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var button=angular.element("<button ng-click=\"myCancelFun()\">Testing</button>")
		    var compilebutton=qbBasics.compile(button);
		    angular.element(element).append(compilebutton);
		},
		template: function(element,attr){ 
		    return "<div>Testing</div>";
		}
	}
}]);

myApp.directive('qbCompile',qbCompile);
qbCompile.$inject=['$compile'];
function qbCompile($compile,$rootScope)
{
    return {
		link: function(scope,element,attr){
		    scope.qbCompileFun=function(){
		        return scope;
		    }
		},
		template: function(element,attr){
		    return "<div></div>"
		}
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
		    
		    angular.element(element).ready(function(){
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

// Latest Project 10.06.2019 New Tabs

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
		        var qbTabHeaderContainer=angular.element("<div class=\"qb-tab-headers-containers\" style=\"overflow:hidden\"></div>")
		        num=0;
		        angular.forEach(qbTabHeaderEles, function(value, key){
		            var tabHeaderData=angular.element(value).children().scope().qbTabHeaderPropertyFun();
		            tabHeaderData.tabId="qb-tab-"+num;
		            
		            var refEle=angular.element("<div qb-tab-id=\"qb-tab-"+num+"\" style=\"float:left\" ng-click=\"qbTabHeaderClickFun($event)\" class=\"qb-tab-header\"></div>");
		            refEle.addClass(tabHeaderData.class);
		            refEle.append(tabHeaderData.ele.html());
		            var compiledRefEle=$compile(qbBasics.compile(refEle))(scope);
		            qbTabHeaderContainer.append(compiledRefEle);
		            tabHeaderData.refEle=compiledRefEle;
		            
		            qbTabHeaders.push(tabHeaderData);
		            num++;
		        });
		        
		        angular.element(angular.element(element).children().children()[0]).append(qbTabHeaderContainer);
		        
		        //designing of Tab Headings
		        if(qbTabHeadersStyle)
    		    {   
    		        qbTabHeadersContainer=angular.element(angular.element(element).children().children()[0]).children();
    		        if(qbTabHeadersStyle['total-width'])
    		        {
    		            if(qbTabHeadersStyle['total-width']==="auto")
    		            { 
    		                if(qbTabHeadersStyle['size']==="auto")
    		                {
    		                    var containerInnerWidth=0;
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        containerInnerWidth+=qbBasics.getOutterWidth(qbTabHeader.refEle);
    		                    });
    		                    qbTabHeadersContainer[0].style.width=containerInnerWidth+"px"
    		                }
    		                else if(qbTabHeadersStyle['size']==="equal")
    		                {
    		                    var largestWidth=0;
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        var thisHeaderWidth=parseFloat(window.getComputedStyle(qbTabHeader.refEle[0], null).getPropertyValue('width'));
    		                        if(largestWidth<thisHeaderWidth)
    		                        {
    		                            largestWidth=thisHeaderWidth;
    		                        }
    		                    });
    		                    
    		                    var contWidth=0
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        qbTabHeader.refEle[0].style.width=largestWidth+"px";
    		                        contWidth+=qbBasics.getOutterWidth(qbTabHeader.refEle);
    		                    });
    		                    
    		                    contWidth=contWidth*1.01;
    		                    qbTabHeadersContainer.css("width",contWidth+"px");
    		                }
    		            }
    		            else if(qbTabHeadersStyle['total-width'].includes('%'))
    		            {
    		                var totalWidthPer=parseFloat(qbTabHeadersStyle['total-width']);
    		                var qbTabHeadersInnerWidth=parseFloat(window.getComputedStyle(angular.element(element).children().children()[0], null).getPropertyValue('width'));
    		                var totalWidthPx=(totalWidthPer*qbTabHeadersInnerWidth)/100;
    		                angular.element(angular.element(element).children().children()[0]).children().css("width",totalWidthPx+"px");
    		                
    		                if(qbTabHeadersStyle['size']==="equal")
    		                {
    		                    var outterWidth=(qbTabHeadersContainer[0].offsetWidth/qbTabHeaders.length);
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        qbBasics.setInnerWidth(qbTabHeader.refEle,outterWidth);
    		                    })   
    		                }
    		            }
    		            else if(qbTabHeadersStyle['total-width'].includes('px'))
    		            {
    		                qbTabHeaderContainer[0].style.width=qbTabHeadersStyle['total-width']; 
    		                
    		                if(qbTabHeadersStyle['size']==="equal")
    		                {
    		                    var outterWidth=(qbTabHeadersContainer[0].offsetWidth/qbTabHeaders.length);
    		                    angular.forEach(qbTabHeaders,function(qbTabHeader,key){
    		                        qbBasics.setInnerWidth(qbTabHeader.refEle,outterWidth);
    		                    })   
    		                }
    		            }
    		        }
    		        if(qbTabHeadersStyle['align'])
    		        {
		                var qbTabHeadersInnerWidth=parseFloat(window.getComputedStyle(angular.element(element).children().children()[0], null).getPropertyValue('width'));
		                var qbTabHeadersContainerOutterWidth=qbBasics.getOutterWidth(angular.element(angular.element(element).children().children()[0]).children());
		                
		                var reqPadding=qbTabHeadersInnerWidth-qbTabHeadersContainerOutterWidth;
    		            
    		            if(qbTabHeadersStyle['align']==="left")
    		            {
    		               angular.element( angular.element(element).children().children()[0]).css("padding-right",reqPadding+"px");
    		            }
    		            else if(qbTabHeadersStyle['align']==="right")
    		            {
    		               angular.element( angular.element(element).children().children()[0]).css("padding-left",reqPadding+"px");
    		            }
    		            else if(qbTabHeadersStyle['align']==="middle")
    		            {
    		               angular.element( angular.element(element).children().children()[0]).css("padding-left",(reqPadding/2)+"px");
    		               angular.element( angular.element(element).children().children()[0]).css("padding-right",(reqPadding/2)+"px");
    		            }
    		        }
		        }
		        
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

myApp.directive('qbSelect',qbSelect);
qbSelect.$inject=['$compile','qbBasics'];
function qbSelect($compile,qbBasics)
{
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    angular.element(element).ready(function(){
		        scope.qbSelectCloseFun();
		        if(attr.qbOptionsClass)
		        {
		            qbSelectOptions.addClass(attr.qbOptionsClass);
		        }
		        if(attr.qbInputClass)
		        {
		            qbSelectInput.addClass(attr.qbInputClass);
				}
			});

			scope.$watch('qbModel',function(newval,oldval){
				var qbOptionValues=[];
				var qbOptionEles=angular.element(angular.element(element).children().children()[1]).children();
				angular.forEach(qbOptionEles,function(qbOptionEle,key){
					if((qbOptionEle.getAttribute("value"))===newval)
					{
						angular.element(qbOptionEle).children().scope().qbOptionClickFun();
					}
				})
			})
		    
		    var qbSelectInput=angular.element(angular.element(element).children().children()[0]);
		    var qbSelectOptions=angular.element(angular.element(element).children().children()[1]);
		    scope.qbSelectOptionClickFun=function(optionData){
		        scope.qbModel=optionData.value;
		        angular.element(angular.element(element).children().children()[0]).empty();
		        angular.element(angular.element(element).children().children()[0]).append(optionData.html);
		        scope.qbSelectCloseFun();
		    }
		    
		    var qbSelectOptionsState=false;
		    scope.qbSelectClickFun=function(){
		        if(qbSelectOptionsState)
		        {
		            scope.qbSelectCloseFun();
		        }
		        else
		        {
		            scope.qbSelectOpenFun();
		        }
		    }
		    
		    
		    scope.qbSelectOpenFun=function(){
		        qbSelectInput.addClass(attr.qbInputOpenClass);
		        qbSelectInput.removeClass(attr.qbInputCloseClass);
		        qbSelectOptions.addClass(attr.qbOptionsOpenClass);
		        qbSelectOptions.removeClass(attr.qbOptionsCloseClass);
		        qbSelectOptionsState=true;
		    }
		    scope.qbSelectCloseFun=function(){
		        qbSelectInput.addClass(attr.qbInputCloseClass);
		        qbSelectInput.removeClass(attr.qbInputOpenClass);
		        qbSelectOptions.addClass(attr.qbOptionsCloseClass);
		        qbSelectOptions.removeClass(attr.qbOptionsOpenClass);
		        qbSelectOptionsState=false;
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-select\">"+
		                "<div class=\"qb-select-input\" ng-click=\"qbSelectClickFun()\" > </div>"+
		                "<div class=\"qb-select-options\" ng-transclude></div>"+
		           "</div>"
		}
	}
}

myApp.directive('qbOption',qbOption);
qbOption.$inject=['$compile','qbBasics'];
function qbOption($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    var qbSelect;
		    angular.element(element).ready(function(){
		        qbSelect=qbBasics.findParent(element,"qb-select");
		        if(attr.default=="true")
		        {
		            scope.qbOptionClickFun();
		        }
		    });
		    scope.qbOptionClickFun=function(){
		        var optHtml=angular.element("<div class="+attr.qbClass+"></div>");
		        optHtml.html(angular.element(element).children().html());
		        var optionData={
		            value:attr.value,
		            html:optHtml
		        }
		        qbSelect.children().scope().qbSelectOptionClickFun(optionData);
		    }
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-option "+attr.qbClass+"\" ng-click=\"qbOptionClickFun()\" ng-transclude value="+attr.value+"></div>";
		}
	}
}
myApp.directive('qbImgLoad',qbImgLoad);
qbImgLoad.$inject=['$compile','qbBasics'];
function qbImgLoad($compile,qbBasics)
{
    return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr){
		    angular.element(element).children().ready(function(){
		        alert(angular.element(element).children()[0].offsetWidth);
		    });
		},
		template: function(element,attr){ 
		    return "<div><img src=\"http://www.cs4u.shiksha/public/css/Aquaman.jpg\"></div>";
		}
	}
}

myApp.directive('qbCheckBox',qbCheckBox);
qbCheckBox.$inject=['$compile','qbBasics'];
function qbCheckBox($compile,qbBasics)
{
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbModel=[];
		    scope.qbCheckBoxCheckFun=function(val){
		        if(val)
		        {
		            if(!scope.qbModel.includes(angular.element(element).attr("qb-value")))
    		        {
    		            scope.qbModel.push(angular.element(element).attr("qb-value"));
    		        }
		        }
		        else
		        {
		            if(scope.qbModel.includes(angular.element(element).attr("qb-value")))
    		        {
    		            var newArr=[];
    		            var num=0;
    		            angular.forEach(scope.qbModel,function(value,key){
    		                if(!(value===angular.element(element).attr("qb-value")))
    		                {
    		                    newArr[num]=value;
    		                    num++;
    		                }
    		            });
    		            scope.qbModel=newArr;
    		        }
		        }
		    };
		    angular.element(element).ready(function(){
		        var attrs=angular.element(element)[0].attributes;
		        if(attrs["qb-checked"])
		        {
    		        angular.element(element).children().children()[0].checked=true;
		        }
		    });
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-check-box qb-check-box-addOn\">"+
		                "<input type=\"checkbox\" ng-model=\"val\" ng-change=\"qbCheckBoxCheckFun(val)\" class=\"qb-check-box-input qb-check-box-input-addOn\" >"+
		                "<div class=\"qb-check qb-check-addOn\"><div class=\"qb-check-child qb-check-child-addOn\"></div></div>"+
		                "<div class=\"qb-check-box-content qb-check-box-content-addOn\" ng-transclude></div>"+
		           "</div>";
		}
	}
}

myApp.directive('qbRadioButton',qbRadioButton);
qbRadioButton.$inject=['$compile','qbBasics'];
function qbRadioButton($compile,qbBasics)
{
    return {
		scope: {
		    qbModel:"="
		},
		transclude: true,
		link: function(scope,element,attr){
		    scope.qbRadioButtonClickFun=function(val){
		        scope.qbModel=val;
		        var qbRadioButtons=document.querySelectorAll("qb-radio-button");
		        angular.forEach(qbRadioButtons,function(value,key){
		            if(angular.element(value).attr("qb-model")==attr.qbModel)
		            {
		                if(!(angular.element(value).attr("qb-value")==attr.qbValue))
		                angular.element(value).children().scope().qbRadioButtonValNoneFun();
		            }
		        });
		    }
		    scope.qbRadioButtonValNoneFun=function(){
		        angular.element(angular.element(element).children().children()[0]).scope().val="";
		    }
		    angular.element(element).ready(function(){
		        var attrs=angular.element(element)[0].attributes;
		        if(attrs["qb-checked"])
		        {
    		        angular.element(element).children().children()[0].checked=true;
		            scope.qbRadioButtonClickFun(attr.qbValue);
		        }
		    });
		},
		template: function(element,attr){ 
		    return "<div class=\"qb-radio-button qb-radio-button-addOn\">"+
		                "<input type=\"radio\" ng-model=\"val\" ng-change=\"qbRadioButtonClickFun(val)\" value="+attr.qbValue+" class=\"qb-radio-button-input qb-radio-button-input-addOn\" name="+attr.qbModel+" >"+
		                "<div class=\"qb-radio-circle qb-radio-circle-addOn\"><div class=\"qb-radio-circle-child qb-radio-circle-child-addOn\"></div></div>"+
		                "<div class=\"qb-radio-button-content qb-radio-button-content-addOn\" ng-transclude></div>"+
		           "</div>";
		}
	}
}


//Image Cropper Directives
myApp.directive('qbImgCrop',['qbDataBase','qbBasics',function(qbDataBase,qbBasics){
	return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr,ctrl,transclude){
			var qbImgStage=angular.element(qbBasics.findChildren(element,"qb-img-crop-stage")[0]);
			var qbImgDisplay=angular.element(qbBasics.findChildren(element,"qb-img-crop-display")[0]);
			var qbImgScale=angular.element(qbBasics.findChildren(element,"qb-img-crop-scale")[0]);
			var qbImgCopy=angular.element(qbBasics.findChildren(qbImgDisplay,"img"));

			angular.element(element).ready(function(){
				qbImgStage.children().scope().qbImgCropStageInitFun(attr.qbImgSrc);
				qbImgDisplay.children().scope().qbImgCropDisplayInitFun(attr.qbImgSrc);
				qbImgScale.children().scope().qbImgCropScaleInitFun();
			});

			scope.qbImgCropResetFun=function(){
				qbImgStage.children().scope().qbImgCropStageResetFun();
			}
		},
		template: function(element,attr){
			return "<div class=\"qb-img-crop\" ng-transclude></div>"
		}
	}
}]);
myApp.directive('qbImgCropStage',['qbDataBase','qbBasics',function(qbDataBase,qbBasics){
	return {
		scope: {},
		transclude: false,
		link: function(scope,element,attr,ctrl,transclude){
			var qbImgCropBox=angular.element(element[0].querySelector(".qb-img-crop-box"));
			var qbImgCropStageCover=angular.element(element[0].querySelector(".qb-img-cover"));
			var qbImgCropCopy=angular.element(element[0].querySelector(".qb-img-crop-copy"));
			var qbImgCropBoxImg=angular.element(element[0].querySelector(".qb-img-crop-box-img"));
			var qbImgLayer=angular.element(element[0].querySelector(".qb-img-layer"));
			var qbImgCropImgCopy=element[0].querySelector(".qb-img-crop-img-copy");
			var qbImgCrop=angular.element(qbBasics.findParent(element,"qb-img-crop"));
			var qbImgCropScale=angular.element(qbBasics.findChildren(qbImgCrop,"qb-img-crop-scale"));
			var qbImgCropDisplay=angular.element(qbBasics.findChildren(qbImgCrop,"qb-img-crop-display"));
			var qbImgCropBoxResize=angular.element(element[0].querySelector(".qb-img-crop-box-img-wrap-resize-layer"));

			var qbImgCropStageWidth=parseFloat(window.getComputedStyle(qbImgCropStageCover[0], null).getPropertyValue('width'));
			var qbImgCropStageHeight=parseFloat(window.getComputedStyle(qbImgCropStageCover[0], null).getPropertyValue('height'));
			
			scope.qbImgCropShape="";

			//Crop box max and min dimensions
			scope.qbImgCropBoxProp={
				maxHeight:{
					per:100,
					px:""
				},
				maxWidth:{
					per:100,
					px:""
				},
				minHeight:{
					per:10,
					px:""
				},
				minWidth:{
					per:10,
					px:""
				},
				type:"%"
			}

			var qbImgCropStageOffset={
				startPoint:{
					x:"",
					y:""
				},
				endPoint:{
					x:"",
					y:""
				}
			}

			var qbImgCropBoxOffset={
				startPoint:{
					x:"",
					y:""
				},
				endPoint:{
					x:"",
					y:""
				}
			}

			var qbImgCropBoxResizeOffset={
				startPoint:{
					x:"",
					y:""
				},
				endPoint:{
					x:"",
					y:""
				}
			}

			var qbPointerPoisition={
				x:"",
				y:"",
			}

			scope.qbImgCropBoxPropSetFun=function(){

			}

			scope.qbImgCropBoxShapeSetFun=function(qbImgCropShape){
				if(qbImgCropShape=="circle")
				{
					qbImgCropBox.css("border-radius","50%");
				}
				else
				{
					qbImgCropBox.css("border-radius","unset");
				}

				scope.qbImgCropShape=qbImgCropShape;
				qbImgCropDisplay.children().scope().qbImgCropDisplaySetShape(qbImgCropShape);
			}

			scope.qbImgCropStageResetFun=function(){
				var replicaDiffX=-(parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('left')));
				var replicaDiffY=-(parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('top')));
			
				qbImgCropBoxSetFun(replicaDiffX,replicaDiffY);
			}

			var qbImgCropDisplaySetFun=function(){
				var qbImgCropBoxWidth=parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('width'));
				var qbImgCropBoxHeight=parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('height'));
				var qbImgCropBoxRatio=qbImgCropBoxWidth/qbImgCropBoxHeight;
				
				qbImgCropDisplay.children().scope().qbImgDisplaySizeSetFun(qbImgCropBoxRatio);
			}

			var qbImgCropDisplayImgSetFun=function(){
				var qbImgCropWidth=parseFloat(window.getComputedStyle(qbImgLayer[0], null).getPropertyValue('width'));
				var qbImgCropBoxWidth=parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('width'));
				var qbImgCropRatio=qbImgCropWidth/qbImgCropBoxWidth;

				qbImgCropDisplay.children().scope().qbImgDisplayImgSizeSetFun(qbImgCropRatio);
				qbImgCropDisplay.children().scope().qbImgCropAndDisplayRatio(qbImgCropWidth);
			}

			scope.qbImgCropBoxSizeSetFun=function(qbBoxWidth,qbBoxHeight){
				//check for max and min
				qbImgCropBox.css("height",qbBoxHeight);
				qbImgCropBox.css("width",qbBoxWidth);

				var qbBoxHeightInPx;
				var qbBoxWidthInPx;
				if(qbBoxWidth.includes("%"))
				{
					var qbImgCoverWidth=parseFloat(window.getComputedStyle(qbImgLayer[0], null).getPropertyValue('width'));
					qbBoxWidthInPx=parseFloat(qbBoxWidth)*qbImgCoverWidth/100;
				}
				else if(qbBoxWidth.includes("px"))
				{
					qbBoxWidthInPx=parseFloat(qbBoxWidth);
				}

				if(qbBoxHeight.includes("%"))
				{
					var qbImgCoverHeight=parseFloat(window.getComputedStyle(qbImgLayer[0], null).getPropertyValue('height'));
					qbBoxHeightInPx=parseFloat(qbBoxHeight)*qbImgCoverHeight/100;

				}
				else if(qbBoxHeight.includes("px"))
				{
					qbBoxHeightInPx=parseFloat(qbBoxHeight);
				}
				var qbImgCropBoxRatio=qbBoxWidthInPx/qbBoxHeightInPx;
				qbImgCropDisplay.children().scope().qbImgDisplaySizeSetFun(qbImgCropBoxRatio);
				
				var qbImgRatio=qbImgCropImgCopy.width/qbImgCropImgCopy.height;
				
				qbImgCoverSetHeightFun(qbImgRatio);
				qbImgSetOffsetFun();
				qbImgCropDisplaySetFun();
				qbImgCropDisplayImgSetFun();
				qbSetImgPositionOnResize();
			};

			scope.qbImgCropStageInitFun=function(qbImgSrc){
				var qbImgUrl="url("+qbImgSrc+")";
				
				angular.element(qbImgCropImgCopy).attr("src",qbImgSrc);
				qbImgCropStageCover.css("background-image",qbImgUrl);
				qbImgCropBoxImg.attr("src",qbImgSrc);
	
				qbImgCropImgCopy.addEventListener("load",function(){
					qbImgCropStageLoadFun();
				});
			}
			var qbImgCropStageLoadFun=function(){
			
				var qbImgRatio=qbImgCropImgCopy.width/qbImgCropImgCopy.height;
				qbImgCoverSetHeightFun(qbImgRatio);
				qbImgSetOffsetFun();
				qbImgCropDisplaySetFun();
				qbImgCropDisplayImgSetFun();
				qbImgCrop.children().scope().qbImgCropResetFun();

				angular.element(window).bind("resize",function(){
					qbImgCropStageWidth=parseFloat(window.getComputedStyle(qbImgCropStageCover[0], null).getPropertyValue('width'));
					qbImgCropStageHeight=parseFloat(window.getComputedStyle(qbImgCropStageCover[0], null).getPropertyValue('height'));
			
					qbImgCoverSetHeightFun(qbImgRatio);
					qbImgSetOffsetFun();
					qbImgCropDisplaySetFun();
					qbImgCropDisplayImgSetFun();
					qbImgCrop.children().scope().qbImgCropResetFun();
				});

				var qbImgCropId=angular.element(element).parent().parent().attr("qb-img-crop-id");
				qbImgCropBox.attr("id",qbImgCropId);

				//Assigning drag events to crop box
				qbImgCropBox.bind("dragstart",function(event){
					if(angular.element(event.target).hasClass("qb-img-crop-box-img"))
					{
						if((event.clientX<qbImgCropStageOffset.endPoint.x)&&(event.clientY<qbImgCropStageOffset.endPoint.y))
						{
							qbPointerPoisition.x=event.clientX;
							qbPointerPoisition.y=event.clientY;
						}
					}
				});
				qbImgCropBoxResize.bind("dragstart",function(event){
					qbPointerPoisition.x=event.clientX;
					qbPointerPoisition.y=event.clientY;
				});	
				
				qbImgCropBox.bind("drag",function(event){
					if(angular.element(event.target).hasClass("qb-img-crop-box-img"))
					{
						//for x axis
						if((event.clientX>qbImgCropStageOffset.startPoint.x)&&(event.clientX<qbImgCropStageOffset.endPoint.x))
						{
							if(!(qbPointerPoisition.x==event.clientX))
							{
								var diffX=event.clientX-qbPointerPoisition.x;
								if((qbImgCropStageOffset.endPoint.x>(qbImgCropBoxOffset.endPoint.x+diffX))&&(qbImgCropStageOffset.startPoint.x<(qbImgCropBoxOffset.startPoint.x+diffX)))
								{
									qbImgCropBoxSetFun(diffX,0);
									qbImgSetOffsetFun();
								}
								else
								{
									if(qbImgCropStageOffset.endPoint.x<(qbImgCropBoxOffset.endPoint.x+diffX))
									{
										diffX=qbImgCropStageOffset.endPoint.x-qbImgCropBoxOffset.endPoint.x;
									}
									else if(qbImgCropStageOffset.startPoint.x>(qbImgCropBoxOffset.startPoint.x+diffX))
									{
										diffX=qbImgCropStageOffset.startPoint.x-qbImgCropBoxOffset.startPoint.x;
									}
									qbImgCropBoxSetFun(diffX,0);
									qbImgSetOffsetFun();
								}

							}
						}

						//for y axis
						if((event.clientY>qbImgCropStageOffset.startPoint.y)&&(event.clientY<qbImgCropStageOffset.endPoint.y))
						{
							if(!(qbPointerPoisition.y==event.clientY))
							{
								var diffY=event.clientY-qbPointerPoisition.y;
								if((qbImgCropStageOffset.endPoint.y>(qbImgCropBoxOffset.endPoint.y+diffY))&&(qbImgCropStageOffset.startPoint.y<(qbImgCropBoxOffset.startPoint.y+diffY)))
								{
									qbImgCropBoxSetFun(0,diffY);
									qbImgSetOffsetFun();
								}
								else
								{
									if(qbImgCropStageOffset.endPoint.y<(qbImgCropBoxOffset.endPoint.y+diffY))
									{
										diffY=qbImgCropStageOffset.endPoint.y-qbImgCropBoxOffset.endPoint.y;
									}
									else if(qbImgCropStageOffset.startPoint.y>(qbImgCropBoxOffset.startPoint.y+diffY))
									{
										diffY=qbImgCropStageOffset.startPoint.y-qbImgCropBoxOffset.startPoint.y;
									}
									qbImgCropBoxSetFun(0,diffY);
									qbImgSetOffsetFun();
								}

							}
						}

						qbPointerPoisition.x=event.clientX;
						qbPointerPoisition.y=event.clientY;	
					}
				});
				qbImgCropBoxResize.bind("drag",function(event){
					//for x-axis
					var newCropBoxWidthPx=0;
					var newCropBoxWidthPer=0;
					var diffX=0;
					if((event.clientX>qbImgCropStageOffset.startPoint.x)&&(event.clientX<qbImgCropStageOffset.endPoint.x))
					{
						var diffX=event.clientX-qbPointerPoisition.x;
						newCropBoxWidthPx=parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('width'))+diffX;				
						newCropBoxWidthPer=newCropBoxWidthPx*100/qbImgCropStageWidth;
					}

					//for y-axis
					var newCropBoxHeightPx=0;
					var newCropBoxHeightPer=0;
					var diffY=0;
					if((event.clientY>qbImgCropStageOffset.startPoint.y)&&(event.clientY<qbImgCropStageOffset.endPoint.y))
					{
						var diffY=event.clientY-qbPointerPoisition.y;
						newCropBoxHeightPx=parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('height'))+diffY;				
						newCropBoxHeightPer=newCropBoxHeightPx*100/qbImgCropStageHeight;
					}

					if((scope.qbImgCropShape=="circle")||(scope.qbImgCropShape=="square"))
					{
						if((diffX>diffY)&&(newCropBoxHeightPx))
						{
							scope.qbImgCropBoxSizeSetFun(newCropBoxHeightPx+"px",newCropBoxHeightPx+"px");
						}
						else if((diffX<=diffY)&&(newCropBoxWidthPx))
						{
							scope.qbImgCropBoxSizeSetFun(newCropBoxWidthPx+"px",newCropBoxWidthPx+"px");
						}
					}
					else if(scope.qbImgCropShape=="free")
					{
						if((newCropBoxHeightPx)||(newCropBoxWidthPx))
						{
							scope.qbImgCropBoxSizeSetFun(newCropBoxWidthPx+"px",newCropBoxHeightPx+"px");
						}
					}
					else if(scope.qbImgCropShape=="same")
					{
						if((newCropBoxHeightPer)||(newCropBoxWidthPer))
						{
							if(newCropBoxHeightPer>newCropBoxWidthPer)
							{
								scope.qbImgCropBoxSizeSetFun(newCropBoxWidthPer+"%",newCropBoxWidthPer+"%");
							}
							else if(newCropBoxHeightPer<=newCropBoxWidthPer)
							{
								scope.qbImgCropBoxSizeSetFun(newCropBoxHeightPer+"%",newCropBoxHeightPer+"%");
							}
						}
					}

					qbPointerPoisition.x=event.clientX;
					qbPointerPoisition.y=event.clientY;
				});
			 
				
				qbImgCropBox.bind("dragover",function(event){
					if((event.clientX<qbImgCropStageOffset.endPoint.x)&&(event.clientY<qbImgCropStageOffset.endPoint.y))
					{
					}
				});
			}

			var qbImgCoverSetHeightFun=function(qbImgRatio){
				var qbImgCover=angular.element(element[0].querySelector(".qb-img-cover"));
				var qbImgCropBoxImg=angular.element(element[0].querySelector(".qb-img-crop-box-img"));
				var qbImgCoverWidth=parseFloat(window.getComputedStyle(qbImgCover[0], null).getPropertyValue('width'));
				var qbImgCoverHeight=qbImgCoverWidth/qbImgRatio;
				
				qbImgCover.css("height",qbImgCoverHeight+"px");	
				qbImgCropBoxImg.attr("height",qbImgCoverHeight+"px");
				qbImgCropBoxImg.attr("width",qbImgCoverWidth+"px");
			}

			var qbImgSetOffsetFun=function(){
				qbImgCropStageOffset.startPoint.x=angular.element(element).children().offset().left;
				qbImgCropStageOffset.startPoint.y=angular.element(element).children().offset().top;

				qbImgCropStageOffset.endPoint.x=qbImgCropStageOffset.startPoint.x+parseFloat(window.getComputedStyle(angular.element(element).children()[0], null).getPropertyValue('width'));
				qbImgCropStageOffset.endPoint.y=qbImgCropStageOffset.startPoint.y+parseFloat(window.getComputedStyle(angular.element(element).children()[0], null).getPropertyValue('height'));

				qbImgCropBoxOffset.startPoint.x=qbImgCropBox.offset().left;
				qbImgCropBoxOffset.startPoint.y=qbImgCropBox.offset().top;

				qbImgCropBoxOffset.endPoint.x=qbImgCropBoxOffset.startPoint.x+parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('width'));
				qbImgCropBoxOffset.endPoint.y=qbImgCropBoxOffset.startPoint.y+parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('height'));

				qbImgCropBoxResizeOffset.startPoint.x=parseFloat(window.getComputedStyle(qbImgCropBoxResize[0], null).getPropertyValue('left'));
				qbImgCropBoxResizeOffset.startPoint.y=parseFloat(window.getComputedStyle(qbImgCropBoxResize[0], null).getPropertyValue('top'));
				
				qbImgCropBoxResizeOffset.endPoint.x=parseFloat(window.getComputedStyle(qbImgCropBoxResize[0], null).getPropertyValue('left'))+parseFloat(window.getComputedStyle(qbImgCropBoxResize[0], null).getPropertyValue('width'));
				qbImgCropBoxResizeOffset.endPoint.y=parseFloat(window.getComputedStyle(qbImgCropBoxResize[0], null).getPropertyValue('top'))+parseFloat(window.getComputedStyle(qbImgCropBoxResize[0], null).getPropertyValue('height'));
			}

			var qbImgCropBoxSetFun=function(diffX,diffY){
				var qbImgCropBoxLeft=parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('left'));
				var qbImgCropBoxTop=parseFloat(window.getComputedStyle(qbImgCropBox[0], null).getPropertyValue('top'));

				var qbImgCropBoxImgLeft=parseFloat(window.getComputedStyle(qbImgCropBoxImg[0], null).getPropertyValue('left'));
				var qbImgCropBoxImgTop=parseFloat(window.getComputedStyle(qbImgCropBoxImg[0], null).getPropertyValue('top'));

				qbImgCropBox.css("left",(qbImgCropBoxLeft+diffX)+"px");
				qbImgCropBox.css("top",(qbImgCropBoxTop+diffY)+"px");
				
				qbImgCropBoxImg.css("left",(qbImgCropBoxImgLeft-diffX)+"px");
				qbImgCropBoxImg.css("top",(qbImgCropBoxImgTop-diffY)+"px");

				qbImgCropDisplay.children().scope().qbImgCropDisplayDragFun(diffX,diffY);
								
			}

			//all functions must be updated on the basis of this
			var qbSetImgPositionOnResize=function(){
				var qbImgCropBoxLeft=qbImgCropBoxOffset.startPoint.x-qbImgCropStageOffset.startPoint.x;
				var qbImgCropBoxTop=qbImgCropBoxOffset.startPoint.y-qbImgCropStageOffset.startPoint.y;

				qbImgCropDisplay.children().scope().qbSetDisplayPositionOnResize(qbImgCropBoxLeft,qbImgCropBoxTop);
			}
		},
		template: function(element,attr){
			return "<div class=\"qb-img-crop-stage\">"+
						   "<div class=\"qb-img-cover\" style=\"background-position: center center; background-size: cover; background-repeat: no-repeat;\">"+
								"<div class=\"qb-img-layer\" style=\"width: 100%; height: 100%; position: relative; overflow: hidden;\">"+
									"<div class=\"qb-img-crop-box\" style=\" position: relative;  overflow: hidden; width:50% ;height: 50%\" draggable=\"true\">"+
										"<img class=\"qb-img-crop-box-img\" style=\"position: absolute; object-fit: cover;\">"+
										"<div class=\"qb-img-crop-box-img-wrap\">"+
											"<div class=\"qb-img-crop-box-img-wrap-top-layer\" style=\" position: absolute; width: 100%; top:0px; height: 5%;\" ></div>"+
											"<div class=\"qb-img-crop-box-img-wrap-bottom-layer\" style=\"position: absolute; width: 100%; bottom:0px; height: 5%;\" ></div>"+
											"<div class=\"qb-img-crop-box-img-wrap-left-layer\" style=\" position: absolute; width: 5%; left:0px; height: 100%;\" ></div>"+
											"<div class=\"qb-img-crop-box-img-wrap-right-layer\" style=\" position: absolute; width: 5%; right:0px; height: 100%;\" ></div>"+
											"<div class=\"qb-img-crop-box-img-wrap-resize-layer\" style=\"\" draggable=\"true\" ></div>"+
										"</div>"+	
									"</div>"+
								"</div>"+
						   "</div>"+
				   "</div>"+
				   "<div class=\"qb-img-crop-copy\" style=\"display:none;\">"+
				 		"<img class=\"qb-img-crop-img-copy\">"+  
				   "</div>"
		}
	}
}]);
myApp.directive('qbImgCropScale',['qbDataBase','qbBasics',function(qbDataBase,qbBasics){
	return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr,ctrl,transclude){
			var qbImgCrop=qbBasics.findParent(element,"qb-img-crop");
			var qbImgCropStage=angular.element(qbBasics.findChildren(qbImgCrop,"qb-img-crop-stage"));
			var qbImgScaleDimensions=angular.element(qbBasics.findChildren(element,"qb-img-scale-dimensions"));
			var qbImgScaleShape=angular.element(qbBasics.findChildren(element,"qb-img-scale-shape"))

			scope.qbImgCropScaleInitFun=function(){
				qbImgScaleShape.children().scope().qbImgCropShapeInitFun();
				qbImgScaleDimensions.children().scope().qbImgScaleDimensionsInitFun();
			}
			scope.qbImgScaleShapeSetFun=function(qbCropImgShape){
				qbImgScaleDimensions.children().scope().qbImgCropShapeSetFun(qbCropImgShape);
			}
			scope.qbCropBoxDimensionsSetFun=function(qbHeight,qbWidth){
				
				qbImgCropStage.children().scope().qbImgCropBoxSizeSetFun(qbWidth,qbHeight);
			}
		},
		template: function(element,attr){
			return 	"<div class=\"qb-img-crop-scale\" style=\" height: auto;  width: 100%;\" ng-transclude>"+
					"</div>"
		}
	}
}]);
myApp.directive('qbImgScaleShape',['qbDataBase','qbBasics',function(qbDataBase,qbBasics){
	return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr,ctrl,transclude){
			var qbImgCropShapes;
			var qbImgCropShapeOptions=element[0].querySelectorAll("option");
			var qbImgCropShapeSelect=angular.element(element[0].querySelector("select"));
			var qbImgCrop=qbBasics.findParent(element,"qb-img-crop");
			var qbImgCropScale=qbBasics.findParent(element,"qb-img-crop-scale");
			var qbImgCropStage=angular.element(qbBasics.findChildren(qbImgCrop,"qb-img-crop-stage"));
			
			scope.qbImgCropShapeInitFun=function(){
				if(attr.qbImgCropShape)
				{
					qbImgCropShapes=attr.qbImgCropShape.split(",");
				}
				if(qbImgCropShapes)
				{
					if(qbImgCropShapes.length>1)
					{
						angular.forEach(qbImgCropShapeOptions,function(shapeOption,key){
							if((qbImgCropShapes.includes(shapeOption.value))||(shapeOption==""))
							{
								angular.element(shapeOption).css("display","block")
							}
							else
							{
								angular.element(shapeOption).css("display","none")
							}
						});
					}
					else
					{
						qbImgCropScale.children().scope().qbImgScaleShapeSetFun(qbImgCropShapes[0]);	
						qbImgCropStage.children().scope().qbImgCropBoxShapeSetFun(qbImgCropShapes[0]);
						qbImgCropShapeSelect.css("display","none");
					}
				}
			}
			scope.qbCropImgShape="";
			
			scope.$watch('qbCropImgShape', function (newval, oldval) {
				qbImgCropScale.children().scope().qbImgScaleShapeSetFun(newval);	
				qbImgCropStage.children().scope().qbImgCropBoxShapeSetFun(newval);
			});
		},
		template: function(element,attr){
			return	"<div class=\"qb-img-scale-shape\">"+
						"<select ng-model=\"qbCropImgShape\">"+
							"<option value=\"\">Select Shape</option>"+
							"<option value=\"square\">Square</option>"+
							"<option value=\"circle\">Circle</option>"+
							"<option value=\"free\">Free</option>"+
							"<option value=\"same\">Same</option>"+
						"</select>"+
					"</div>"
		}
	}
}]);
myApp.directive('qbImgScaleDimensions',['qbDataBase','qbBasics',function(qbDataBase,qbBasics){
	return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr,ctrl,transclude){
			var qbImgCropScale=qbBasics.findParent(element,"qb-img-crop-scale");
			var qbImgCropScaleTypeDivs=angular.element(element).children().children();
			
			scope.qbWidthInputType="%";
			scope.qbWidthInput="50";

			scope.qbHeightInputType="%";
			scope.qbHeightInput="50";

			scope.qbSquareInput="50";

			scope.qbCircleInput="50";

			scope.qbSameInput="50";

			angular.element(element).ready(function(){
				scope.qbImgCropShape="free";
				scope.qbImgScaleDimensionsInitFun();
			});

			scope.qbImgScaleDimensionsInitFun=function(){
				scope.qbImgCropShapeSetFun(scope.qbImgCropShape);	
				scope.qbSetDimensionsFun();
			}

			scope.qbImgCropShapeSetFun=function(qbImgCropShape){
				if(qbImgCropScale=="")
				{
					scope.qbImgCropShape="free";
				}
				else
				{
					scope.qbImgCropShape=qbImgCropShape;
				}
				angular.forEach(qbImgCropScaleTypeDivs,function(value,key){
					var qbImgCropScaleTypeClassName="qb-img-scale-"+scope.qbImgCropShape;
					if(angular.element(value)[0].nodeName=="DIV")
					{
						if(angular.element(value).hasClass(qbImgCropScaleTypeClassName))
						{
							angular.element(value).css("display","block");
						}
						else
						{
							angular.element(value).css("display","none");
						}	
					}
				});

				scope.qbSetDimensionsFun();
			}

			scope.qbSetDimensionsFun=function(){
				if(scope.qbImgCropShape=="free")
				{	
					var qbWidth=scope.qbWidthInput+scope.qbWidthInputType;
					var qbHeight=scope.qbHeightInput+scope.qbHeightInputType;

					qbImgCropScale.children().scope().qbCropBoxDimensionsSetFun(qbHeight,qbWidth);
				}
				else if(scope.qbImgCropShape=="square")
				{
					var qbWidth=scope.qbSquareInput+"px";
					var qbHeight=scope.qbSquareInput+"px";

					qbImgCropScale.children().scope().qbCropBoxDimensionsSetFun(qbHeight,qbWidth);
				}
				else if(scope.qbImgCropShape=="circle")
				{
					var qbWidth=scope.qbCircleInput+"px";
					var qbHeight=scope.qbCircleInput+"px";

					qbImgCropScale.children().scope().qbCropBoxDimensionsSetFun(qbHeight,qbWidth);
				}
				else if(scope.qbImgCropShape=="same")
				{
					var qbWidth=scope.qbSameInput+"%";
					var qbHeight=scope.qbSameInput+"%";

					qbImgCropScale.children().scope().qbCropBoxDimensionsSetFun(qbHeight,qbWidth);
				}
			}
		},
		template: function(element,attr){
			return	"<div class=\"qb-img-scale-dimensions\">"+
						//For Free
						"<div class=\"qb-img-scale-free\">"+
							"<div class=\"qb-img-scale-width\">"+
								"Width  "+
								"<input class=\"qb-img-scale-width-input\" ng-model=\"qbWidthInput\">"+
								"<select class=\"qb-img-scale-width-select\" ng-model=\"qbWidthInputType\">"+
									"<option value=\"%\">Percent %</option>"+
									"<option value=\"px\">Pixel px</option>"+
								"</select>"+
							"</div>"+
						
							"<div class=\"qb-img-scale-height\">"+
								"Height  "+
								"<input class=\"qb-img-scale-height-input\" ng-model=\"qbHeightInput\">"+
								"<select class=\"qb-img-scale-height-select\" ng-model=\"qbHeightInputType\">"+
									"<option value=\"%\">Percent %</option>"+
									"<option value=\"px\">Pixel px</option>"+
								"</select>"+
							"</div>"+
						"</div>"+

						//For sqaure
						"<div class=\"qb-img-scale-square\">"+
							"Side  "+
							"<input class=\"qb-img-scale-square-input\" ng-model=\"qbSquareInput\">"+
							"<span class=\"qb-img-scale-square-span\">Pixel px</span>"+
						"</div>"+
					
						//For circle
						"<div class=\"qb-img-scale-circle\">"+
							"Size  "+
							"<input class=\"qb-img-scale-circle-input\" ng-model=\"qbCircleInput\">"+
							"<span class=\"qb-img-scale-circle-span\">Pixel px</span>"+
						"</div>"+
					
						//For Same
						"<div class=\"qb-img-scale-same\">"+
							"Size  "+
							"<input class=\"qb-img-scale-same-input\" ng-model=\"qbSameInput\">"+
							"<span class=\"qb-img-scale-same-span\">Percent %</span>"+
						"</div>"+
						"<button class=\"qb-img-scale-dimensions-button\" ng-click=\"qbSetDimensionsFun()\">Set Dimensions</button>"+
					"</div>"
		}
	}
}]);
myApp.directive('qbImgScaleDirection',['qbDataBase','qbBasics',function(qbDataBase,qbBasics){
	return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr,ctrl,transclude){
			var qbImgCropScale=qbBasics.findParent(element,"qb-img-crop-scale");
			
			
		},
		template: function(element,attr){
			return	"<div class=\"qb-img-scale-direction\">"+

					"</div>"
		}
	}
}]);
myApp.directive('qbImgCropDisplay',['qbDataBase','qbBasics',function(qbDataBase,qbBasics){
	return {
		scope: {},
		transclude: true,
		link: function(scope,element,attr,ctrl,transclude){
			var qbImgCropDisplayWrap=angular.element(element[0].querySelector(".qb-img-crop-display-wrap"));
			var qbImgCropDisplayImg=angular.element(element[0].querySelector(".qb-img-crop-display-img"));
			var qbImgCropDisplayDiv=angular.element(element[0].querySelector(".qb-img-crop-display"));
			var qbDisplayImgRatio;

			scope.qbImgCropDisplaySetShape=function(qbImgCropShape){
				if(qbImgCropShape=="circle")
				{
					qbImgCropDisplayDiv.css("border-radius","50%");
				}
				else
				{
					qbImgCropDisplayDiv.css("border-radius","unset");
				}
			}
			scope.qbImgCropDisplayInitFun=function(qbImgSrc){
				qbImgCropDisplayImg.attr("src",qbImgSrc);
			}

			scope.qbImgDisplaySizeSetFun=function(qbImgCropBoxRatio){
				var qbImgDisplayHeight=parseFloat(window.getComputedStyle(qbImgCropDisplayWrap[0], null).getPropertyValue('width'))/qbImgCropBoxRatio;
				qbImgCropDisplayDiv.css("height",qbImgDisplayHeight+"px");
			}

			scope.qbImgDisplayImgSizeSetFun=function(qbImgCropWidthRatio){
				var qbImgCropDisplayImgWidth=parseFloat(window.getComputedStyle(angular.element(element).children()[0], null).getPropertyValue('width'))*qbImgCropWidthRatio;
				qbImgCropDisplayImg.attr("width",qbImgCropDisplayImgWidth);			
			}
			scope.qbImgCropAndDisplayRatio=function(qbImgCropWidth){
				var qbImgCropDisplayImgWidth=parseFloat(window.getComputedStyle(qbImgCropDisplayImg[0], null).getPropertyValue('width'))
				qbDisplayImgRatio=qbImgCropDisplayImgWidth/qbImgCropWidth;
			}
			scope.qbImgCropDisplayDragFun=function(diffX,diffY){
				if(parseFloat(window.getComputedStyle(qbImgCropDisplayImg[0], null).getPropertyValue('left')))
				{
					var qbDisplayImgLeft=parseFloat(window.getComputedStyle(qbImgCropDisplayImg[0], null).getPropertyValue('left'))-(diffX*qbDisplayImgRatio);
					var qbDisplayImgTop=parseFloat(window.getComputedStyle(qbImgCropDisplayImg[0], null).getPropertyValue('top'))-(diffY*qbDisplayImgRatio);
				}
				else
				{
					var qbDisplayImgLeft=-(diffX*qbDisplayImgRatio);
					var qbDisplayImgTop=-(diffY*qbDisplayImgRatio);	
				}

				qbImgCropDisplayImg.css("left",qbDisplayImgLeft+"px");
				qbImgCropDisplayImg.css("top",qbDisplayImgTop+"px");
			}
			scope.qbSetDisplayPositionOnResize=function(qbImgCropBoxLeft,qbImgCropBoxTop){
				var qbDisplayImgLeft=-qbDisplayImgRatio*qbImgCropBoxLeft;
				var qbDisplayImgTop=-qbDisplayImgRatio*qbImgCropBoxTop;

				qbImgCropDisplayImg.css("left",qbDisplayImgLeft+"px");
				qbImgCropDisplayImg.css("top",qbDisplayImgTop+"px");
			}
			
		},
		template: function(element,attr){
			return	"<div class=\"qb-img-crop-display-wrap\" style=\"height:"+attr.qbMaxHeight+";width:"+attr.qbMaxWidth+"; overflow:hidden\">"+
						"<div class=\"qb-img-crop-display\" style=\" overflow: hidden;\" ng-tansclude>"+
							"<img class=\"qb-img-crop-display-img\" style=\" position: relative;\">"+
						"</div>"+
					"</div>"
		}
	}
}]);