var xaraSwidgets_coinSlider_v8Templates = {
	
	entry:		'<a href="{link}">'
			+	'<img src="{image}">'
			+	'<span>{desc}</span>'
			+	'</a>',
	
	main:		'<div id="{component_id}OuterDiv" class="coin-slider">'
			+ 	'{entryhtml}'
            + 	'</div>'
            
		
	        
};

function xsw_cs_htmlbr(str) {
	if (str == undefined)
		return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}

// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_coinSlider_v8Constructor(divID, data)
{
	var entryHTML = '';
	
	// loop through each entry in the array and compile the entry template for it
	for(var i=0; i<data.length; i++)
	{
	    data[i].desc = xsw_cs_htmlbr(data[i].desc);
	    entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_coinSlider_v8Templates.entry, data[i]);
	}
	
	// now lets compile the 'main' template which acts as a wrapper for each entry
	
	var mainData = {
		component_id:divID,
		entryhtml:entryHTML
	};
	
	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_coinSlider_v8Templates.main, mainData);
	
	
	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	
	$('#' + divID).html(mainTemplate);
	
	
	// now we have the components DOM on the page - we can use the 'OuterDiv' as the jquery initiation point
		
		var cs1_height = $('#' + divID).parent('div').height()-25
		var cs1_width = $('#' + divID).parent('div').width()
		
		$('#' + divID + 'OuterDiv').coinslider({ 
		width: cs1_width, height:cs1_height, effect: 'random' // random, swirl, rain, straight   
		});
}