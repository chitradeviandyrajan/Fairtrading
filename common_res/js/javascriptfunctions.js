// Javascript functions for FTWEB

function replaceNbsps(str) {
  var re = new RegExp(String.fromCharCode(160), "g");
  return str.replace(re, "");
}

// Collection of functions for Languages and Special Pages, Factsheets etc.
function  checkJavascriptFunctions()
{
	//checkforspecialsidenav();
	checkforspecialmoreinfo_url();
	checkForLanguageTranslatedText();
	checkForBulletImage();
	checkForOrderPublications();
	checkForRHSFeeds();
	//checkForFactsheet();
	checkForSearchPromo();
	//checkForLastUpdatedDate();	
	checkForSearchResults();
	//checkforTopNavSelected();
	checkForFontSizeUp();
}




function checkforspecialsidenav() {
//alert('hi 1');
	//check for language landing page
	var sectiontype = '';
	var langtype = '';
	var langsidenavtext='';
	var langdir = '';
	var divparent = document.getElementById("content-inner");
	var divs = divparent.getElementsByTagName("div");
	//alert(divs.length);				
	
	//Get Section Type
	for (i = 0; i < divs.length; i++) {
		if (divs[i].className == "dcr_lang_type") {
				sectiontype = "languages";//divs[i].innerHTML;
//			alert(sectiontype);
		  }

		if (divs[i].className == "dcr_Section_type") {
				sectiontype = divs[i].innerHTML;
//			alert(sectiontype);
		}
		if (sectiontype == "languages")
		{
				
			  if (divs[i].className == "dcr_lang_type") {
			    langtype = divs[i].innerHTML;
//				alert(langtype);
			  }
			  if (divs[i].className == "lang_sidenav_val") {
			    langsidenavtext = divs[i].innerHTML;
//				alert(langsidenavtext);
			  }
			  if (divs[i].className == "bodycontent") {
			    langdir = 'lang_' + divs[i].getAttribute('dir');
//				alert(langdir);
			  }

		}
	}



	if (document.getElementById("breadcrumbs")!=null) {

		sp_test = document.getElementById("breadcrumbs").getElementsByTagName("a");
	 
	   /*for(i=0;i<sp_test.length;i++)
	   {
	     alert('Inner breadcrumbs['+i+']='+sp_test[i].innerHTML);
		  alert('outerHTML breadcrumbs['+i+']='+sp_test[i].outerHTML);
		  alert('a href ='+sp_test[i].getAttribute('href'));
	   }*/

		if (sp_test.length == 0) {
			return;
		}
		else
		{
			//check for indigenous landing page
			if (sp_test.length == 1) {
				checkhometag = sp_test[0].innerHTML.toLowerCase();
				if (checkhometag =="home") {
//					return;
				}	
				//Chitra test
				var elementchk = document.getElementById('breadcrumbPgTitle');				
				if (elementchk != null && elementchk.value != '') 
				{
					//Chitra ends
					temp_value=document.getElementById("breadcrumbPgTitle").innerHTML.toLowerCase();
					//alert(temp_value.indexOf("arabic"));
					if (temp_value.indexOf("youth") > -1 ) {
						sectiontype = "youth";
						document.getElementById("ls-row-2").className += " youth landing";
						setYouthHomePage("","landing","");
					}
					if (temp_value.indexOf("indigenous") > -1 ) {
						sectiontype = "indigenous";
						document.getElementById("ls-row-2").className += " indigenous landing";
						setIndigenousHomePage("","landing","");
					}
					//temploc = location.href;
					if (sectiontype=="languages") {
						if (langtype.toLowerCase()!="english") {
							document.getElementById("ls-row-2").className += " language landing "+langdir;
							setLanguageTitle(langtype,langsidenavtext, "landing", "");
						}
					}
				}
				
			}
			else {
			//check for indigenous secondary pages
				temp_value=trim(sp_test[1].innerHTML.toLowerCase());				
				/*ahref=trim(sp_test[1].outerHTML);	
				ahref=sp_test[1].href;					
				checkahref = '<a href="';				
				tempstartpos = ahref.indexOf(checkahref) + checkahref.length;
				tempendpos = ahref.indexOf('">');
				
				//homepagehref_value=ahref.substr(tempstartpos+1,(tempendpos - tempstartpos)-1);	
				//alert(homepagehref_value);*/
				
				homepagehref_value=sp_test[1].getAttribute('href');
				//ahref.substr(tempstartpos,tempendpos - tempstartpos);	
				//alert('homepagehref_value='+homepagehref_value);
				
				if (temp_value == "youth" ) {
					sectiontype = "youth";
					document.getElementById("ls-row-2").className += " youth";
					setYouthHomePage("Youth home","secondary",homepagehref_value);
				}
				if (temp_value == "indigenous" ) {
					sectiontype = "indigenous";
					document.getElementById("ls-row-2").className += " indigenous";
					setIndigenousHomePage("Indigenous home","secondary",homepagehref_value);
				}
					//check for language secondary pages				
//				alert(temp_value);
				if (sectiontype=="languages") {
					if (langtype.toLowerCase()!="english") {
						if (langtype.length > 0) {
							document.getElementById("ls-row-2").className += " language "+langdir;
							setLanguageTitle(langtype,langsidenavtext,"secondary",homepagehref_value);
						}
					}
				}
			}
		}
	}	
}

