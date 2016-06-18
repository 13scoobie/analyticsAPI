module.exports = (function element (data) {

	var cm = function(data) {	// element, category, attr1, attr2, attr3, slot1, slot2, slot3
		var _element = data[2],
			category = data[3],
			attr1 = data[4],
			attr2 = data[5],
			attr3 = data[6],
			slot1 = data[7] || null,
			slot2 = data[8] || null,
			slot3 = data[9] || null
		;
		function fire() {
			var attrArray = [];
			if (slot1) attrArray[slot1] = attr1;
			if (slot2) attrArray[slot2] = attr2;
			if (slot3) attrArray[slot3] = attr3;
			cmCreateElementTag(_element, category, window.clickstream.attrs(attrArray));
		}
		if(window.cmPV && cmCreateElementTag) fire();
		else document.addEventListener('cmPV', fire);
	};
	
	var sp = function(data) {	// element, category, attr1, attr2, attr3, slot1, slot2, slot3
		var _element = data[2],
			category = data[3],
			attr1 = data[4],
			attr2 = data[5],
			attr3 = data[6]
		;
		function fire() {
			snowplow('trackStructEvent', category, _element, attr1, attr2, attr3);
		}
		if(window.spPV && snowplow) fire();
		else document.addEventListener('spPV', fire);
	};

	return {
		cm: cm,
		sp: sp
	};
})(window);