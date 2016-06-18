module.exports = config = (function config () {
	var prod
		, mobile
		, cm
		, snowplow
		, ga
		, hsplit = window.location.hostname.split('.')
		, client = hsplit[hsplit.length-2]
	;

	this.env_vars = {
		client: client,
		nordstrom: (function() {
			var prod = (['shop','secure','m'].indexOf(window.location.hostname.split('.')[0]) > -1 ? 1 : 0);
			var mobile = (window.location.hostname.split('.')[0] === 'm' ? 1 : 0);
			var cm = (function() {
				if (mobile && !prod) return { clientId: '60408482;81690000|81690004', dataDomain: 'testdata.coremetrics.com' };
				else if (!mobile && !prod) return { clientId: '60408482;81690000|81690001', dataDomain: 'testdata.coremetrics.com'};
				else return { clientId: '90033273', dataDomain: '1901.nordstrom.com' };
			})();
			var snowplow = {
				namespace: 'nord' + (prod ? '_prod' : '_dev'),
				collector: (prod ? 'p.nordstromdata.com' : 't.nordstromdata.com'),
				appId: (mobile ? 'nord.mow' : 'nord.com'),
				platform: 'web',
				cookieDomain: '.nordstrom.com'
			};
			var ga = {
				trackingId: (prod ? 'UA-65825786-5' : 'UA-65825786-4')
			};
			return {
				cm: cm,
				snowplow: snowplow,
				ga: ga
			};
		})(),
		nordstromrack: (function() {
			// TODO: if valuable
		})(),
		hautelook: (function() {
			// TODO: if valuable
		})()
	};

	return {
		env_vars: this.env_vars
	}
})(window);