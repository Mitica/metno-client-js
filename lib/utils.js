'use strict';

exports.defaults = function() {
	var args = Array.prototype.slice.call(arguments);
	if (args.length < 2) {
		return args.length === 1 ? args[0] : {};
	}

	var target = args[0];
	var source = args[1];

	for (var prop in source) {
		if (typeof target[prop] === 'undefined') {
			target[prop] = source[prop];
		}
	}

	args.splice(1, 1);

	return exports.defaults.apply(null, args);
};
