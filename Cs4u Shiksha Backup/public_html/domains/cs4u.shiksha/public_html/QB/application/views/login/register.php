<div layout="column" layout-padding ng-cloak>
  <form>
  <md-content class="md-no-momentum">
    <div layout="row" layout-align="center center" layout-padding>
    	<img src="../../public/images/logo.png">
    </div>
    <md-input-container md-no-float class="md-block">
      <md-icon><i class="material-icons">&#xE853;</i></md-icon>
      <input ng-model="data.email" type="email" placeholder="Login Email" ng-required="true">
    </md-input-container>

<md-input-container md-no-float class="md-block">
      <md-icon><i class="material-icons">&#xE899;</i></md-icon>
      <input ng-model="data.password" type="password" placeholder="Password" ng-required="true">
    </md-input-container>
    <div layout="row">
    <md-button class="md-raised md-warn" flex="100" ng-click="register()" type="submit">Login</md-button>
    </div>
    <div layout="row">
            <md-button class="md-raised md-warn md-button" flex="50" ng-click="googleLogin()">Google</md-button>
            
       
            <md-button class="md-raised md-warn md-button" flex="50" ng-click="fbLogin()">Facebook</md-button>
        
    </div>
    <div layout="row">
    <a ui-sref='sign_up.personal' class="md-raised md-warn md-button md-ink-ripple" flex="100">sign up</a>
    </div>
    <div layout="row" layout-align="center center">
    <a ui-sref='change_password' class="md-primary md-button md-ink-ripple">Having problems logging in? register.</a>
    </div>
    
  </md-content>
</form>
</div>
