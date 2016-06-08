module.exports = (function registration (data) {
	try {
		var cm = function(data) {
			function fire() {
				cmCreateRegistrationTag(data.id);
			}
			if(window.cmPV && typeof cmCreateRegistrationTag === 'function') fire();
			else document.addEventListener('cmPV', fire);
		};

		var sp = function(data) {
			function fire() {
				snowplow('trackStructEvent', 'registration', 'registration', data.id);
			}
			if(window.spPV && typeof snowplow === 'function') fire();
			else document.addEventListener('spPV', fire);
		};

		return {
			cm: cm,
			sp: sp
		};
	}
	catch(e){ console.log(e); }
})(window);