'use strict';

var api = require('./api');
var utils = require('./utils');
var defaults = { hours: [6, 12, 18, 0], days: 10 };

function formatTimeItem(item) {
	delete item.altitude;
	delete item.latitude;
	delete item.longitude;
	delete item.lowClouds;
	delete item.mediumClouds;
	delete item.highClouds;
	delete item.dewpointTemperature;

	for (var prop in item) {
		if (prop !== 'time') {
			delete item[prop]['id'];
			for (var p in item[prop]) {
				if (~['percent', 'value', 'mps', 'number', 'beaufort', 'deg'].indexOf(p)) {
					item[prop][p] = parseFloat(item[prop][p]);
				}
			}
		}
	}
	return item;
}

function formatData(data, options) {
	if (!data || !data.weatherdata) {
		return null;
	}
	data = data.weatherdata;

	options = utils.defaults({}, options, defaults);

	var result = { created: data.created, times: [] };
	var times = data.product.time;

	var startTime = new Date(times[0].from);
	var endTime = startTime.getTime() + options.days * 1000 * 86400;
	var item;
	var time;

	for (var i = 0; i < times.length; i++) {
		time = times[i];
		// is details
		if (!time.location.symbol) {
			time.fromDate = new Date(time.from);
			if (time.fromDate.getTime() > endTime) {
				break;
			}
			if (options.hours.indexOf(time.fromDate.getUTCHours()) > -1) {
				item = time.location;
				item.time = time.fromDate.getTime();
				i++;
				if (i < times.length && times[i].location.symbol) {
					item.symbol = times[i].location.symbol;
				}
				item = formatTimeItem(item);
				result.times.push(item);
			}
		}
	}

	return result;
}

module.exports = function getWeather(options, callback) {
	return api.locationforecast(options, function(error, data) {
		if (error) {
			return callback(error);
		}
		try {
			data = formatData(data, options);
		} catch (e) {
			return callback(e);
		}
		return callback(null, data);
	});
};
