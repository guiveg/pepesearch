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

$(document).ready( function() {

	// initialize state
	Session = new session();
	Composer = new composer();
	Results = new results();
	Instance = new instance();

	Session.initLog();

	//attach option click event
	$('body').on('click', '.option', function(event) {
		loadContent( "C"+Composer.composerCount, $(this).attr('typeId'));
	});

	// handler for the get results button
	$('body').on('click', '.search', function(event) {
		executeQuery();
	});

	// handler for the return key => search
	$('body').keypress(function(event) {
		var code = event.keyCode || event.which;
		// execute query if return key and composer page
		if ((code == 13) && ($.mobile.activePage.attr('id').substring(0,1) == 'C') ) {			
			executeQuery();
			// false to not propagate the event
			return false;
		}
	});

	// handler for instances
	$('body').on("click", '.instance', function(event) {
		showInstance($(this).attr("uri"), $(this).attr("typeId"));
	});

	// handler for more attributes
	$('body').on("click", '.more', function(event) {
		var typeId = $(this).closest(".facet").find(".signature").attr("typeId");
		var $ul = $(this).closest("ul");
		// remove see more button
		$(this).closest("li").hide();
		// add content
		var facetData = getFacetData(typeId);
		var facetmarkup = facetData.otherLiteralValues.map(formField);	
		$ul.append(facetmarkup);
		// add see less button
		var lessmarkup = '<li data-icon="minus"><a href="#" class="less">'
			+ multilingual({"en": "See less", "nb": "Se mindre"}) +'</a></li>';
		$ul.append(lessmarkup);
		// update view
		$ul.trigger('create');
		$ul.listview("refresh");
		$ul.trigger( "updatelayout");
	});

	// handler for less attributes
	$('body').on("click", '.less', function(event) {
		var $ul = $(this).closest("ul");
		var $liplus = $ul.find(".more").closest("li");
		$liplus.show();
		$liplus.nextAll().remove();
		$ul.listview("refresh");
		$ul.trigger( "updatelayout");
	});
	
	// hook auto-complete for all text-fields
	// removed change event 
	$('body').on('add keypress keydown paste textInput input', 'input.auto', function(event) {

		var $input = $(this),
			$ul = $(this).closest('li').find('ul'),
			value = $(this).val(),
			typeId = $(this).closest('.facet').find('.signature').attr('typeId'),			
			propId = $(this).attr('id'),
			html = "";			
		// tokenize and prepare AND query
		var subst = value.split(/\b\s+/);
		var cad = subst[0];
		for (var i=1; i<subst.length; i++) {
			if (subst[i] != "")
				cad += " AND "+ subst[i];       
		}

		// if return, select item in autovalue
		var code = event.keyCode || event.which;
		if ( (code == 13) && (event.type=="keypress") ) { //Enter keycode		
			var $selli = $ul.children('.ui-btn-hover-c');
			if ($selli.length == 1) {
				// select item
				$selli.find('.autovalue').click();
				// stop propagation to prevent query execution
				event.stopPropagation(); 			
			}
			return;
 		}
 		else if (code == 40) { // down arrow
 			if (event.type == "keydown") {
	 			var $prevli = $ul.children('.ui-btn-hover-c').first();
 				var $newli = $prevli.next();
 				if ($newli.length == 0)
 					$newli = $ul.children().first();
	 			$ul.children().removeClass('ui-btn-hover-c');
 				$newli.addClass('ui-btn-hover-c');
 			}
 			return;
 		}
 		else if (code == 38) { // up arrow
			if (event.type == "keydown") {
 				var $prevli = $ul.children('.ui-btn-hover-c').first();
 				var $newli = $prevli.prev();
	 			if ($newli.length == 0)
 					$newli = $ul.children().last();
 				$ul.children().removeClass('ui-btn-hover-c');
	 			$newli.addClass('ui-btn-hover-c');
 			}
 			return;
 		}
	
		// minimum length...
        if ( value && value.length >= 1 ) {
        	var sendAutocompleteQuery = function() {
        		$.ajax({
                	url: parameters.autocompleteService,
                	dataType: "jsonp",
	                crossDomain: true,
    	            jsonp: 'json.wrf',
        	        data: {
            	    	wt: 'json',
                		fq: 'typeId:'+typeId+' AND propId:'+propId,
                    	q: cad
	                }
    	        })
        	    .then( function ( resp ) {
            	    $.each( resp.response.docs, function ( i, val ) {
                	    // language tag
                	    if (val.lang != undefined)
                	    	html += '<li><a href="#" class="autovalue" lang="'+
                	    		val.lang+'">' + val.suggest + "</a></li>";
                	    else 
                	    	html += '<li><a href="#" class="autovalue">' +
	                			val.suggest + "</a></li>";
	                });
    	            $ul.html( html );
        	        $ul.listview( "refresh" );
            	    $ul.trigger( "updatelayout");
            	    
            	    // if focus out remove suggestions after a delay
            	    // if no delay, it is not possible to select a suggestion
            	    $input.focusout(function() {
            	    	setTimeout(function() {
            	    		$ul.html( "" );
							$ul.listview( "refresh" );
		   	    			$ul.trigger( "updatelayout");             	    	
            	    	}, 300);
            	    }); 

 	            });
        	};        	
        	// timer for reducing the amount of calls
        	var timer = $(this).data('timerID');
			if (timer) 
				clearTimeout(timer);
			$(this).data('timerID', setTimeout(sendAutocompleteQuery, 300));
        }
        // not minimum length...
        else {
        	var timer = $(this).data('timerID');
			if (timer) 
				clearTimeout(timer);
    		$ul.html( "" );
			$ul.listview( "refresh" );
    		$ul.trigger( "updatelayout");        	
    	}
	});
	
	// remove suggestions when clicking the clear button
	// this is needed because the change event is not captured above
	// (capturing change event has the undesirable side-effect of not
	// picking up suggestions on a first click...)
	$('body').on('click', '.ui-input-clear', function(e) {
		var $input = $(this).siblings('input').first();
		if ($input.hasClass("auto")) {
		   	var $ul = $(this).closest('li').find('ul');
			$ul.html( "" );
			$ul.listview( "refresh" );
	   	    $ul.trigger( "updatelayout"); 
   	    }
	});
	
    // handler for autovalues
	$('body').on("click", '.autovalue', function(event) {
		// remove input and autocomplete
		var $ul = $(this).closest('ul');
		var $input = $ul.closest('li').find('input');
		var $facet = $(this).closest('.facet');
		var $ulf = $ul.parent().closest('ul');
				
		$input.val("").change();
		$ul.html( "" );
		$ul.listview( "refresh" );
        $ul.trigger( "updatelayout");
        
		// modify facet
		var data = new Object();
		data.typeId = $facet.find('.signature').attr('typeId');
		data.propId = $input.attr('id');
		data.dataType = 'string';
		data.operation = 'literalSet';
		data.value = $(this).text();
		if ($(this).attr("lang") != undefined)
			data.lang = $(this).attr("lang");
		modifyFacet($ulf, data);
	});
	
	//initialize
	init();		
});

