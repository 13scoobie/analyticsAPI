module.exports = (function bag (data) {
	try {
		var cm = function(data) {
			if (data.type === 'add') {
				if (window.cmSet && typeof cmCreateShopAction5Tag === 'function') {
					var attrArray = [];
					attrArray[28] = data.sku_id || null;
					attrArray[29] = data.size || null;
					attrArray[30] = data.width || null;
					attrArray[31] = data.color || null;
					attrArray[38] = data.elwinId || null;
					attrArray[39] = data.elwinData || null;
					attrArray[40] = data.style_id || null;
					attrArray[43] = data.percentage_off || null;
					attrArray[44] = data.authenticated_state || null;
					attrArray[45] = (data.rack ? 'Y' : 'N');
					attrArray[47] = data.bopus || null;
					attrArray[48] = data.storeNumber || null;
					attrArray[49] = data.modern_page || null;

					cmCreateShopAction5Tag(
						data.style_number
						, data.product_name
						, data.quantity
						, data.price
						, data.category_id
						, clickstream.attrs(attrArray)
					);
					cmDisplayShop5s();
				}
				else return false;
			}
		};

		var sp = function(data) {
			if (data.type === 'add' || data.type === 'remove') {
				if (window.spSet && typeof snowplow === 'function') {
					var action = (data.type === 'remove' ? 'trackRemoveFromCart' : 'trackAddToCart');
					var schema = (data.type === 'remove' ? 'iglu:com.nordstrom/remove_item_attrs/jsonschema/0-0-5' : 'iglu:com.nordstrom/add_item_attrs/jsonschema/0-0-5');
					var item_attrs = {
						schema: schema,
						data: {
							document_url: document.URL
							, style_number: data.style_number
							, style_id: data.style_id
							, size: data.size || null
							, width: data.width || null
							, color: data.color || null
							, percentage_off: data.percentage_off || null
							, sale_type: data.sale_type || null
							, authenticated_state: data.authenticated_state || null
							, bopus: data.bopus || null
							, store_number: data.store_number || null
							, mmp: data.modern || null
							, experiment: data.experiment || null
							, tag_id: data.tag_id
						}
					};
					snowplow(
						action,
						data.sku_id,
						data.product_name,
						data.category_id,
						data.price,
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