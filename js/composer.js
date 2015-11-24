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
 
function init() {
	//prepare page
	var initmes = {"en": "What are you looking for?", 
		"nb": "Hva leter du etter?"};	
	var content = '<div data-role="header" data-id="myheader" data-position="fixed"> \
			<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">'
				+ multilingual({"en": "Back", "nb": "Tilbake"})+'</a> \
			<h1>' + multilingual(initmes) + '</h1> \
		</div> \
		<div data-role="content"> \
			<ul data-role="listview" data-inset="true" data-theme="c" \
				data-divider-theme="c" data-filter="false" \
				data-filter-placeholder="Filter...">';

	for (var i=0; i<jsonTypes.length; i++) {
		var type = jsonTypes[i];
		//if (getSuperclasses(type.id) == null) { // Don't display subtypes
		if (type.primary) { // not include secondary concepts
			content += '<li class="option" typeId="' + type.id + '" type="new">';
			content += '<a href="#"><h2>' + multilingual(type.label) + '</h2></a>';
			content += '</li>';
        }
	}
	
	content += '</ul>';
	content += '</div>';

	$(content).appendTo("#init");
	// solved issue with the dynamic injection of content:
	// http://stackoverflow.com/questions/14550396/jquery-mobile-markup-enhancement-of-dynamically-added-content	
	$("#init").trigger('pagecreate');

	//register init page
	Composer.composerId = "init";
    Composer.composerA.push(Composer.composerId);
}

