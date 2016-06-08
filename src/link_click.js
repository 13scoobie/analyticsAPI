module.exports = (function link_click (data) {
	try {
		var cm = function(data) {
			function fire() {
				cmCreateManualLinkClickTag(data.url, data.link_name || null, data.page_id || null);
			}
			if(window.cmPV && typeof cmCreateManualLinkClickTag === 'function') fire();
			else document.addEventListener('cmPV', fire);
		};

		var sp = function(data) {
			function fire() {
				snowplow('trackLinkCLick', data.url, data.link_name || null);
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