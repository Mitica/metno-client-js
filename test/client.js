'use strict';

var assert = require('assert');
var client = require('../lib/client');
var apiRequest = require('../lib/api_request');

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
			request: { timeout: 15000 }
		}, function(error, data) {
			assert.ok(data);
			assert.ok(40, data.times.length);
			done();
		});
	});
	it('should get report data with params, options & version', function(done) {
		client.getWeather({
			params: {
				lat: 67.5000,
				lon: 51.8667
			},
			request: { timeout: 15000 },
			version: 1.9,
			days: 2
		}, function(error, data) {
			assert.ok(data);
			assert.equal(8, data.times.length);
			done();
		});
	});
	it('should get weather icon', function(done) {
		client.api.weathericon({
			params: {
				symbol: 5,
				content_type: 'image/png'
			},
			request: { timeout: 15000 }
		}, function(error, data) {
			assert.ok(data);
			done();
		});
	});
	it('should get reuters homepage', function(done) {
		apiRequest({
			url: 'http://www.reuters.com/'
		}, function(error, data) {
			assert.ok(data);
			done();
		});
	});
});
