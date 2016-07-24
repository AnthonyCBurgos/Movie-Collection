var React = require('react');
var ApiStore = require('../models/apiStore');
var Reflux = require('reflux');
var Actions = require('../models/actions');
var utilities = require('../utils/utilities');

module.exports = React.createClass({
  getInitialState: function() {
  	return {
  		titleField: '',
  		actorField: '',
  		genreField: '',
  		yearField: utilities.getCurrentYear(),
  		ratingField: 3,
  		disabled: true
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

		<button className={"btn btn-primary addButton " + (this.state.disabled ? 'disabled' : '')} onClick={this.add} type="button" id='addButton'>Add</button>
    </div>
  },
  updateText: function(event) {
  	switch(event.target.id) {
  		case 'movieTitle':
  			{this.updateState('titleField', event.target.value, function() {
  				this.validate()
  			}.bind(this))}
  			break;
  		case 'actorTitle':
  			{this.updateState('actorField', event.target.value, function() {
  				this.validate();
  			}.bind(this))}
  			break;
  		case 'genreTitle':
  			{this.updateState('genreField', event.target.value, function() {
  				this.validate();
  			}.bind(this))}
  			break;
  		case 'yearTitle':
  			{this.updateState('yearField', event.target.value, function() {
  				this.validate();
  			}.bind(this))}
  			break;
  	}
  },
  add: function() {
	if (!this.state.disabled) {
	  	var rating = $('#addForm span.filled-stars').css('width');
	  	rating = utilities.getRatingValue(rating);
	  	{this.updateState('ratingField', rating)}
	  	Actions.addMovie(this.state, rating);
	  	this.resetState();
  	}
  },
  updateState: function(field, value, done) {
  	this.setState({
  		[field]: value
  	}, function() {
  		if(done)
  			done();
  	})
  },
  validate: function() {
  	if(this.state.titleField &&
  		this.state.actorField &&
  		this.state.genreField &&
  		utilities.yearCheck(this.state.yearField)) {
  		this.updateState('disabled', false);
  	}
  	else {
  		this.updateState('disabled', true);
  	}
  },
  resetState: function() {
	{this.updateState('titleField', '', function() {
	}.bind(this))}

	{this.updateState('actorField', '', function() {
	}.bind(this))}

	{this.updateState('genreField', '', function() {
	}.bind(this))}

	{this.updateState('yearField', utilities.getCurrentYear(), function() {
	}.bind(this))}

	this.updateState('disabled', true);
  }
});