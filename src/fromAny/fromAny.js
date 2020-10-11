function fromAny(fromString) {
	return function fromAny(any, locale) {
		if (any instanceof Date) {
			return any;
		}
		if (typeof any === 'number') {
			return new Date(any);
		}
		return fromString(any, locale);
	};
}

module.exports = fromAny;
