module.exports = function load(collector) {
	return this.fire('init', collector);
};