// Trim spaces from passed parameter
function trim(s)
{
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	while(r > l && s[r] == ' ')
	{	r-=1;	}
	return s.substring(l, r+1);
}

//Insert Youth home page for sidenavigation
function setYouthHomePage(sidenavtext,pagetype,homepagehref)
{
	var youthtitle="Youth";
	var youthhomepage="";
	var youthbackgroundimg= '<img width="161" height="262" alt="Youth background" src="/common_res/ftweb/images/Secondary_youth-final-sl-02.jpg"/>';
	var youthsidenavphotoimg='<img width="161" height="263" border="0" class="side-image-photo" alt="Youth" src="/common_res/ftweb/images/Secondary_youth-final-slice.jpg"/>';

	if (pagetype=="landing")
	{
		youthhomepage="";
	}
	if (pagetype=="secondary")
	{
		youthhomepage='<div class="specialpage-b2h"><a title="Youth home" href="'+homepagehref+'"><img width="17" height="7" src="/common_res/ftweb/images/application_arrows_left.gif" alt="arrow" class="arrow"/> <span>'+sidenavtext+'</span></a></div>';
	}
//	alert(youthtitle);
	var parentid = document.getElementById('side-nav');
	var newid = 'side-image-youth';
	var newdiv = document.createElement('div');
	var divIdName = newid;
	newdiv.setAttribute('id',divIdName);
	newdiv.innerHTML = '<h2>'+youthtitle+'</h2>'+youthsidenavphotoimg+youthhomepage+youthbackgroundimg;
	parentid.appendChild(newdiv);
}

//Insert Indigenous home page for sidenavigation
function setIndigenousHomePage(sidenavtext,pagetype,homepagehref)
{
//alert(sidenavtext);
  //  alert(pagetype);
	//alert(homepagehref);
	
	var indigtitle="Indigenous";
	var indighomepage="";
	var indigbackgroundimg= '<img width="161" height="262" alt="indigenous background" src="/common_res/ftweb/images/indigenous_transparent.gif"/>';
	var indigsidenavphotoimg='<img width="161" height="263" border="0" class="side-image-photo" alt="Indigenous children" src="/common_res/ftweb/images/indigenous_children_large.jpg"/>';

	if (pagetype=="landing")
	{
		indighomepage="";
	}
	if (pagetype=="secondary")
	{
		indighomepage='<div class="specialpage-b2h"><a title="Indigenous home" href="'+homepagehref+'"><img width="17" height="7" src="/common_res/ftweb/images/application_arrows_left.gif" alt="arrow" class="arrow"/> <span>'+sidenavtext+'</span></a></div>';
		//alert(indighomepage);
	}
//	alert(indigtitle);
	var parentid = document.getElementById('side-nav');
	var newid = 'side-image-indig';
	var newdiv = document.createElement('div');
	var divIdName = newid;
	newdiv.setAttribute('id',divIdName);
	newdiv.innerHTML = '<h2>'+indigtitle+'</h2>'+indigsidenavphotoimg+indighomepage+indigbackgroundimg;
	parentid.appendChild(newdiv);
}

