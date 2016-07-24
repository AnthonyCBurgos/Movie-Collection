var _ = require('underscore');
var bacon = require('bacon');

module.exports = {
	updateRatings: function() {
		$('#rating').rating('create',
			{
		    	step: 1,
		    	starCaptions: {1: 'Very Poor', 2: 'Poor', 3: 'Ok', 4: 'Good', 5: 'Very Good'},
		    	starCaptionClasses: {1: 'text-danger', 2: 'text-warning', 3: 'text-info', 4: 'text-primary', 5: 'text-success'},
				clearButton: '',
				size: 'xs'
			}
		);

		$('.ratingFalse').rating('create',
			{
				displayOnly: true, 
				step: 1,
				clearButton: '',
				size: 'xs'
			}
		);

		$('.ratingTrue').rating('create',
			{
				displayOnly: false, 
				step: 1,
				clearButton: '',
				size: 'xs',
				showCaption: false
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
			case 38:
			case 1:
				 return 1
				 break;
			case 68:
			case 76:
			case 2:
				 return 2
				 break;
			case 102:
			case 114:
			case 3:
				 return 3
				 break;
			case 136:
			case 152:
			case 4:
				 return 4
				 break;
			case 170:
			case 190:
			case 5:
				 return 5
				 break;
		}
	},
	yearCheck: function(year) {
		var text = /^[0-9]+$/;
		if(year.toString().length == 4) {
			if (year != 0) {
	        	if ((year != "") && (!text.test(year))) {
	            	alert("Please Enter Numeric Values Only");
	            	return false;
	        	}

	        	if (year.toString().length != 4) {
	            	alert("Year is not proper. Please check");
	            	return false;
	        	}
	        	
	        	if ((year < 1900) || (year > this.getCurrentYear())) {
	            	alert("Year should be in range 1900 to current year");
	            	return false;
	        	}

	        	return true;
	    	}
	    }
	},
	getCurrentYear: function() {
		var currentYear = new Date().getFullYear();
		return currentYear;
	}
}