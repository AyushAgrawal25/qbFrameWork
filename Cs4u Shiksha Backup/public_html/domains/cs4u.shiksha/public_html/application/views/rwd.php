<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Responsive Web Design</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script data-require="angular.js@1.3.x" src="https://code.angularjs.org/1.3.17/angular.js" data-server="1.3.17"></script>
    	<script src="../../public/js/cube_code.js"></script>	
    	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
    	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    	<link rel="stylesheet" href="../../public/css/widgets.css">
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
          float: left;x
          padding: 15px;
        }
        
        html {
          font-family: "Lucida Sans", sans-serif;
        }
        
        .qb-header {
          background-color: #9933cc;
          width:100%;
          color: #ffffff;
          padding: 15px;
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
        
        .qb-top-menu{
          width: 100%;
          background-color: #555;
          overflow: auto;
        }
        
        .qb-sub-menus{
          width: 100%;
          background-color: #555;
          overflow: auto;
        }

        .qb-menu{
          float: left;
          padding: 12px;
          color: white;
          text-decoration: none;
          font-size: 17px;
        }
        
        .qb-menu-c-1{
          width:100%;
          padding: 12px;
          color: white;
          text-decoration: none;
          font-size: 17px;
        }
        .qb-left-menu-res{
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
        }
        .qb-left-menu-def{
          width: 100%;
          background-color: #555;
          overflow: auto;
        }
        
        .qb-right-menu-res{
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          float:right;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
        }
        
        .qb-right-menu-def{
          width: 100%;
          background-color: #555;
          overflow: auto;
        }
        
        .qb-input-label{}
        
        .qb-input-container{}
        
        .qb-input-message{}
        
        .qb-input{}
        
        .qb-tabs{
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
        }
        
        .qb-tab{
            background-color: inherit;
            float: left;
            width:100%;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
            font-size: 17px;
            display:block;
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-top: none;
        }
        
        .qb-tab:hover {
            background-color: #ddd;
        }
        
        .qb-tab-heading{
            width:auto;
            margin:10px;
            float:left;
        }
         
    </style>

    <body ng-app="myApp" ng-controller="myCtrl">
        
        <qb-container title="container">
            <qb-left-menu title="Cs4u Menu">
                <qb-close-icon></qb-close-icon>
                <qb-menu title="dkhf" href="#"></qb-menu>
                <qb-menu title="skjgf" href="#"></qb-menu>
                <qb-menu title="dkjls" href="#"></qb-menu>
                <qb-menu title="djlg" href="#"></qb-menu>
            </qb-left-menu>
            <qb-right-menu title="Cs4u Menu">
                <qb-close-icon></qb-close-icon>
                <qb-menu title="skhbvs" href="#"></qb-menu>
                <qb-menu title="akln" href="#"></qb-menu>
                <qb-menu title="alksh" href="#"></qb-menu>
                <qb-menu title="akjsh" href="#"></qb-menu>
            </qb-right-menu>
            <qb-header title="Cs4u.shiksha"> 
                <qb-top-menu title="Cs4u Menu">
                    <qb-menu title="skhbvs" href="#" open-icon="fa,fa-search">
                        <qb-sub-menus></qb-sub-menus>
                    </qb-menu>
                    <qb-menu title="akln" href="#"></qb-menu>
                    <qb-menu title="alksh" href="#"></qb-menu>
                    <qb-menu title="akjsh" href="#"></qb-menu>
                </qb-top-menu> 
            </qb-header>
            
            <qb-form name="fort">
                
            </qb-form>
            
            
            
            <form name="myForm">
              
              <pre>myForm.myName.$error = {{ myForm.myName.$error | json }}</pre>
              <label>
                Enter your name:
                <qb-form-input ngmodel="some" name="inp" expression="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$" >
                    <div ng-messages="myForm.inp.$error" style="color:maroon">
                        <div ng-message="required">You did not enter a field</div>
                        <div ng-message="minlength">Your field is too short</div>
                        <div ng-message="maxlength">Your field is too long</div>
                        <div ng-message-default>This field has an input error</div>
                    </div>
                </qb-form-input>
              </label>  
            </form
            
            <qb-row>
                <div class="col-s-3 col-3 menu">
                    <ul>
                        <li>The Country</li>
                        <li>The School</li>
                        <li>The Zaran</li>
                        <li>The Road</li>
                        <li>The Drink</li>
                        <li>The Flight</li>
                        <li>The City</li>
                        <li>The Island</li>
                    </ul>
                </div>
                <qb-cell classes="col-s-6 col-6">
                    <qb-row>
                        <div class="col-s-3 col-3 menu">
                            <ul>
                                <li>The Flight</li>
                                <li>The City</li>
                                <li>The Island</li>
                                <li>The Food</li>
                            </ul>
                        </div>
                        
                        <div class="col-6 col-s-6 mid">
                            ahgkjh akhgkj hlshgk kjkjahgkj 
                        </div>
                        
                        <div class="col-s-3 col-3 menu">
                            <ul>
                                <li>The Flight</li>
                                <li>The City</li>
                                <li>The Island</li>
                                <li>The Food</li>
                            </ul>
                        </div>
                    </qb-row>
                </qb-cell>
                <div class="col-3 col-s-3 menu">
                    <ul>
                        <li>The Country</li>
                        <li>The School</li>
                        <li>The Zaran</li>
                        <li>The Road</li>
                        <li>The Drink</li>
                        <li>The Flight</li>
                        <li>The Road</li>
                        <li>The Drink</li>
                    </ul>
                 </div>
            </qb-row>
            

            <div style="clear:both"></div>
            <div class="footer">How TO???????????</div>    
        </qb-container>
        
    </body>
</html>