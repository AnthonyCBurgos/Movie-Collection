var React = require('react');
var AddForm = require('./addMovie');
var MovieTable = require('./movieTable')
var utilities = require('../utils/utilities');

module.exports = React.createClass({
	render: function() {
		return <div>
		<h3 className="header page-header">
			My Awesome Retro Movie Collection
		</h3>
		<div>
    		<AddForm />
    		<hr />
    		<MovieTable />
    		{this.props.children}
    	</div>
    </div>
  }
});