function loadContent(cid, typeId) {
    // existing page
    if (existsElement(cid,Composer.composerA)) {
    	Composer.composerId = cid;
    	$.mobile.changePage("#"+cid, {
			transition : 'slide'
		});
    }
	// construct new page
	else {
		// adjust ids
		Composer.composerId = cid;
		Composer.composerA.push(cid);
		Composer.composerCount++;
		
		// get the relevant info for preparing the page
		var rootType = getType(typeId);
		var outgoing = getOutgoingLinks(typeId);
		var incoming = getIncomingLinks(typeId);
		
		// obtain the facets: the root concept and any concept (even the root) connected 
		// through an outgoing or through an incoming link => maybe adjust order...
		var facets = new Array();		
		//facets.push(typeId);
		$.each(outgoing, function(i,el) {
			if (!existsElement(el.target, facets))
				facets.push(el.target);
		});
		$.each(incoming, function(i,el) {
			if (!existsElement(el.source, facets))
				facets.push(el.source);
		});
		facets.unshift(typeId);
		
		// obtain markup of the facets
		var facetMarkup ="";
		$.each(facets, function(i,fid) {			
			if (i==0) {
				var facetData = getFacetData(fid, true);
				facetMarkup += getFacetMarkup(fid, facetData, true);
			}
			else {
				var facetData = getFacetData(fid, false);
				facetMarkup += getFacetMarkup(fid, facetData, false);
			}
		});
		
		//prepare page
		var template =
		'<div data-url="n" data-role="page" id="{{id}}" typeId="{{typeId}}" class="page"> \
			<div data-role="header" data-id="myheader" data-position="fixed"> \
				<div class="ui-btn-left" data-role="controlgroup" data-type="horizontal" data-mini="true"> \
					<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">{{backmes}}</a> \
					<a href="#init" data-role="button" data-icon="home">{{homemes}}</a> \
				</div> \
				<h1>{{refinemes}} {{label}}</h1> \
				<a href="#" class="search ui-btn-right" data-inline="false" data-role="button" \
					data-theme="b" data-icon="search">{{searchmes}}</a> \
			</div> \
			<div data-role="content"> \
				{{{facets}}} \
			</div> \
		</div>';

		var data = {
			"id": cid,
			"typeId": typeId,
			"label": multilingual(rootType.label),
        	"facets": facetMarkup,
        	"refinemes": multilingual({"en": "Refine", "nb": "Avgrens"}),
        	"searchmes": multilingual({"en": "Get results!", "nb": "Hent resultater!"}),
        	"backmes": multilingual({"en": "Back", "nb": "Tilbake"}),
        	"homemes": multilingual({"en": "Home", "nb": "Hjem"})
	    };

    	var content = $(Mustache.render(template, data));
		//append it to the page container
		content.appendTo($.mobile.pageContainer);
		$.mobile.changePage("#" + cid, {
			transition: 'slide'
		});

		// change theme
		$("div .facet").bind("expand", function() {
			if ( !$(this).hasClass('ui-collapsible-collapsed') ) {
				$(this).attr("data-theme","a");
				$(this).find("a").first()
    	            .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
        	        .addClass('ui-btn-up-a').attr('data-theme', 'a');			
			}
		});	
		$("div .facet").bind("collapse", function() {			
			if ( $(this).hasClass('ui-collapsible-collapsed') ) {
				$(this).attr("data-theme","d");
				$(this).find("a").first()
            	    .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
                	.addClass('ui-btn-up-d').attr('data-theme', 'd');
            }
		});	

		// subclassing: show either the listview or the collapsible
		$("#"+cid+" .subclasslist").children("ul").children("li").addClass('hide');
		$("#"+cid+" .subclasslist").find("input").focusin(function() {
			$("#"+cid+" .subclasslist").children("ul").children("li").removeClass('hide');
			$("#"+cid+" .subclasscol").hide();
		});
		$("#"+cid).click(function(e) {
			if (! $("#"+cid+" .subclasslist").find("input").is(":focus") ) {
				$("#"+cid+" .subclasslist").children("ul").children("li").addClass('hide');
				$("#"+cid+" .subclasscol").show();
			}
		});
		
		// initialization: expand the second collapsible
		$("#"+cid+" .subclasscol").find("div[data-role='collapsible']:first")
			.find("div[data-role='collapsible']:first").trigger('expand');
		
		// subclassing: process keystrokes
		$("#"+cid+" .subclasslist").on('keypress keydown', function(event) {
			var $ul = $(this).closest('li').find('ul');
			// if return, select item in autovalue or search results
			var code = event.keyCode || event.which;
			if ( (code == 13) && (event.type=="keypress") ) { //Enter keycode
				var $selli = $ul.children('.ui-btn-hover-c');
				if ($selli.length == 1) {
					$selli.removeClass('ui-btn-hover-c');
					// select item
					$selli.find('.selectable').click();				
				}
				// stop propagation to prevent query execution
				event.stopPropagation();
				return;
 			}
	 		else if (code == 40) { // down arrow
	 			if (event.type == "keydown") {	 				
	 				var $prevli = $ul.children(':visible .ui-btn-hover-c').first();
	 				var $newli;
	 				if ($prevli.length == 0)
	 					$newli = $ul.children(':visible').first();
	 				else {
	 					$newli = $prevli;
	 					do {
	 						$newli = $newli.next();
	 					}
	 					while ( ($newli.length > 0) && ($newli.is(':hidden')) );
	 					if ($newli.length == 0)
	 						$newli = $ul.children(':visible').first();
	 				} 				
		 			$ul.children().removeClass('ui-btn-hover-c');
 					$newli.addClass('ui-btn-hover-c');
 				}
 				return;
	 		}
 			else if (code == 38)  { // up arrow
 				if (event.type == "keydown") {
 					var $prevli = $ul.children(':visible .ui-btn-hover-c').first();
	 				var $newli;
	 				if ($prevli.length == 0)
	 					$newli = $ul.children(':visible').last();
	 				else {
	 					$newli = $prevli;
	 					do {
	 						$newli = $newli.prev();
	 					}
	 					while ( ($newli.length > 0) && ($newli.is(':hidden')) );
	 					if ($newli.length == 0)
	 						$newli = $ul.children(':visible').last();
	 				} 				
		 			$ul.children().removeClass('ui-btn-hover-c');
 					$newli.addClass('ui-btn-hover-c');
	 			}
	 			return;
 			}
		});		
		
		// subclassing: process class selection
		$("#"+cid+" .selectable").on('click', function(event) {
			// hide listview and show collapsible
			$(this).closest('.subclasses').find("li").addClass('hide');
			$(this).closest('.subclasses').children(".subclasscol").show();
			// collapse collapsible
			$(this).closest('.subclasses').children(".subclasscol").find("div[data-role='collapsible']:first").trigger('collapse');
			// change heading if required
			var classLabel = multilingual( getType($(this).attr("typeId")).label );	
			var formerTypeId = $(this).closest('ul.facet').find('.signature').attr("typeId");
			var formerPageTypeId = $("#"+cid).attr("typeId");
			if (formerTypeId === formerPageTypeId) {
				$("#"+cid).attr("typeId", $(this).attr("typeId") );
				$("#"+cid).find("h1.ui-title").html("Refine "+classLabel);
			}
			// change facet
			$(this).closest('.facet').find('.signature').attr("typeId", $(this).attr("typeId"));
			if ($(this).closest('.facet').find('.signature').is('li') ) {
				// change facet label
				$(this).closest('.facet').find('.signature').text(classLabel);   
				// change collapsible label
				$(this).closest('.facet').find('.displayedclass').text(classLabel);   
			}
			else {
				// change facet label
				$(this).closest('.facet').find('.signature').find('.ui-btn-text').text(classLabel);
				// change collapsible label
				$(this).closest('.facet').find('.displayedclass').text(classLabel);   
			}
			// set non-default value...
        	$(this).closest('.subclasses').attr("default","false");		
			// stop event propagation
			event.preventDefault();
			event.stopPropagation();
		});		
		
	} //end else
}


