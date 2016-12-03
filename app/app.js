"use strict";

var app = angular.module('userNotes', ['ngRoute']);

let isAuth = (AuthFactory) => new Promise((resolve,reject)=> {
	AuthFactory.isAuthenticated()
	.then((userExists) => {
		if (userExists) {
			resolve();
		} else {
			reject();
		}
	});
});


app.config(function($routeProvider) {
   $routeProvider 
.when('/', {
	templateUrl: 'partials/main.html'
})
.when('/notes', {
    templateUrl: 'partials/notes.html',
    controller: 'NotesCtrl',
    resolve: {isAuth}
})
.when('/new', {
    templateUrl: 'partials/newNote.html',
    controller: 'NewNoteCtrl'
})

.when('/login', {
	templateUrl: 'partials/login.html',
	controller: 'LoginCtrl'
})
.otherwise('/');

});

app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};

	firebase.initializeApp(authConfig);
});
