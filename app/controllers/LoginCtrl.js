"use strict";

app.controller('LoginCtrl', function($scope, AuthFactory, $window){
	$scope.account = {
		email:	'',
		password: ''
	};

	$scope.register = () => {
		AuthFactory.createUser($scope.account)
		.then((userData) => {
			console.log("userData", userData);
			$scope.login();
		});
		
	};

	$scope.login = () => {
		console.log("$scope.account",$scope.account);
		AuthFactory.loginUser($scope.account)
		.then((userData) =>{
			$window.location.href = "#/notes";
		});
	};
});