function modifyFacet($ul, data) {
	// do operation
	switch(data.operation) {
		case 'literalSet':
			// get former li element and hide
			var $formerli = $ul.find('#'+data.propId).closest("li");			
			var propValue = $formerli.find('label').first().html();
			$formerli.hide();			
			// add literal value
			var lset = '<li data-role="fieldcontain"> \
				<label class="left-block" type="literalSet" for="unset_'+data.propId+'">'
					+propValue+'</label> \
				<input type="button" id="unset_'+data.propId+'" data-icon="delete" \
					data-inline="true" data-mini="true" data-iconpos="notext" \
					value="Unset literal value"><b';
			if (data.lang != undefined)
				lset += ' lang="'+data.lang+'"';
			lset +=	'>'+ data.value +'</b> \
				</input> \
			</li>';	
			// put after or before, just for better look&feel
			if ($formerli.is($ul.find('li').last()))
				$formerli.after(lset);
			else
				$formerli.before(lset);
			$ul.find('#unset_'+data.propId).button().button("refresh");
			$ul.listview('refresh');
			$ul.trigger("updatelayout");
			
			// handler for unsetting the literal value
			$ul.find('#unset_'+data.propId).on("click", function(i) {
				unsetLiteralResource($ul, data.propId);
			});	
			break;			
		case 'literalUnset':			
			unsetLiteralResource($ul, data.propId);
			break;			
	}	
}

function unsetLiteralResource($ul, propid) {
	// get former li element and show
	$ul.find('#'+propid).closest("li").show();
	// remove literal resource li element
	$ul.find('#unset_'+propid).closest("li").remove();			
	$ul.listview('refresh');
	$ul.trigger( "updatelayout");
}

function getFacetMarkup(typeId, facetData, rootMode) {
    var literals = facetData.literalValues;
    var subclasses = facetData.subclasses;

	// always show, even if no literals or subclasses
	/*
    if (_.isEmpty(literals) && subclasses.noSubclasses) {
        return '';
    }*/

    var templateRoot =
    '<ul class="facet" data-role="listview" data-inset="true" \
         data-divider-theme="b" data-mini="true"> \
      <li data-role="list-divider" class="signature" typeId="{{typeId}}">{{typeLabel}}</li> \
      {{#form_fields}} \
         {{{.}}} \
      {{/form_fields}} \
      {{#see_more}} \
         <li data-icon="plus"><a href="#" class="more">{{seemes}}</a></li> \
      {{/see_more}} \
    </ul>';
    
    var templateCollapsible = 
    '<div class="facet" data-role="collapsible" data-theme="d" data-content-theme="c"> \
		<h4 class="signature" typeId="{{typeId}}">{{typeLabel}}</h4> \
    	<ul data-role="listview" data-inset="true" data-mini="true"> \
			{{#form_fields}} \
        		{{{.}}} \
			{{/form_fields}} \
	        {{#see_more}} \
        		<li data-icon="plus"><a href="#" class="more">{{seemes}}</a></li> \
			{{/see_more}} \
        </ul> \
	</div>';
 
    // select correct template
    var template;
    if (rootMode)
    	template = templateRoot;
    else
		template = templateCollapsible;
		
    if (subclasses.noSubclasses) {
        subclasses = [];
    } 
    else {
        subclasses.typeId = typeId;
        // include subclasses at the beginning of the literals array
        literals.splice(0, 0, subclasses);        
    }

    var data = {
        "typeId": typeId,
        "typeLabel": facetData.typeLabel,
        "form_fields": literals.map(formField),
        "see_more": (facetData.otherLiteralValues.length > 0),
        "seemes": multilingual({"en": "See more", "nb": "Se mer"})
    };

	return Mustache.render(template, data);
}

