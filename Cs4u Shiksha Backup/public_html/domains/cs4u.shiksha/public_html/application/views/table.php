<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script>
        $(document).ready(function(){
          $("#sim").click(function(){
            $("#sim").append("aslkgfhs hsdd hfkjsh;lis fshk ");
          });
        });
        </script>
    </head>
        <style>
            .tab
            {
            	height:auto;
                width:auto;
                background-color:blue;
                padding:2px;
                margin:2px;
                overflow:hidden;
                clear:both;
            }
            .rTable {
            	display: table;
            	width: 100%;
            }
            .rTableRow {
                display: table-row;
                width: 100%;
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
        </style>
    <body>
    <h1>Row testing</h1>
    <div class="rTable">
        <div class="rTableRow">
            <div class="rTableHead"><strong>Name</strong></div>
            <div class="rTableHead"><span style="font-weight: bold;">Telephone</span></div>
            <div class="rTableHead">&nbsp;</div>
        </div>
        
        <div class="rTableRow">
            <div class="rTableCell">Cassie</div>
            <div class="rTableCell"><a href="tel:9876532432">9876 532 432</a></div>
            <div class="rTableCell"><img src="images/check.gif" alt="checked" /></div>
        </div>
    </div>
    
    
        <div class="rTableRow" style="height:200px">
            <div class="rTableCell" id="sim">John</div>
            <div class="rTableCell"><a href="tel:0123456785">0123 456 785</a></div>
            <div class="rTableCell"><img src="images/check.gif" alt="checked" /></div>
        </div>
    <h2>Basic HTML Table</h2>
    <div>
        <table style="width:33%">
            <tr>
                <td>
                    <div style="height:100%" id="sim">
                        jfjHAW
                    </div>
                </td>
                <td>
                    <div style="height:100%">
                        jfjHAW
                    </div>
                </td>
                <td>
                    <div style="height:100%">
                        jfjHAW
                    </div>
                </td>
            </tr>
        </table>
    </div>
    
    <div class="tab">
        <table style="width:100%">
      <tr>
      
        <th>Firstname</th>
        <th>Lastname</th> 
        <th>Age</th>
      
      </tr>
      <tr>
        <td id="sim">Jill</td>
        <td>Smith</td>
        <td>50</td>
      </tr>
      <tr>
        <div class="tab">
        <td>Eve</td>
        <td>Jackson</td>
        <td>94</td>
        </div>
      </tr>
    </table>
    </div>
    
    </body>
</html>
