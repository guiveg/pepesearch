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

/*
UTILITY FUNCTIONS
*/

function getType(id) {
    return _.find(jsonTypes,
                  function(x) { return x.id == id; });
}

function getHackType(id) {
    return _.find(jsonInstances,
                  function(x) { return x.id == id; });
}

function getTemplateProperty(id) {
	if (typeof jsonTemplateProperties === 'undefined')
		return;
	else
	    return _.find(jsonTemplateProperties,
                  function(x) { return x.id == id; });
}

function getObjectProperty(id) {
    return _.find(jsonObjectProperties,
                  function(x) { return x.id == id; });
}

function getDatatypeProperty(id) {
    return _.find(jsonDatatypeProperties,
                  function(x) { return x.id == id; });
}

function consolidateLinks(links, selector) {
	// the list to retrieve
	var conslinks = [];
	
	// get all the props set in the links
	var props = _.pluck(_.uniq(links, function(link) { return link.propId; }), 'propId');
	
	// analyze each property
	_.each(props, function(prop) {
		// obtain the different types for property prop
		var types = _.pluck(_.filter(links, function(x) { return x.propId === prop; }), selector);
		// obtain the consolidated types
		var constypes = [];
		while (types.length > 0) {
			// get all subclasses of the consolidated types
			var allconstypes = [];
			_.each(constypes, function(el) {
				var alltypesEl = getAllSubclasses(el);
				allconstypes = _.union(allconstypes, alltypesEl);
			});			
			// obtain candidate, removing first element of the array of types
			var candidate = types.shift();
			// check if already contained in allconstypes
			if (!_.contains(allconstypes, candidate)) {
				// it is necessary to include it, 
				// check if there is a common ancestor in the list of types
				_.each(types, function(typeval) {
					// try to find a common ancestor
					var ancestor = commonAncestor(candidate, [typeval]);
					if (ancestor != null)
						candidate = ancestor;			
				});
				// include the candidate
				constypes.push(candidate);
			}		
		}		
		
		// prepare objects with consolidated links
		_.each(constypes, function(ctype) {
			var clink = {};
			clink.propId = prop;
			clink[selector] = ctype;
			conslinks.push(clink);
		});
	});
	
	return conslinks;
}

function commonAncestor(typeA, typelistB) {
	// prepare a new list for B, just in case
	var newtypelistB = [];
	
	// get all subclasses of A
	var alltypesA = getAllSuperclasses(typeA);
	
	var anc = null;
	// evaluate all elements in B
	_.each(typelistB, function(typeB) {
		// evaluate
		if (_.contains(alltypesA, typeB) && anc == null)
			anc = typeB; 
		// prepare list just in case...
		var superclasses = getSuperclasses(typeB);
		if (!_.isEmpty(superclasses))
			newtypelistB = _.union(newtypelistB, superclasses);
	});
	// return the element found if exists
	if (anc != null)
		return anc;
	// return null if it is not possible to follow
	else if (_.isEmpty(newtypelistB))
		return null;
	// try with the new list
	else
		commonAncestor(typeA, newtypelistB);
}

function getLinks(id, dataset, selector) {
    var type = _.find(dataset, function(x) { return x.typeId == id; });

    var links = [];
    if (type) {
        links = type[selector];
    }

	// why add links from super- or sub-classes?
	// the analyzer should just extract the relevant links for the class at hand
	// changed on 26/11/2015        	
	/*
    var superclasses = getSuperclasses(id);

    var links = [];
    if (type) {
        links = type[selector];
    }

    if (superclasses != null) {
	_.each(superclasses,
		function(superclass) {
			var newlinks = getLinks(superclass, dataset, selector);
			links = _.union(links, newlinks);
        });
    }*/

    return links;    
}

function getOutgoingLinks(id) {
    return getLinks(id, jsonOutgoingLinks, 'outgoingLinks');
}

function getIncomingLinks(id) {
    return getLinks(id, jsonIncomingLinks, 'incomingLinks');
}

function getTemplateLinks(id) {
	if (typeof jsonTemplateLinks === 'undefined')
		return [];
	else
	    return getLinks(id, jsonTemplateLinks, 'templateLinks');
}

