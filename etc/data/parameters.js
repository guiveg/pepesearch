/*
  Copyright (c) 2013, Guillermo Vega-Gorgojo
  All rights reserved
 */

/**********************
*** PARAMETERS FILE ***
**********************/

var parameters = new Object();
// SPARQL
// Semicolon
parameters.sparqlBase = "http://data.computas.com:3030/sparql";
//parameters.sparqlForwardBase = "http://data.computas.com:3030/sparql";
parameters.forwarding = false;
parameters.instanceHack = true;
// Workaround when the main endpoint doesn't support the SERVICE keyword:
//parameters.swapForwardedTriples = true; 
parameters.sparqlLIMIT = 200;
parameters.sparqlLIMITinstance = 50;
// if greater, send the query with POST
parameters.maxSparqlLength = 6000;
// required or optional behavior in query building
parameters.optional = false;
// strategy for inclusion of literals in the query:
//  "limited": only the ones that form part of the query
//  "searchable": "limited" + the literals with the attribute "searchable"
//  "all":	every possible literal of an instance (not recommended)
parameters.literalQueryInclusion = "searchable";
// text engine
// NOTE: needs to be adjusted for each endpoint
parameters.autocompleteService = "http://sws.ifi.uio.no/solr/semicolon/suggest/";
// language
parameters.userlang = (window.navigator.userLanguage || window.navigator.language).substring(0,2);
parameters.deflang = "nb";
// logging (see http://docs.shopify.com/manual/configuration/store-customization/get-a-visitors-location)
parameters.geoipservice = "http://freegeoip.net/json/";
parameters.locallog = true;
// NOTE: remote logging needs a logging service
//parameters.logservice = "";
parameters.remotelog = false;
