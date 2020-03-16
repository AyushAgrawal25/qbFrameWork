<div class=\"qb-tabs\"> 
    <div ng-repeat=\"qbid in qbidies\" class=\"qb-tab-heading ng-isolate-scope ng-scope\" ng-init=\"loadfun(qbid)\" ng-click=\"clickfun(qbid)\" ></div> 
</div> 
<div class=\"nothing\" ng-transclude ></div>";
 "<div class=\"qb-tab\" ng-transclude ></div>";
 "<div style=\"display:none;\" ng-transclude></div>"
 "<div class=\"qb-tab-content\" ng-transclude></div>"