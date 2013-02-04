#!/usr/bin/env node

var request = require('request'),
	jade = require('jade'),
	fs = require('fs');

if (process.argv.length !== 3) {
	throw new Error("Must provide a configuration file path");
}

var config = require(process.argv[2]);

// Read in the template file
var template = fs.readFileSync('template.jade');

// Compile the template
var fn = jade.compile(template);

// Get the URL ready with the access token from the config file.
// Note that this access token never expires
var url = 'https://api.foursquare.com/v2/users/self/checkins?limit=1&v=20130204&oauth_token=' + config.accessToken;
request({ url: url, json: true }, function(err, res, body) {
	// Pull the city out from the most recent checkin
	// TODO: Probably want to add some sort of error logic here...
	var city = body.response.checkins.items[0].venue.location.city;

	// Get the new HTML
	var html = fn({ city: city });

	fs.writeFileSync(config.output, html, 'UTF-8');
});