function getFacetData(typeId, rootfacet) {
    var facetData = new Object();
    facetData.typeLabel = multilingual( getType(typeId).label );
    
    // just include searchable datatype properties
    var literalValues = getLiteralValues(typeId);
    facetData.literalValues = new Array();
    facetData.otherLiteralValues = new Array();    
    for (var i = 0; i < literalValues.length; i++) {
    	var litval = literalValues[i];
    	//put an index on checkbox values
    	if (litval.uiType == "checkbox") {
    		// create clone of litval
    		var newlitval = $.extend(true, {}, litval);    		
    		var valuesA = new Array();
    		for (var idx in litval.values)
    			valuesA.push( {"index": idx, "value": litval.values[idx]} );
    		newlitval.values = valuesA;
    		// change pointer
    		litval = newlitval;
    	}
    	if (litval.searchable)
    		facetData.literalValues.push(litval);
    	else
    		facetData.otherLiteralValues.push(litval);    
    }
    // obtain property labels
    for (var i = 0; i < facetData.literalValues.length; i++) {
        facetData.literalValues[i].propLabel
            = multilingual( getDatatypeProperty(facetData.literalValues[i].propId).label );
    }
    for (var i = 0; i < facetData.otherLiteralValues.length; i++) {
        facetData.otherLiteralValues[i].propLabel
            = multilingual( getDatatypeProperty(facetData.otherLiteralValues[i].propId).label );
    }

    facetData.subclasses = {
        subclassHTML: getSubclassHTML(typeId, rootfacet),
        noSubclasses: _.isEmpty(getSubclasses(typeId)),
        uiType: "subclasses"
    };

    return facetData;
}

function getSubclassHTML(typeId, rootfacet) {
    // prepare listview markup for subclasses
    var content = '<div class="subclasslist">';
    content += '<ul data-role="listview" data-filter="true" data-inset="true" data-theme="c" data-content-theme="c" \
    	data-filter-placeholder="Filter '+ multilingual( getType(typeId).label ) +'..." >';
    content += getSubclassesListview(typeId);
    content += '</ul>';
    content += '</div>';
    // prepare collapsible markup for subclasses
    content += '<div class="subclasscol">';
    // super-container, with a different theme
    if (rootfacet)
    	content += '<div data-role="collapsible" data-theme="b" data-content-theme="c">';
    else
    	content += '<div data-role="collapsible" data-theme="a" data-content-theme="c">';
    content += '<h3><div class="displayedclass">'+multilingual( getType(typeId).label )+'</div></h3>';
    // get the subclasses...    
    content += getSubclassesCollapsible(typeId);
    // final div of the super-container
    content += '</div>';
    
    content += '</div>';

    // return getSubclassesCollapsible(typeId);
    return content;
}

function getSubclassesListview(typeId) {
    var label = multilingual( getType(typeId).label );
    var subclasses = getSubclasses(typeId);
    var content = '<li><a href="#" class="selectable" typeId="'+typeId+'">';
    content += label +'</a></li>';
	_.each(subclasses, function(subclass) {
		content += getSubclassesListview(subclass);
    });    
    return content;
}

function getSubclassesCollapsible(typeId) {
    var content = '';
    var label = multilingual( getType(typeId).label );
    var subclasses = getSubclasses(typeId);
    if (_.isEmpty(subclasses)) {
        content += '<a href="#" data-role="button" class="selectable" typeId="'+typeId+'">' + label +'</a>';
    } else {
        content += '<div data-role="collapsible" data-content-theme="c">';
        content += '<h3><a href="#" data-role="button" class="selectable" typeId="'+typeId+'">' + label + '</a></h3>';
        _.each(subclasses, function(subclass) {
            content += getSubclassesCollapsible(subclass);
        });
        content += '</div>';
    }
    return content;
}

