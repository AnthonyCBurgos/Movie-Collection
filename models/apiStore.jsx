var Api = require('../utils/apiLibrary');
var Reflux = require('reflux');
var Actions = require('./actions');

module.exports = Reflux.createStore({
  	listenables: [Actions],
  	getAllMovies: function() {
	  	return Api.get('getAll')
	  		.then(function(movie) {
	  			this.movies = movie;
	  			this.movieListUpdated();
	  		}.bind(this));
  	},
  	searchMovie: function(searchTerm) {
  		if (!searchTerm) 
  			this.getAllMovies();
  		else {
		  	return Api.get('searchAllFields/' + searchTerm)
		  		.then(function(movie) {
		  			this.movies = movie;
		  			this.movieListUpdated();
		  		}.bind(this));
	  	}
  	},
  	addMovie: function(state, rating) {
	  	return Api.add(state, rating)
	  		.then(function(response) {
	  			if (response === 200) {
	  				this.getAllMovies();
	  			}
	  		}.bind(this));
  	},
  	movieListUpdated: function() {
  		this.trigger('change', this.movies);
  	}
})