require('whatwg-fetch');
var rootUrl = 'http://localhost:8080/api/';

module.exports = {
	get: function(url) {
		return fetch(rootUrl + url)
		.then(function(response){
			return response.json()
		})
	},
	add: function(state, rating) {
		return fetch(rootUrl + 'addUpdateMovie', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"title": state.titleField.toString(),
				"actors": state.actorField.toString(),
				"genre": state.genreField.toString(),
				"year": state.yearField,
				"rating": rating
			})
		}).then(function(response){
			return response.status
		})
	},
	update: function(newFields) {
		return fetch(rootUrl + 'addUpdateMovie', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"id": newFields[0],
				"title": newFields[1],
				"actors": newFields[2],
				"genre": newFields[3],
				"year": newFields[4],
				"rating": newFields[5]
			})
		}).then(function(response){
			return response.status
		})
	},
	delete: function(id) {
		return fetch(rootUrl + 'delete', {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"id": id
			})
		}).then(function(response){
			return response.status
		})
	}
};