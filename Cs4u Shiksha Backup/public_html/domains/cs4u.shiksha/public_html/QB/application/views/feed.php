<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
		<script src="../../public/js/feed.js"></script>
        <title>
            mainwork
        </title>
        <link rel="stylesheet" href="../../public/css/main.css">
        <link rel="stylesheet" href="../../public/css/feed.css">
        <link href="https://fonts.googleapis.com/css?family=Fira+Sans" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
        <style>
            input
            {
                height:auto;
                width:100%;
            }
            .display
            {
                display:none;
            }
            .case
            {
                
            }
            .s-box.s-size3_p.talign.case:hover .row.display
            {
                display:block;
            }
        </style>
    </head>
    <body>
         <div ng-app="MyApp">
			<div ng-controller="MyCtrl">
				<div class="row of">
                     <div class="rowtype2 of bg-color_b">
                        <div class="logo_topnav talign">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="menu_topnav">
                            <div class="menu_buttons talign">
                                <i class="fas fa-home"></i>
                            </div>
                            <div class="menu_buttons talign">
                                <i class="fas fa-images"></i>
                            </div>
                            <div class="menu_buttons talign">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="menu_buttons talign">
                                <i class="fas fa-user-tie"></i>
                            </div>
                        </div>
                        <div class="buttons_right talign">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="buttons_right talign">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="buttons_right talign">
                            <i class="fas fa-cog"></i>
                        </div>
                    </div>
                    <div class="row of">
                        <div class="side talign">
                            leftpart
                        </div>
                        <div class="mid of">
                        
                                <div ng-repeat="post in feed" class="row">
                                    <div class="row">
                                        <div class="row bg-color_g">
                                            <div class="s-box s-xl_p talign"><i class="far fa-user"></i></div>
                                            <div class="s-box s-xxl_p talign">{{post.P_By_UserName}}</div>
                                            <div class="menufpost talign"><i class="fas fa-ellipsis-h"></i></div>
                                        </div>
                                        <div class="row">
                                            <div class="size">
                                                <div class="row talign padding">
                                                    <i class="fas fa-sort-alpha-up"></i>
                                                </div>
                                                <div class="row talign padding">
                                                    <i class="fas fa-sort-amount-up"></i>
                                                </div>
                                                <div class="row talign padding">
                                                    <i class="fas fa-sort-numeric-down"></i>
                                                </div>
                                                <div class="row talign padding">
                                                    <i class="fas fa-sort-amount-down"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="size2" >
                                                <div class="s-box s-xxxl_pm">
                                                    <div class="row">
                                                        <div class="s-box s-xxl talign">
                                                            {{post.Post_Heading}}
                                                        </div>
                                                        <div class="s-box s-xxl talign">
                                                            category
                                                        </div>
                                                    </div>
                                                    <div class="row talign">
                                                        {{post.Post_Text}}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="size">
                                                <div class="row talign padding">
                                                    <i class="fas fa-user"></i>
                                                </div>
                                                <div class="row talign padding">
                                                    <i class="fas fa-user"></i>
                                                </div>
                                                <div class="row talign padding">
                                                    <i class="fas fa-user"></i>
                                                </div>
                                                <div class="row talign padding">
                                                    <i class="fas fa-user"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row bg-color_g">
                                            <div class="s-box s-size3_p talign"><i class="fas fa-thumbs-up"></i></div>
                                            <div class="s-box s-size3_p talign case"><i class="fas fa-comment"></i></div>
                                            <div class="s-box s-size3_p talign"><i class="fas fa-share"></i></div>
                                         </div>
                                         <div class="row display">
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                </div>
                        
                        </div>
                        <div class="side talign">
                            rightpart
                        </div>
                    </div>
                    <div class="row talign bg-color_b">
                      footer
                    </div>
                </div>
			</div>
		</div>
    </body>
</html>