function session() {
	this.sessionId = "S-"+(new Date().getTime());
	this.initLog = initLog;
	this.log = log;
}

function composer() {
	this.composerCount = 0;
	this.composerId = null;
	this.composerA = new Array();
}

function results() {
	this.resultsCount = 0;
	this.resultsId = null;
	this.resultsA = new Array();
}

function instance() {
	this.instanceCount = 0;
	this.instanceId = null;
	this.instanceA = new Array();
}

function initLog() {
	$.ajax({
		dataType: "json",
		url: parameters.geoipservice,
		success: function(loc) {
			var mes = "Basic search tool\nIP: "+loc.ip+" - Country: "+loc.country_name+" - Region: "+loc.region_name
				+" - City: "+loc.city;
			Session.log("NEW SESSION", mes, "SUCCESS");
		},
		error: function() {
			var mes = "Basic search tool\nGeolocation service unavailable (!)";
			Session.log("NEW SESSION", mes, "WARNING");
		}
	});
}

function log(type, mes, status) {
	newmes = mes.replace(/\n/g, "\n      ");
	/*var message = "  Session: S-" + Session.sessionId
		+ "\n  Operation: "+ type 
		+ "\n  Status: " + status
		+ "\n  Info: " + newmes;*/
	var message = Session.sessionId + " "+type
		+ "\nStatus: " + status
		+ "\nInfo: " + newmes;
	if ( parameters.locallog )	
		console.log( message );
	if ( parameters.remotelog )	{
		$.ajax({
			type: "POST",
			url: parameters.logservice,
			data: message,
			error: function() {parameters.remotelog = false;} //disable remote login if not available
		});
	}
}
