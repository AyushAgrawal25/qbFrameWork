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

//new project last seen 30-04-2019
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