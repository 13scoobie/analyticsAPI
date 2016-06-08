module.exports = (function bag (data) {
	try {
		var cm = function(data) {
			if (data.type === 'add') {
				if (window.cmSet && typeof cmCreateShopAction5Tag === 'function') {
					var attrArray = [];
					// adjust attribute slotting to fit your data history and requirements, and/or add your own custom attributes
					attrArray[28] = data.sku_id || null;
					attrArray[29] = data.size || null;
					attrArray[30] = data.width || null;
					attrArray[31] = data.color || null;
					attrArray[40] = data.style_id || null;
					attrArray[43] = data.percentage_off || null;
					attrArray[44] = data.authenticated_state || null;
					attrArray[48] = data.storeNumber || null;

					cmCreateShopAction5Tag(
						data.style_number
						, data.product_name
						, data.quantity
						, data.unit_price
						, data.category_id
						, clickstream.attrs(attrArray)
					);
					cmDisplayShop5s();
				}
				else return false;
			}
		};

		var sp = function(data,type) {
			if (data.type === 'add' || data.type === 'remove') {
				if (window.spSet && typeof snowplow === 'function') {
					var action = (data.type === 'remove' ? 'trackRemoveFromCart' : 'trackAddToCart');
					var item_attrs = {};
					if (data.schema) {
						item_attrs = {
							schema: data.schema,
							data: {
								document_url: document.URL
								, style_id: data.style_number
								, size: data.size || null
								, width: data.width || null
								, color: data.color || null
								, percentage_off: data.percentage_off || null
								, sale_type: data.sale_type || null
								, authenticated_state: data.authenticated_state || null
								, store_number: data.store_number || null
								, experiment : experiment
								, tag_id: data.tag_id
							}
						};
					}
					snowplow(
						action,
						data.style_number,
						data.product_name,
						data.category_id,
						data.unit_price,
						data.quantity,
						'USD',
						[item_attrs]
					);
				}
			}
		};

		return {
			cm: cm,
			sp: sp
		};
	}
	catch(e){ console.log(e); }
})(window);