var schema = require('../models/movieSchema');
var bodyParser = require('body-parser');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.get('/api/seedData', function(req, res) {
		var testData = [
			{
				title: 'Sewage Tomatoes'
				, actors: 'Homey The Clown'
				, genre: 'Horror'
				, year: 2016
				, rating: 5
			},
			{
				title: 'A Supertough Kangaroo'
				, actors: 'Hillary Clinton'
				, genre: 'Drama'
				, year: 2015
				, rating: 1
			},
			{
				title: 'Uncle Sam'
				, actors: 'Arnold Schwarzenegger'
				, genre: 'Thriller'
				, year: 2017
				, rating: 1
			}
		];

		schema.create(testData, function(err, results) {
			res.send(results);
		});
	});

	app.get('/api/getAll', function(req, res) {
		schema.find({
			
		}, function(err, results) {
			if (err)
				throw err;
			res.send(results);
		});
	});

	app.get('/api/searchAllFields/:text', function(req, res) {
		var text = req.params.text;
		var parsedText = parseInt(text);

		schema.find({
			$or: [
				{
					title: { $regex : new RegExp(text, "i") }
				},
				{
					genre: { $regex : new RegExp(text, "i") }
				},
				{
					actors: { $regex : new RegExp(text, "i") }
				},
				{
					year: parsedText || null
				},
				{
					rating: parsedText || null
				}
			]
		}, function(err, results) {
			if (err)
				throw err;
			res.send(results);
		});
	});

	app.get('/api/searchByID/:id', function(req, res) {
		schema.findById({
			_id: req.params.id
		}, function(err, results) {
			if (err)
				throw err;
			res.send(results);
		});
	});

	app.post('/api/addUpdateMovie', function(req, res) {
		if (req.body.id) {
			schema.findByIdAndUpdate(req.body.id, {
				title: req.body.title
				, actors: req.body.actors
				, genre: req.body.genre
				, year: req.body.year
				, rating: req.body.rating
			}, function(err, results) {
				if (err)
					throw err
				res.send('Sweet Update!');
			});
		}

		else {
			var newMovie = schema({
				title: req.body.title
				, actors: req.body.actors
				, genre: req.body.genre
				, year: req.body.year
				, rating: req.body.rating
			});

			newMovie.save(function(err) {
				res.send('Sweet Add!');
			});
		}
	});

	app.delete('/api/delete', function(req, res) {
		schema.findByIdAndRemove(req.body.id, function(err) {
			if (err)
				throw err
			res.send('Sweet Delete!');
		})
	})
}