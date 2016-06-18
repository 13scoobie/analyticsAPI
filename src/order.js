module.exports = (function order (data) {

	var cm = function(data) {
		function fire() {
			cmCreateOrderTag((data.order_id).toString(), parseFloat((data.merchandise_total).toString().replace(/[$,]/g, '')), parseFloat((data.shipping).toString().replace(/[$,]/g, '')), (data.shopper_id).toString(), (data.city ? data.city : null), (data.state ? data.state : null), (data.postal_code ? data.postal_code : null), Array(42).join('-_-') + data.tag_id);
			for (i=0;i<data.items.length;i++) {
				var item = data.items[i];
				if (item.unit_price) {
					var attrArray = [];
					attrArray[2] = item.product_rating || null; // Product Rating
					attrArray[3] = item.number_reviews || null; // Number of reviews
					attrArray[4] = item.recommendation_percent || null; // Recommendation percent
					attrArray[8] = item.on_sale || null; // Sale Item?
					attrArray[9] = item.brand_name || null; // Brand Name
					attrArray[10] = item.filter_used || null; // Dynamic Filter Used
					attrArray[11] = item.search_term || null; // Keyword Search Term
					attrArray[12] = item.sort_used || null; // Sort Used
					attrArray[13] = item.base_copy_split || null; // Base/Copy/Split
					attrArray[14] = item.true_fit || null; // True Fit
					attrArray[16] = item.same_day_delivery || null; // Same Day Delivery
					attrArray[28] = item.sku || null; // SKU
					attrArray[29] = item.size || null; // Size
					attrArray[30] = item.width || null; // Width
					attrArray[31] = item.color || null; // Color        
					attrArray[42] = data.tag_id || null;		// Signal Tag ID
					// attrArray[44] = (/Hello/.test($('#shopperGreeting').first().text()) ? 'Y' : 'N');    // recognized

					cmCreateShopAction9Tag(item.style_number, item.product_name, item.quantity, item.unit_price, data.shopper_id, data.order_id, data.merchandise_total, item.category, window.clickstream.attrs(attrArray));

					if ((item.gift_services != '0') || item.saved_for_later || (item.store_id !== 0)) {
						cmMakeTag(["tid", "7", "li", "50", "ps1", "9", "ps2", item.style_number, "ps3", item.quantity, "ps4", item.unit_price, "ps5", item.category, "ps6", (item.outfit_id ? item.outfit_id : ''), "ps7", (item.gift_services ? item.gift_services : ''), "ps8", (item.saved_for_later ? item.saved_for_later : ''), "ps9", (item.store_id && item.store_id === 0 ? "" : "Y"), "ps10", (item.store_id && item.store_id === 0 ? "" : item.store_id), "ps11", null, "ps12", data.order_id]);
					}
				}
			}
			cmDisplayShops();
		}
		if(window.cmPV && typeof cmCreateOrderTag === 'function') fire();
		else document.addEventListener('cmPV', fire);
	};
	
	var sp = function(data) {
		function fire() {
			snowplow('addTrans', (data.order_id).toString(), null, parseFloat((data.merchandise_total).toString().replace(/[$,]/g, '')), parseFloat((data.tax).toString().replace(/[$,]/g, '')), parseFloat((data.shipping).toString().replace(/[$,]/g, '')), (data.city ? data.city : null), (data.state ? data.state : null));
			for (var i in data.items) {
				var item = data.items[i];
				snowplow('addItem',
					(data.order_id).toString(),													// orderID
					(item.style_number).toString(),											// SKU / product code
					item.product_name,		// product name
					(item.category).toString(),										// category
					parseFloat((item.unit_price).toString().replace(/[$,]/g, '')),	// unit price
					parseInt(item.quantity, 10),									// quantity
					null,														// currency
					[
						{
							schema: data.order_schema || 'iglu:com.nordstrom/order_item_attrs/jsonschema/0-0-2',
							data: {
								outfit_id: (item.outfit_id ? (item.outfit_id).toString() : null),
								gift_services: item.gift_services || null,
								saved_for_later: item.saved_for_later || null,
								store_pickup: item.store_id || null,
								product_rating: (item.product_rating ? parseInt(item.product_rating, 10) : null),
								number_reviews: (item.number_reviews ? parseInt(item.number_reviews, 10) : 0),
								recommendation_percent: (item.recommendation_percent ? parseInt(item.recommendation_percent, 10) : null),
								on_sale: item.on_sale || null,
								brand_name: (item.brand_name ? item.brand_name.replace('®', '').replace(/·/g, '') : null),
								filter_used: item.filter_used || null,
								search_term: item.search_term || null,
								sort_used: item.sort_used || null,
								base_copy_split: (item.base_copy_split ? item.base_copy_split.replace('Style', '').trim() : null),
								true_fit: item.true_fit || null,
								same_day_delivery: item.same_day_delivery || null,
								sku: (item.sku ? (item.sku).toString() : null),
								size: (item.size ? (item.size).toString().toLowerCase() : null),
								width: (item.width ? (item.width).toString() : null),
								color: (item.color ? item.color.toLowerCase() : null),
								is_recognized: data.is_recognized || null,
								tag_id: data.tag_id
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
				'id': (data.order_id).toString(),                     // Transaction ID. Required.
				'affiliation': null,   // Affiliation or store name.
				'revenue': parseFloat((data.merchandise_total).toString().replace(/[$,]/g, '')),               // Grand Total.
				'shipping': parseFloat((data.shipping).toString().replace(/[$,]/g, '')),                  // Shipping.
				'tax': parseFloat((data.tax).toString().replace(/[$,]/g, ''))                   // Tax.
			});
			for (var i in data.items) {
				var item = data.items[i];
				window.ga('ecommerce:addItem', {
					'id': (data.order_id).toString(),                     // Transaction ID. Required.
					'name': item.product_name,    // Product name. Required.
					'sku': (item.style_number).toString(),                 // SKU/code.
					'category': (item.category).toString(),         // Category or variation.
					'price': parseFloat((item.unit_price).toString().replace(/[$,]/g, '')),                 // Unit price.
					'quantity': parseInt(item.quantity, 10)                   // Quantity.
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