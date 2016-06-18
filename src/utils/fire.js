module.exports = function fire (event,collector,data) { 
	var args = Array.prototype.slice.call(arguments);
	if (typeof args[2] === 'string') {
		if (args[0] === 'element' || args[0] === 'conversion') {
			i = 0;
			if (typeof args[1] === 'string') {
				window.clickstream[args[0]][collector](arguments);
			}
			else if (typeof args[1] === 'object' && args[1].length !== undefined) {
				for (;i<args[1].length;i++) {
					window.clickstream[args[0]][args[1][i]](arguments);
				}
			}
			else return false;
		}
		else return false;
	}
	else {
		var i = 0;
		if (typeof collector === 'string') {
			window.clickstream[event][collector](data);
		}
		else if (typeof collector === 'object' && collector.length !== undefined) {
			for (;i<collector.length;i++) {
				window.clickstream[event][collector[i]](data);
				// window.clickstream.load(['cm','sp','ga']) -> this.fire('init', ['cm','sp','ga']);
			}
		}
		else return false;
	}
};