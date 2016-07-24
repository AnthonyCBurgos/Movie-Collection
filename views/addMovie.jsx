var React = require('react');
var ApiStore = require('../models/apiStore');
var Reflux = require('reflux');
var Actions = require('../models/actions');
var utilities = require('../utils/utilities');

module.exports = React.createClass({
  mixins: [
  	//Reflux.listenTo(ApiStore, 'onChange')
  ],
  getInitialState: function() {
  	return {
  		titleField: '',
  		actorField: '',
  		genreField: '',
  		yearField: 2016,
  		ratingField: 3
  	}
  },
  render: function() {
    return <div id='addForm'>
    	<span><h4>Add A New Movie</h4></span>

		<div className="input-group">
		  <span className="input-group-addon movieTitle">Title</span>
		  <input type="text" value={this.state.titleField} onChange={this.updateText} id="movieTitle" className="form-control" placeholder="Movie Name" aria-describedby="basic-addon1" />
		</div>

		<div className="input-group">
		  <span className="input-group-addon">Actors</span>
		  <input type="text" value={this.state.actorField} onChange={this.updateText} id="actorTitle" className="form-control" placeholder="Actors Names" aria-describedby="basic-addon2" />
		</div>

		<div className="input-group">
		  <span className="input-group-addon">Genre</span>
		  <input type="text" value={this.state.genreField} onChange={this.updateText} id="genreTitle" className="form-control" placeholder="Genre Type" aria-describedby="basic-addon3" />
		</div>

		<div className="input-group">
		  <span className="input-group-addon yearTitle">Year</span>
		  <input type="text" value={this.state.yearField} onChange={this.updateText} id="yearTitle" className="form-control" placeholder="Year Made" aria-describedby="basic-addon4" />
		</div>

		<div className="input-group">
		  <span className="control-label input-group-addon rating">Rating</span>
		  <input id="rating" value={this.state.ratingField} onChange={this.updateText} name="rating" data-size="xs" className="rating-loading ratingAdd" />
		</div>

		<button className="btn btn-primary addButton" onClick={this.add} type="button">Add</button>
    </div>
  },
  updateText: function(event) {
  	switch(event.target.id) {
  		case 'movieTitle':
  			{this.updateState('titleField', event.target.value)}
  			break;
  		case 'actorTitle':
  			{this.updateState('actorField', event.target.value)}
  			break;
  		case 'genreTitle':
  			{this.updateState('genreField', event.target.value)}
  			break;
  		case 'yearTitle':
  			{this.updateState('yearField', event.target.value)}
  			break;
  	}
  },
  add: function() {
  	var rating = $('#addForm span.filled-stars').css('width');
  	rating = utilities.getRatingValue(rating);
  	{this.updateState('ratingField', rating)}
  	Actions.addMovie(this.state, rating);
  },
  updateState: function(field, value) {
  	this.setState({
  		[field]: value
  	});
  }
});