//Insert Indigenous Tagline inside body content
function setIndigenousTagLine()
{
	var parentid = document.getElementById('body-print');
	var newid = 'indigtagline';
	var newdiv = document.createElement('div');
	var divIdName = newid;
	newdiv.setAttribute('id',divIdName);
//alert('hi');
	newdiv.innerHTML = '<a href="/Indigenous.page"><img width="17" height="7" src="/common_res/ftweb/images/application_arrows_left.gif" class="arrow" alt="arrow"/> <span>Indigenous home</span></a>';
	parentid.appendChild(newdiv);
//	newdiv.innerHTML = 'hello'; //<div class="tagline"><img width="155" height="102" alt="fair go" src="/common_res/global/images/indigenous_tagline_medium.jpg"></div>';
//	parentid.appendChild(newdiv);

}

//Insert Language home page for sidenavigation
function setLanguageTitle(langtype,sidenavtext,pagetype,homepagehref)
{
	var langtitle="Languages";
	var langhomepage="";
	var langbackgroundimg= '<img width="161" height="262" alt="languages background" src="/common_res/ftweb/images/languages_transparent.gif"/>';
	var langsidenavphotoimg='<img width="161" height="257" border="0" class="side-image-photo" alt="Photo of culturally diverse people" src="/common_res/ftweb/images/languages_family_large.jpg"/>';

	if (pagetype=="landing")
	{
		langhomepage='<div class="specialpage-landing"> &nbsp; &nbsp;</div>';
	}
	if (pagetype=="secondary")
	{
		langhomepage='<div class="specialpage-b2h"><a title="'+langtype+' home" href="'+homepagehref+'"><img width="17" height="7" src="/common_res/ftweb/images/application_arrows_left.gif" alt="arrow" class="arrow"/> <span>'+sidenavtext+'</span></a></div>';
	}
//	alert(langtitle);
	var parentid = document.getElementById('side-nav');
	var newid = 'side-image-lang';
	var newdiv = document.createElement('div');
	var divIdName = newid;
	newdiv.setAttribute('id',divIdName);
	newdiv.innerHTML = '<h2>'+langtitle+'</h2>'+langsidenavphotoimg+langhomepage+langbackgroundimg;
	parentid.appendChild(newdiv);
}



// Check for Special Pages more information URL
function checkforspecialmoreinfo_url() {
//alert("hi 2");
	//check for language landing page
	var sectiontype = '';
	var langtype = '';
	var langmoreinfotext='';
	var divparent = document.getElementById("content-inner");
	var divs = divparent.getElementsByTagName("div");
	//alert(divs.length);				
	
	//Get Section Type
	for (i = 0; i < divs.length; i++) {
		if (divs[i].className == "dcr_lang_type") {
			sectiontype = "languages";
		  }

		if (divs[i].className == "dcr_Section_type") {
			sectiontype = divs[i].innerHTML;
		}
		if (sectiontype == "languages")
		{
				
			  if (divs[i].className == "dcr_lang_type") {
			    langtype = divs[i].innerHTML;
			  }
			  if (divs[i].className == "lang_moreinfo_val") {
			    langmoreinfotext = divs[i].innerHTML;
			  }
			}
		}
	
	if (document.getElementById("breadcrumbs")!=null) {

		sp_test = document.getElementById("breadcrumbs").getElementsByTagName("a");
		if (sp_test.length == 0) {
			return;
		}
		else
		{
			//check for indigenous/language/youth landing page
			if (sp_test.length == 1) {	
				return;
			}
			else {
				//check for indigenous secondary pages
				temp_value=trim(sp_test[1].innerHTML.toLowerCase());	
				ahref=trim(sp_test[1].outerHTML.toLowerCase());	
				checkahref = '<a href="';
				tempstartpos = ahref.indexOf(checkahref) + checkahref.length;
				tempendpos = ahref.indexOf('">');
				homepagehref_value=ahref.substr(tempstartpos,tempendpos - tempstartpos);
				
				if (temp_value == "youth" ) {
					sectiontype = "youth";
					setYouthMoreInfo(homepagehref_value);
				}

				if (temp_value == "indigenous" ) {
					sectiontype = "indigenous";
					setIndigenousMoreInfo(homepagehref_value);
				}

				//check for language secondary pages				
				if (sectiontype=="languages") {
					if (langtype.toLowerCase()!="english") {
						setLanguageMoreInfo(langtype,langmoreinfotext,homepagehref_value);
					}
				}
			}
		}
	}	
}

