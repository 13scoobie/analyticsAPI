module.exports = (function order (data) {

	var cm = function(data) {
		function fire() {
			cmCreateOrderTag(data.order_id, data.merchandise_total, data.shipping, data.shopper_id, data.city, data.state, data.postal_code, Array(42).join('-_-') + data.tag_id);
			for (i=0;i<data.items.length;i++) {
				var item = data.items[i], attrArray = [];
				attrArray[2] = item.product_rating || null;
				attrArray[3] = item.number_reviews || null;
				attrArray[4] = item.recommendation_percent || null;
				attrArray[8] = item.on_sale || null;
				attrArray[9] = item.brand_name || null;
				attrArray[10] = item.filter_used || null;
				attrArray[11] = item.search_term || null;
				attrArray[12] = item.sort_used || null;
				attrArray[16] = item.same_day_delivery || null;
				attrArray[28] = item.sku || null;
				attrArray[29] = item.size || null;
				attrArray[30] = item.width || null;
				attrArray[31] = item.color || null;
				attrArray[42] = data.tag_id || null;

				cmCreateShopAction9Tag(item.style_number, item.product_name, item.quantity, item.unit_price, data.shopper_id, data.order_id, data.merchandise_total, item.category, clickstream.attrs(attrArray));

				// CM custom tag for additional order item attributes; optional
				if ((item.gift_services != '0') || item.saved_for_later || (item.store_id !== 0)) {
					cmMakeTag(["tid", "7", "li", "50", "ps1", "9", "ps2", item.style_number, "ps3", item.quantity, "ps4", item.unit_price, "ps5", item.category, "ps6", (item.outfit_id ? item.outfit_id : ''), "ps7", (item.gift_services ? item.gift_services : ''), "ps8", (item.saved_for_later ? item.saved_for_later : ''), "ps9", (item.store_id && item.store_id === 0 ? "" : "Y"), "ps10", (item.store_id && item.store_id === 0 ? "" : item.store_id), "ps11", null, "ps12", data.order_id]);
				}
			}
			cmDisplayShops();
		}
		if(window.cmPV && typeof cmCreateOrderTag === 'function') fire();
		else document.addEventListener('cmPV', fire);
	};
	
	var sp = function(data) {
		function fire() {
			snowplow('addTrans', data.order_id, null, data.merchandise_total, data.tax, data.shipping, data.city || null, data.state || null);
			for (var i in data.items) {
				var item = data.items[i];
				snowplow('addItem',
					data.order_id,													// orderID
					item.style_number,											// SKU / product code
					item.product_name,		// product name
					item.category,										// category
					item.unit_price,	// unit price
					item.quantity,									// quantity
					null,														// currency
					[
						{
							schema: 'iglu:com.nordstrom/order_item_attrs/jsonschema/0-0-1',
							data: {
								outfit_id: item.outfit_id || null,
								gift_services: item.gift_services || null,
								saved_for_later: item.saved_for_later || null,
								store_pickup: item.store_id || null,
								product_rating: item.product_rating || null,
								number_reviews: item.number_reviews || null,
								recommendation_percent: item.recommendation_percent || null,
								on_sale: item.on_sale || null,
								brand_name: item.brand_name || null,
								filter_used: item.filter_used || null,
								search_term: item.search_term || null,
								sort_used: item.sort_used || null,
								same_day_delivery: item.same_day_delivery || null,
								sku: item.sku || null,
								size: item.size || null,
								width: item.width || null,
								color: item.color || null,
								is_recognized: item.is_recognized || null,
								tag_id: data.tag_id || null
							}
						}
					]
				);
			}
			snowplow('trackTrans');
		}
		if(window.spPV && typeof snowplow === 'function') fire();
		else document.addEventListener('spPV', fire);
	};

	var ga = function(data) {
		function fire() {
			window.ga('require', 'ecommerce');
			window.ga('ecommerce:addTransaction', {
				'id': data.order_id,                     // Transaction ID. Required.
				'affiliation': null,   // Affiliation or store name.
				'revenue': data.merchandise_total,               // Grand Total.
				'shipping': data.shipping,                  // Shipping.
				'tax': data.tax                     // Tax.
			});
			for (var i in data.items) {
				var item = data.items[i];
				window.ga('ecommerce:addItem', {
					'id': data.order_id,                     // Transaction ID. Required.
					'name': item.product_name,    // Product name. Required.
					'sku': item.style_number,                 // SKU/code.
					'category': item.category,         // Category or variation.
					'price': item.unit_price,                 // Unit price.
					'quantity': item.quantity                   // Quantity.
				});
			}
			window.ga('ecommerce:send');
		}
		if(window.gaPV && typeof window.ga === 'function') fire();
		else document.addEventListener('gaPV', fire);
	};

	return {
		cm: cm,
		sp: sp,
		ga: ga
	};
})(window);