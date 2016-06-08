module.exports = (function conversion (data) {
	try {
		var cm = function(data) {
			function fire() {
				var attrArray = [];
				attrArray[42] = data.tag_id || null;
				cmCreateConversionEventTag(data.event_id, (data.type === 'complete' ? 2 : 1), data.category, null, clickstream.attrs(attrArray));
			}
			if(window.cmPV && typeof cmCreateConversionEventTag === 'function') fire();
			else document.addEventListener('cmPV', fire);
		};

		var sp = function(data) {
			function fire() {
				snowplow('trackStructEvent', data.category, data.event_id, null, null, (data.type === 'complete' ? 2 : 1));		// TODO? if other attrs are desired, change to unstruct event, include tag_id
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