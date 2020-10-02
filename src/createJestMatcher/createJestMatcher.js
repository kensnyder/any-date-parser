const { DateTime } = require('luxon');

function createJestMatcher(format) {
	return function (actual, expected) {
		if (!(actual instanceof DateTime)) {
			return {
				pass: false,
				message: () => 'Received value must be an instance of DateTime',
			};
		}
		if (!(expected instanceof DateTime)) {
			return {
				pass: false,
				message: () => 'Expected value must be an instance of DateTime',
			};
		}
		if (!actual.isValid) {
			return {
				pass: false,
				message: () =>
					`Received is an invalid DateTime. Reason: "${actual.invalidReason}"`,
			};
		}
		if (!expected.isValid) {
			return {
				pass: false,
				message: () =>
					`Expected is an invalid DateTime. Reason: "${expected.invalidReason}"`,
			};
		}
		// `this.isNot` indicates whether the assertion was inverted with `.not`
		// which needs to be respected, otherwise it fails incorrectly.
		actual = actual.toFormat(format);
		expected = expected.toFormat(format);
		if (this.isNot) {
			expect(actual).not.toBe(expected);
		} else {
			expect(actual).toBe(expected);
		}

		// This point is reached when the above assertion was successful.
		// The test should therefore always pass, that means it needs to be
		// `true` when used normally, and `false` when `.not` was used.
		return { pass: !this.isNot };
	};
}

module.exports = createJestMatcher;
