module.exports = function fire (event,collector,data) {
	var i = 0;
	if (typeof collector === 'string') {
		window.clickstream[event][collector](data);
	}
	else if (typeof collector === 'object' && collector.length !== undefined) {
		for (;i<collector.length;i++) {
			window.clickstream[event][collector[i]](data);
		}
	}
	else return false;
};