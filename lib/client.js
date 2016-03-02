'use strict';

var apiRequest = require('./api_request');

function formatData(data) {
	if (!data && !data.weatherdata) {
		return null;
	}

	return {
		created: data.weatherdata.created,
		meta: data.weatherdata.meta,
		time: data.weatherdata.product.time
	};
}

exports.getWeather = function getWeather(params, options, version, callback) {
	if (typeof version === 'function') {
		callback = version;
		version = undefined;
	}
	version = version || 1.9;

	if (typeof options === 'number') {
		version = options;
		options = null;
	} else if (typeof options === 'function') {
		callback = options;
		options = null;
	}

	var ops = {};

	if (options) {
		for (var prop in options) {
			ops[prop] = options[prop];
		}
	}

	ops.url = 'http://api.yr.no/weatherapi/locationforecast/' + version;
	ops.qs = params;

	callback = callback || function() {};

	return apiRequest(ops, function(error, data) {
		if (error) {
			return callback(error);
		}
		return callback(null, formatData(data));
	});
};
