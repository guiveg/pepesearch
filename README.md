PepeSearch
==========

PepeSearch is a search interface for querying SPARQL endpoints developed at the University of Oslo. It is especially designed for casual users that do not know SPARQL. You may also find useful PepeSearch for exploring and browsing the contents of arbitrary datasets.

[Try PepeSearch](http://sws.ifi.uio.no/project/semicolon/search/) in action with data from the Norwegian Company Registry.

PepeSearch uses [the SPARQL endpoint analyzer](https://github.com/simenheg/sparql-endpoint-analyzer) for obtaining the data structure of a SPARQL endpoint. See the [configuration section](#configuration). 


Usage
==========
PepeSearch is a web application developed in Javascript. Run it locally or deploy it in your web server.


Screenshots and screencast
==========
Some screenshots of PepeSearch:

![Query](/screenshots/Query.png "Query")

![Results](/screenshots/Results.png "Results")

![Instance](/screenshots/Instance.png "Instance")

[Screncast of PepeSearch](http://folk.uio.no/simenheg/pepesearch.webm )


Configuration
==========
To query a SPARQL endpoint with PepeSearch you need first to obtain its data structure: use [the SPARQL endpoint analyzer](https://github.com/simenheg/sparql-endpoint-analyzer).

Include the obtained file, e.g. `data.js`, in your deployment and edit the `index.html` to reference it:

	...
	<script type="text/javascript" language="Javascript" src="etc/data/data.js"></script>
	...

Edit the parameters file, described below. For a sample parameters file, see the next section.

* `sparqlBase`: URI of the SPARQL endpoint of interest. Note that this is the most important parameter...

* `sparqlLIMIT`: maximum number of results for a query.

* `sparqlLIMITinstance`: maximum number of related results for an instance record.

* `maxSparqlLength`: limit for sending the query in a HTTP GET request. A HTTP POST request is sent if the query length is bigger.

* `optional`: if true, optional clauses are used in the query to gather more results.

* `literalQueryInclusion`: select the strategy for the inclusion of literals in the results. Choices are: 
`limited` (only the literals that form part of the query), `all` (every possible literal of an instance - not recommended), `searchable`(something in the middle).

* `deflang`: employed to set up the default language of PepeSearch.

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
