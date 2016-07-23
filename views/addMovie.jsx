var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div>
    	<span><h4>Add A New Movie</h4></span>

		<div className="input-group">
		  <span className="input-group-addon movieTitle">Title</span>
		  <input type="text" id="movieTitle" className="form-control" placeholder="Movie Name" aria-describedby="basic-addon1" />
		</div>

		<div className="input-group">
		  <span className="input-group-addon">Actors</span>
		  <input type="text" id="actorTitle" className="form-control" placeholder="Actors Names" aria-describedby="basic-addon2" />
		</div>

		<div className="input-group">
		  <span className="input-group-addon">Genre</span>
		  <input type="text" id="genreTitle" className="form-control" placeholder="Genre Type" aria-describedby="basic-addon3" />
		</div>

		<div className="input-group">
		  <span className="input-group-addon yearTitle">Year</span>
		  <input type="text" id="yearTitle" className="form-control" placeholder="Year Made" aria-describedby="basic-addon4" />
		</div>

		<div className="input-group">
		  <span className="control-label input-group-addon rating">Rating</span>
		  <input id="rating" name="rating" value="2" data-size="xs" className="rating-loading" />
		</div>

		<div className="input-group">
		  <span className="input-group-addon watched">Watched</span>
		  <input type="checkbox" id="checkboxAdd" aria-label="..." />
		</div>

		<button className="btn btn-primary addButton" type="button">Add</button>
    </div>
  }
});