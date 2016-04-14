/*
   Copyright 2013-2016, Guillermo Vega-Gorgojo & Simen Heggestøyl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

function showInstance(uri, typeId) {
	// init view
	$.mobile.loading('show');

	// check if already retrieved
	if ( previousInstance(uri) != null ) {
		var iid = previousInstance(uri);
		$.mobile.loading('hide');
		// existing results page
		$.mobile.changePage("#" + iid, {
			transition : 'slide'
		});	
		// update instance id
		Instance.instanceId = iid;
	}	
	// prepare instance page
	else {
		// array of requests
		var requests = new Array();
		// get instance facets
		var instanceObj = getInstanceFacets(uri,typeId);
		// process root facet
		//console.log(instanceObj.rootFacet.sparql);		
		//var queryUrl =  parameters.sparqlBase + "?default-graph-uri=&query="
		//	+ encodeURIComponent(instanceObj.rootFacet.sparql)
		//	+"&format=json&timeout=0&debug=on";		
		// handle authorization
		var httpHeaders = {Accept : "application/sparql-results+json"};
		if (parameters.user != undefined) {
			httpHeaders = {
				"Authorization": "Basic " + btoa( parameters.user+":"+parameters.password),
				Accept : "application/sparql-results+json",     
			};
		}			
		// only process the root query if needed
		if (instanceObj.rootFacet.sparql === "") 
			instanceObj.success = true;
		else {
			// set HTTP method as GET (default) or POST (lengthy queries)
			var httpMethod = "GET";
			if (instanceObj.rootFacet.sparql.length > parameters.maxSparqlLength)
				var httpMethod = "POST";			
			// root facet request
			var request = $.ajax({
				url: instanceObj.rootFacet.sparqlBase,//parameters.sparqlBase,//queryUrl,
				dataType: "json",
				type: httpMethod,
				headers: httpHeaders,				
				data: { 
               		    //queryLn: 'SPARQL',
            	       	query: instanceObj.rootFacet.sparql,
            	       	format: 'json',
						Accept: 'application/sparql-results+json'
    		           },
				success: function(datos) {
					// this is for Dydra triplestores, that employ a different JSON format
					if (!datos.results && datos.rows) {
						// reformat the results object
						datos = reformatResultsForDydra(datos);
					}
					// store results						
					instanceObj.rootFacet.data = datos;
					instanceObj.success = true;
				},
				error:  function() {	
					instanceObj.success = false;
				}
			});	
			requests.push(request);					
		}
		
		// process other facets
		$.each(instanceObj.facetsA, function(i,facet) {
			// set HTTP method as GET (default) or POST (lengthy queries)
			var httpMethod = "GET";
			if (facet.sparql.length > parameters.maxSparqlLength)
				var httpMethod = "POST";		
			//console.log(facet.sparql);		
			//var queryUrl =  parameters.sparqlBase + "?default-graph-uri=&query="
			//	+ encodeURIComponent(facet.sparql)
			//	+"&format=json&timeout=0&debug=on";		
			var req = $.ajax({
				url: facet.sparqlBase,//parameters.sparqlBase,//queryUrl,
			dataType: "json",
			type: httpMethod,
			headers: httpHeaders,	
			data: { 
                    //queryLn: 'SPARQL',
                    query: facet.sparql, 
                    format: 'json',
                    Accept: 'application/sparql-results+json'
                },
				success: function(datos) {	
					// this is for Dydra triplestores, that employ a different JSON format
					if (!datos.results && datos.rows) {
						// reformat the results object
						datos = reformatResultsForDydra(datos);
					}
					// store results						
					facet.data = datos;
				} 
				// not critical if any of these requests fails
			});
			requests.push(req);			
		});
		// process when done		
		var defer = $.when.apply($, requests);
		defer.done(function(){
			if (instanceObj.success) {
				// log
				Session.log("INSTANCE", uri, "SUCCESS");
				// give an id and render instance page
				instanceObj.id = 'I'+Instance.instanceCount;
				Instance.instanceId = instanceObj.id;
				// increment query counter
				Instance.instanceCount++;
				Instance.instanceA.push(instanceObj);
				renderInstance(instanceObj);
			}
			else {
				// log
				Session.log("INSTANCE", uri, "ERROR");
				// display error
				$.mobile.loading('hide');
				var $err = $('<div data-role="popup" data-overlay-theme="a" data-theme="e" \
					class="ui-content"><p><strong>Error!</strong></p>/div>');
				$.mobile.activePage.append($err);
				$err.popup().popup( "open" );
				setTimeout(function() { $err.popup( "close" ); }, 3000);
			}
		});
	}	
}

function renderInstance(instanceObj) {
	// generate markup for each facet
	var facetMarkupA = new Array();
	var rootMarkup = getInstanceRootMarkup(instanceObj.rootFacet, instanceObj.uri);
	facetMarkupA.push(rootMarkup.markup);
	$.each(instanceObj.facetsA, function(i, facet) {
		facetMarkupA.push(getInstanceFacetMarkup(facet));	
	});
	
	var template =
		'<div data-url="n" data-role="page" id="{{id}}" uri="{{uri}}" class="page"> \
			<div data-role="header" data-id="myheader" data-position="fixed"> \
				<div class="ui-btn-left" data-role="controlgroup" data-type="horizontal" data-mini="true"> \
					<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">{{backmes}}</a> \
					<a href="#init" data-role="button" data-icon="home">{{homemes}}</a> \
				</div> \
				<h1>{{label}}</h1> \
			</div> \
			<div data-role="content"> \
				{{#facets}} \
					{{{.}}} \
				{{/facets}} \
			</div> \
		</div>';
		
	var data = {
		"id": instanceObj.id,
		"uri": instanceObj.uri,
		"label": rootMarkup.label,
       	"facets": facetMarkupA,
     	"backmes": multilingual({"en": "Back", "nb": "Tilbake"}),
       	"homemes": multilingual({"en": "Home", "nb": "Hjem"})
    };

   	var content = $(Mustache.render(template, data));
	//append it to the page container
	content.appendTo($.mobile.pageContainer);
	$.mobile.changePage("#" + instanceObj.id, {
		transition : 'slide'
	});
}

function getInstanceRootMarkup(facet, instanceUri) {
	var res = new Object();
	var items = new Array();
	// CAUTION: display property might not exist
	if (facet.displayprop === undefined)
		res.label = instanceUri;//Instance.instanceId;
	else {
		var dispItem = getRootItem(facet.displayprop, facet.data);
		if (dispItem.values.length == 0)
			res.label = instanceUri;
		else {	
			res.label = dispItem.values[0];	
			items.push(dispItem);
		}
	}
	
	$.each(facet.datapropA, function(i, dp) {
		item = getRootItem(dp,facet.data);
		if (item.values.length >0)
			items.push(item);
	});	

	var template =
    '<ul data-role="listview" class="facet" data-inset="true" \
         data-divider-theme="b" data-mini="true"> \
      <li data-role="list-divider" typeId="{{typeId}}">{{typeLabel}}</li> \
      {{#items}} \
		<li data-role="fieldcontain"> \
           	<div class="left-block">{{prop.label}}</div> \
  			<div class="right-block"> \
  				{{#values}} \
					{{.}} <br> \
				{{/values}} \
			</div> \
			<div class="clear"></div> \
		</li> \
      {{/items}} \
      <li data-role="fieldcontain"> \
           	<div class="left-block">external link</div> \
  			<div class="right-block"><a href="{{{uri}}}" target="_blank">{{{uri}}}</a></div> \
			<div class="clear"></div> \
	  </li> \
    </ul>';

    var data = {
    	"uri": instanceUri,
        "typeId": facet.typeId,
        "typeLabel": facet.typeLabel,
        "items": items
    };

    res.markup = Mustache.render(template, data);

	return res;
}

function getRootItem(dp,data) {
	var item = new Object();
	item.prop = dp;
	item.values = new Array();
	$.each(data.results.bindings, function(i, ditem) {
		if (ditem.prop.value === dp.uri) {
			// avoid repetitions
			if (!existsElement(ditem.obj.value, item.values))
				item.values.push(ditem.obj.value);
		}
	});
	return item;
}

function getItem(dp,data) {
	var item = new Object();
	item.prop = dp;
	item.values = new Array();
	$.each(data.results.bindings, function(i, ditem) {
		if (ditem[dp.propId] !== undefined) {
			// avoid repetitions
			if (!existsElement(ditem[dp.propId].value, item.values))
				item.values.push(ditem[dp.propId].value);		
		}
	});
	return item;
}

function getInstanceFacetMarkup(facet) {
	var markup = new Object();
	var items = new Array();
	//var itemNames = new Array();
	
	$.each(facet.data.results.bindings, function(i,ditem) {			
		var item = "";
		if (ditem['X'].type === 'uri') {
			// resource, provide uri
			// CAUTION: display property might not exist
			if (facet.displayprop === undefined)
				item = '<a class="instance" uri="'+ditem['X'].value
					+ '" typeId="'+facet.typeId+'" href="#">'
					+ ditem['X'].value + '</a>';		
			else
				item = '<a class="instance" uri="'+ditem['X'].value
					+ '" typeId="'+facet.typeId+'" href="#">'
					+ ditem[facet.displayprop.propId].value + '</a>';	
			
			// avoid repetitions
			var included = false;
			$.each(items, function(j, it) {
				//String s1 = it;
				//String s2 = 'uri="'+ditem['X'].value;
				if ( it.indexOf('uri="'+ditem['X'].value) != -1 ) {
					included = true;
					return;
				}
			});
			if (!included) 
				items.push(item);
		}
		else {		
			// bnode, include data
			// CAUTION: display property might not exist
			if (facet.displayprop !== undefined)
				item = '<div class="left-block">'+facet.displayprop.label+'</div> \
					<div class="right-block">'+ditem[facet.displayprop.propId].value+'</div>';
			$.each(facet.datapropA, function(j, dp) {
				// CAUTION, THERE MIGHT BE OPTIONAL VALUES
				if (ditem[dp.propId] !== undefined) {
					item += '<br><div class="left-block">'+dp.label+'</div> \
						<div class="right-block">'+ditem[dp.propId].value+'</div>';
				}
			});
			item += '<div class="clear"></div>';
			
			// avoid repetitions
			if (!existsElement(item, items)) {
				items.push(item);		
			//	itemNames.push(ditem[facet.displayprop.propId].value);
			}
		}
		
	});
	// put dots if more results available...
	if (facet.data.results.bindings.length == parameters.sparqlLIMITinstance) {
		items.push(". . .");
	}	
	
	if (items.length == 0)
		return "";
		
	// sorting
/*	var orderedItems = new Array();
	var orderedNames = itemNames.slice(0);
	orderedNames.sort();
	$.each(orderedNames, function(j, name) {
		var index = itemNames.indexOf(name);
		orderedItems.push(items[index]);
	});*/

	var template =
    '<ul data-role="listview" class="facet" data-inset="true" \
         data-divider-theme="d" data-mini="true"> \
      <li data-role="list-divider" typeId="{{typeId}}">{{typeLabel}}</li> \
      {{#items}} \
		<li data-role="fieldcontain"> \
           	{{{.}}} \
		</li> \
      {{/items}} \
    </ul>';

    var data = {
        "typeId": facet.typeId,
        "typeLabel": facet.typeLabel,
        "items": items
    };

    markup = Mustache.render(template, data);

	return markup;
}

