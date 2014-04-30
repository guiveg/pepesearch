(function($) {
	$.extend({
		tablesorterPager: new function() {
			
			function updatePageDisplay(c) {
				//var s = $(c.cssPageDisplay,c.container).val((c.page+1) + c.seperator + c.totalPages);	
				var s = $(c.cssPageDisplay).html(c.headmes+(c.page+1)+c.seperator+c.totalPages+')');	
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				
				renderTable(table,c.filteredRows);
			}
			
			function renderTable(table,rows) {				
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body				
				$.tablesorter.clearTableBody(table);
				
				for(var i = s; i < e; i++) {					
					//tableBody.append(rows[i]);					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {						
						tableBody[0].appendChild(o[j]);
					}
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				
				updatePageDisplay(c);
			}
			
			function containsFilter(table, column, cellHTML) {
				var fA = table.config.filtersA;
				var exists = false;
				$.each(fA, function(ind, filter) {
					if ((filter.col === column) && (filter.cell === cellHTML))
						exists = true;
				});
				return exists;			
			}
			
			function removeAllFilters(table) {
				table.config.filtersA = new Array();
			}
			
			function removeFilter(table, column) {
				var fA = table.config.filtersA;
				var iToRemove = -1;
				$.each(fA, function(ind, filter) {
					if (filter.col === column) {
						iToRemove = ind;
						return;
					}
				});
				if (iToRemove != -1)
					fA.splice(iToRemove, 1);
			}
			
			function addFilter(table, column, cellHTML) {
				var fA = table.config.filtersA;
				var filter = new Object();
				filter.col = column;
				filter.cell = cellHTML;
				fA.push(filter);
			}			

			function filterTable(table) {
				var c = table.config;				
				// copy original rows
				var evalRows = c.rowsCopy;
				var auxRows;
				// apply filters
				$.each(c.filtersA, function(ind, filter) {
					auxRows = new Array();
					var fcelltext = $(filter.cell).text();					
					$.each(evalRows, function(index, row) {
						var evalcell = row[0].cells[filter.col];
						if ($(evalcell.innerHTML).text() === fcelltext)					
							auxRows.push(row);
					});
					evalRows = auxRows;
				});
				c.filteredRows = evalRows;
				// set counters
				c.totalRows = c.filteredRows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);	
			}
			
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				
				filterTable(table);
				renderTable(table,c.filteredRows);
			};
			
			this.defaults = {
				size: 10,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.prev',
				cssFirst: '.first',
				cssLast: '.last',
				cssPageDisplay: '.pagedisplay',
				cssPageSize: '.pagesize',
				seperator: " / ",
				headmes: 'Results (page ',
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.tablesorterPager.defaults, settings);
					
					var table = this, pager = config.container;

					// array of filters
					config.filtersA = new Array();

					//get default size value
					config.size = parseInt($("select"+config.cssPageSize,pager).val());
			
					// append table rows
					$(this).trigger("appendCache");
					
					$(config.cssFirst,pager).click(function() {
						moveToFirstPage(table);
						return false;
					});
					$(config.cssNext,pager).click(function() {
						moveToNextPage(table);				
						return false;
					});
					$(config.cssPrev,pager).click(function() {
						moveToPrevPage(table);						
						return false;
					});
					$(config.cssLast,pager).click(function() {
						moveToLastPage(table);						
						return false;
					});
					$(config.cssPageSize,pager).change(function() {
						setPageSize(table,parseInt($(this).val()));							
						return false;
					});
					
					// apply easy methods that trigger binded events
                    $(this).bind("processFilter", function (e, column, cell, result) {
                    	if (containsFilter(table, column, cell)) {
                    		// remove filter
                    		removeFilter(table, column);
                    		result.added = false;
                    	}
                    	else {
                    		// add filter
                    		removeFilter(table, column);
                    		addFilter(table, column, cell);
							result.added = true;
                    	}
                    	filterTable(table);
                    	moveToPage(table);
					}).bind("removeFilters", function (e) {
						removeAllFilters(table);
					    filterTable(table);
                    	moveToPage(table);
					});
					
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
        tablesorterPager: $.tablesorterPager.construct
	});
	
})(jQuery);				