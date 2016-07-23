var React = require('react');
var AddForm = require('./addMovie');
var MovieTable = require('./movieTable')

module.exports = React.createClass({
  componentWillMount: function() {
  	const script = document.createElement("script");
  	script.src = "utils/utilities.js";
  	script.async = true;
  	document.body.appendChild(script);
  },
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