"use strict";
const objectIterate = require("./");

function rounding(number, decimal = 2) {
	let value = 1;
	for (let i = 0; i < decimal; i += 1) {
		value *= 10;
	}
	return Math.round((number + Number.EPSILON) * value) / value;
}

const roundingValues = objectIterate(rounding);

const obj = { a: 1.2345 };
const arr = [{ a: 1.2345, b: "1.2345" }];
const innerArr = [{ a: 1.2345, b: "1.2345", c: [{ a: 1.2345, b: "1.2345" }, { a: 1.2345, b: "1.2345" }] }];

describe("Rounding values", () => {

	it("should success to prase number", function () {
		const value = roundingValues(3.123, { decimal: 2, deep: true });
		expect(value).toBe(3.12);
	});

	it("should success to prase object", function () {
		const value = roundingValues(obj);
		expect(value).toBeDefined();
	});

	it("should success to prase array", function () {
		const value = roundingValues(arr, { decimal: 3 });
		expect(value).toBeDefined();
	});

	it("should success to prase nested array", function () {
		const value = roundingValues(innerArr, { decimal: 3, deep: true });
		expect(value).toBeDefined();
	});

});


