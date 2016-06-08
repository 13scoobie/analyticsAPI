module.exports = (function init () {

	var client = config.env_vars.client;

	var cm = function() {
		if (!(window.cmCreatePageviewTag)) {
			var s = document.createElement("script"), cmSet;
			s.src = "//libs.coremetrics.com/eluminate.js";
			document.head.appendChild(s);

			var isCMset = function() {
				if (typeof(cmSetupOther) === 'function') {
					cmSetupOther({"cm_TrackImpressions":""});
					// else var cm_TrackImpressions = "";
					if (typeof cmSetClientID === 'function') cmSetClientID(config.env_vars[client].cm.clientId, false, config.env_vars[client].cm.dataDomain, config.env_vars[client].cookieDomain);
					// else return false;
					window.cmSet = true;
					var event = new Event('cmSet');
					document.dispatchEvent(event);
				}
				else setTimeout(isCMset, 100);
			};
			isCMset();
		}
	};

	var sp = function() {
		if (!(window.snowplow)) {
			;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
			p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
			};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
			n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//d1fc8wv8zag5ca.cloudfront.net/2.6.1/sp.js","snowplow"));	// update library version as they are released, https://github.com/snowplow/snowplow-javascript-tracker/releases
			if (typeof window.snowplow === 'function') {
				snowplow(
					'newTracker', 
					config.env_vars[client].snowplow.namespace, 
					config.env_vars[client].snowplow.collector, 
					{
						appId: config.env_vars[client].snowplow.appId,
						cookieDomain: config.env_vars[client].cookieDomain,
						cookieName: "_sp_",
						pageUnloadTimer: 0,
						useCookies: true,
						bufferSize: 5,
						encodeBase64: false,
						forceSecureTracker: true,
						respectDoNotTrack: true,
						contexts: {
							webPage: false,
							performanceTiming: false,
							gaCookies: true
						}
					}
				);
			}
			window.spSet = true;
			var event = new Event('spSet');
			document.dispatchEvent(event);
		}
	};

	var ga = function() {
		if (!(window.ga)) {
			(function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
			if (typeof window.ga === 'function') {
				window.ga(
					'create', 
					config.env_vars[client].ga.trackingId, 
					'auto', 
					{		// tracking ID, cookie domain
						'userId': 'test' || null
					}
				);
				var sessionID = new Date().getTime() + '.' + Math.random().toString(36).substring(5);
				var hitTimestamp = function() {
				// Get local time as ISO string with offset at the end
					var now = new Date();
					var tzo = -now.getTimezoneOffset();
					var dif = tzo >= 0 ? '+' : '-';
					var pad = function(num) {
						var norm = Math.abs(Math.floor(num));
						return (norm < 10 ? '0' : '') + norm;
					};
					return now.getFullYear() 
						+ '-' + pad(now.getMonth()+1)
						+ '-' + pad(now.getDate())
						+ 'T' + pad(now.getHours())
						+ ':' + pad(now.getMinutes()) 
						+ ':' + pad(now.getSeconds())
						+ '.' + pad(now.getMilliseconds())
						+ dif + pad(tzo / 60) 
						+ ':' + pad(tzo % 60);
				};
				window.ga(function(tracker) {
					window.ga('set', 'dimension1', tracker.get('clientId')); //client id
					window.ga('set', 'dimension2', sessionID); //session id
					window.ga('set', 'dimension3', hitTimestamp()); //hit timestamp
					// add any other custom dimensions here
				});
			}
			window.gaSet = true;
			var event = new Event('gaSet');
			document.dispatchEvent(event);
		}
	};

	return {
		cm: cm,
		sp: sp,
		ga: ga
	};
		
})(window);