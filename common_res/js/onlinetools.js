function DisplayPrintFriendlyPage() 
	{ 
   var sOption="toolbar=yes,location=no,directories=yes,menubar=yes,resizable=yes,scrollbars=yes,width=800,height=500,left=10,top=25"; 
   var sWinHTML = document.getElementById('contentstart').innerHTML; 
   var sWinHTMLURL = "Page URL: " + location.href;
   var sLastUpdateDate = getlastupdatedate();
   var sWinTitle = getpagetitle(); 
   var sAdobePDF = getadobepdf(); 
   var sPageTitle ="<h1 class='pageheading'>"+sWinTitle+"</h1>";
   var HTMLTitle =sWinTitle +"- NSW Fair Trading";
   var winprint=window.open("","",sOption); 
       winprint.document.open(); 
       winprint.document.write('<html><head><LINK rel="stylesheet" href="www.fairtrading.nsw.gov.au/common_res/global/css/global.css" type="text/css"/><LINK rel="stylesheet" href="www.fairtrading.nsw.gov.au/common_res/global/css/secondary.css" type="text/css"/><LINK rel="stylesheet" href="www.fairtrading.nsw.gov.au/common_res/ftweb/css/ftwww.css" type="text/css"/><LINK rel="stylesheet" href="www.fairtrading.nsw.gov.au/common_res/ftweb/css/printerfriendlypage.css" type="text/css"/>');
	   winprint.document.write('<title>');
	   winprint.document.writeln(HTMLTitle); 
   	   winprint.document.write('</title>');	 
	   winprint.document.writeln('<script language="JavaScript">');
   	   winprint.document.writeln('<!-- ');
	   winprint.document.writeln('function PrintThisPage()');
	   winprint.document.writeln(' {window.print();} ');
	   winprint.document.writeln(' function CloseThisPage()');
	   winprint.document.writeln(' {window.close();}');
	   winprint.document.writeln(' //-->');
	   winprint.document.writeln(' </script>');
	   winprint.document.writeln('</head><body class="printerfriendlypage" bgcolor="#ffffff" topmargin="10" bottommargin="10" leftmargin="10" rightmargin="10" marginwidth="0" marginheight="0" ><div class="secondary"><div id="inner-wrapper"><div id="column-wrapper">');
	   winprint.document.writeln('<div align="right"><a href="javascript:PrintThisPage()" class="printfriendly">print</a>&nbsp;|&nbsp;<a href="javascript:CloseThisPage()" class="printfriendly">close</a><br><br></div><div id="ls-row-2"><div id="content-2column"><div id="contentstart">'); 
      // winprint.document.writeln(sPageTitle);        
	  winprint.document.writeln(sWinHTML);        
	  winprint.document.writeln(sAdobePDF);        
       winprint.document.writeln('<div class="printfooterdate">'+ sLastUpdateDate+'</div>');
	   winprint.document.writeln('<div class="printfooterdate">'+ sWinHTMLURL+'</div>');
       winprint.document.writeln('<div class="printfootertext">This information must not be relied on as legal advice. For more information about this topic, refer to the appropriate legislation. <BR><BR>&copy; State of New South Wales through NSW Fair Trading.<BR>You may freely copy, distribute, display or download this information with some important restrictions. See NSW Fair Trading&rsquo;s copyright policy at www.fairtrading.nsw.gov.au</div>');
	   winprint.document.writeln('</div></div></div></div></div></div></div></div>'); 
       winprint.document.writeln('</body></html>'); 
       winprint.document.close(); 
       winprint.focus(); 
	}

function PrintThisPage() 
	{ 
	   window.print();
	}

function CloseThisPage() 
	{ 
		window.close(); 
	}


function getlastupdatedate ()
{
	var lastupdate_ar = getElementsByClassName("lastupdatedate", "span", document.getElementById('ls-row-3'));			
	var datetext = "";

	if (lastupdate_ar.length > 0) {
		datetext = lastupdate_ar[0].innerHTML;
	}

	return datetext;	
}


function getpagetitle ()
{
	var pagetitle_ar = getElementsByClassName("pageheading", "h1", document.getElementById('body-print'));			
	var titletext = "";

	if (pagetitle_ar.length > 0) {
		titletext = pagetitle_ar[0].innerHTML;
	}

	return titletext;	
}

function getadobepdf ()
{
	var adobepdf_ar = getElementsByClassName("bodypdf", "div", document.getElementById('content-inner'));			
	var adobetext = "";

	if (adobepdf_ar.length > 0) {
		adobetext = '<div class="bodypdf"><p>'+adobepdf_ar[0].innerHTML+'</p></div>';
	}

	return adobetext;	
}


function mailpage()
{
var sWinTitle = getpagetitle(); 
//var sWinTitle = document.getElementById('page-title').innerHTML; 
var sWintmp = sWinTitle.replace(/&\w+?;/g, function( e ) {
    switch(e) {
        case '&nbsp;': 
//alert('nbsp found');
            return '';
        default: 
            return e;
    }
});

var HTMLTitle =sWintmp +" - NSW Fair Trading";
//mail_str = "mailto:?subject=Check out " + document.title;
//mail_str += "&body=I thought you might be interested in  " + document.title;
//mail_str += ". You can view it at: " + location.href; 
var mail_str = "mailto:?subject=" + HTMLTitle;
mail_str += "&body=I thought you might be interested in " + HTMLTitle;
mail_str += ". You can view it at: " + location.href; 
location.href = mail_str;
}

				
function resizeUp() {
	if(!document.getElementById('inner-wrapper').style.fontSize){
		document.getElementById('inner-wrapper').style.fontSize = '101%';
	} else {
		var str_fontsize = document.getElementById('inner-wrapper').style.fontSize;
		var num_fontsize = str_fontsize.substring(0,str_fontsize.length-1);
		var num_newsize = num_fontsize * 1.1;
		document.getElementById('inner-wrapper').style.fontSize = num_newsize + '%';
	}
}

function resizeZero() {
	document.getElementById('inner-wrapper').style.fontSize = '80.01%';
}

function resizeDown() {
	if(!document.getElementById('inner-wrapper').style.fontSize){
		document.getElementById('inner-wrapper').style.fontSize = '70%';
	} else {
		var str_fontsize = document.getElementById('inner-wrapper').style.fontSize;
		var num_fontsize = str_fontsize.substring(0,str_fontsize.length-1);
		var num_newsize = num_fontsize / 1.1;
		document.getElementById('inner-wrapper').style.fontSize = num_newsize + '%';
	}
}

