//console.log("this works, at least");
//alert("YO!");		searchform > tsf-p > nosjv logocont
					//http://i.imgur.com/Z9z75pr.png

var localLogo = chrome.extension.getURL("logo.png");

$('img').each(function(index,image) {
        $(image).attr('src', localLogo);
        $(image).attr('width', '60px');
        $(image).attr('height', '52px');
        $(image).attr('id', "clickable");
    });
/*
$('a['https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjD3dHktOnNAhUL0GMKHb4IA3EQPAgD']').each(function(index,image)
{
	$(pic).attr('id', "clickable")
});*/

//alert("Changed something.");
$('img').on('click', function() {
alert("Now we here");

// Create the HTML for the message
var msg = '<div class=\"header\"><a id=\"close\" href="#">close X</a></div>';
msg += '<div class=\"contentfpc\" id=\"contentfpc\"><h2>Information to be inquired.</h2></div>';

var elNote = document.createElement('div');       // Create a new element
elNote.setAttribute('id', 'note');                // Add an id of note
elNote.innerHTML = msg;                           // Add the message
document.body.appendChild(elNote);                // Add it to the page

// Construct the request
// Replace MyAppID with your Production AppID
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=JasonNar-fpc-PRD-45a6394d9-fdc20cc4";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    //url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += "&keywords=harry%20potter";
    url += "&paginationInput.entriesPerPage=3"

chrome.runtime.sendMessage({greeting: url}, function(response) {
  console.log(response.farewell);
  //_cb_findItemsByKeywords(response.farewell);
  //Submit the request
  //s=document.createElement('script'); // create script element
  //s.src= url;
  //document.body.appendChild(s);
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello"){
	alert("got html from extension");
	alert(request.newhtml);
	document.getElementById("contentfpc").innerHTML = request.newhtml.join("");
      //sendResponse({farewell: "goodbye"});

    }
});

function dismissNote() {                          // Declare function
  document.body.removeChild(elNote);              // Remove the note
}

var elClose = document.getElementById('close');   // Get the close button
elClose.addEventListener('click', dismissNote, false);// Click close-clear note
});

// Get the url from the search on current tab
//chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//    var tabUrl = tabs[0].tabUrl;
	//console.log(tabUrl);
//});



// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
	console.log("in call-back function!");
	var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
	var html = [];
	html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
	for (var i = 0; i < items.length; ++i) {
		var item	= items[i];
		var title	= item.title;
		var pic		= item.galleryURL;
		var viewitem 	= item.viewItemURL;
		if (null != title && null != viewitem) {
			html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
			'<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
		}
	}
	html.push('</tdbody></table>');
	document.getElementById("content").innerHTML = html.join("");
}	// End _cb_findItemsByKeywords() function

