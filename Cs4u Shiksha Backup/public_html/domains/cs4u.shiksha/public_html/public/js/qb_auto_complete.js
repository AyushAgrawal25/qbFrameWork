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
    
    this.contentsAlign=function(elem,alignStyle){
        var horizontalAlign="";
	    var verticalAlign="";
	    var alignValues=alignStyle.split(";");
        var contents=angular.element(elem).children();
        if(contents)
        {
            angular.forEach(alignValues, function(value, key){
                var alignValue=""; 
                alignValue=value.split(":");
                if((alignValue[0])=="vertical")
                {
                    if((alignValue[1])=="top")
    	            {
    	                
    	            }
    	            else if((alignValue[1])=="centre")
    	            {
    	                 
    	            }
    	            else if((alignValue[1])=="bottom")
    	            {
    	                
    	            }
                }
                else if((alignValue[0])=="horizontal")
                {
                    if((alignValue[1])=="left")
    	            {
    	                angular.forEach(contents, function(vCont, kCont){
    	                     angular.element(vCont)[0].style.float="left";
    	                 });    
    	            }
    	            else if((alignValue[1])=="middle")
    	            {
    	                var contsWidth=[];
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
    	            else if((alignValue[1])=="right")
    	            {
    	                angular.forEach(contents, function(vCont, kCont){
    	                     angular.element(vCont)[0].style.float="right";
    	                 });    
    	            }
                }
            }); 
        }
		    
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

// new version last seen on 20-04-2019
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


//needs update last seen on 23-03-19
myApp.directive('qbAutoCompleteOld',qbAutoCompleteOld)
qbAutoCompleteOld.$inject=['$http'];
function qbAutoCompleteOld($http)
{
    return {
        scope:{
		    val: "<",
		    fvar: "="
		},
		transclude: true,
		link: function(scope,element,attr){
		    var fvalue=attr.fvalue;
			var fvar=scope.fvar;
			if(fvalue)
			{
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:attr.fvalue};
			}
			else if(fvar)
			{
			    var filter_data={table:attr.table,column:attr.column,fcolumn:attr.fcolumn,fvalue:scope.fvar};
		    }
		    $http({
                method:'POST',url:'../controllers/filter.php',data:filter_data
                    }).then(function mySucces(response){
		    			scope.responses=response.data;
                    },function myError(response){
                        alert(response.statusText);
                });
            scope.loadfun=function(){
                var divs=angular.element(element).children().children();
                angular.forEach(divs, function(val1, key){
		            if(angular.element(val1).hasClass("ac-div-close"))
		            {
		                var divopt=angular.element(val1);
		                divopt.addClass("ac-div").removeClass("ac-div-close");
		            }
		        });
            };
            scope.unloadfun=function(){
                alert("unload");
                var divs=angular.element(element).children().children();
                angular.forEach(divs, function(val1, key){
		            if(angular.element(val1).hasClass("ac-div"))
		            {
		                var divopt=angular.element(val1);
		                divopt.addClass("ac-div-close").removeClass("ac-div");
		            }
		        });
            };
            scope.testfun=function(){
                alert("hfjkfgks");
            };
            scope.clickfun=function(response){
                scope.val=response;
                var divs=angular.element(element).children().children();
                angular.forEach(divs, function(val1, key){
		            if(angular.element(val1).hasClass("ac-div"))
		            {
		                var divopt=angular.element(val1);
		                divopt.addClass("ac-div-close").removeClass("ac-div");
		            }
		        });
            };
		},
		template: function(element,attr){
		    return "<span class=\"autoComplete\" ng-blur=\"unloadfun()\"> <input class=\"ac-textbox\" type=\"text\" ng-model=\"val\" ng-keypress=\"loadfun()\" ><div class=\"ac-div-close\" ng-repeat=\"response in responses| filter:val\" ng-click=\"clickfun(response)\">{{response}}</div> </span>";    
		}
	};
}