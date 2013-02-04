var request = require('request'),
	jade = require('jade'),
	fs = require('fs');
	
// Read in the template file
var template = fs.readFileSync('template.jade');

var fn = jade.compile(template);

var url = "";
request({ url: url, json: true }, function(err, res, body) {
	var city = body.response.checkins.items[0].venue.location.city;
	var html = fn({ city: city });

	console.log(html);
});