//Insert Youth More Info URL
function setYouthMoreInfo(homepagehref)
{
//	youthtitle = '<a title="More information" href="'+homepagehref+'">More information for Youth people</a>';
	var test=getElementsByClassName("viewhomepagelink", "p", document.getElementById('body-print'));
	if (test.length == 0) {
		return;
	}
	else
	{
	//	test[0].innerHTML = youthtitle;
		$('p.viewhomepagelink a.moreinfo').attr('href', homepagehref);
		$('p.viewhomepagelink a.moreinfo').attr('title', 'More information');
	}
}

//Insert Indigenous More Info URL
function setIndigenousMoreInfo(homepagehref)
{
//	indigtitle = '<a title="More information" href="'+homepagehref+'">More information for Indigenous people</a>';
	//var test=document.getElementById('body-print').getElementsByClassName('viewhomepagelink'); 
	var test=getElementsByClassName("viewhomepagelink", "p", document.getElementById('body-print'));
	if (test.length == 0) {
		return;
	}
	else
	{
//		test[0].innerHTML = indigtitle;
		$('p.viewhomepagelink a.moreinfo').attr('href', homepagehref);
		$('p.viewhomepagelink a.moreinfo').attr('title', 'More information');
	}
}

//Insert Language More Info URL
function setLanguageMoreInfo(langtype,langmoreinfotext,homepagehref)
{
	langtitle = '<a title="More information" href="'+homepagehref+'">'+langmoreinfotext+'</a>';
//	var testar=document.getElementById('body-print').getElementsByClassName('viewhomepagelink-ar'); 
	var testar=getElementsByClassName("viewhomepagelink-ar", "p", document.getElementById('body-print')); 
	if (testar.length == 0) {
//		var test=document.getElementById('body-print').getElementsByClassName('viewhomepagelink'); 
                var test=getElementsByClassName("viewhomepagelink", "p", document.getElementById('body-print'));
		if (test.length == 0) {
			return;
		}
		else
		{
			test[0].innerHTML = langtitle;
		}
	}
	else
	{
		testar[0].innerHTML = langtitle;
	}
}


// Check for languages translated text
function checkForLanguageTranslatedText() {

//alert("hi 3");
	var lang_gotop_text = "Top of page";
	var lang_othertopics_text = "Other topics available";
	var lang_relatedinfo_text = "Related information";
	var divparent = document.getElementById("content-inner");
	var divs = divparent.getElementsByTagName("div");
	var sectiontype = "";	
	//Get translated text
	for (i = 0; i < divs.length; i++) {
		if (divs[i].className == "dcr_Section_type") {
				sectiontype = divs[i].innerHTML;
//			alert(sectiontype);
		}
		if (sectiontype == "languages")
		{
			if (divs[i].className == "lang_gotop") {
				lang_gotop_text = divs[i].innerHTML;
			  }
			if (divs[i].className == "lang_othertopicsavailable_val") {
				lang_othertopics_text = divs[i].innerHTML;
			  }
			if (divs[i].className == "lang_relatedinfo_val") {
				lang_relatedinfo_text = divs[i].innerHTML;
			  }
		}
	}	

	
	if (sectiontype == "languages")
	{
		//gotop links
		var gotops=getElementsByClassName("gotop", "a", document.getElementById('body-print')); 
		if (gotops.length > 0) {
			for (j = 0; j < gotops.length; j++) {
				gotops[j].innerHTML = '<img border="0" title="Go to Top of page" alt="Go to Top of page." src="/common_res/global/images/b_arrow_up.gif"/> '+lang_gotop_text;
			}
	
		}

		//other topics available heading
		var othertopics=getElementsByClassName("othertopicsavailable", "h3", document.getElementById('content-inner'));
	//	alert(othertopics.length); 
		if (othertopics.length > 0) {
			othertopics[0].innerHTML = lang_othertopics_text+":";
		}


		//related info heading
		var relatedinfo=getElementsByClassName("rel_head", "div", document.getElementById('content-inner'));
		if (relatedinfo.length > 0) {
			relatedinfo[0].innerHTML = lang_relatedinfo_text+":";
		}
	}

}

