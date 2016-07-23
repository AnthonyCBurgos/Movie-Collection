require('whatwg-fetch');
var rootUrl = 'http://localhost:8080/api/';

module.exports = window.api = {
	get: function(url) {
		return fetch(rootUrl + url, {
			//headers: {
				//"Access-Control-Allow-Origin": "*"
			//}
		}).then(function(response){
			return response.json()
		})
		//.then(function(data){
			//return data;
		//})
	}
};