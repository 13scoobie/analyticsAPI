// import { config, fire, load, attrs } from './utils';		// babel

// babelify
// import config from './utils/config';
// import fire from './utils/fire';
// import load from './utils/load';
// import attrs from './utils/attrs';
// import init from './init';
// import page_view from './page_view';

// browserify
// utils
var config = require('./utils/config');
var fire = require('./utils/fire');
var load = require('./utils/load');
var attrs = require('./utils/attrs');
var analytics_wrapped = function() { require('./utils/analytics_wrapped'); };

// events
var init = require('./init');
var page_view = require('./page_view');
var order = require('./order');
var bag = require('./bag');
var registration = require('./registration');
var conversion = require('./conversion');
var link_click = require('./link_click');
var element = require('./element');

window.clickstream = (function(window, undefined) {

	this.init = init;

	this.page_view = page_view;

	this.order = order;

	this.bag = bag;

	this.registration = registration;

	this.conversion = conversion;

	this.link_click = link_click;

	this.element = element;

	analytics_wrapped();

	return {
		init: init,
		page_view: page_view,
		order: order,
		bag: bag,
		registration: registration,
		conversion: conversion,
		link_click: link_click,
		element: element,
		fire: fire,
		load: load,
		attrs: attrs
	};

})(window);