function getInstanceFacets(uri,typeId) {
	var instanceObj = new Object();
	instanceObj.uri = uri;
	
	// info for constructing the facets
	var outgoing = getOutgoingLinks(typeId);
	var incoming = getIncomingLinks(typeId);

	// root facet
	// 29-jan: changed the way of obtaining the root facet data
	instanceObj.rootFacet = getInstanceFacetData(typeId);
	instanceObj.rootFacet.sparqlBase = parameters.sparqlBase;	
	instanceObj.rootFacet.sparql = 'SELECT DISTINCT ?prop ?obj WHERE { <'+uri+'> ?prop ?obj }';
	
	// swap sparqlBase if forwarding and swapping enabled
	if (parameters.forwarding && parameters.swapForwardedTriples) 
		instanceObj.rootFacet.sparqlBase = parameters.sparqlForwardBase;
	
	// other facets
	instanceObj.facetsA = new Array();
	$.each(outgoing, function(i,el) {
		if ( !containsValueArray(el.target, "typeId", instanceObj.facetsA) )
			instanceObj.facetsA.push( getInstanceFacetData(el.target) );
	}); 
	$.each(incoming, function(i,el) {
		if ( !containsValueArray(el.source, "typeId", instanceObj.facetsA) )
			instanceObj.facetsA.push( getInstanceFacetData(el.source) );
	}); 
	// generate SPARQL query for each facet
	$.each(instanceObj.facetsA, function(i,facet) {	
		// CAUTION: display property might not exist
		if (facet.displayprop === undefined)
			facet.sparql = "SELECT DISTINCT ?X";
		else
			facet.sparql = "SELECT DISTINCT ?X ?"+facet.displayprop.propId;
		// not include for performance
		/*
		$.each(facet.datapropA, function(i, dp) {
			facet.sparql += ' ?'+dp.propId;
		});
		*/
		facet.sparql += ' \nWHERE { \n';
		
		// array of triple patterns
		var triplePA = new Array();
    	// array of triple patterns for forwarding
		var tripleFPA = new Array();
		
		// links
		var auxA = new Array();
		$.each(outgoing, function(i,el) {
			if (el.target === facet.typeId) {
				var property = getObjectProperty(el.propId);
				auxA.push('<'+uri+'> <'+property.uri+'> ?X');
			}
		}); 
		$.each(incoming, function(i,el) {
			if (el.source === facet.typeId) {
				var property = getObjectProperty(el.propId);
				auxA.push('?X <'+property.uri+'> <'+uri+'>');
			}
		}); 
		// check number of possible links
		if (auxA.length == 1)
			// common case
			triplePA.push(auxA[0] + ' .');
		else if (auxA.length > 1) {
			// UNION case...
			var triple = '{ '+ auxA[0];
			for (var ind =1; auxA.length > ind; ind++)
				triple += ' } UNION  { '+auxA[ind];
			triple += ' } .';
			triplePA.push(triple);
		}
		
		// type triple		
		// 5-feb: instanceHack for Semicolon NACE codes
		if (parameters.instanceHack && facet.forward) {
			var hackType = getHackType(facet.typeUri);
			// prepare filter with all the instances of the class
			var hackFilter;
			if (hackType.instances.length > 0) {
				hackFilter = "FILTER (?X IN (<"+hackType.instances[0]+">";
				for (var i=1;i<hackType.instances.length;i++)
					hackFilter += ", <"+hackType.instances[i]+">";
				hackFilter +="))";
			}
			// insert the prepared triples
			if (parameters.forwarding) {
				tripleFPA.push('?X a <'+hackType.classUri+'> .');
				if (hackFilter != undefined)
					tripleFPA.push(hackFilter);
			} else {
				triplePA.push('?X a <'+hackType.classUri+'> .');
				if (hackFilter != undefined)
					triplePA.push(hackFilter);
			}		
		}
		else {
			if (parameters.forwarding && type.forward) {
				tripleFPA.push('?X a <'+facet.typeUri+'> .');
			} else {
				triplePA.push('?X a <'+facet.typeUri+'> .');
			}
		}
		
		// literal triples
		// CAUTION: display property might not exist
		if (facet.displayprop !== undefined)
			triplePA.push('?X <'+facet.displayprop.uri
				+'> ?'+facet.displayprop.propId+' .\n');
		// not include for performance
		/*		
		$.each(facet.datapropA, function(i, dp) {
			facet.sparql += 'OPTIONAL {?X <'+dp.uri+'> ?'+dp.propId+' }\n';
		});
		*/
		
		// sparql base url
		facet.sparqlBase = parameters.sparqlBase;
		
		// swap if forwarding and swapping enabled
		if (parameters.forwarding && parameters.swapForwardedTriples) {
			var tmp = triplePA;
			triplePA = tripleFPA;
			tripleFPA = tmp;
    	}
    	
	    // forwarded triple patterns
    	if (tripleFPA.length > 0) {
    		// only use service if there are some triple patterns
	    	if (triplePA.length > 0) 
				facet.sparql += 'SERVICE <' + parameters.sparqlForwardBase + '> { \n';
			// we need to swap the SPARQL endpoint in this case!!
			else			
				facet.sparqlBase = parameters.sparqlForwardBase;
			for (var i=0;i<tripleFPA.length;i++)
				facet.sparql += tripleFPA[i]+' \n';
        	// only use service if there are some triple patterns
	    	if (triplePA.length > 0)
				facet.sparql += '}';//for the SERVICE... 
    	}
    	
		// triple patterns
		for (var i=0;i<triplePA.length;i++)
			facet.sparql += triplePA[i]+' \n';
		
		facet.sparql += '}';
		// add LIMIT to the query
		facet.sparql += '\nLIMIT '+parameters.sparqlLIMITinstance;
	}); 
	
	return instanceObj;
}

function getInstanceFacetData(typeId) {
	var type = getType(typeId);
	var facetData = new Object();
	facetData.typeId = typeId;
	facetData.typeUri = type.uri;
	facetData.forward = type.forward;	
	facetData.typeLabel = multilingual( type.label );
	facetData.datapropA = new Array()
	var displayProp = type.display;
	
	// process each literal value
	$.each(getLiteralValues(typeId), function(i, dataprop) {
		var dp = getDatatypeProperty(dataprop.propId);
		dataprop.uri = dp.uri;
		dataprop.label = multilingual( dp.label );
		if (dataprop.propId === displayProp)
			facetData.displayprop = dataprop;
		else
			facetData.datapropA.push(dataprop);	
	});
	
	return facetData;
}

function previousInstance(uri) {
	var iid = null;
	$.each(Instance.instanceA, function(i,el) {
		if (uri === el.uri) {
			iid = el.id;
			return;
		}
	});
	return iid;
}

