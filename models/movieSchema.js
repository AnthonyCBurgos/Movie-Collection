var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieCollectionSchema = new Schema({
	title: String
	, actors: String
	, genre: String
	, year: Number
	, rating: Number
});

var Movies = mongoose.model('Movies', movieCollectionSchema);

module.exports = Movies;