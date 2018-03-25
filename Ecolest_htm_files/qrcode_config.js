var xaraSwidgets_QrCodeTemplates = {

	entry:	'{text}',
	
	main:	 '<div id="{component_id}OuterDiv" class="qrcode">'
			+ '</div>'
			
			
	        
};

function xsw_ea_htmlbr(str)
{
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
function xaraSwidgets_QrCodeConstructor(divID, data)
{
	
	
	var entryHTML = '';
	// loop through each entry in the array and compile the entry template for it
	for(var i=0; i<data.length; i++)
	{
		entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_QrCodeTemplates.entry, data[i]);
	}
	
	// now lets compile the 'main' template which acts as a wrapper for each entry

	var htmlString = entryHTML.replace(/[\r\n]/g, "<br />");
	if (htmlString == "<br />" || htmlString == "{text}")
	{
	 htmlString = window.location;
	}
	
	var mainData = {
		component_id:divID
//		entryhtml:htmlString
		
	};
	
	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_QrCodeTemplates.main, mainData);
	
	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	
	// work out the required dimensions
	var qr_height = $('#' + divID).parent('div').height()
	var qr_width = $('#' + divID).parent('div').width()
	
	// see what encoding is being used within the users page 
//	var qr_encode = $('head').find('.jspDrag').css('background-color')  // find color and apply it to a variable
	
	$('#' + divID).html(mainTemplate);
	

	// now we have the components DOM on the page - we can use the 'OuterDiv' as the jquery initiation point
	
	$('#' + divID + 'OuterDiv').MyQRCode({
	encoding:"UTF-8",
	content: "" +  htmlString + "",
	size:"" + qr_width + "x" + qr_height + ""
	});

}