function formField(params) {
    var templates = {
        "string":
        '<li data-role="fieldcontain"> \
           <div> \
             <label class="left-block" type="string" for="{{propId}}">{{propLabel}}</label> \
             <input data-clear-btn="true" class="refinable auto" type="text" id="{{propId}}" value="" /> \
           </div> \
           <div> \
             <ul data-role="listview" data-inset="true"></ul> \
           </div> \
         </li>',

        "checkbox":
        '<li data-role="fieldcontain"> \
			<div data-role="fieldcontain" > \
				<fieldset data-role="controlgroup"> \
					<legend><label type="checkbox" for="{{propId}}">{{propLabel}}</label></legend> \
					{{#values}} \
			        	<input id="{{propId}}-{{index}}" type="checkbox" value="{{value}}"> \
    			    	<label for="{{propId}}-{{index}}">{{value}}</label> \
    			    {{/values}} \
			    </fieldset> \
   			</div> \
		</li>',

		"datetimerange":
        '<li data-role="fieldcontain"> \
             <label class="left-block" type="datetimerange" for="{{propId}}"> \
                {{propLabel}} \
             </label> \
             <div class="ui-grid-a"> \
				<div class="ui-block-a"> \
					<label class="left-label">'+multilingual({"en": "from", "nb": "fra"})+'</label> \
					<input class="refinable" type="datetime-local" data-clear-btn="false" id="{{propId}}" \
                    min="{{min}}-01-01T00:00:00" max="{{max}}-12-31T23:59:59" \
                    value="{{min}}-01-01T00:00:00" > \
				</div> \
				<div class="ui-block-b"> \
					<label class="left-label">'+multilingual({"en": "to", "nb": "til"})+'</label> \
					<input class="refinable" type="datetime-local" data-clear-btn="false" id="{{propId}}_max" \
                    min="{{min}}-01-01T00:00:00" max="{{max}}-12-31T23:59:59" \
                    value="{{max}}-12-31T23:59:59" > \
				</div> \
			</div> \
         </li>',

        "range":
        '<li data-role="fieldcontain"> \
           <div data-role="rangeslider"> \
             <label class="left-block" type="range" for="{{propId}}"> \
                {{propLabel}} \
             </label> \
             <input class="refinable" type="range" id="{{propId}}" \
                    min="{{min}}" max="{{max}}" value="{{min}}"> \
             <input class="refinable" type="range" id="{{propId}}_max" \
                    min="{{min}}" max="{{max}}" value="{{max}}"> \
           </div> \
         </li>',

        "subclasses":
        '<li data-role="fieldcontain" class="subclasses" default="true"> \
           {{{subclassHTML}}} \
         </li>'
    };

    return Mustache.render(templates[params.uiType], params);
}


