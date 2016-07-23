var React = require('react');
var ReactDOM = require('react-dom');
var Routes = require('../controller/routes');
var Api = require('../utils/apiLibrary')

ReactDOM.render(Routes, document.querySelector('.myMovieContainer'));