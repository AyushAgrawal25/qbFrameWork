<!DOCTYPE html>
<html>
    <head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cs4u first Page</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script data-require="angular.js@1.3.x" src="https://code.angularjs.org/1.3.17/angular.js" data-server="1.3.17"></script>
        <script src="../../public/js/qb_row.js"></script>   	
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
        .rough
        {
            width:100%;
        }
        .table
        {
            display:table;
            width:100%;
            padding:0;
            margin:0;
        }
        .row
        {
            display:table-row;
            padding:0;
            margin:0;
        }
        .cell
        {
            display:table-cell;
            width:25%;
            padding:0;
            margin:0;
            background-color:pink;
        }
    </style>

    <body ng-app="myApp" ng-controller="myCtrl">
        <div class="table">
            <div class="row">
                <div class="cell">
                    <div class="table">
                        <div class="row">
                            <div class="cell"> 
                                <input type="text" ng-model="ayush">{{ayush}}
                            </div>
                            <div class="cell">a</div>
                            <div class="cell">a</div>
                            <div class="cell">a</div>
                        </div>
                    </div>
                </div>
                <div class="cell">
                    <input type="text" ng-model="aayush">{{aayush}}
                </div>
                <div class="cell">aman</div>
                <div class="cell">ayush agarwal</div>
            </div>
        </div>
        <qb-row>
            <div></div>
            <div></div>
            <div></div>
        </qb-row>
    </body>
</html>