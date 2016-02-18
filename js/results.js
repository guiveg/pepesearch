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
 
function showResults(data) {
	// init view
	$.mobile.loading('show');
	// query object preparation
	var resultsObj = new Object();
	resultsObj.sparqlBase = data.sparqlBase;
	resultsObj.sparql = data.sparql;
	resultsObj.facetsA = data.facetsA;
	
	// check if the query has been resolved before
	if ( previousQuery(resultsObj.sparql) != null ) {
		var qid = previousQuery(resultsObj.sparql);
		$.mobile.loading('hide');
		// existing results page
		$.mobile.changePage("#" + qid, {
			transition : 'slide'
		});	
		// update results id
		Results.resultsId = qid;
		// remove previous filters (for updating the # of pages in the title)
		$('#table-'+qid).trigger("removeFilters");
	}
	// send query to the SPARQL endpoint
	else {	
		// set HTTP method as GET (default) or POST (lengthy queries)
		var httpMethod = "GET";
		if (resultsObj.sparql.length > parameters.maxSparqlLength)
			var httpMethod = "POST";
		// handle authorization
		var httpHeaders = {Accept : "application/sparql-results+json"};
		if (parameters.user != undefined) {
			httpHeaders = {
    			"Authorization": "Basic " + btoa( parameters.user+":"+parameters.password),
    			Accept : "application/sparql-results+json",     
  			};
		}
		// retrieve results		
		$.ajax({
			url: resultsObj.sparqlBase,//parameters.sparqlBase,//queryUrl,
			dataType: "json",
			type: httpMethod,
			headers: httpHeaders,
			data: { 
                    //queryLn: 'SPARQL',
                    query: resultsObj.sparql, 
                    format: 'json',
                    Accept: 'application/sparql-results+json'
                },
			success: function(datos) {	
				// this is for Dydra triplestores, that employ a different JSON format
				if (!datos.results && datos.rows) {
					// reformat the results object
					datos = reformatResultsForDydra(datos);
				}
				
				// log
				var message = resultsObj.sparql + "\n=> " + 
					datos.results.bindings.length + " results";
				Session.log("QUERY", message, "SUCCESS");
				// give an id and store results						
				resultsObj.results = datos;
				resultsObj.id = 'R'+Results.resultsCount;
				Results.resultsId = resultsObj.id;
				// increment query counter
				Results.resultsCount++;
				Results.resultsA.push(resultsObj);
				prepareTable(resultsObj);				
			},
			error: function(jqXHR, status, errorThrown) {
				// log
				Session.log("QUERY", resultsObj.sparql, "ERROR");
				// display error
				$.mobile.loading('hide');
				var $err = $('<div data-role="popup" data-overlay-theme="a" data-theme="e" \
					class="ui-content"><p><strong>Error!</strong></p><p>'
					+jqXHR.responseText+'</p></div>');
				$.mobile.activePage.append($err);
				$err.popup().popup( "open" );
				setTimeout(function() { $err.popup( "close" ); }, 3000);
			}		
 		});	 	
	}		
}

