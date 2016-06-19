'use strict';

var debug = require('debug')('metno:request');
var xml2js = require('xml2js');
var utils = require('./utils');
var request = require('request');

var OPTIONS = { timeout: 5000, method: 'GET', gzip: true };

/**
 * Perform a GET request to the API
 * @param {Object}    request options
 * @param {Function}  callback
 */
module.exports = function(options, format, callback) {
	options = utils.defaults({}, options, OPTIONS);

	if (typeof format === 'function') {
		callback = format;
		format = undefined;
	}

	// debug('request options', options);

	request(options, function(error, response, body) {
		debug('got request response');
		// var sc = res && res.statusCode;
		// if(~[200, 203].indexOf(sc)){
		// 	req.abort();
		// }

		if (format === 'xml') {
			new xml2js.Parser({
				async: true,
				mergeAttrs: true,
				explicitArray: false
			}).parseString(body, function(parseError, json) {
				if (parseError) {
					return callback(parseError);
				}
				debug('parsed response from xml');
				return callback(null, json);
			});
		} else {
			return callback(null, body);
		}
	});
};
