"use strict";
const mapObj = require("map-obj");
const has = require("./utils/has");
const isObject = require("./utils/isObject");

function objectIterate(func, options = {}) {
	const { exclude, deep = true } = options;

	function mapper(key, value) {
		if (deep && isObject(value)) {
			value = mapObj(value, mapper);
		}
		if (!(typeof exclude === "function" && exclude(key))) {
			value = func(value);
		} else if (!(exclude && has(exclude, key))) {
			value = func(value);
		}
		return [key, value];
	}

	return function iterateAll(object) {
		if (Array.isArray(object))
			return object.map((item) => iterateAll(item));
		if (typeof object === "object")
			return mapObj(object, mapper);
		return func(object);
	};
}

module.exports = objectIterate;
