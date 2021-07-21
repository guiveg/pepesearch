PepeSearch
==========

PepeSearch is a search interface for querying SPARQL endpoints developed at the University of Oslo. It is especially designed for casual users that do not know SPARQL. You may also find useful PepeSearch for exploring and browsing the contents of arbitrary datasets.

[Try PepeSearch](http://sws.ifi.uio.no/project/semicolon/search/) in action with data from the Norwegian Company Registry.

PepeSearch uses [the SPARQL endpoint analyzer](https://github.com/simenheg/sparql-endpoint-analyzer) for obtaining the data structure of a SPARQL endpoint. See the [configuration section](#configuration). 

Please cite PepeSearch as:

> G. Vega-Gorgojo, M. Giese, S. Heggestøyl, A. Soylu, A. Waaler. PepeSearch: Semantic Data for the Masses. PLoS ONE. 11(3), March 2016.

Usage
==========
PepeSearch is a web application developed in Javascript. Run it locally or deploy it in your web server.


Screenshots and screencast
==========
Some screenshots of PepeSearch:

![screenshot](/screenshots/Query.png "Query")

![screenshot](/screenshots/Results.png "Results")

![screenshot](/screenshots/Instance.png "Instance")

[Screncast of PepeSearch](http://folk.uio.no/simenheg/pepesearch.webm )

SPARQL query generation
==========

Behind the scenes, PepeSearch generates SPARQL queries that are sent to the endpoint. As an example, the following snippet corresponds to a query asking for companies based in Oslo that were founded between 1995 and 2000:

	SELECT DISTINCT ?X ?X_display ?X_org_stiftelsesdato ?X_org_organisasjonsnummer ?X3 (str("OSLO") AS ?X3_display) ?X3_lok_kommunenummer 
      WHERE { 
      ?X a <http://data.computas.com/informasjonsmodell/organisasjon/Enhet> . 
      ?X <http://data.computas.com/informasjonsmodell/organisasjon/navn> ?X_display . 
      ?X <http://data.computas.com/informasjonsmodell/organisasjon/stiftelsesdato> ?X_org_stiftelsesdato . 
      FILTER (YEAR(?X_org_stiftelsesdato) >= 1995) 
      FILTER (YEAR(?X_org_stiftelsesdato) <= 2000) 
      OPTIONAL {?X <http://data.computas.com/informasjonsmodell/organisasjon/organisasjonsnummer> ?X_org_organisasjonsnummer } 
      ?X3 a <http://data.computas.com/informasjonsmodell/lokasjon/Kommune> . 
      ?X <http://data.computas.com/informasjonsmodell/organisasjon/kommune> ?X3 . 
      {{?X3 <http://data.computas.com/informasjonsmodell/lokasjon/navn> "OSLO" .}
      UNION
      {?X3 <http://data.computas.com/informasjonsmodell/lokasjon/navn> "OSLO"^^<http://www.w3.org/2001/XMLSchema#string> .}} 
      OPTIONAL {?X3 <http://data.computas.com/informasjonsmodell/lokasjon/kommunenummer> ?X3_lok_kommunenummer } 
      }
	LIMIT 200

Configuration
==========
To query a SPARQL endpoint with PepeSearch you need first to obtain its data structure: use [the SPARQL endpoint analyzer](https://github.com/simenheg/sparql-endpoint-analyzer).

Include the obtained file, e.g. `data.js`, in your deployment and edit the `index.html` to reference it:

	...
	<script type="text/javascript" language="Javascript" src="etc/data/data.js"></script>
	...

Edit the parameters file, described below. For a sample parameters file, see the next section.

*`sparqlBase`: URI of the SPARQL endpoint of interest. Note that this is the most important parameter...

*`sparqlLIMIT`: maximum number of results for a query.

*`sparqlLIMITinstance`: maximum number of related results for an instance record.

*`maxSparqlLength`: limit for sending the query in a HTTP GET request. A HTTP POST request is sent if the query length is bigger.

*`maxResultFieldLength`: maximum field length in the results table

*`hidePropertiesMode`: if true, properties are hidden and thus forms are simplified

*`optional`: if true, optional clauses are used in the query to gather more results.

*`literalQueryInclusion`: select the strategy for the inclusion of literals in the results. Choices are: 
`limited` (only the literals that form part of the query), `all` (every possible literal of an instance - not recommended), `searchable`(something in the middle)

*`deflang`: employed to set up the default language of PepeSearch

Sample Configuration File
==========

The following configuration file can be employed to query the [Norwegian Entity Registry endpoint](http://data.computas.com/):

	/**********************
	*** PARAMETERS FILE ***
	**********************/

	var parameters = new Object();
	// SPARQL	
	parameters.sparqlBase = "http://data.computas.com:3030/sparql";
	parameters.sparqlLIMIT = 200;
	parameters.sparqlLIMITinstance = 50;
	// if greater, send the query with POST
	parameters.maxSparqlLength = 6000;	
	// control de maximum field length in the results table
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
	// language
	parameters.userlang = (window.navigator.userLanguage || window.navigator.language).substring(0,2);
	parameters.deflang = "nb";
	


