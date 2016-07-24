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
  		searchField: ''
  	}
  },
  onChange: function(event, movies) {
  	this.setState({
  		movies: movies
  	});

  	utilities.updateRatings();
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
    return <div className='movieGroup'>
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
    		<table className={"table content " + (this.state.loaded ? 'loaded' : "")}>
    			<tr>
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
	  			<td>{movie.title}</td>
	  			<td>{movie.actors}</td>
	  			<td>{movie.genre}</td>
	  			<td>{movie.year}</td>
	  			<td>
	  				<input className="rating-loading ratingFalse ratingAll" data-size="xs" value={movie.rating} />
	  			</td>
	  		</tr>
	  		)
	  	});

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
  }
});