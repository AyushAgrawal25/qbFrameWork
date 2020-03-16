var myApp = angular.module('qbApp', []);
myApp.controller('qbCtrl', ['$scope', '$compile', function($scope,$compile) {
    var isMouseDown=false;
    var qbMouseOffset={
        x:null,y:null
    };

    var qbItemOffset={
        x:null,y:null
    }

    
    var qbTitleWraps=document.querySelectorAll(".qb-title");
    angular.forEach(qbTitleWraps, function(qbTitleWrap, key){
        angular.element(qbTitleWrap).bind("mousedown",function(event){
            isMouseDown=true;
            qbMouseOffset.x=event.target.offsetLeft-event.clientX;
            qbMouseOffset.y=event.target.offsetTop-event.clientY;

            qbItemOffset.x=event.target.offsetLeft;
            qbItemOffset.y=event.target.offsetTop;

            angular.element(event.target).css("z-index","5");
        });

        angular.element(qbTitleWrap).bind("mousemove",function(event){
            event.preventDefault();
            if(isMouseDown)
            {
                var qbItemLeft=qbMouseOffset.x+event.clientX;
                var qbItemTop=qbMouseOffset.y+event.clientY;
                angular.element(event.target).css("left",qbItemLeft+"px");
                angular.element(event.target).css("top",qbItemTop+"px");
            }
        });

        angular.element(qbTitleWrap).bind("mouseup",function(event){
            isMouseDown=false;
            if(!isMouseDown)
            {
                angular.element(event.target).css("left",qbItemOffset.x+"px");
                angular.element(event.target).css("top",qbItemOffset.y+"px");
            }
        });
    });
}]);