/*********************************
*** SPARQL GENERATION STRATEGY ***
**********************************
 1) obtain the restrictions for every concept (facets)
 2) include in the query the root concept and non-root concepts with some restrictions
 3) only retrieve the display value and the properties with a restriction
 4) put links in the resources to allow retrieving a complete representation
*/
function executeQuery() {
	// query object
	var query = new Object();
	// with an array of facets for processing results
	query.facetsA = new Array();
	// array of sparql variables
	var variableA = new Array();
	// array of triple patterns
	var triplePA = new Array();
    // array of triple patterns for forwarding
	var tripleFPA = new Array();
	
	// get the relevant info for constructing the query
	var rootType = getType($("#"+Composer.composerId).attr("typeId"));
	var outgoing = getOutgoingLinks(rootType.id);
	var incoming = getIncomingLinks(rootType.id);
	
	// get the facets
	var rootFacet = processFacet($("#"+Composer.composerId+" ul.facet").first(),"X");
	rootFacet.optional = false;
	query.facetsA.push(rootFacet);
	$("#"+Composer.composerId+" div.facet").each(function(ind) {
		if ( !$(this).hasClass('ui-collapsible-collapsed') ) {			
			var facet = processFacet($(this),"X"+ind);
			
			/*
			facet.optional = false;
			if ( !facet.subclasses && (facet.literalA.length == 0) )
				facet.optional = true;*/
			query.facetsA.push(facet);
		}
	});

	// process each facet
	$.each(query.facetsA, function(j,facet) {
		// get type
		var type = getType(facet.typeId);
		// variable
		var varname = '?'+facet.id;		
		
		// include sparql variable and displayable label
		variableA.push(varname);
		
		// if optional... (opening)
		if ( parameters.optional && facet.optional )
			triplePA.push('OPTIONAL { ');
					
		// type restriction
		// 5-feb: instanceHack for Semicolon NACE codes
		if (parameters.instanceHack && type.forward) {
			var hackType = getHackType(facet.typeId);
			// prepare filter with all the instances of the class
			var hackFilter;
			if (hackType.instances.length > 0) {
				hackFilter = "FILTER ("+varname+" IN (<"+hackType.instances[0]+">";
				for (var i=1;i<hackType.instances.length;i++)
					hackFilter += ", <"+hackType.instances[i]+">";
				hackFilter +="))";
			}
			// insert the prepared triples
			if (parameters.forwarding) {
				tripleFPA.push(varname+' a <'+hackType.classUri+'> .');
				if (hackFilter != undefined)
					tripleFPA.push(hackFilter);
			} 
			else {
				triplePA.push(varname+' a <'+hackType.classUri+'> .');
				if (hackFilter != undefined)
					triplePA.push(hackFilter);
			}		
		}
		else {
			if (parameters.forwarding && type.forward) {
				tripleFPA.push(varname+' a <'+type.uri+'> .');
			} else {
				triplePA.push(varname+' a <'+type.uri+'> .');
			}
		}
		
		// links
		//if (type.id !== rootType.id) {
		if (facet.id !== rootFacet.id) {
			var auxA = new Array();
			$.each(outgoing, function(i,el) {
				if (el.target === type.id || isSuperClassOf(el.target, type.id)) {
					var property = getObjectProperty(el.propId);
					var triple = '?'+rootFacet.id+' <'+property.uri+'> '+varname;
					// avoid repetitions
					if (!existsElement(triple, auxA))
						auxA.push(triple);
				}
			}); 
			$.each(incoming, function(i,el) {
				if (el.source === type.id) {				
					//auxA.push(varname+' <'+property.uri+'> ?'+rootFacet.id);
					var property = getObjectProperty(el.propId);
					var triple = varname+' <'+property.uri+'> ?'+rootFacet.id;
					// avoid repetitions
					if (!existsElement(triple, auxA))
						auxA.push(triple);					
				}
			}); 
			// check number of possible links
			if (auxA.length == 1) {
				// common case
				triplePA.push(auxA[0]+' .');
			}
			else if (auxA.length > 1) {
				// UNION case...
				var triple = '{ '+ auxA[0];
				for (var ind =1; auxA.length > ind; ind++)
					triple += ' } UNION  { '+auxA[ind];
				triple += ' } .';
				triplePA.push(triple);
			}
		}	
		
		// only do this if there is a displayable property (not false)
		if (type.display) {		
			// treat displayable variable case if not included in the restrictions...
			var displayProp = getDatatypeProperty(type.display); 
			if (!containsValueArray(displayProp.id, "propId", facet.literalA)) {
				// include variable and triple
				variableA.push('?'+facet.display.id);
				triplePA.push(varname+' <'+displayProp.uri+'> ?'+facet.display.id+' .');
			}
		}
					
		// literal restrictions and variable names
		$.each(facet.literalA, function(i, litrest) {
			var dataProp = getDatatypeProperty(litrest.propId);
			var litVal = getLiteralValue(facet.typeId, litrest.propId);
			litrest.label = multilingual( dataProp.label );
			var litvar = '?'+litrest.id;
			// triples
			switch(litrest.uiType) {
				case 'literalSet':
					var triple = varname+' <'+dataProp.uri+'> "'+litrest.value+'" .';
					if (litrest.lang != undefined)
						triple = varname+' <'+dataProp.uri+'> "'+litrest.value
							+'"@'+litrest.lang+' .';						
					triplePA.push(triple);
					litvar = '(str("'+litrest.value+'") AS ?'+litrest.id+')';					
					break;
				case 'range':
					triplePA.push(varname+' <'+dataProp.uri+'> '+litvar+' .');
					if ( litVal.transform == undefined ) {
						triplePA.push('FILTER ('+litvar+' >= '+litrest.min+')');
            			triplePA.push('FILTER ('+litvar+' <= '+litrest.max+')');
            		}
            		else {
            			triplePA.push('FILTER ('+litVal.transform+'('+litvar+') >= '+litrest.min+')');
            			triplePA.push('FILTER ('+litVal.transform+'('+litvar+') <= '+litrest.max+')');
	                }
					break;
				case 'datetimerange':
					triplePA.push(varname+' <'+dataProp.uri+'> '+litvar+' .');
					triplePA.push('FILTER ('+litvar+' >= "'+litrest.min+'"^^<http://www.w3.org/2001/XMLSchema#dateTime>)');
            		triplePA.push('FILTER ('+litvar+' <= "'+litrest.max+'"^^<http://www.w3.org/2001/XMLSchema#dateTime>)');
					break;	
				case 'string':
					switch(litVal.dataType) {
						case 'langString':
						case 'string':
							triplePA.push(varname+' <'+dataProp.uri+'> '+litvar+' .');
							triplePA.push('FILTER regex('+litvar+', "'+litrest.value+'","i")');
							break;
						case 'integer':
							triplePA.push(varname+' <'+dataProp.uri+'> '+litrest.value+' .');
							litvar = '('+litrest.value+' AS ?'+litrest.id+')';
							break;
						default:
							triplePA.push(varname+' <'+dataProp.uri+'> '+litvar+' .');
							triplePA.push('FILTER ('+litVal.transform+'('+litvar+') = '+litrest.value+')');
							break;
					}
					break;
				case 'checkbox':
					var auxA = new Array();
					triplePA.push(varname+' <'+dataProp.uri+'> '+litvar+' .');
					$.each(litrest.values, function(i, cv) {										
						switch(litVal.dataType) {
							case 'langString':
							case 'string':
								auxA.push(varname+' <'+dataProp.uri+'> "'+cv+'"');
								break;
							case 'integer':
								auxA.push(varname+' <'+dataProp.uri+'> '+cv);
								break;
							default:
								auxA.push(litVal.transform+'('+litvar+') = '+cv);
								break;
						}
					});
					switch(litVal.dataType) {
						case 'langString':
						case 'string':
						case 'integer':
							if (auxA.length == 1) 					
								triplePA.push(auxA[0]+' .');
							else if (auxA.length > 1) {
								// UNION case...
								var triple = '{ '+ auxA[0];
								for (var ind =1; auxA.length > ind; ind++)
									triple += ' } UNION  { '+auxA[ind];
								triple += ' } .';
								triplePA.push(triple);
							}						
							break;
						default:
							if (auxA.length == 1) 					
								triplePA.push('FILTER ('+auxA[0]+')');
							else if (auxA.length > 1) {
								// UNION case...
								var triple = 'FILTER ( '+ auxA[0];
								for (var ind =1; auxA.length > ind; ind++)
									triple += ' || '+auxA[ind];
								triple += ' )';
								triplePA.push(triple);
							}											
							break;
					}				
					break;	
				case 'optional':
					triplePA.push('OPTIONAL {'+varname+' <'+dataProp.uri+'> '+litvar+' }');				
					break;															
			}	
			// include name 
			variableA.push(litvar);
		});

		
		// if optional... (closing)
		if ( parameters.optional && facet.optional )
			triplePA.push('} ');
		
		// only do this if there is a displayable property (not false)
		if (type.display) {		
			// remove displayable restriction, if necessary
			if (containsValueArray(displayProp.id, "propId", facet.literalA)) {
				// get element
				var displit = getElement(displayProp.id, "propId", facet.literalA);
				var index = facet.literalA.indexOf(displit);
				// remove
				facet.literalA.splice(index, 1);
			}		
		}
		
	});
	
	// sparql base url
	query.sparqlBase = parameters.sparqlBase;
	
	// sparql query
	query.sparql = 'SELECT DISTINCT';
	for (var i=0;i<variableA.length;i++)
		query.sparql += ' '+variableA[i];
	query.sparql += ' \nWHERE { \n';

	// swap if forwarding and swapping enabled
	if (parameters.forwarding && parameters.swapForwardedTriples) {
		var tmp = triplePA;
		triplePA = tripleFPA;
		tripleFPA = tmp;
    }

    // triple patterns
	for (var i=0;i<triplePA.length;i++)
		query.sparql += triplePA[i]+' \n';
		
    // forwarded triple patterns
    if (tripleFPA.length > 0) {
    	// only use service if there are some triple patterns
    	if (triplePA.length > 0) 
			query.sparql += 'SERVICE <' + parameters.sparqlForwardBase + '> { \n';
		// we need to swap the SPARQL endpoint in this case!!
		else			
			query.sparqlBase = parameters.sparqlForwardBase;
		for (var i=0;i<tripleFPA.length;i++) {
			query.sparql += tripleFPA[i]+' \n';
        }
        // only use service if there are some triple patterns
    	if (triplePA.length > 0)
			query.sparql += '}'; //for the SERVICE... 
    }

	query.sparql += '}';
	// add LIMIT to the query
	query.sparql += '\nLIMIT '+parameters.sparqlLIMIT;
	// request results
	showResults(query);	
}