function prepareTable(resultsObj) {
	var content = '<div data-url="n" data-role="page" id="' + resultsObj.id + '" class="page">';	
	content += '<div data-role="header" data-id="myheader" data-position="fixed">';
	content += '<div class="ui-btn-left" data-role="controlgroup" data-type="horizontal" data-mini="true"> \
					<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">'
					+ multilingual( {"en": "Back", "nb": "Tilbake"} ) +'</a> \
					<a href="#init" data-role="button" data-icon="home">'
					+ multilingual( {"en": "Home", "nb": "Hjem"} ) +'</a> \
				</div>';
	content += '<h1 class="pagedisplay">'+ multilingual( {"en": "Results", "nb": "Resultater"} ) +'</h1>';
	content += '</div>';
	content += '<div data-role="content">';

	// paging
	content += '<div id="pager-'+resultsObj.id+'" class="pager ui-btn-right" data-role="controlgroup" data-type="horizontal" data-mini="true">';
	content += '<input type="button" data-theme="c" data-icon="arrow-l" data-iconpos="notext" class="prev"/>';
	content += '<select class="pagesize" data-theme="c">';
	content += '<option selected="selected"  value="10">' 
		+ multilingual( {"en": "showing 10", "nb": "viser 10"} ) +'</option>';
	content += '<option value="25">'+ multilingual( {"en": "showing 25", "nb": "viser 25"} ) 
		+'</option>';
	content += '<option value="50">'+ multilingual( {"en": "showing 50", "nb": "viser 50"} ) 
		+'</option>';
	content += '</select>';
	content += '<input type="button" data-theme="c" data-icon="arrow-r" data-iconpos="notext" class="next"/>';
	content += '</div>';

	// construct here the table
	
	content += '<table data-role="table" id="table-' + resultsObj.id + '" data-mode="columntoggle" \
		class="ui-body-c ui-shadow ui-corner-all table-stripe ui-responsive" \
		data-column-btn-text="'+ multilingual( {"en": "Columns to display...", "nb": "Kolonner å vise ..."} )+'">';
	//content += '<table data-role="table" id="table-' + resultsObj.id + '" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-btn-theme="c" data-column-btn-text="Columns to display..." data-column-popup-theme="c">';
	//content += '<table data-role="table" id="table-' + resultsObj.id + '" data-mode="columntoggle" class="ui-body-c ui-shadow ui-corner-all table-stripe ui-responsive" data-column-btn-text="Columns to display..." >';
	// table head
	content += '<thead><tr class="ui-bar-b">';
	$.each(resultsObj.facetsA, function(i, resvar) {
		content += '<th var="'+resvar.id+'" data-priority="1">'+resvar.typeLabel+'</th>';
		$.each(resvar.literalA, function(j, lvar) {
			content += '<th var="'+resvar.id+'" data-priority="3">'+lvar.label + '</th>';
		});	
	});
	content += '</tr></thead>';
	// table body
	content += '<tbody>';
	$.each(resultsObj.results.results.bindings, function(i, ditem) {		
		content += '<tr>';
		$.each(resultsObj.facetsA, function(i, resvar) {
			// CAUTION, THERE MIGHT BE OPTIONAL VALUES
			if (ditem[resvar.id] === undefined)
				content += '<td></td>';
			// include hyperlink if type uri
			else if (ditem[resvar.id].type == 'uri') {
				// CAUTION: display property might not exist
				if ((!resvar.display.propId) || (ditem[resvar.display.id] === undefined))
					content += '<td><a class="instance" uri="'+ditem[resvar.id].value
						+ '" typeId="'+resvar.typeId+'" href="#">'
						+ ditem[resvar.id].value + '</a></td>';
				else			
					content += '<td><a class="instance" uri="'+ditem[resvar.id].value
						+ '" typeId="'+resvar.typeId+'" href="#">'
						+ ditem[resvar.display.id].value + '</a></td>';
					/*<a href="' + ditem[resvar.id].value 
					+ '" target="_blank" data-rel="external" data-mini="true" '
					+ 'data-inline="true" data-role="button" data-iconpos="notext" '
					+ 'data-icon="info"></a>*/
			}
			// bnode case
			else {
				// CAUTION: display property might not exist
				if (!resvar.display.propId)
					content += '<td>'+ditem[resvar.id].value+'</td>';
				else
					content += '<td>'+ditem[resvar.display.id].value+'</td>';
			}
			// and now the literal values
			$.each(resvar.literalA, function(j, lvar) {
				// CAUTION, THERE MIGHT BE OPTIONAL VALUES
				if (ditem[lvar.id] === undefined)
					content += '<td></td>';
				else {
					content += '<td>'+ditem[lvar.id].value+'</td>';						
				}
			});			
		});	
		content += '</tr>';
	});		
	content += '</tbody></table>';
	// table end	
	
	content += '</div>';
	// content end
	content += '</div>';
	// page end

	content = $(content);
	
	//append it to the page container
	content.appendTo($.mobile.pageContainer);

	//go to it
	$.mobile.changePage("#" + resultsObj.id, {
		transition : 'slide'
	});
	
	// sorting and pagination only in case of results
	if (resultsObj.results.results.bindings.length > 0) {
		//add support for sorting table (default: first column on ascending order)
		$('#table-'+resultsObj.id).tablesorter( {sortList: [[0,0]], widthFixed: true} ); 	
		//add support for pagination
		$('#table-'+resultsObj.id).tablesorterPager(
			{positionFixed: false, container: $('#pager-'+resultsObj.id), 
				headmes: multilingual( {"en": "Results (page ", "nb": "Resultater (side "} )}
		); 
	}
	
	// modifico a las bravas el width para que se auto-ajuste al quitar columnas de la tabla
	$('#table-'+resultsObj.id+" col").attr("style","width: 0px;");
}

function previousQuery(query) {
	var qid = null;
	$.each(Results.resultsA, function(i,el) {
		if (query === el.sparql) {
			qid = el.id;
			return;
		}
	});
	return qid;
}
