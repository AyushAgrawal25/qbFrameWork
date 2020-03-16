"use restrict"
var qbmod=angular.module("qbmod",[]);
qbmod.directive("modtest",function(){
    return{
        restrict: 'E',
        scope:{},
        transclude: 'true',
        link: function(scope,element,attr){
            element.bind("click",function(){
                alert("Hello!");
            });            
        },
        template: function(element,attr){
            return "<div style='color:green;border-width:20px;border-style:solid;'> hello </div>"
        }
    };
});