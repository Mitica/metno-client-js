'use strict';

var api = require('./api');

exports.api = api;

function formatData(data) {
	if (!data || !data.weatherdata) {
		return null;
	}

	return {
		created: data.weatherdata.created,
		meta: data.weatherdata.meta,
		time: data.weatherdata.product.time
	};
}

exports.getWeather = function getWeather(options, callback) {
	return api.locationforecast(options, function(error, data) {
		if (error) {
			return callback(error);
		}
		return callback(null, formatData(data));
	});
};
