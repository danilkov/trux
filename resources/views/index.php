<!DOCTYPE html>
<html ng-app="truxApp">
<head>
    <meta charset="UTF-8">
    <base href="/"/>
    <title>Trux</title>
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/loading-bar.css">

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.6/angular.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.6/angular-route.js"></script>
    <script src="js/loading-bar.js"></script>
    <script src="modules/auth/services.js"></script>
    <script src="modules/auth/controllers.js"></script>
    <script src="modules/search/services.js"></script>
    <script src="modules/search/controllers.js"></script>
    <script src="js/app.js"></script>
</head>
<body>
    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" ng-href="/">Trux</a>
    </div>
    <div class="navbar-collapse collapse" data-ng-controller="AuthController">
        <ul class="nav navbar-nav navbar-right">
            <li data-ng-show="token"><a ng-href="/account">Account</a></li>
            <li data-ng-hide="token"><a ng-href="/signin">Sign in</a></li>
            <li data-ng-hide="token"><a ng-href="/signup">Sign up</a></li>
            <li data-ng-show="token"><a ng-click="logout()">Logout</a></li>
        </ul>
    </div>
    <div class="container" ng-view=""></div>
</body>
</html>
