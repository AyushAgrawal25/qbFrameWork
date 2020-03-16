<html>
<head>
    <title>registration</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="../../public/js/cube_code.js"></script>
</head>
<style>
    div#main
    {
        height:640px;
        width:1350px;
    }
    div.a
    {
        height:5%;
        width:100%;
        border:5px solid black;
        clear:both;
    }
    div.a1
    {
        height:5%;
        width:100%;
        border:5px solid black;
    }
    div.a2
    {
        height:5%;
        width:100%;
        border:50px solid black;
    }
    div.content
    {
        height:auto;
        width:100%;
        background-color:lightgray;
        
    }
    div.footer
    {
        height:20%;
        width:100%;
        border:3px solid black;
    }
    div.left
    {
        float:left;
        border:2px solid black;
        height:auto;
        width:100%;
        clear:both;
    }
    div.center
    {
        float:left;
        border:2px solid black;
        height:auto;
        width:100%;
        clear:both;
    }
    div.right
    {
        float:left;
        border:2px solid black;
        height:auto;
        width:100%;
        clear:both;
        
    }
        .main
        {
            height:auto;
            width:20%;
        }
        .accordionh
        {
            height:auto;
            width:100%;
            background-color:lightgreen;
            position:relative;
        }
        .contentAc
        {
            height:auto;
            width:auto;
            min-width:100%;
            position:absolute;
            top:100%;
            transition-property:height;
            transition-duration:4s;
            background-color:green;
            display:none;
        }
        .accordion
        {
            display:block;
            height:300px;
            width:100%;
            background-color:lightgreen;
            position:relative;
        }
</style>
<body>
<div id="main">
    <table border='1'>
        <tr id="test">
            <th>heading</th>
        </tr>
        <tr>
            <td>hello</td>
        </tr>
    </table>
    <div class="a2">
     hello   
    </div>
    <div class="a2">
        hello    
    </div>
    <div class="b">
            <div class="left">
                hello
            </div>
            <div ng-app="myApp" ng-controller="myCtrl">
            <div class="center">
                hi
                 <acc class="accordionh,contentAc"> hello! Hover your Cursor On it.
                    <div>
                        Hii I Am Ayush 
                        And I am A student of DreamLand School.
                    </div>
                </acc>
                <row color="red" padding="5" margin="2" border="4,solid" > 
			        Manv
		        </row>
		        <tabledb table="location_master" datas="something" columns="Location_Master_Id,Location_Master_Country,Location_Master_State" headings="Location_Master_Id,Location_Master_Country,Location_Master_State">
		            {{something}}
		        </tabledb>
                <filter table="location_master" column="Location_Master_Country" fcolumn="Status" fvalue="1" val="country"></filter>
                <filter table="location_master" column="Location_Master_State" fcolumn="Location_Master_Country" fvar="country" val="state"></filter>
                <filter table="location_master" column="Location_Master_City" fcolumn="Location_Master_State" fvar="state" val="name"></filter>
                
                <acc class="accordionh,contentAc"> hello! Hover your Cursor On it.
                    <div>
                        Hii I Am Ayush 
                        And I am A student of loyola School.
                    </div>
                </acc>
                <jqtest class="a2">
                    hello!
                </jqtest>
                
                <jqtest class="a2">
                    Bye Bye!
                </jqtest>
                
        
            
                <div ng-change="state">
                    <dp table="location_master" column="Location_Master_City" fcolumn="Location_Master_State" fvar="state" data="dpicks"></dp>
		                {{dpicks}}
		            <select ng-model='val'><option ng-repeat="dpick in dpicks" value={{dpick}}>{{dpick}}</option></select>
                </div>
                <regexp exp="e"></regexp>
                
                <combo table="location_master" column="Location_Master_City" fcolumn="Location_Master_State" fvar="state" valname="name" combo="combo()"></combo>
				{{country}}
            </div>
            </div>
            <div class="right">
                bye
            </div>
    </div>
    <div class="footer">
        
    </div>
</div>
</body>
</html>