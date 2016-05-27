/*
  Copyright (c) 2013-2016, Guillermo Vega-Gorgojo
  All rights reserved
 */

/**********************
*** PARAMETERS FILE ***
**********************/

var parameters = new Object();
// SPARQL
// set user and password in case that the SPARQL endpoint requires them
//parameters.user = "";
//parameters.password = "";
// SPARQL endpoint
parameters.sparqlBase = "http://data.computas.com:3030/sparql";
parameters.sparqlLIMIT = 200;
parameters.sparqlLIMITinstance = 50;
// if greater, send the query with POST
parameters.maxSparqlLength = 6000;
// control the maximum field length in the results table
parameters.maxResultFieldLength = 120;
// if true, properties are hidden and thus forms are simplified
parameters.hidePropertiesMode = false;
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
