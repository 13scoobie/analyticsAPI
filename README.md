# analyticsAPI
Syndicate clickstream analytics tag calls and code through this handy wrapper API!

This library is intended as a simple client JavaScript API to syndicate clickstream analytics tag calls to multiple collectors. It is somewhat similar to [segment.com](https://segment.com/docs/libraries/analytics.js/) but is free and extensible.  It currently includes functions for IBM Coremetrics, Snowplow Analytics, and Google Analytics, but could be extended to nearly any web analytics platform, as these all collect the same data and perform similar transformations on it.

Each API method accepts a range of collection options.  If you want to load or track an event in Coremetrics, Snowplow, or GA only, pass any one of 'cm', 'sp', or 'ga', respectively, as an argument.  If you want to track an event in multiple platforms, even all 3, pass an array of ['cm','sp','ga']	.

This project has several goals:

1. **Make writing tags simpler and less painful.** Writing tags sucks. Let the API do the lifting, reduce 100 lines of tag code to 10 or less, and reduce your overall analytics footprint.
2. **Make tag maintenance easier.** Have an event you want to track in one platform but not the others? Don't maintain separate tags on separate pages--just remove the collector name ('cm', 'sp', 'ga') from the array.
3. **Standardize your data.** If you're like many organizations, you have data from several properties flowing into the same collectors. Some platforms (cough, Coremetrics) require precise slotting of metadata for each client. Misalignment can cause major data quality issues. Putting all your tags behind a single API solves this problem so that each property always sends your product ID to the same space.
4. **Make your analytics more portable.** Maybe you're in love with your analytics provider today, but tomorrow things may change. Don't change all your tags--just update the API and add the collector name to your tags. You are now future-proof.

## To get started:

Supply a few configuration values in config.js (Coremetrics client ID, Snowplow namespace and app IDs, GA tracking ID) and then simply call:
```
window.clickstream.load(['cm','sp','ga']);
```
This will load your collector libraries (CM eluminate.js, SP sp.js, GA analytics.js) and initialize your trackers

Add a page view tag:
```
clickstream.fire(
	'page_view', 
	['cm','sp','ga'], 
	{ 
		page_id: page_id
		, page_schema: page_schema
		, page_url: page_url
		, page_category: (search_term ? '1.6' : page_category)
		, page_template: page_template
		, style_number: style_number
		, is_recognized: is_recognized
		, search_term: search_term
		, search_results_count: search_results_count
		, tag_id: tag_id
		, experiment : experiment
	}
);
```
The API knows which fields each collector requires, and by what names, and will map each according to prescribed implementation. **Note:** If using IBM Coremetrics, you will need to calibrate your event attributes for each tag in the src files. But you should only have to do this once.