"use strict";

app.factory('NoteStorage',($http, FBCreds,AuthFactory) =>{

	let makeNewNote = (newNote) => {
		return new Promise ((resolve,reject) => {
			$http.post(`${FBCreds.URL}/notes.json`,
				angular.toJson(newNote))
			.success((newNoteObj) => {
				resolve(newNoteObj);
			})
			.error((error) => {
				reject(error);
			});
		});
	};

	let getNotes = (currentUser) => {
		 currentUser = AuthFactory.getUser();
		 console.log("currentUser", currentUser);
		let notes = [];
		return new Promise ((resolve,reject) => {
			$http.get(`${FBCreds.URL}/notes.json?orderBy="uid"&equalTo="${currentUser}"`)
			.success((noteObj) => {
				let noteCollection = noteObj;
				Object.keys(noteCollection).forEach((key) => {
					noteCollection[key].id = key;
					notes.push(noteCollection[key]);
				});
				resolve(notes);
			})
			.error((error) => {
				reject(error);
			});	
		});	
	};



	let removeNoteFb = (noteId) => {
		return new Promise ((resolve,reject) => {
			$http.delete(`${FBCreds.URL}/notes/${noteId}.json`)
			.success((note) => {
				resolve(note);
				})
				.error((error) => {
					reject(error);
				});
			});
		};
	return {makeNewNote, getNotes, removeNoteFb};
});