// Check for Bullet image and alt text
function checkForBulletImage() {

//alert("hi 4");

	var rhs_bullet_img = new Array();
	var rhs_bullet_alt_text = new Array();
	var divparent = document.getElementById("right-col");
	var divs = divparent.getElementsByTagName("div");

	var getuls = divparent.getElementsByTagName("ul");
	var arr_bullet_imgs = new Array();
	var arr_num = 0;
	
	//Get bullet details
	for (i = 0; i < divs.length; i++) {
		if (divs[i].className == "rhs_bullet_img") {
			rhs_bullet_img[arr_num] = divs[i].innerHTML;
		  }
		if (divs[i].className == "rhs_bullet_alt") {
			rhs_bullet_alt_text[arr_num] = divs[i].innerHTML;
			arr_num = arr_num + 1;
		  }
	}
	
//alert(rhs_bullet_img[0]);

	var ul_list=getElementsByClassName("none", "ul", document.getElementById('right-col')); 
	if (ul_list.length > 0) {
		for (j = 0; j < ul_list.length; j++) {
//alert(j);

			//get innerhtml of existing ul tag
			getul_val = ul_list[j].innerHTML;

			//add image style for bullet to existing li tag
			getul_newval = '<ul class="displayimg" style="list-style-image: url(' + rhs_bullet_img[j] + ')">' + getul_val + '</ul>';
			ul_list[j].parentNode.innerHTML = getul_newval;

		}
	}


	//add bulletimg class to all li under ul tag[s] with none class
	$("ul.displayimg").find("li").addClass("bulletimg"); 


}



// Check for Order Publications and remove Date column
function checkForOrderPublications() {

//alert("hi 5");

	var orderpubs_val="";
	var divparent = document.getElementById("content-inner");
	var divs = divparent.getElementsByTagName("div");

	//Get order publications details
	for (i = 0; i < divs.length; i++) {
		if (divs[i].className == "publications") {
			orderpubs_val = divs[i].innerHTML;
		  }

	}
	
//alert(orderpubs_val);

	if (orderpubs_val == "publications") {

	//add rsspublicationtbl class to all table tag under div#content-inner
		$("div#content-inner").find("table").addClass("rsspublicationtbl"); 

	}


}



// Check for RHS Feeds
function checkForRHSFeeds() {

//alert("hi 6");
	var rhsfeed = document.getElementById("right-col");
	var rhsfeeddivs = rhsfeed.getElementsByTagName("div");

	//Get rhs div
	for (i = 0; i < rhsfeeddivs.length; i++) {
		var pos = rhsfeeddivs[i].id.indexOf("div_whatsnew_");
 		//alert(pos);
		if (pos == 0) {
			//alert("match!");
			rhsfeeddivs[i].className += " rhsfeed";
			rhsfeeddivs[i].parentNode.className += " rhsfeed";
		}
		var pos1 = rhsfeeddivs[i].id.indexOf("FTwww");
		//alert(pos1);
		if (pos1 == 0) {
			//alert("match!");
			rhsfeeddivs[i].className += " rhsfeed";
			rhsfeeddivs[i].parentNode.className += " rhsfeed";
		}

	}

}




