"use strict";

app.controller('NotesCtrl', function($scope, NoteStorage,$location,$window){

	NoteStorage.getNotes()
	.then((noteArray) => {
		$scope.notes = noteArray;
		console.log("$scope.notes",$scope.notes);
		$window.location.href = '#/notes';
		$scope.$apply();
	});

	$scope.removeNote = (noteId) => {
		NoteStorage.removeNoteFb(noteId)
		.then((note) => {
			$window.location.href = '#notes';
		$scope.$apply();
		});
	};


});