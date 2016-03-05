'use strict';

var assert = require('assert');
var client = require('../lib/client');

describe('Client', function() {
	it('should get report data with params', function(done) {
		client.getWeather({
			params: {
				lat: 53.3478,
				lon: 6.2597
			}
		}, function(error, data) {
			assert.ok(data);
			done();
		});
	});
	it('should get report data with params & options', function(done) {
		client.getWeather({
			params: {
				lat: 53.3478,
				lon: 6.2597
			},
			request: { timeout: 6000 }
		}, function(error, data) {
			assert.ok(data);
			assert.ok(40, data.times.length);
			done();
		});
	});
	it('should get report data with params, options & version', function(done) {
		client.getWeather({
			params: {
				lat: 53.3478,
				lon: 6.2597
			},
			request: { timeout: 4000 },
			version: 1.9,
			days: 2
		}, function(error, data) {
			assert.ok(data);
			assert.equal(8, data.times.length);
			done();
		});
	});
});
