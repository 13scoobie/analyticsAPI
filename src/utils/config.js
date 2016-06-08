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
		clientA: (function() {
			var cookieDomain = '.site.com';		// set to your site domain for first-party cookies
			var prod = (/dev/.test(window.location.hostname.split('.')[0]) ? 0 : 1); 	// adjust to sniff your dev environment
			var mobile = (window.location.hostname.split('.')[0] === 'm' ? 1 : 0);		// many mobile sites begin with 'm.' but adjust to yours
			var cm = (function() {
				if (mobile && !prod) return { clientId: '66666666', dataDomain: 'testdata.coremetrics.com' };		// dev mobile site, if applicable
				else if (!mobile && !prod) return { clientId: '99999999', dataDomain: 'testdata.coremetrics.com'};	// dev desktop site
				else return { clientId: '99999999', dataDomain: 'data.coremetrics.com' };							// prod desktop+mobile, split as necessary; if Client Managed domain, add your custom data domain here
			})();
			var snowplow = {
				namespace: 'namespace',								// add your desired namespace here
				collector: (prod ? 'collector.prod.com' : 'collector.test.com'),				// point to your collector domain
				appId: (mobile ? 'mobile' : 'desktop'),				// customize to any values
				platform: 'web'										// customize to any value
			};
			var ga = {
				trackingId: (prod ? 'UA-99999999-9' : 'UA-99999999-9')	// add your GA tracker ID(s)
			};
			return {
				cm: cm,
				snowplow: snowplow,
				ga: ga
			};
		})(),
		clientB: (function() {
			// if you have a second site, you can configure it here just as above
		})(),
		clientC: (function() {
			// third site if applicable
		})()
	};

	return {
		env_vars: this.env_vars
	};
})(window);