var React = require('react');
var ApiStore = require('../models/apiStore');
var Reflux = require('reflux');
var Actions = require('../models/actions');
var utilities = require('../utils/utilities');
var _ = require('underscore');

module.exports = React.createClass({
  mixins: [
  	Reflux.listenTo(ApiStore, 'onChange')
  ],
  getInitialState: function() {
  	return {
  		loaded: false,
  		movies: [],
  		modifiedId: 0,
  		searchField: ''
  	}
  },
  onChange: function(event, movies) {
  	this.setState({
  		movies: movies
  	});

  	utilities.updateRatings();
  },
  updateUser: function(event) {
  	if (event.target.id != this.state.modifiedId) {
  		{this.getInitialState};
		{this.updateState('modifiedId', event.target.id, function() {
		}.bind(this))};
  	}

  	var text = $(event.target).text();
  	var name = $(event.target).attr('name');

  	switch(name) {
  		case 'movieTitle':
  			{this.updateState('titleField', text, function() {
  				console.log('State Now!', this.state);
  			}.bind(this))}
  			break;
  		case 'actorTitle':
  			{this.updateState('actorField', text, function() {
  				console.log('State Now!', this.state);
  			}.bind(this))}
  			break;
  		case 'genreTitle':
  			{this.updateState('genreField', text, function() {
  				console.log('State Now!', this.state);
  			}.bind(this))}
  			break;
  		case 'yearTitle':
  			{this.updateState('yearField', text, function() {
  				console.log('State Now!', this.state);
  			}.bind(this))}
  			break;
  	}
  	
  },
  handleSearchChange: function(event) {
  	this.setState({
  		searchField: event.target.value
  	});
  },
  componentWillMount: function() {
  	Actions.getAllMovies();
  },
  componentDidMount: function() {
  	_.delay(function() {
	  	this.setState({
	  		loaded: true
	  	})
	  }.bind(this), 2500);
  },
  render: function() {
    return <div className={" movieGrouptable content " + (this.state.loaded ? 'loaded' : "")}>
    	<div className='panel panel-default'>
    		<div className='panel-heading'>
    			<span>Movies in Library</span>
    			<input type='text' value={this.state.searchField} onChange={this.handleSearchChange} id='searchField' className='form-control' />
    			<div>
    				<button onClick={this.search} className='btn btn-default' type='button'>
    					Search
    				</button>
    			</div>
    		</div>
    		<table className='table'>
    			<tr>
    				<th></th>
    				<th>Title</th>
    				<th>Actors</th>
    				<th>Genre</th>
    				<th>Year</th>
    				<th id='ratingHeader'>Rating</th>
    			</tr>
    			{this.displayMovies()}
    		</table>
    	</div>
    </div>
  },
  displayMovies: function() {
  	if (this.state.movies.length > 0) {
  		var movies = [];
	  	this.state.movies.map(function(movie) {
	  		movies.push( <tr>
	  			<td>
	  				<button onClick={this.removeMovie} title={movie.title} className='btn btn-default' id={movie._id}>
	  					Delete
	  				</button>
	  				<button onClick={this.updateMovie} className='btn btn-default' id={movie._id}>
	  					Update
	  				</button>
	  			</td>
	  			<td contentEditable={true} name='movieTitle' title={movie._id}>{movie.title}</td>
	  			<td contentEditable={true} name='actorTitle' title={movie._id}>{movie.actors}</td>
	  			<td contentEditable={true} name='genreTitle' title={movie._id}>{movie.genre}</td>
	  			<td contentEditable={true} name='yearTitle' title={movie._id}>{movie.year}</td>
	  			<td title={movie._id}>
	  				<input className="rating-loading ratingTrue ratingAll" data-size="xs" value={movie.rating} />
	  			</td>
	  		</tr>
	  		)
	  	}.bind(this));

	  	return movies;
  	}
  	else {
  		return <h4>
  			No movies to show!
  		</h4>
  	}
  },
  search: function() {
  	Actions.searchMovie(this.state.searchField);
  },
  removeMovie: function(event) {
  	var toDetele = confirm("Are you sure you want to delete " + event.target.title + ' from your movie collection?');
  	if (toDetele == true) {
  	    Actions.removeMovie(event.target.id);
  	}
  },
  updateMovie: function(event) {
    var newFields = [];
  	newFields.push(event.target.id);

  	var rating = $('td[title="' + event.target.id + '"] > .rating-container > .rating > span.filled-stars').css('width');
  	rating = utilities.getRatingValue(rating);
  	var newItems = $('td[title="' + event.target.id + '"]:not(:last-child')

  	$(newItems).each(function(index){
  		var text = $(this).text();
  		if (text != '') {
  			newFields.push(text);
  		}
  		else {
  			return;
  		}
  	});

    newFields.push(rating);

    if (utilities.yearCheck(parseInt(newFields[4]))) {
		  var toUpdate = confirm("Are you sure you want to update " + newFields[1] + ' ?');
		  if (toUpdate == true) {
        Actions.updateMovie(newFields);
      }
    }

    else {
      return;
    }
  }
});