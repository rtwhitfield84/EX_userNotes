"use strict";

app.controller('NewNoteCtrl', function($scope, NoteStorage, $location, AuthFactory,$window){
		$scope.currentDate = new Date();
		console.log("currentDate", $scope.currentDate);
		$scope.newNote = {
			content: "",
			date: $scope.currentDate,
			uid: AuthFactory.getUser()
		};
		console.log("newNote", $scope.newNote);

		$scope.addNote = () => {
			NoteStorage.makeNewNote($scope.newNote)
			.then((response) => {
				$window.location.href = '#notes';
			});
			$scope.newNote = {};	
		};
});