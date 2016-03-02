'use strict';

var assert = require('assert');
var client = require('../lib/client');

describe('Client', function() {
	it('should get report data with params', function(done) {
		client.getWeather({
			lat: 53.3478,
			lon: 6.2597
		}, function(error, data) {
			assert.ok(data);
			done();
		});
	});
	it('should get report data with params & options', function(done) {
		client.getWeather({
			lat: 53.3478,
			lon: 6.2597
		}, { timeout: 5000 }, function(error, data) {
			assert.ok(data);
			done();
		});
	});
	it('should get report data with params, options & version', function(done) {
		client.getWeather({
			lat: 53.3478,
			lon: 6.2597
		}, { timeout: 5000 }, 1.9, function(error, data) {
			assert.ok(data);
			done();
		});
	});
});
