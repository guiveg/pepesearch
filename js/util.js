/*
   Copyright 2013-2014, Guillermo Vega-Gorgojo & Simen Heggestøyl

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

/*
var jsonSuperclassRelations = [];
generateSuperclasses() ;

function generateSuperclasses() {
	// generate the superclasses from the subclass relations
	jsonSubclassRelations.map(function(c) { addSuperclassRelations(c.typeId, c.subclasses); });
}

function addSuperclassRelations(superclass, subclasses) {
	_.each(subclasses,
		function(subclass) {		
			var subtype = _.find(jsonSuperclassRelations,
                         function(x) { return x.typeId == subclass; });
		    if (subtype == null) {
        		subtype = {"typeId": subclass, "superclasses": []};
		        jsonSuperclassRelations.push(subtype);
		    }
		    subtype.superclasses.push(superclass);		
		});
}*/

function getType(id) {
    return _.find(jsonTypes,
                  function(x) { return x.id == id; });
}

function getHackType(id) {
    return _.find(jsonInstances,
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

function getLinks(id, dataset, selector) {
    var type = _.find(dataset, function(x) { return x.typeId == id; });

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
    }

    return links;    
}

function getOutgoingLinks(id) {
    return getLinks(id, jsonOutgoingLinks, 'outgoingLinks');
}

function getIncomingLinks(id) {
    return getLinks(id, jsonIncomingLinks, 'incomingLinks');
}

function getLiteralValues(id) {
    return getLinks(id, jsonLiteralValues, 'literalValues');
}

function getLiteralValue(typeId, propId) {
	var litvals = getLiteralValues(typeId);
	return _.find(litvals, function(x) { return x.propId == propId; });
}

function getSubclasses(id) {
    var type = _.find(jsonSubclassRelations,
                      function(x) { return x.typeId == id; });
    return type && type.subclasses;
}

function getSuperclasses(id) {
    var type = _.find(jsonSuperclassRelations,
                      function(x) { return x.typeId == id; });
    return type && type.superclasses;
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