// Check for normal or large print Factsheets
function checkForFactsheet() {
//alert("hi 7");
	//check for normal print factsheet
	var normalprintpdf_url = '';
	var normalprintpdf_img = '';
	var largeprintpdf_url = '';
	var largeprintpdf_img = '';
	var factsheetExist = "no";
	var largepdfexist = '';
	var divparent = document.getElementById("content-inner");
//alert(divparent.innerHTML);
	var divs = divparent.getElementsByTagName("div");
	//alert(divs.length);				
	
	//Get href of factsheet
	for (i = 0; i < divs.length; i++) {
//alert(divs[i].className);

		if (divs[i].className == "normalprint_pdf_url") {
			normalprintpdf_url = divs[i].innerHTML;
			factsheetExist = "yes";
		}

		if (divs[i].className == "normalprint_pdf_img") {
			normalprintpdf_img = divs[i].innerHTML;
		}
		if (divs[i].className == "largeprint_pdf_url") {
			largeprintpdf_url = divs[i].innerHTML;
			largepdfexist = "yes";
		}

		if (divs[i].className == "largeprint_pdf_img") {
			largeprintpdf_img = divs[i].innerHTML;
		}
	}

	if (factsheetExist == 'yes') {	
		if (document.getElementById("function-tools-upper")!=null) {

			setFactsheetIcons("function-tools-upper", normalprintpdf_url, normalprintpdf_img, "Standard fact sheet","10","12");

		
			if (largepdfexist == "yes") {

				setFactsheetIcons("function-tools-upper", largeprintpdf_url, largeprintpdf_img, "Large print fact sheet","25","19");
			
			}

		}

		if (document.getElementById("function-tools-lower")!=null) {

			setFactsheetIcons("function-tools-lower", normalprintpdf_url, normalprintpdf_img, "Standard fact sheet","10","12");

		
			if (largepdfexist == "yes") {

				setFactsheetIcons("function-tools-lower", largeprintpdf_url, largeprintpdf_img, "Large print fact sheet","25","19");
			
			}

		}

		//Check and insert pdf section in right column
		if (document.getElementById("right-col")!=null) {
			var rightcolid = document.getElementById("right-col");
			var rightcoldivs = rightcolid.getElementsByTagName("div");
			//alert(rightcoldivs.length);

			//Get last div containing factsheet container
			var lastdiv = 0;
			for (k = 0; k < rightcoldivs.length; k++) {
				if (rightcoldivs[k].className == "factsheet_container") {
					lastdiv = k;
				}
			}
			for (j = lastdiv; j < rightcoldivs.length; j++) {
				if (rightcoldivs[j].className == "factsheet_container") {
					tmphtml = rightcoldivs[j].innerHTML;
					//alert(tmphtml);
					var rightcol_normalpdfurl = '<a href="' + normalprintpdf_url +'" title="Standard fact sheet" target="_blank">Standard fact sheet</a>';
					var rightcol_normalimg = '<sub><a href="' + normalprintpdf_url +'" class="noscript" title="Standard fact sheet" target="_blank"><img src="' + normalprintpdf_img +'" alt="Standard fact sheet"/></a></sub>';
					var rightcol_largepdfurl = '';
					var rightcol_largeimg = '';

					var htmltext = '<h2>Print or download this page as a fact sheet</h2><p>'+rightcol_normalpdfurl+rightcol_normalimg+'</p>';

					if (largepdfexist == "yes") {
						var rightcol_largepdfurl = '<a href="' + largeprintpdf_url +'" title="Large print fact sheet" target="_blank">Large print fact sheet</a>';
						var rightcol_largeimg = '<sub><a href="' + largeprintpdf_url +'" class="noscript" title="Large print fact sheet" target="_blank"><img src="' + largeprintpdf_img +'" alt="Large print fact sheet"/></a></sub>';
						htmltext += '<p>'+rightcol_largepdfurl+rightcol_largeimg+'</p>';
					}						

					rightcoldivs[j].innerHTML = tmphtml + '<div class="factsheet">' + htmltext + '</div>';

//					var output =  tmphtml + '<div class="factsheet">' + htmltext + '</div>';
//					alert(output);
//					rightcoldivs[j].innerHTML = output;
				}
			}

	
		}
	}


}

//Insert Factsheet icons in functions tools
function setFactsheetIcons(parentDocID, pdf_url, pdf_image, title_text, img_width, img_height)
{
	var parentid = document.getElementById(parentDocID);

	factsheetpdf = '<a class="noscript" target="_blank" title="'+title_text+'" href="'+pdf_url+'"><img width="'+img_width+'" height="'+img_height+'" alt="'+title_text+'" src="'+pdf_image+'" /></a>';

	parentid.innerHTML += factsheetpdf;

}


// obsolete functions
function setSideNav()
{
  return;
}


function setPage() {
	return;
}

function checkforspecialpages() {
	return;
}


// Check for Search Promotion
function checkForSearchPromo() {
//alert("hi 8");
	//check for search promotion
	var searchpromo_text = '';
	var searchpromo_exist = 'no';


	var divparent = document.getElementById("content-inner");
//alert(divparent.innerHTML);
	var divs = divparent.getElementsByTagName("div");
	//alert(divs.length);				


	//Get Search promo text (usually found at bottom of search content)
	for (i = 0; i < divs.length; i++) {
//alert(divs[i].className);

		if (divs[i].className == "searchpromo_top") {
			searchpromo_text = divs[i].innerHTML;
			searchpromo_exist = "yes";
		}
	}
	
	//Insert Search promo text (usually found at top of search content)
	for (j = 0; j < divs.length; j++) {
//alert(divs[j].className);

		if (divs[j].className == "search_promo_top_layer") {
			if (searchpromo_exist == 'yes') {				
				searchpromoinsert_text = searchpromo_text;
				divs[j].innerHTML = searchpromo_text;
				divs[j].className += " showPromo ";
				break;
			}
		}
	}

}

