module.exports = (function page_view (data) {		// tracker name, data
	
	var cm = function(data) {
		function fire() {
			var attrArray = [];
			attrArray[10] = data.style_number || null;
			attrArray[22] = data.is_recognized || null;
			attrArray[31] = data.experiment.experimentId || null;
			attrArray[32] = JSON.stringify(data.experiment.experimentData) || null;
			attrArray[35] = data.is_modern || null;
			attrArray[42] = data.tag_id || null;
			cmCreatePageviewTag(data.page_id, data.page_category || null, data.search_term || null, data.search_results_count || null, window.clickstream.attrs(attrArray));
			if (data.product_schema) {
				try {
					attrArray = [];
					attrArray[8]  = data.on_sale || null;
					attrArray[9]  = data.brand_name || null;
					attrArray[13] = data.base_copy_split || null;
					attrArray[14] = data.fit_value || null;
					attrArray[18] = data.rack || null;
					attrArray[19] = data.product_id || null;
					attrArray[20] = data.available || null;
					attrArray[31] = data.percentage_off || null;
					attrArray[32] = data.price_match || null;
					attrArray[34] = data.preorder || null;
					attrArray[42] = data.tag_id || null;
					cmCreateProductviewTag(data.style_number, data.product_name, (data.page_category || null), window.clickstream.attrs(attrArray));
				}
				catch(e) { console.log(e); }
			}
			window.cmPV = true;
			var event = new Event('cmPV');
			document.dispatchEvent(event);
		}
		if(window.cmSet && typeof cmCreatePageviewTag === 'function') fire();
		else document.addEventListener('cmSet', fire);
	};

	var sp = function(data) {
		function fire() {
			var page = {}, product;
			if (data.page_schema) {
				page = { 
					schema: data.page_schema || 'iglu:com.nordstrom/pageview_attrs/jsonschema/0-0-8', 
					data: {
						page_url: window.location.href
						, page_category: data.page_category || null
						, page_template: data.page_template || null
						, style_number: data.style_number || null
						, is_recognized: data.is_recognized || null
						, search_term: data.search_term || null
						, search_results_count: data.search_results_count || null
						, tag_id: data.tag_id
						, experiment : data.experiment || null
					}
				};
			}
			if (data.product_schema) {
				product = {
					schema: data.product_schema || 'iglu:com.nordstrom/product_view_attrs/jsonschema/0-0-3',
					data: {
						page_url: window.location.href
						, product_id: data.product_id || null
						, product_category: data.page_category || null
						, style_number: data.style_number || null
						, product_name: data.product_name || null
						, on_sale: data.on_sale || null
						, brand_name: data.brand_name || null
						, fit_value: data.fit_value || null
						, rack: data.rack || null
						, available: data.available || null
						, tag_id: data.tag_id
						, base_copy_split: data.base_copy_split || null
					}
				};
			}
			if (product) snowplow('trackPageView', data.page_id, [page, product]);
			else snowplow('trackPageView', data.page_id, [page]);
			window.spPV = true;
			var event = new Event('spPV');
			document.dispatchEvent(event);
		}
		if(window.spSet && typeof snowplow === 'function') fire();
		else document.addEventListener('spSet', fire);
	};

	var ga = function(data) {
		function fire() {
			// ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
			window.ga('send', 'event', data.page_category, 'page_view', data.label || null);
			window.gaPV = true;
			var event = new Event('gaPV');
			document.dispatchEvent(event);
		}
		if(window.gaSet && typeof ga === 'function') fire();
		else document.addEventListener('gaSet', fire, false);
	};

	return {
		cm: cm,
		sp: sp,
		ga: ga
	};
})(window);