'use strict';

var debug = require('debug')('metno:request');
var xml2js = require('xml2js');
var utils = require('./utils');
var url = require('url');
var http = require('http');

var OPTIONS = { timeout: 5000, method: 'GET' };

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
	if (options.url) {
		var urlParts = url.parse(options.url);
		options.host = urlParts.host;
		options.path = urlParts.path;
		delete options.url;
	}

	var req = http.request(options, function(res) {
		debug('got request response');
		// var sc = res && res.statusCode;
		// if(~[200, 203].indexOf(sc)){
		// 	req.abort();
		// }
		var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			debug('end request');
			if (format === 'xml') {
				new xml2js.Parser({
					async: true,
					mergeAttrs: true,
					explicitArray: false
				}).parseString(data, function(parseError, json) {
					if (parseError) {
						return callback(parseError);
					}
					debug('parsed response from xml');
					return callback(null, json);
				});
			} else {
				return callback(null, data);
			}
		});
	});

	req.on('error', callback);
	req.end();
	req.setTimeout(options.timeout, req.abort.bind(req));

	return req;
};
