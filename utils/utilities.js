var _ = require('underscore');

module.exports = {
	updateRatings: function() {
		$('#rating').rating('create',
			{
		    	step: 1,
		    	starCaptions: {1: 'Very Poor', 2: 'Poor', 3: 'Ok', 4: 'Good', 5: 'Very Good'},
		    	starCaptionClasses: {1: 'text-danger', 2: 'text-warning', 3: 'text-info', 4: 'text-primary', 5: 'text-success'},
				size: 'xs'
			}
		);

		$('.ratingFalse').rating('create',
			{
				displayOnly: true, 
				step: 1,
				size: 'xs'
			}
		);

		$('.ratingTrue').rating('create',
			{
				displayOnly: false, 
				step: 1,
				size: 'xs'
			}
		);
	},
	removeRating: function() {
		$('table .rating-container').rating('destroy');
	},
	getRatingValue: function(text) {
		var number = parseInt(text.match(/\d+/)[0]);
		switch (number) {
			case 34:
			case 1:
				 return 1
				 break;
			case 68:
			case 2:
				 return 2
				 break;
			case 102:
			case 3:
				 return 3
				 break;
			case 136:
			case 4:
				 return 4
				 break;
			case 170:
			case 5:
				 return 5
				 break;
		}
	}
}