//Inserts last updated date in footer via metatag injection
function checkForLastUpdatedDate()
{
//alert('hi 8');
	var metaElements = document.all ?
	    document.all.tags('META') :
	    document.getElementsByTagName ?
	    document.getElementsByTagName ('META') : new Array();
	var metaKeywords = new Array();
	var mdateFound = "no";
	var i = 0;
	for (var m = 0; m < metaElements.length; m++) {
	    if (metaElements[m].name == 'dftadmin.modifydate') {
	      //alert(metaElements[m].content);
		  var modifydate = metaElements[m].content.substring(0,10);
		 // alert(modifydate);
		  mdateFound = "yes";
		  var newdate = formatDate(modifydate);
		  m = metaElements.length;
		  insertLastUpdateDate(newdate);
		}
	  }
	  if (mdateFound == "no") {
		var todaysdate = getTodaysDate();
		insertLastUpdateDate(todaysdate);
	  }
}

function formatDate(mdate) {

	var monthNames = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");

	//alert( tdate );

	var mdate_ar = mdate.split("-");
	var mdate_year = mdate_ar[0];
	//var mdate_month = parseInt(mdate_ar[1])-1;
	var mdate_month = getMonthInt(mdate_ar[1]);
	var mdate_day = mdate_ar[2];

	//alert(mdate_month);
	var newmdate= mdate_day + " " + monthNames[mdate_month] + " " + mdate_year +"  ";
	//alert(newmdate);

	return newmdate;

}

function getMonthInt(mnth) {
	var m;

	switch (mnth)
	  {
	  case '01': m='1'; break;
	  case '02': m='2'; break;
	  case '03': m='3'; break;
	  case '04': m='4'; break;
	  case '05': m='5'; break;
	  case '06': m='6'; break;
	  case '07': m='7'; break;
	  case '08': m='8'; break;
	  case '09': m='9'; break;
	  case '10': m='10'; break;
	  case '11': m='11'; break;
	  case '12': m='12'; break;
	  default: m='1';
  	}

	return parseInt(m)-1;
}

function getTodaysDate() {

	var monthNames = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");

	var today = new Date();
	var cDate = today.getDate();
	var cMonth = today.getMonth();
	var cYear = today.getFullYear();

	tdate= cDate + " " + monthNames[cMonth] + " " +cYear+"  ";

	//alert( tdate );

	return tdate;

}

function insertLastUpdateDate(newdate) {

	//lastupdatedate
	// Secondary page check 3 rows
	var getlastupdate=getElementsByClassName("lastupdatedate", "span", document.getElementById('ls-row-3'));
	//	alert(getlastupdate.innerHTML); 
	if (getlastupdate.length > 0) {
		var curlastupdate = getlastupdate[0].innerHTML;
		getlastupdate[0].innerHTML = curlastupdate + "&nbsp;" + newdate  + "&nbsp;&nbsp;";
	}

	//Homepage check - 4 rows
	if (getlastupdate.length == 0) {
	//	alert('testing'); 
		var getlastupdate2=getElementsByClassName("lastupdatedate", "span", document.getElementById('ls-row-4'));
		if (getlastupdate2.length > 0) {
			var curlastupdate2 = getlastupdate2[0].innerHTML;
			getlastupdate2[0].innerHTML = curlastupdate2 + "&nbsp;" + newdate  + "&nbsp;&nbsp;";
		}
	}

}

//Inserts starting number for ordered list
function checkForSearchResults()
{
//alert('hi 9');

	if (document.getElementById("searchResults")!=null) {
		//get page number of search results
		var getpageno=document.getElementById("currentPage").value; //getElementsByClassName("resultsTotal", "input", document.getElementById('searchResults'));
//			alert(getpageno); 
		var startingno = (parseInt(getpageno) * 10) - 9;
		$('ol#searchResults').attr('start', startingno);

	}
}

