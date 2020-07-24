"use strict";

function has(array, key) {
	return array.some((x) => {
		if (typeof x === "string") {
			return x === key;
		}
		x.lastIndex = 0;
		return x.test(key);
	});
}

module.exports = has;
