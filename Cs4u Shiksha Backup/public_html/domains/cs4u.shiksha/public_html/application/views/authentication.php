<h1>Login</h1>
    <form name="dataForm">
    <select ng-model="data.id">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="new">new</option>
  <option value="new1">new1</option>
  <option value="new2">new2</option>
  <option value="new7">new7</option>
  <option value="new29">new29</option>
  <option value="newllqq">newll11</option>
</select>
   <input type="text" ng-model="data.fname">
   <input type="text" ng-model="data.lname">
   <button ng-click='login()'>click</button>
   {{data}}{{result}}
    </form>

<h2>Delete</h2>
 <form name="dataForm">
   <input type="text" ng-model="dataDelete.id">
   <input type="text" ng-model="dataDelete.fname">
   <input type="text" ng-model="dataDelete.lname">
   <button ng-click='delete()'>click</button>
  {{dataDelete}}{{result1}}
    </form>

<h3>Update</h3>
 <form name="dataForm">
   <input type="text" ng-model="dataUpdate.id">
   <input type="text" ng-model="dataUpdate.fname">
   <input type="text" ng-model="dataUpdate.lname">
   <button ng-click='update()'>click</button>
   {{dataUpdate}}{{result2}}
    </form>
    
 