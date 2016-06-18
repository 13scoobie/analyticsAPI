module.exports = (function conversion (data) { 
	try {
		var cm = function(data) {
			var _id = data[2],
				pts = data[3] || null,
				cat = data[4],
				attr1 = data[5] || null,
				attr2 = data[6] || null,
				slot1 = data[7] || null,
				slot2 = data[8] || null
			function fire() {
				var attrArray = [];
				if (slot1) attrArray[slot1] = attr1;
				if (slot2) attrArray[slot2] = attr2;
				cmCreateConversionEventTag(_id, parseFloat(pts), cat, null, clickstream.attrs(attrArray));
			}
			if(window.cmPV && typeof cmCreateConversionEventTag === 'function') fire();
			else document.addEventListener('cmPV', fire);
		};

		var sp = function(data) {
			var _id = data[2],
				pts = (data[3] ? ((data[3]).toString().indexOf('.') === -1 ? data[3] + '.0' : (data[3]).toString()) : null),
				cat = data[4],
				attr1 = data[5] || null,
				attr2 = data[6] || null
			;
			console.log(data);
			function fire() {
				// clickstream.fire('conversion', 'sp', 'Email Wishlist', '2.0', 'Wish List', [Shopper ID]);
				window.clickstream.fire('element', 'sp', _id, cat, attr1, attr2, pts);
				// clickstream.fire('element', 'sp', 'Email Wishlist', 'Wish List', [[Wish List Owner Shopper ID]], null, '2');
				// snowplow('trackStructEvent', data.category, data.event_id, null, null, (data.type === 'complete' ? 2 : 1));		// TODO? if other attrs are desired, change to unstruct event, include tag_id
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

// clickstream.fire('conversion', 'sp', 'Email Wishlist', '2.0', 'Wish List', [Shopper ID]);