//Inserts selected class in top nav based on 3rd and 4th nodes in left nav
function checkforTopNavSelected()
{
	//alert('hi 10');
	
	if (document.getElementById("breadcrumbs")!=null) {

		br_ar = document.getElementById("breadcrumbs").getElementsByTagName("a");
		//alert(br_ar.length);

		if (br_ar.length < 2) {
			checkForLevel1();
		}
		else
		{
			//check for breadcrumbs array
			if (br_ar.length > 1) {
				//get first level node
				var gettopnav = br_ar[1].innerHTML.toLowerCase();
				var getbrtxt = stripString(gettopnav);		
				var checktopnav =getbrtxt.replace(/(?:&nbsp;|<br>)/g,'');
			
		          
				//alert(checktopnav.length +" - "+ checktopnav);
				//alert("Level 2, 3 or 4");
				if (document.getElementById("cim_menu")!=null) {
					topnav_ar = document.getElementById("cim_menu").getElementsByTagName("span");
			
					//alert(topnav_ar.length);
					for (i = 0; i < topnav_ar.length; i++) {
						checkspan = topnav_ar[i].innerHTML.toLowerCase();
//						alert(checkspan.length +" - "+ checkspan);
						var spantxt = stripString(checkspan);		
	          			var newspan =spantxt.replace(/(?:&nbsp;|<br>)/g,'');						
						
						if (newspan == checktopnav) {
							//alert("Bingo!");
							topnav_ar[i].parentNode.parentNode.className += " selected ";
							checkparent = topnav_ar[i].parentNode.parentNode.className;
							//alert(checkparent);
						}
						else
						{
						 //alert(topnav_ar[i].parentNode.parentNode.className);
						 //replace any previous selected as unselected
						 var current_class = topnav_ar[i].parentNode.parentNode.className;
						 var new_class = current_class.replace(" selected","");
						 //alert("********new_class**************"+new_class);
						 topnav_ar[i].parentNode.parentNode.className=new_class;						
						}
					}					

				}
			}
		}	
	}
}

function checkForLevel1() {

	//check for breadcrumbs array
	//alert("level 1");
	//get first level node
	if (document.getElementById("breadcrumbPgTitle")!=null) {

		var getbr = document.getElementById("breadcrumbPgTitle").innerHTML.toLowerCase();
		//alert("GET breadcrumbPgTitle = "+getbr);
		var getbrtxt = stripString(getbr);		
		var checkbr = getbrtxt.replace(/(?:&nbsp;|<br>)/g,'');
		//alert("******text ***** = "+checkbr);
		//alert(checkbr.length +" - "+ checkbr);
	
		if (document.getElementById("cim_menu")!=null) {
			topnav_ar = document.getElementById("cim_menu").getElementsByTagName("span");
		
			//alert(topnav_ar.length);
			for (i = 0; i < topnav_ar.length; i++) {
				checkspan = topnav_ar[i].innerHTML.toLowerCase();
				//alert(checkspan.length +" - "+ checkspan);
				var newspantxt = stripString(checkspan);
				var newspan =    newspantxt.replace(/(?:&nbsp;|<br>)/g,'');
				//alert("************newspan :=" + newspan);
				//alert(newspan.length +" - "+ newspan);
				if (newspan == checkbr) {
					//alert("Bingo!");
					topnav_ar[i].parentNode.parentNode.className += " selected";
					checkparent = topnav_ar[i].parentNode.parentNode.className;
					//alert(checkparent);
				}
				else
				{
				 //alert(topnav_ar[i].parentNode.parentNode.className);
				 //replace any previous selected as unselected
				 var current_class = topnav_ar[i].parentNode.parentNode.className;
				 var new_class = current_class.replace(" selected","");
				 //alert("********new_class**************"+new_class);
				 topnav_ar[i].parentNode.parentNode.className=new_class;
				}
			}					
		}

	}
}

function stripString(str) {
	var newstr = "";
	var bar = str.split(" ");
//alert(str);
	for (j = 0; j < bar.length; j++) {
		if (bar[j].length >1) {
		//alert(bar[j].length +" - "+ bar[j]);
			newstr += bar[j];
		}
	}
//	var replacestr = newstr.replace(/(\r\n|\n|\r)/gm,"");
	//alert(replacestr.length +" - "+replacestr);
	
	return newstr;
}


function checkForFontSizeUp() {
$("#function-tools-upper").find("a").each(function(){
var $this=$(this);
var text=$this.attr('title');
if (text == "Change text size increase") {
//alert(text);
$this.removeAttr("onkeypress");
$this.removeAttr("onclick");
$this.attr("href","javascript:resizeUp();");
//var testhref=$(this).attr('href');
//alert(testhref);
}	
})

$("#function-tools-lower").find("a").each(function(){
var $this=$(this);
var text=$this.attr('title');
if (text == "Change text size increase") {
$this.removeAttr("onkeypress");
$this.removeAttr("onclick");
$this.attr("href","javascript:resizeUp();");
}	
})

}