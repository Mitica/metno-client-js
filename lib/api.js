'use strict';

// var debug = require('debug')('metno:api');
var apiRequest = require('./api_request');
var endpoints = require('./endpoints');
var utils = require('./utils');

function buildEndpoint(endpoint) {
	var info = endpoints[endpoint];
	return function(options, callback) {
		options = utils.defaults({}, options, info);
		var url = ['http://api.met.no/weatherapi', endpoint, options.version];
		if (options.path) {
			url.push(options.path);
		}
		url = url.join('/');
		var opts = { url: url };
		if (options.params) {
			opts.qs = options.params;
		}

		if (options.request) {
			opts = utils.defaults(opts, options.request);
		}

		// debug('calling %s', url);

		return apiRequest(opts, callback);
	};
}

// Build API functions
for (var endpoint in endpoints) {
	exports[endpoint] = buildEndpoint(endpoint);
}
