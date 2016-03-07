'use strict';

var debug = require('debug')('metno:request');
var request = require('request');
var xml2js = require('xml2js');
var utils = require('./utils');

var OPTIONS = { timeout: 5000, method: 'GET' };

/**
 * Perform a GET request to the API
 * @param {Object}    request options
 * @param {Function}  callback
 */
module.exports = function(options, format, callback) {
	options = utils.defaults({}, options, OPTIONS);
	// console.log(options);

	if (typeof format === 'function') {
		callback = format;
		format = undefined;
	}

	var now = Date.now();

	return request(options, function(err, res, body) {
		var sc = res && res.statusCode;
		debug('got request body in ' + (Date.now() - now), options.qs);
		if (err) {
			return callback(err);
		} else if (sc === 203 || sc === 200) {
			if (format === 'xml') {
				new xml2js.Parser({
					async: true,
					mergeAttrs: true,
					explicitArray: false
				}).parseString(body, function(parseError, json) {
					if (parseError) {
						return callback(parseError);
					}
					// console.log('parsed request body in', Date.now() - time);
					return callback(null, json);
				});
			} else {
				return callback(null, body);
			}
		} else {
			return callback({
				body: body,
				statusCode: sc || 'No response received'
			});
		}
	}).on('response', function(response) {
		debug('got request response in ' + (Date.now() - now), options.qs, response.headers);
		now = Date.now();
	});
};
