<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cs4u first Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        <link rel="stylesheet" href="FRAMEWORK-basic.css">
        <link rel="stylesheet" href="FRAMEWORK-styling.css">
        <link rel="stylesheet" href="FRAMEWORK-font-styling.css">
        <link rel="stylesheet" href="profile(basic).css">
        <link rel="stylesheet" href="tab(basic).css">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script data-require="angular.js@1.3.x" src="https://code.angularjs.org/1.3.17/angular.js" data-server="1.3.17"></script>
        <script src="../../public/js/cube_fabric.js"></script>   	
    	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
    	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    	<link rel="stylesheet" href="../../public/css/widgets.css">
    	<link rel="stylesheet" href="../../public/css/look.css">
    	<link rel="stylesheet" href="../../public/css/template1(22-04-19)-accordion.css">
    </head>
    <style>
        * {
          box-sizing: border-box;
          padding:0;
          margin:0;
        }
        
        .row::after {
          content: "";
          clear: both;
          display: table;
        }
        
        [class*="col-"] {
          float: left;
          padding: 15px;
        }
        
        html {
          font-family: "Lucida Sans", sans-serif;
        }
        
        .menu ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        
        .menu li {
          padding: 8px;
          margin-bottom: 7px;
          background-color: #33b5e5;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        
        .menu2{
          padding: 8px;
          margin-bottom: 7px;
          background-color: #33b5e5;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        
        .menu li:hover {
          background-color: #0099cc;
        }
        
        .aside {
          background-color: #33b5e5;
          padding: 15px;
          color: #ffffff;
          text-align: center;
          font-size: 14px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        
        .footer {
           left: 0;
           bottom: 0;
           width: 100%;
           background-color:#0099cc;
           color: white;
           padding:20px;
           text-align: center;
        }
        
        .mid {
            background-color:white;
            text-align: center;
            font-size: 12px;
            padding: 15px;
        }
        
        /* For mobile phones: */
        [class*="col-"] {
          width: 100%;
        }
        
        @media only screen and (min-width: 600px) {
          /* For tablets: */
          .col-s-1 {width: 8.33%;}
          .col-s-2 {width: 16.66%;}
          .col-s-3 {width: 25%;}
          .col-s-4 {width: 33.33%;}
          .col-s-5 {width: 41.66%;}
          .col-s-6 {width: 50%;}
          .col-s-7 {width: 58.33%;}
          .col-s-8 {width: 66.66%;}
          .col-s-9 {width: 75%;}
          .col-s-10 {width: 83.33%;}
          .col-s-11 {width: 91.66%;}
          .col-s-12 {width: 100%;}
        }
        
        @media only screen and (max-width: 600px) {
            .menu {height: auto;}
        }
        
        @media only screen and (min-width: 600px) {
          /* For tablets: */
          .col-s-1 {width: 8.33%;}
          .col-s-2 {width: 16.66%;}
          .col-s-3 {width: 25%;}
          .col-s-4 {width: 33.33%;}
          .col-s-5 {width: 41.66%;}
          .col-s-6 {width: 50%;}
          .col-s-7 {width: 58.33%;}
          .col-s-8 {width: 66.66%;}
          .col-s-9 {width: 75%;}
          .col-s-10 {width: 83.33%;}
          .col-s-11 {width: 91.66%;}
          .col-s-12 {width: 100%;}
        }
        @media only screen and (min-width: 768px) {
          /* For desktop: */
          .col-1 {width: 8.33%;}
          .col-2 {width: 16.66%;}
          .col-3 {width: 25%;}
          .col-4 {width: 33.33%;}
          .col-5 {width: 41.66%;}
          .col-6 {width: 50%;}
          .col-7 {width: 58.33%;}
          .col-8 {width: 66.66%;}
          .col-9 {width: 75%;}
          .col-10 {width: 83.33%;}
          .col-11 {width: 91.66%;}
          .col-12 {width: 100%;}
        }
        
        //div resize
        .example {
            position: relative;
            line-height: 20px;
        }
        .example:before,
        .example:after {
            content: "";
            display: table;
        }
        button {
            display: inline-block;
            border: 1px solid #ccc;
            background: #fff;
            color: #000;
            font-size: inherit;
            font-family: inherit;
            line-height: 24px;
            height: 24px;
            line-height: 24px;
            padding: 0 15px;
            margin: 0 5px 0;
            border-radius: 3px;
        }
        
        .sensor,
        .sensor-expand,
        .sensor-shrink {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            overflow: scroll;
            z-index: -1;
            visibility: hidden;
        }
        .sensor-expand-child,
        .sensor-shrink-child {
            position: absolute;
            left: 0;
            top: 0;
        }
        .sensor-shrink-child {
            width: 200%;
            height: 200%;
        }
        
        //row css
        .rTable {
        	display: table;
        	width: 100%;
        }
        .rTableRow {
            display: table-row;
        }
        .rTableHeading {
        	display: table-header-group;
        	background-color: #ddd;
        }
        .rTableCell, .rTableHead {
        	display: table-cell;
        	width:33%;
        	padding: 3px 10px;
        	border: 1px solid #999999;
        }
        .rTableHeading {
        	display: table-header-group;
        	background-color: #ddd;
        	font-weight: bold;
        }
        .rTableFoot {
        	display: table-footer-group;
        	font-weight: bold;
        	background-color: #ddd;
        }
        .rTableBody {
        	display: table-row-group;
        }
        .open {
            display:block;
        }
        .close {
            display:none;
        }
        .active {
            display:block;
        }
        .inactive {
            display:none;
        }

    </style>

    <body ng-app="myApp" ng-controller="myCtrl">
        <qb-compile></qb-compile>
        <qb-container title="container">
            
            //filter directive test
            <qb-filter filter-id="1" default-select="Select Country" table="location_master" column="Location_Master_Country" fcolumn="Status" fvalue="1" val="country"></qb-filter> {{country}}
            <qb-filter filter-id="2" fetch-id="1" table="location_master" column="Location_Master_State" fcolumn="Location_Master_Country" fvar="country" val="state"></qb-filter>
            <qb-filter filter-id="3" fetch-id="2" table="location_master" column="Location_Master_City" fcolumn="Location_Master_State" fvar="state" val="name"></qb-filter>{{name}}
            
            <qb-modal>
                <qb-modal-open-button> open </qb-modal-open-button>
                <qb-modal-close-button> close </qb-modal-close-button>
                <qb-modal-content> Aman is Dumbo </qb-modal-content>
            </qb-modal>
            
            //accordion directive test
            <qb-accordions>
                <qb-accordion classes="qb-accordion margin-accordion border-accordion" default="open" >
                    <qb-acc-heading classes="qb-accordion-heading padding-heading-accordion text-color_pinkle bg-color_blarcke">
                        Angular Js
                    </qb-acc-heading>
                    <qb-acc-content classes="qb-accordion-content padding-content-accordion">
                        salkhv wksjdvh kasdhkn  skjhvkj
                    </qb-acc-content>
                </qb-accordion>
                <qb-accordion classes="qb-accordion margin-accordion border-accordion" default="open" >
                    <qb-acc-heading classes="qb-accordion-heading padding-heading-accordion text-color_pinkle bg-color_blarcke">
                        Angular Js
                    </qb-acc-heading>
                    <qb-acc-content classes="qb-accordion-content padding-content-accordion">
                        salkhv wksjdvh kasdhkn  skjhvkj
                    </qb-acc-content>
                </qb-accordion>
            </qb-accordions>
            
            <qb-bar qb-bar-type="menu" qb-bar-id="myMenuBar" qb-open-class="open" qb-close-class="close">
                Menu Bar
                <qb-icon style="float:left" qb-icon-type="search" qb-icon-id="myMenuBar" qb-target-id="mySearchBar">
                    <i class="fa fa-search"></i>
                </qb-icon>
            </qb-bar>
            
            <qb-bar qb-bar-type="search" qb-bar-id="mySearchBar" qb-open-class="active" qb-close-class="inactive">
                Search Bar
                <qb-icon style="float:left" qb-icon-type="back" qb-icon-id="mySearchBar" qb-target-id="myMenuBar">
                    <i class="fa fa-arrow-left"></i>
                </qb-icon>
            </qb-bar>
            
            //qbtabs
            <qb-tabs classes="qb-tabs,bg-color_discover,padding-container" qb-headings-style="allign:centre;size:fullfill;total-width:80%">
                <qb-tab>
                    <qb-tab-heading classes="qb-tab-heading,bg-color_discover,border-bottom,padding-heading hover" qb-tab-open-classes="dbfks,dbhsdkjsk">
                        tab-1
                        <i class="fa fa-search"></i>
                        <i class="fa fa-home"></i>
                        
                    </qb-tab-heading>
                    <qb-tab-content classes="qb-tab-content,bg-color_discover,padding-content">
                        tab-1<br>
                        tabs are good.extreamly usefull
                    </qb-tab-content>
                </qb-tab>
                <qb-tab>
                    <qb-tab-heading classes="qb-tab-heading,bg-color_discover,border-bottom,padding-heading,hover" qb-tab-open-classes="osefkuhs,lawhkgh">
                        tab-2
                        <i class="fa fa-search"></i>
                    </qb-tab-heading>
                    <qb-tab-content classes="qb-tab-content,bg-color_discover,padding-content">
                        tab-2<br>
                         tabs are good.
                        <br>
                        extreamly usefull
                    </qb-tab-content>
                </qb-tab>
                <qb-tab>
                    <qb-tab-heading classes="qb-tab-heading bg-color_discover,border-bottom,padding-heading,hover">
                        tab-3
                        <i class="fa fa-search"></i>
                    </qb-tab-heading>
                    <qb-tab-content classes="qb-tab-content,bg-color_discover,padding-content">
                        tab-3<br>
                        tabs are good.extreamly usefull
                    </qb-tab-content>
                </qb-tab>
                <qb-tab>
                    <qb-tab-heading classes="qb-tab-heading,bg-color_discover,border-bottom,padding-heading,hover">
                        tab-4
                        <i class="fa fa-search"></i>
                    </qb-tab-heading>
                    <qb-tab-content classes="qb-tab-content,bg-color_discover,padding-content">
                        tab-4<br>
                         tabs are good.
                        <br>
                        extreamly usefull
                    </qb-tab-content>
                </qb-tab>
                <qb-tab>
                    <qb-tab-heading classes="qb-tab-heading,bg-color_discover,border-bottom,padding-heading,hover">
                        CSS
                    </qb-tab-heading>
                    <qb-tab-content>
                        s;lkgkj asdng nkl sh
                        <br>
                        lksjighjw
                        <br>
                        ajfWILa
                    </qb-tab-content>
                </qb-tab>
                <qb-tab>
                    <qb-tab-heading classes="qb-tab-heading,bg-color_discover,border-bottom,padding-heading,hover">
                        PHP
                    </qb-tab-heading>
                    <qb-tab-content>
                        jhsfa hsfh ag ba gsg
                    </qb-tab-content>
                </qb-tab>
            </qb-tabs>
            
            //row test <br>
            <qb-row responsive="true">
                <div qb-cell-width="20%" class="col-s-3" style="overflow:hidden"> kjiafkhb n </div>
                <div qb-cell-width="20%" class="col-s-3" > 
                    <input type="text" style="width:90%" ng-model="cell1"> {{cell1}}
                </div>
                <div qb-cell-width="20%" class="col-s-3" > 
                    <input type="text" style="width:90%" ng-model="cell2"> {{cell2}}
                </div>
                <div qb-cell-width="20%" class="col-s-3" > 
                    <input type="text" style="width:90%" ng-model="cell3"> {{cell3}}
                </div>
                <div qb-cell-width="20%" class="col-s-3"> 
                    <input type="text" style="width:90%" ng-model="cell4"> {{cell4}}
                </div>
            </qb-row>
            
            //qb align <br>
            <div qb-content-align="vertical:centre;horizontal:middle;width-type:static;height-type:static" style="width:100%;overflow:hidden">
                <div class="col-s-3" style="width:150px" >
                    <input type="text" style="width:90%" ng-model="typo">
                    {{typo}}
                </div>
                <div class="col-s-3" style="width:150px" > bvjvj c  bvac</div>
                <div class="col-s-3" style="width:150px" > bvjvj c  bvac</div>
            </div>
            
            <qb-auto-completes>
                // auto complete data type
                <qb-auto-complete qb-datas="Ayush,Aman,Raj,Shreya,Ishan,Sanskar,Daku Horo Singh,Harsh,Ganesh,Pratik,Gauri,Shubhanshu" qb-model="aman"></qb-auto-complete>
                {{aman}} <br>
                
                // auto complete scope type
                <qb-auto-complete qb-scope="countries" qb-model="naman"></qb-auto-complete>
                {{naman}} <br>
                
                // auto complete data base type
                <qb-auto-complete table="location_master" column="Location_Master_City" fcolumn="Location_Master_Country" fvalue="India" qb-model="state"></qb-auto-complete>
                {{state}} <br>
            </qb-auto-completes>
            //Avatar
            <qb-avatar qb-width="40%" qb-avatar-class="ayush ayush" qb-image-class="agr agr" qb-height="5%" qb-src="http://www.cs4u.shiksha/public/css/Aquaman.jpg"></qb-avatar>
            
            // valid test
            <qb-valid qb-model="state"></qb-valid>
            
            <br>//qb Alert Directive
            <qb-alert qb-alert-backcover-class="Ayush Agr" qb-alert-class="Alert" qb-height="30%" qb-width="50%"></qb-alert>
            
            //Testing
            <button ng-click="changeFun()">
                Change Name Function                
            </button>
            <qb-test></qb-test>
            <button ng-click="myActiveFun()">Activate</button>
            <div id="qbAlertTest"></div>
            <div style="clear:both"></div>
            <div class="footer">How TO???????????</div>  
            
            <qb-wizard></qb-wizard>
            
        </qb-container>
    </body>
</html>