module.exports = analytics_wrapped = (function analytics_wrapped () {
	window.analytics_wrapped = true;
	var event = new Event('analytics_wrapped');
	document.dispatchEvent(event);
	return true;
})(window);