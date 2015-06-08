/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */
 function parseRSSHome(url, container,feedlimit) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+feedlimit+'&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      //console.log(data.responseData.feed);
     // $(container).html('<h2>'+capitaliseFirstLetter(data.responseData.feed.description)+'</h2>');
	     var thehtml = '<ul class="list-inner">';
	   $.each(data.responseData.feed.entries, function(key, value){
	  //alert(value.title);
	  var separator="#";
	  var url_str = value.link; 	  
      var checkstring =  url_str.replace(".page.page",".page");
	  var arrayOfStrings = checkstring.split(separator);
  //alert('The original string is: "' + checkstring + '"');
  //alert('The separator is: "' + separator + '"');
  //alert("The array has " + arrayOfStrings.length + " elements: ");
var updated_url;
var bookmark_str;
 if(arrayOfStrings.length==2)
 {
  updated_url=arrayOfStrings[0];
  bookmark_str="#"+arrayOfStrings[1];
 }
 else
 {
 updated_url=checkstring;
 bookmark_str="";
 }

	    
	    var newurl = updated_url + "?DCSext.ref=HomePageClick:Whats_new" + bookmark_str;		
        thehtml += '<li><div class="text"><a class="alink" href="'+newurl+'" target="_blank">'+value.title+'</a></div></li>';
      });
	  thehtml += '</ul>';
	  $(container).append(thehtml);
	  
    }
  });
}


function parseRSS(url, container,feedlimit) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+feedlimit+'&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      //alert(data.responseData.feed);
     // $(container).html('<h2>'+capitaliseFirstLetter(data.responseData.feed.description)+'</h2>');
	     var thehtml = '<ul class="list-inner">';
	   $.each(data.responseData.feed.entries, function(key, value){
	  //alert(value.title);
        thehtml += '<li><div class="text"><a class="alink" href="'+value.link+'" target="_blank">'+value.title+'</a></div></li>';
      });
	  thehtml += '</ul>';
	  $(container).append(thehtml);
	  
    }
  });
}

/**
 * Capitalizes the first letter of any string variable
 * source: http://stackoverflow.com/a/1026087/477958
 */
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