function getLiteralValues(id) {
    return getLinks(id, jsonLiteralValues, 'literalValues');
}

function getLiteralValue(typeId, propId) {
	var litvals = getLiteralValues(typeId);
	return _.find(litvals, function(x) { return x.propId == propId; });
}

function getAllSubclasses(id) {
	var all = [];
	// add itself
	all.push(id);
	// recursively get subclasses
	var subclasses = getSubclasses(id);	
	if (!_.isEmpty(subclasses)) {
        _.each(subclasses, function(subclass) {
            all = _.union(all, getAllSubclasses(subclass));
        });
    }    
	return all;
}

function getSubclasses(id) {
    var type = _.find(jsonSubclassRelations,
                      function(x) { return x.typeId == id; });
    return type && type.subclasses;
}

function getAllSuperclasses(id) {
	var all = [];
	// add itself
	all.push(id);
	// recursively call ancestors
	var superclasses = getSuperclasses(id);	
	if (!_.isEmpty(superclasses)) {
        _.each(superclasses, function(superclass) {
            all = _.union(all, getAllSuperclasses(superclass));
        });
    }     
	return all;
}

function getSuperclasses(id) {
    var type = _.find(jsonSuperclassRelations,
                      function(x) { return x.typeId == id; });
    return type && type.superclasses;
}

// util function to extract the more general subclasses
function consolidateSubclasses(subclasses) {
	// classes to remove
	var remove = [];
	
	// evaluate each subclass
	_.each(subclasses, function(sc1) {
		_.each(subclasses, function(sc2) {
			if (sc1 !== sc2) {
				if (isSuperClassOf(sc1, sc2)) {
					// sc1 is more general, remove sc2
					if (!_.contains(remove, sc2))
						remove.push(sc2);
				}
			}
		});
    });
	
	// new list with the consolidated subclasses
	var consclasses = [];
	_.each(subclasses, function(sc) {
		if (!_.contains(remove, sc))
			consclasses.push(sc);	
	});
	
	return consclasses;
}

// Return true if id1 is a superclass of id2
function isSuperClassOf(id1, id2) {
    var superclasses = getSuperclasses(id2);
    if (_.contains(superclasses, id1)) {
        return true;
    }
    return _.some(_.map(superclasses,
                        function(x) { return isSuperClassOf(id1, x); }));
}

function multilingual(element) {
	// prepare language options in order
	var evalA = new Array();
	// preferred option
	evalA.push(parameters.userlang);
	// treat norwegian variants
	if (parameters.userlang == "no") {
		evalA.push("nb");
		evalA.push("nn");	
	}
	else if (parameters.userlang == "nb") {
		evalA.push("no");
		evalA.push("nn");	
	}
	else if (parameters.userlang == "nn") {
		evalA.push("no");
		evalA.push("nb");	
	}
	
	// english language even better than default...
	evalA.push("en");
	
	// default
	evalA.push(parameters.deflang);
	
	// return label
	for (var i=0; i < evalA.length; i++) {
		if ( element[evalA[i]] != undefined )
			return element[evalA[i]];
	}
	
	// undefined...
	return undefined;
}

function containsValueArray(value, prop, array) {
    var exists = false;
    $.each(array, function(i,el) {
        if (el[prop] == value)
            exists = true;
    });
    return exists;
}

function getElement(value, prop, array) {
	var element = null;
    $.each(array, function(i,el) {
        if (el[prop] == value) {
        	element = el;
			return;
		}
    });
    return element;
}

function existsElement(test, array) {
	var exists = false;
	$.each(array, function(i,el) {
		if (test === el) {
			exists = true;
			return;
		}
	});
	return exists;
}

function reformatResultsForDydra(datos) {
	datos.results = new Object();
	datos.results.bindings = datos.rows;
	delete datos.rows;
	$.each(datos.results.bindings, function(i, resel) {					
		$.each(datos.columns, function(j, col) {
			resel[col] = resel[j];
			delete resel[j];
		});
	});
	return datos;
}