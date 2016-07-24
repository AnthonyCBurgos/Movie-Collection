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
	}
};