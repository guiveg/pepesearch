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
			transition : 'none'
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
				// 23-may-2016 prune repetitions from superclasses
				pruneRepetitions(instanceObj);				
				// render page
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

// 23-may-2016
function pruneRepetitions(instanceObj) {
	if (parameters.hidePropertiesMode) {
		_.each(instanceObj.facetsA, function(fdataA) {
			_.each(instanceObj.facetsA, function(fdataB) {
				// obtain types of the facets
				var typeA = fdataA.typeId;
				var typeB = fdataB.typeId;				
				// check if typeA is a superclass of typeB
				if (typeA !== typeB && isSuperClassOf(typeA, typeB)) {
					pruneFacetRepetitions(fdataA, fdataB);
				}
			});			
		});
	}
	else {
		// for each property...
		_.each(instanceObj.propTypes, function(propType) {
			// check if typeA is a superclass of typeB
			_.each(propType.types, function(typeA) {
				_.each(propType.types, function(typeB) {
					// originally only prune if typeA is the superclass
					//if (typeA !== typeB && isSuperClassOf(typeA, typeB)) {
					// instead prune if 1) typeA is the superclass or 2) typeA and typeB are not ancestors
					if (typeA !== typeB && !isSuperClassOf(typeB, typeA)) {					
						// obtain results for A and B
						var fdataA = _.find(instanceObj.facetsA, function(fdata) {
							return fdata.propId === propType.propId && fdata.typeId === typeA;
						});
						var fdataB = _.find(instanceObj.facetsA, function(fdata) {
							return fdata.propId === propType.propId && fdata.typeId === typeB;
						});
						//console.log(propType.propId + " --> " + fdataA.typeLabel + " is superclass of " + fdataB.typeLabel);
						pruneFacetRepetitions(fdataA, fdataB);					
					}
				});
			});			
		});
	}
}
function pruneFacetRepetitions(fdataA, fdataB) {
	// obtain the list of unique uris in A
	var nobnA = _.filter(fdataA.data.results.bindings, function(el) { 
		return el['X'].type === 'uri'; 					
	});					
	var urisA = _.uniq(_.map(nobnA, function(el){ return el['X'].value; }));				
	// obtain the list of unique uris in B
	var nobnB = _.filter(fdataB.data.results.bindings, function(el){ 
		return el['X'].type === 'uri'; 					
	});					
	var urisB = _.uniq(_.map(nobnB, function(el) { return el['X'].value; }));
	
	// find intersection and prune repetitions in A
	var urisAB = _.intersection(urisA, urisB);
	if (urisAB.length > 0) {
		//console.log(" There were #"+fdataA.data.results.bindings.length+" results");						
		var prunedbindings = _.reject(fdataA.data.results.bindings, function(el){ 
			var urival = el['X'].value;
			return _.contains(urisAB, urival); 
		});
		fdataA.data.results.bindings = prunedbindings;												
		//console.log(" There were #"+prunedbindings.length+" results after pruning");					
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
		transition : 'none'
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

	// 23-may-2016 set appropriate template according to hidePropertiesMode
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
	if (!parameters.hidePropertiesMode)
		template = 
		'<ul data-role="listview" class="facet" data-inset="true" \
			 data-divider-theme="d" data-mini="true"> \
		  <li data-role="list-divider" typeId="{{typeId}}" propId="{{propId}}">{{propLabel}} --> {{typeLabel}}</li> \
		  {{#items}} \
			<li data-role="fieldcontain"> \
				{{{.}}} \
			</li> \
		  {{/items}} \
		</ul>';

    var data = { // 28-apr-2016 introduced propId and propLabel *****
        "typeId": facet.typeId,
        "typeLabel": facet.typeLabel,
        "items": items
    };    
    if (!parameters.hidePropertiesMode) { // include propId and propLabel
    	data.propId = facet.propId;
    	data.propLabel = getObjectProperty(facet.propId) === undefined? 
        	 multilingual( getTemplateProperty(facet.propId).label ) : multilingual( getObjectProperty(facet.propId).label );
    }
    markup = Mustache.render(template, data);

	return markup;
}

function getInstanceFacets(uri,typeId) {
	var instanceObj = new Object();
	instanceObj.uri = uri;
	
	// root facet
	// 29-jan-2016: changed the way of obtaining the root facet data
	instanceObj.rootFacet = getInstanceFacetData(typeId);
	instanceObj.rootFacet.sparqlBase = parameters.sparqlBase;	
	instanceObj.rootFacet.sparql = 'SELECT DISTINCT ?prop ?obj WHERE { <'+uri+'> ?prop ?obj }';
	
	// other facets
	instanceObj.facetsA = new Array();
		
	// info for constructing the other facets
	var outlinks = getOutgoingLinks(typeId);
	var inlinks = getIncomingLinks(typeId);
	var templinks = getTemplateLinks(typeId);	

	// take into account the hidePropertiesMode
	if (parameters.hidePropertiesMode) {
		// obtain the classes from all existing links		
		$.each(templinks, function(i,el) {
			if ( !containsValueArray(el.target, "typeId", instanceObj.facetsA) )
				instanceObj.facetsA.push( getInstanceFacetData(el.target) );
		}); 
		$.each(outlinks, function(i,el) {
			if ( !containsValueArray(el.target, "typeId", instanceObj.facetsA) )
				instanceObj.facetsA.push( getInstanceFacetData(el.target) );
		}); 
		$.each(inlinks, function(i,el) {
			if ( !containsValueArray(el.source, "typeId", instanceObj.facetsA) )
				instanceObj.facetsA.push( getInstanceFacetData(el.source) );
		});		
	}
	else {
		// with the consolidated links prepare a list of property-types
		var allLinks = _.union(templinks, outlinks, inlinks);
		var props = _.pluck(_.uniq(allLinks, function(link) { return link.propId; }), 'propId');
		var propTypes = [];
		_.each(props, function(prop) {
			// create an element with the property and the list of types
			var el = {};
			el.propId = prop;
			el.types = _.uniq(_.union(
				_.pluck(_.filter(outlinks, function(x) { return x.propId === prop; }), "target"),
				_.pluck(_.filter(inlinks, function(x) { return x.propId === prop; }), "source"),
				_.pluck(_.filter(templinks, function(x) { return x.propId === prop; }), "target")));				
			// include element
			propTypes.push(el);
		});
	
		// create facet for each property-type 28-apr-2016 *****
		_.each(propTypes, function(propType) {
			// obtain the facet data of the corresponding type
			_.each(propType.types, function(tid) {
				var fdata = getInstanceFacetData(tid);
				fdata.propId = propType.propId;
				instanceObj.facetsA.push(fdata);
			});
		});
	
		// store propTypes for further processing when results arrive
		instanceObj.propTypes = propTypes;	
	}

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
		
		// type restriction 28-apr-2016 *****
		triplePA.push('?X a <'+facet.typeUri+'> .');
		
		// auxiliar array for the construction of the SPARQL query
		var auxA = new Array();		
		
		// take into account the hidePropertiesMode
		if (parameters.hidePropertiesMode) {
			$.each(outlinks, function(i,el) {
				if (el.target === facet.typeId) {
					var property = getObjectProperty(el.propId);
					auxA.push('<'+uri+'> <'+property.uri+'> ?X');
				}
			}); 
			$.each(inlinks, function(i,el) {
				if (el.source === facet.typeId) {
					var property = getObjectProperty(el.propId);
					auxA.push('?X <'+property.uri+'> <'+uri+'>');
				}
			});
			$.each(templinks, function(i,el) {
				if (el.target === facet.typeId) {
					var property = getTemplateProperty(el.propId);
					var template = property.template;
					// set source and target
					var auxtemp = {};
					auxtemp.source = '<'+uri+'>';
					auxtemp.target = '?X';
					// apply moustache templating for the source and target					
					var triple = Mustache.render(template, auxtemp);
					// include triple
					auxA.push(triple);		
				}
			});			
		}
		else {
			// obtain property from the facet data
			var prop = getObjectProperty(facet.propId);	
			// check if the property-type is outgoing, incoming or both	
			$.each(outlinks, function(i,el) {
				if (el.target === facet.typeId) {
					var auxprop = getObjectProperty(el.propId);
					if (prop.id === auxprop.id)
						auxA.push('<'+uri+'> <'+prop.uri+'> ?X');
				}
			}); 
			$.each(inlinks, function(i,el) {
				if (el.source === facet.typeId) {
					var auxprop = getObjectProperty(el.propId);
					if (prop.id === auxprop.id)
						auxA.push('?X <'+prop.uri+'> <'+uri+'>');
				}
			});
			if (prop === undefined)
				prop = getTemplateProperty(facet.propId);	
			$.each(templinks, function(i,el) {
				if (el.target === facet.typeId) {
					var auxprop = getTemplateProperty(el.propId);
					if (prop.id === auxprop.id) {
						var template = prop.template;
						// set source and target
						var auxtemp = {};
						auxtemp.source = '<'+uri+'>';
						auxtemp.target = '?X';
						// apply moustache templating for the source and target					
						var triple = Mustache.render(template, auxtemp);
						// include triple
						auxA.push(triple);
					}			
				}
			});		
		}		 
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