function processFacet($facet,id) {
	// get type info
	var type = getType($facet.find('.signature').attr('typeId'));
	// prepare facet
	var facet = new Object();
	facet.id = id
	facet.typeId = type.id;
	facet.typeLabel = multilingual( type.label );
	facet.optional = true;
	// basic display info, just in case...
	facet.display = new Object();
	facet.display.id = id+'_display';
	facet.display.propId = type.display;  
	// subclass info
    if ($facet.find("li.subclasses").attr("default") === "false") {
	    facet.subclasses = true;
	    facet.optional = false;
	}
	else
		facet.subclasses = false;   
    facet.literalA = new Array();
	// analyze each property
	$facet.find("label[type]").filter(":visible").each(function() {
		var store = false;
		var litrest = new Object();	
		var $li = $(this).closest('li');
        // obtain id and type of the property
        litrest.id = id+'_'+$(this).attr('for');
        litrest.propId = $(this).attr('for');
        litrest.uiType = $(this).attr('type');		
		// process depending on the type
		switch(litrest.uiType) {
			case 'string':
				if ($li.find("input").val() != '')   {
                	litrest.value = $li.find("input").val();
                	store = true;
            	}
				break;
			case 'checkbox':						
				var checkvalues = new Array();
				$li.find('input:checked').map(function() {
					checkvalues.push($(this).attr("value"));
				});
				if ( checkvalues.length > 0) {
					litrest.values = checkvalues;
					store = true;
				}
				break;
			case 'range':
				if ( ($li.find("#"+litrest.propId).val() != $li.find("#"+litrest.propId).attr("min"))
                 || ($li.find("#"+litrest.propId+"_max").val() != $li.find("#"+litrest.propId+"_max").attr("max") )) {
                	litrest.min = $li.find("#"+litrest.propId).val();
                	litrest.max = $li.find("#"+litrest.propId+"_max").val();
					store = true;
				}			
				break;
			case 'datetimerange':
				// read values
				var valmin = $li.find("#"+litrest.propId).val();
				var valmax = $li.find("#"+litrest.propId+"_max").val();
				// absolute min and max values
				var absmin = $li.find("#"+litrest.propId).attr("min");
				var absmax = $li.find("#"+litrest.propId+"_max").attr("max");
				// check if different
				if (valmin != absmin || valmax != absmax) {
					var valmindate = new Date(valmin);
					var valmaxdate = new Date(valmax);
					// check if valmin and valmax are valid dates					
					if (!isNaN(valmindate) && !isNaN(valmaxdate)) {
						// only set constraints if the ranges are within the limits
						if (valmindate.getTime() >= Date.parse(absmin) &&
							valmindate.getTime() < Date.parse(absmax) &&
							valmaxdate.getTime() <= Date.parse(absmax) &&
							valmaxdate.getTime() > Date.parse(absmin)) {
							// obtain min and max values
							litrest.min = valmindate.toJSON().split(".")[0] + "+01:00";
							litrest.max = valmaxdate.toJSON().split(".")[0] + "+01:00";
							store = true;						
						}
					}
				}			
				break;				
			case 'literalSet':
				litrest.propId = litrest.propId.split("unset_")[1];
				litrest.id = id+'_'+ litrest.propId;
				litrest.value = $li.find("b").text();
				// include lang if applicable
				if ( $li.find("b").attr("lang") != undefined)
					litrest.lang = $li.find("b").attr("lang");
				store = true;
				break;									
		}
		// process changes
		if (litrest.propId === type.display) {
			litrest.id =  id+'_display';
			facet.display = litrest;
		}
		if (store) {
			facet.literalA.push(litrest);
			facet.optional = false;
		}
	});
	
	// include additional variables, depending on the parameters.literalQueryInclusion
	$.each(getLiteralValues(type.id), function(i, litv) {  		
		if ( (litv.propId != facet.display.propId) &&
			!containsValueArray( litv.propId, "propId", facet.literalA ) ) {
			var oprest = new Object();	
			oprest.id = id+'_'+litv.propId;
        	oprest.propId = litv.propId;
        	oprest.uiType = 'optional';
    		if ( ((parameters.literalQueryInclusion == "searchable") && litv.searchable)
                   || (parameters.literalQueryInclusion == "all") )     	
        		facet.literalA.push(oprest);        	
		}		
	});
	
	return facet;
}