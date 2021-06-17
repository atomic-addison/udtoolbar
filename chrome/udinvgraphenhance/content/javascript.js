///////////////////////////////////////////////////////////////////////////////////////////
// Urban Dead Tool Bar                                                                   //
//                                                                                       //
// Code by Kyle Jones (sluutthefeared) - email: kylethefeared@gmail.com                  //
// Original extension by Dobos Andras (Ravenlord) - email: dobos_andras@hotmail.com      //
//                                                                                       //
// Released under the LGPL license; see http://www.gnu.org/copyleft/lesser.txt           //
// You may freely use and distribute this file, but you must release any changes you     //
// commit to the code.                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////
 //      REGISTER       //
/////////////////////////

window.addEventListener("load", function(){gaie.init(); }, false);
			
  /////////////////////////////////////////////
 //          TOOLBAR - OPEN URL IN NEW TAB  //
/////////////////////////////////////////////
function urbandead_LoadURL(URL)
{
	var newTab = getBrowser().addTab(URL);
	getBrowser().selectedTab = newTab;
}

function urbandead_pagerefresh()
{
	getBrowser().mCurrentTab.linkedBrowser.contentDocument.location = "http://www.urbandead.com/map.cgi";
}

  ///////////////////
 // Toolbar Prefs //
///////////////////
function udtoolbar_prefs()
{
	var prefWindow = "chrome://udinvgraphenhance/content/options.xul";
	window.openDialog(prefWindow, "Preferences", "chrome,modal,dialog,centerscreen,dependent");
}

var gaie = {
	init: function() 
	{
		var appcontent = document.getElementById("appcontent");   // browser
		if (appcontent)
		{
			appcontent.addEventListener("DOMContentLoaded", this.onPageLoad, false);
		}
		
		try
		{
			var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			preferences = preferences.getBranch("extensions.gaietool.");
			try {var AccountName = preferences.getCharPref("lastProfileUsed");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isExtensionEnabled = preferences.getBoolPref("isGAIEEnabled");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isGraphicsEnabled = preferences.getBoolPref("isGAIEGEnabled");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isMapEnabled = preferences.getBoolPref("isGAIEMEnabled");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isHumanCountEnabled = preferences.getBoolPref("isGAIEHCEnabled");			}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var HideBrainRot = preferences.getBoolPref("hideBrainRot");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isMenuEnabled = preferences.getBoolPref("isGAIEMenusEnabled");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isinvCarrotOpen = preferences.getBoolPref("isinvCarrotOpen");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isleastActiveOpen = preferences.getBoolPref("isleastActiveOpen");			}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var ismostActiveOpen = preferences.getBoolPref("ismostActiveOpen");			}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var mapBorders = preferences.getBoolPref("isGAIEMBorders");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isMapFixed = preferences.getBoolPref("isGAIEMFixed");					}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isInventoryEnabled = preferences.getBoolPref("isGAIEGInventory");			}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isStatsEnabled = preferences.getBoolPref("isGAIEGStats");				}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isNameTableEnabled = preferences.getBoolPref("isGAIENameTable");			}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}
			try {var isSuburbLinkEnabled = preferences.getBoolPref("isGAIESuburbLink");			}catch (err) {err = "InitLoad1:"+err; /*alert(err);*/}

		} catch(err){err = "InitLoad2:"+err; /*alert(err);*/}
	},

	onPageLoad: function(aEvent) 
	{
		var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
		var doc2 = document;
		//I copied this bit from ShadowLord's code - kudos!	
		try
		{
			if (doc!=doc2)
			{
				if (doc==null)
				{
					doc=doc2;
					//alert("doc was null, using document instead.");
				} else if (doc.location==null)
				{
					doc=doc2;
					//alert("doc.location was null, using document instead.");
				} else if (doc.location.href==null) 
				{
					doc=doc2;
					//alert("doc.location.href was null, using document instead.");
				}
			}
			if (doc==null)
			{
			//	alert("doc is null.");
				return;
			} else if (doc.location==null)
			{
			//	alert("doc.location is null.");
				return;
			} else if (doc.location.href==null)
			{
			//	alert("doc.location.href is null");
				return;
			}
		}
		catch (e)
		{
			 //alert("GAIE Error while loading page:"+e);
		}

		var isUDPage = doc.location.href.search("urbandead.com") > -1;
		var isUDSkillPage = doc.location.href.search("skills.cgi") > -1;
		var isMapPage = false;

		try{
			if (doc.location.href.search("urbandead.com/map.cgi") > -1 || doc.location.href.search("map.cgi.htm") > -1)
			{
				var ps = doc.getElementsByTagName("body")[0].getElementsByTagName("p");
				for (var i = 0;i < ps.length; i++)
				{
					if (ps[i].innerHTML.search("Action Points remaining.") > -1)
					{
						var AccountName = ps[i].getElementsByTagName("a")[0].childNodes[0].innerHTML;
						document.getElementById("gaiecurracc").label = "Account: "+AccountName;
						isMapPage = true;
					}
					
				}
			}
		}catch(err){err = "Error getting name! "+err; /*alert(err);*/}

		var isExtensionEnabled = false;
		var isGraphicsEnabled = false;
		var isMapEnabled = false;
		var isHumanCountEnabled = false;
		var hideBrainRot = false;
		var isinvCarrotOpen = false;
		var isleastActiveOpen = false;
		var ismostActiveOpen = false;
		var mapBorders = false;
		var isMapFixed = false;
		var isInventoryEnabled = false;
		var isStatsEnabled = false;
		var isNameTableEnabled = false;
		var isSubrubLink = false;
		var isMenuEnabled = false;

		try {
			var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			preferences = preferences.getBranch("extensions.gaietool.");
			try {isExtensionEnabled = preferences.getBoolPref("isGAIEEnabled");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isGraphicsEnabled = preferences.getBoolPref("isGAIEGEnabled");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isMapEnabled = preferences.getBoolPref("isGAIEMEnabled");			} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isHumanCountEnabled = preferences.getBoolPref("isGAIEHCEnabled");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {hideBrainRot = preferences.getBoolPref("hideBrainRot");			} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isMenuEnabled = preferences.getBoolPref("isGAIEMenusEnabled");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isinvCarrotOpen = preferences.getBoolPref("isinvCarrotOpen");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isleastActiveOpen = preferences.getBoolPref("isleastActiveOpen");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {ismostActiveOpen = preferences.getBoolPref("ismostActiveOpen");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {mapBorders = preferences.getBoolPref("isGAIEMBorders");			} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isMapFixed = preferences.getBoolPref("isGAIEMFixed");			} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isInventoryEnabled = preferences.getBoolPref("isGAIEGInventory");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isStatsEnabled = preferences.getBoolPref("isGAIEGStats");			} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isNameTableEnabled = preferences.getBoolPref("isGAIENameTable");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			try {isSuburbLink = preferences.getBoolPref("isGAIESuburbLink");		} catch (err) {err = "Mainload:"+err; /*alert(err);*/}
			preferences.setCharPref("lastProfileUsed", AccountName);

		} catch(err){err = "Mainload2:"+err; /*alert(err);*/}

		if (!isExtensionEnabled) { return; }
		if (isUDSkillPage && hideBrainRot) { removeRot(doc);	return; }

		if (isMapPage) {
			var browser = gBrowser.getBrowserAtIndex(0);
			for(var i = 1; i < gBrowser.mPanelContainer.childNodes.length; i++) {
				if (browser.contentDocument == doc)
					break;
				browser = gBrowser.getBrowserAtIndex(i);
			}

			/*Get important page elements*/
			var leftCell = getElementsByClassName(doc, "cp", "td")[0];
			var cityMap = getElementsByClassName(leftCell, "c", "table")[0];
			var cityCells = cityMap.getElementsByTagName("td");
			var headsUpDisplay = getElementsByClassName(leftCell, "gt", "p")[0];
			var gameLinks = getElementsByClassName(leftCell, "y", "a");
			var gameText = getElementsByClassName(doc, "gp", "td")[0];
			var roomDescription = getElementsByClassName(gameText, "gt", "div")[0];
			var actionForms = getElementsByClassName(gameText, "a", "form");
			var isDead = ((headsUpDisplay.innerHTML.search(/you are <b>dead<\/b>/) > -1) ?1:0); //Determine if you're a zombie

			/*get coordinates and block cell*/
			var currentBlock = getCurrentBlock(cityCells);
			var coords = getCurrentCoords(cityCells);			

			setNewCSS(doc, isGraphicsEnabled);

			if (isMapEnabled)
			{
				fillMapCells(doc, cityMap, cityCells, coords);
				buildingMap(doc);
				cityMap.className += " fxMap";
			}

			if (coords[0] >= 0)
				nameLink(cityCells, coords, currentBlock, isSuburbLink);

			if (isHumanCountEnabled)
				humanCount(doc, cityCells, roomDescription, currentBlock);
			if (isStatsEnabled)
				graphicalStats(doc, isDead, cityCells, headsUpDisplay);
			if (!isDead && isInventoryEnabled && coords[0] >= 0)
				inventory(doc, cityCells, headsUpDisplay, actionForms, isinvCarrotOpen);
			if (isMenuEnabled)
			{
				menus(doc, headsUpDisplay, coords);
				actionsMenu(doc, headsUpDisplay, actionForms, gameText);
				stripButtons(gameLinks);
				formatKeywords(doc, roomDescription);
			}
			repeatActions(doc, browser, actionForms, gameText);
			if (isInventoryEnabled)
				removeItems(doc, actionForms, gameText, isDead);
			directionToCoords(gameText, cityMap, coords);
			if (isNameTableEnabled)
				formatNames(doc, roomDescription, actionForms, isleastActiveOpen, ismostActiveOpen);
			if (isMapFixed)
				floatMap(doc, cityMap, headsUpDisplay);
			if (mapBorders)
				overlay(cityCells, "border");
			checkWarnings(doc);
			browser.addEventListener("mouseover", mouseOver, false);
		}

		function mouseOver(aEvent) {
			try{
				if (!isMenuEnabled)
					return;

				var menu = doc.getElementById('userMenu');

				if (aEvent.target.href) //Look for profile links
				{
					if (aEvent.target.href.search(/profile\.cgi\?id=(\d+)/) > -1)
					{
						var profileID = aEvent.target.href.match(/profile\.cgi\?id=(\d+)/)[1];
						if (aEvent.target.parentNode.className.match(/b c\w/))
							return;
					}
				} else { //Look for other targets
					if (aEvent.target.className == "target")
					{
						var profileID = aEvent.target.id.substr(0,1);
					}
				}

				if (profileID) //If target was detected, set visibility, position and input target value
				{
					var curleft = 0;
					var curtop = 0;

					var obj = aEvent.target;

					if (obj.offsetParent)
					{
						while (obj.offsetParent)
						{
							curleft += obj.offsetLeft;
							curtop += obj.offsetTop;
							obj = obj.offsetParent;
						}
					}

					menu.style.display = "block";

					menu.style.left = curleft - menu.offsetWidth;
					menu.style.top = curtop;

					var inputs = menu.getElementsByTagName("input");
					for (var i = 0; i < inputs.length; i++)
					{
						if (inputs[i].name == "target")
							inputs[i].value = profileID;
					}
					return;
				}

				obj = aEvent.target; //If event is not a target, check to see if event is from a child of the menu, hide otherwise
				
				while (obj.parentNode)
				{
					if (obj.parentNode.id == menu.id)
					{
						return;
					}
					obj = obj.parentNode;
				}

				menu.style.display = "none";
			}catch(err){err = "Error in user menu handling "+err; /*alert(err);*/}
		}
	}
}

function grabContents(cssfile)
{	var lines = "";
	var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
	istream.init(cssfile, 0x01, 0444, 0);
	istream.QueryInterface(Components.interfaces.nsILineInputStream);
	// read lines into array
	var line = {}, hasmore;
	do {
		hasmore = istream.readLine(line);
		lines += line.value; 
		lines += "\n";
	} while(hasmore);
		
	istream.close();

	return lines;
}

function grabContentsAlternate(aURL)
{
    var ioService=Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);
    var scriptableStream=Components
        .classes["@mozilla.org/scriptableinputstream;1"]
        .getService(Components.interfaces.nsIScriptableInputStream);
    var channel=ioService.newChannel(aURL,null,null);
    var input=channel.open();
    scriptableStream.init(input);
    var str=scriptableStream.read(input.available());
    scriptableStream.close();
    input.close();
    return str;
}

function setNewCSS(doc, isGraphicsEnabled)
{
	var head = doc.getElementsByTagName("head").item(0);
	var newstyle = doc.createElement('style'); 
	newstyle.type = 'text/css'; 
	var contents = "";
	var ret = 0;

	var cssLink = doc.createElement("link");
	cssLink.setAttribute("rel", "stylesheet");
	cssLink.setAttribute("href", "http://udtoolbar.mozdev.org/defaults.css");
	head.appendChild(cssLink);

	if (isGraphicsEnabled)
	{
		try
		{
			var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
			preferences = preferences.getBranch("extensions.gaietool.");
			var additionalCSSfile = preferences.getComplexValue("UDCSSFile_", Components.interfaces.nsILocalFile); 
			var filepath = preferences.getCharPref("UDCSSFilePath_");

			try
			{
				contents = grabContents(additionalCSSfile);
			}
			catch(err)
			{
				try
				{	err = "setNewCSS0:"+err;
					/*alert(err);*/
					contents = grabContentsAlternate(filepath);
				}
				catch(err)
				{
					err = "setNewCSS1:"+err;
					/*alert(err);*/
					ret =  -1;
				}
			}
		}
		catch(err)
		{
			err = "setNewCSS2:"+err;
			/*alert(err);*/
			ret = -1;
		}
	}

	newstyle.innerHTML += contents;
	head.appendChild(newstyle);

	return ret;
}


function checkWarnings(doc) {
	try{
		var head = doc.getElementsByTagName("HEAD")[0];
		var body = doc.getElementsByTagName("BODY")[0];

		var immediateWarning = doc.createElement("DIV");
		immediateWarning.className = "immediateWarning";
		body.insertBefore(immediateWarning, body.firstChild);

		var version = head.innerHTML.indexOf("<!--v13.30-->");
		if (version < 0)
		{
			
			var div = doc.createElement("DIV");
			div.className = "versionWarning";
			body.insertBefore(div, body.firstChild);
		}
	} catch(err) { err = "Error obtaining game version " +err; /*alert(err);*/}
}

function showRequest(aEvent) {
	try{
//Max
		//Yeah, this is really ghetto. I'll fix later.
		//var divs = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("DIV");
		var divs = aEvent.target.ownerDocument.getElementsByTagName("DIV");
//Max

		for (var i = 0; i < divs.length; i++)
		{
			if (divs[i].className == "requestDiv")
			{
				divs[i].style.display = "block";
				break;
			}
		}
	}catch(err){err = "Error displaying request window "+err; /*alert(err);*/}
}

function hideRequest(aEvent)
{
	try{
		this.parentNode.style.display = "none";
	}catch(err){err = "Error hiding request window "+err; /*alert(err);*/}
}

function childToggle(aEvent)
{
	try{
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		prefs = prefs.getBranch("extensions.gaietool.");

		var child = this.parentNode.getElementsByTagName("TABLE")[0];

		if (child.style.display == "none")
		{
			child.style.display = "table";
			this.className = "carrotOpen";
			prefs.setBoolPref("is" + this.id + "Open", true);
			
		} else
		{
			child.style.display = "none";
			this.className = "carrotClosed";
			prefs.setBoolPref("is" + this.id + "Open", false);
		}
	}catch(err){err = "Error displaying names "+err; /*alert(err);*/ }
}

function getElementsByClassName(parent, className, type)
{
	var returnElements = new Array();

	if (type != null)
	{
		var elements = parent.getElementsByTagName(type);

	} else {
		var elements = parent.getElementsByTagName('*');
	}
	
	var length = elements.length;
	for (var i = 0; i < length; i++)
	{
		if (elements[i].className == className)
		{
			returnElements.push(elements[i]);
		}
	}
	return returnElements;
}

function formatNames(doc, roomDescription, actionForms, isleastActiveOpen, ismostActiveOpen)
{
	try{
		var targets;

		for (var i = 0; i < actionForms.length; i++)
		{
			if (actionForms[i].innerHTML.search('value="Attack"') > -1)
			{
				var attackForm = actionForms[i];
				targets = actionForms[i].getElementsByTagName("select")[0];
				break;
			}
		}

		var width = Math.floor(roomDescription.offsetWidth / 150); //Number of cells in each row of the user name table
		var nameTable = doc.createElement("table");
		var nameRow = new Array();
		var nameCell = new Array();
		var i = 0;
		var rowIndex = -1;
		var nameIndex = 0;
		var over = false;
		var hpSpan;
		var nameLink;
		var zombieName;
		var str;
		var target;

		while(roomDescription.childNodes[i])
		{
			if(roomDescription.childNodes[i].tagName == "BR")
			{				
				break;
			}

			if(roomDescription.childNodes[i].href)
			{

				if (roomDescription.childNodes[i].innerHTML == "[list names]")
				{
					over = true;
					roomDescription.childNodes[i].innerHTML = "[list all names]";

					var titleLabelNames = ["leastActive", "mostActive"];
					var temp = 0;
					var bools = [isleastActiveOpen, ismostActiveOpen];

					var container = doc.createElement("DIV");

					for (var k = 0; k < 2; k++)
					{
						var nameTable = doc.createElement("table");
						var subContainer = doc.createElement("DIV");
						var title = doc.createElement("DIV");
						title.id = titleLabelNames[k];
					
						for (var j = temp; j < targets.length; j++)
						{
							if (targets[j].value == " ")
							{
								nameIndex = 0;
								rowIndex = -1;
								temp = j+3;
								break;
							}

							if (targets[j].value.search(/\d/) < 0)
								continue;

							if (nameIndex % width == 0)
							{
								rowIndex++;
								nameRow[rowIndex] = nameTable.insertRow(rowIndex);
							}

							nameLink = doc.createElement("A");
							nameLink.href = "profile.cgi?id=" + targets[j].value;
							nameLink.innerHTML = targets[j].innerHTML;

							nameCell = nameRow[rowIndex].insertCell(nameIndex%width);
							nameCell.appendChild(nameLink); //Append name to table cell
							nameIndex++;
						}

						title.addEventListener('click', childToggle, false);

						if (bools[k])
						{
							title.className = "carrotOpen";
						} else
						{
							nameTable.style.display = "none";
							title.className = "carrotClosed";
						}

						subContainer.appendChild(title);
						subContainer.appendChild(nameTable);
						container.appendChild(subContainer);
					}
					roomDescription.insertBefore(container, roomDescription.childNodes[i+2]);

					break;
				}

				if (nameIndex % width == 0)
				{
					rowIndex++;
					nameRow[rowIndex] = nameTable.insertRow(rowIndex);
				}

				nameCell = nameRow[rowIndex].insertCell(nameIndex%width);
				nameCell.appendChild(roomDescription.childNodes[i]); //Append name to table cell
				nameIndex++;

//Max
				// Excuse udWidget's Add/Remove Contacts Superscripted Tack
				if (roomDescription.childNodes[i].tagName == 'SUP')
				{
					nameCell.appendChild(roomDescription.childNodes[i]); //Append tack to table cell
				}
//Max

				if ((roomDescription.childNodes[i].data && roomDescription.childNodes[i].data.search(/\d+/) > -1) || roomDescription.childNodes[i].className == "inf") //Process HP values. " (60", "<sub>HP</sub>" and "), " are the next 3 child nodes.
				{
					hpSpan = doc.createElement("span");
					hpSpan.className = "";

					var hpText;

					if (roomDescription.childNodes[i].className == "inf")
					{
						hpSpan.className = "inf";
						hpText = roomDescription.childNodes[i].firstChild.data;
						roomDescription.removeChild(roomDescription.childNodes[i]);
					} else {
						var hpText = roomDescription.childNodes[i].data;
						for (var j = 0; j < 3; j++) //Remove all the HP value text
							roomDescription.removeChild(roomDescription.childNodes[i]);
					}

					if (hpText.length > 3) //Check for 2 digit numbers
					{
						if (hpText == " (60" || hpText == " (50") //If full health
							hpSpan.className += " hpFull"; //Set full HP
						else
							hpSpan.className += " hp" + hpText.charAt(2); //Otherwise, set to HP range 1-5
					} else { //Single digit number
						hpSpan.className += " hp0"; //Set to lowest hp range
					}

					hpSpan.innerHTML = hpText.substr(2,2); //Add the HP value to span
					
					nameCell.insertBefore(hpSpan, nameCell.firstChild); //Insert span
					
				} else {
					if (roomDescription.childNodes[i].data.indexOf("wounded") > -1 || roomDescription.childNodes[i].data.indexOf("dying") > -1)
					{
						hpSpan = doc.createElement("span");
						hpSpan.className = roomDescription.childNodes[i].data.indexOf("wounded") > -1?"hp1":"hp0";
						hpSpan.innerHTML = "*";

						nameCell.insertBefore(hpSpan, nameCell.firstChild); //Insert span
					}
					roomDescription.removeChild(roomDescription.childNodes[i]); //remove commas for users without diagnosis or scent blood
				}
			} else {
				i++;
			}
		}

		if (!over)
			roomDescription.insertBefore(nameTable, roomDescription.childNodes[i+1]);

		/*var zombieName;
		var str;
		var target;

		while(roomDescription.childNodes[i]) //Add additional name links, recognized zombies and corpses
		{
			if (roomDescription.childNodes[i].nodeName == "#text")
			{
				if (roomDescription.childNodes[i].data.search(/(You recognise)|(There is a lone zombie here. It)|(There is a dead body here. It)|(There is another zombie here. It)/) > -1)
//roomDescription.childNodes[i].data.indexOf("You recognise") > -1 || roomDescription.childNodes[i].data.indexOf("There is a lone zombie here") > -1 || roomDescription.childNodes[i].data.indexOf("There is a dead body here") > -1 || roomDescription.childNodes[i].data.indexOf("There is another zombie here") > -1 )
				{
					nameTable = doc.createElement("table");
					nameRow = new Array();
					nameCell = new Array();
					if (roomDescription.childNodes[i].data.indexOf("You recognise ") > -1)
					{
						str = roomDescription.childNodes[i].data.substr(0, roomDescription.childNodes[i].data.indexOf("You recognise"));
						str += "Amongst them you recognize";
					} else {
						str = roomDescription.childNodes[i].data.substr(0, roomDescription.childNodes[i].data.indexOf("It's") + 4);
					}

					rowIndex = -1;
					nameIndex = 0;

					for (var j = 0; j < targets.length; j++)
					{
						if (targets[j].value.search(/\d/) < 0)
							continue;

						zombieName = targets[j].innerHTML;//.substr(1, targets[j].innerHTML.length - 1);

						if (roomDescription.childNodes[i].data.indexOf(zombieName) > -1)
						{
							if (nameIndex % width == 0)
							{
								rowIndex++;
								nameRow[rowIndex] = nameTable.insertRow(rowIndex);
							}
							var zombieLink = doc.createElement("a");
							zombieLink.href = "profile.cgi?id=" + targets[j].value;
							zombieLink.innerHTML = targets[j].innerHTML;//zombieName;

							nameCell = nameRow[rowIndex].insertCell(nameIndex%width);
							nameCell.appendChild(zombieLink);
							nameIndex++;
							targets[j].parentNode.removeChild(targets[j]);
							j--;
						}
					}

					roomDescription.insertBefore(nameTable, roomDescription.childNodes[i]);
					roomDescription.insertBefore(doc.createTextNode(str), roomDescription.childNodes[i]);
					roomDescription.removeChild(roomDescription.childNodes[i+2]);
				}
			}
			i++;
		}*/
	}catch(err){err = "Error processing names "+err; /*alert(err);*/}
}

function formatKeywords(doc, roomDescription)
{
	try{
		for (var i = 0; i < roomDescription.childNodes.length; i++)
		{
			if (roomDescription.childNodes[i].nodeName == "#text")
			{
				if (roomDescription.childNodes[i].data.search(/edge the windows/) > -1) // Lazy hack here to add in trees and lights
					re = /(zombies)|(zombie)|(radio transmitter)|(barricaded)|(portable generator)|(fir tree)|(plastic Christmas tree)/;
				else
					re = /(zombies)|(zombie)|(radio transmitter)|(barricaded)|(portable generator)|(fir tree)|(plastic Christmas tree)|(lights)/;
				if (re.test(roomDescription.childNodes[i].data))
				{
					var strings = roomDescription.childNodes[i].data.split(re);
					roomDescription.removeChild(roomDescription.childNodes[i]);

					for (var j = strings.length-1; j >= 0; j--)
					{
						if (re.test(strings[j]))
						{
							var keyword = strings[j].match(re)[0];
							var target = doc.createElement("span");
							target.className = "target";
							target.id = keyword;
							if (target.id == "portable generator") // More laziness
								target.id = "generator";
							if (target.id == "fir tree")
								target.id = "htree";
							if (target.id == "plastic Christmas tree")
								target.id = "htree";
							if (target.id == "lights")
								target.id = "ilights";
							target.innerHTML = keyword;
							roomDescription.insertBefore(target, roomDescription.childNodes[i]);
						} else {
							roomDescription.insertBefore(doc.createTextNode(strings[j]), roomDescription.childNodes[i]);
						}
						
					}
				}
			}
		}
	}catch(err){err = "Adding keywords failed:"+err; /*alert(err);*/}
}

function removeRot(doc)
{
	var lis = doc.getElementsByTagName("li");

	try{
		for (var i = 0; i < lis.length; i++)
		{
			if (lis[i].innerHTML.search("Brain Rot") > -1)
			{
				lis[i].parentNode.removeChild(lis[i]);
			}
		}
	}catch(err){err = "doNewLayout2:"+err; /*alert(err);*/}
}

function removeItems(doc, actionForms, gameText, isDead)
{
	try{
	for (var i = actionForms.length - 1; i >= 0; i--)
	{
		if (actionForms[i].action.search(/map\.cgi\?use\-[A-Za-z]/) > -1)
		{
			actionForms[i].parentNode.removeChild(actionForms[i]);
		} else
		{
			if (actionForms[i].innerHTML.indexOf('name="drop"') > -1 && !isDead)
			{
				actionForms[i].parentNode.removeChild(actionForms[i].previousSibling);
				actionForms[i].parentNode.removeChild(actionForms[i]);		
			}
		}
	}

	ps = gameText.getElementsByTagName("P");
	for (var i = ps.length - 1; i >= 0; i--)
	{
		if (ps[i].innerHTML.indexOf("Inventory (click") > -1 || ps[i].innerHTML == "")
		{
			gameText.removeChild(ps[i]);
		}
	}
	}catch(err){err = "Failed to remove inventory items:"+err; /*alert(err);*/}
}

function itemPriority(itemType)
{
	if (itemType == "b6") //Pistols
		return 0;
	if (itemType == "b5")
		return 1;
	if (itemType == "b4")
		return 2;
	if (itemType == "b3")
		return 3;
	if (itemType == "b2")
		return 4;
	if (itemType == "b1")
		return 5;
	if (itemType == "b0")
		return 6;
	if (itemType == "s2") //Shotguns
		return 7;
	if (itemType == "s1")
		return 8;
	if (itemType == "s0")
		return 9;
	if (itemType.indexOf("B") > -1) //Handheld Radio, I've placed it high on the priority list to prevent problems with table cell stretching
		return 10;
	if (itemType == "c") //Flare guns
		return 11;
	if (itemType == "k") //Pistol Clips
		return 12;
	if (itemType == "r") //Shotgun shells
		return 13;
	if (itemType == "o") //Fire axes
		return 14;
	if (itemType == "d") //Crowbars
		return 15;
	if (itemType == "e") //Baseball bats
		return 16;
	if (itemType == "p") //Length of pipes
		return 17;
	if (itemType == "g") //Kitchen knifes
		return 18;
	if (itemType == "h") //FAKs
		return 19;
	if (itemType == "z") //Syringes
		return 20;
	if (itemType == "w") //Extractors
		return 21;
	if (itemType == "f") //Flak jackets
		return 22;
	if (itemType == "F") //Binoculars
		return 23;
	if (itemType == "C") //Radio Transmitter
		return 24;
	if (itemType == "a") //GPS units
		return 25; 
	if (itemType == "j") //Mobile phones
		return 26;
	if (itemType == "A") //Portable generators
		return 27;
	if (itemType == "i") //fuel cans
		return 28;
	if (itemType == "q") //wire cutters
		return 29;
	if (itemType == "x") //Spray cans
		return 30;
	if (itemType == "t") //beers
		return 31;
	if (itemType == "u") //wine bottles
		return 32;
	if (itemType == "l") //books
		return 33;
	if (itemType == "y") //poetry books
		return 34;
	if (itemType == "n") //newspapers
		return 35;
	if (itemType == "m") //crucifixes
		return 36;
	return 37; // In case I missed something
}

function inventorySort(items)
{
	var j;
	var index;
	for (var i = 0; i < items.length; i++)
	{
		index = items[i];
		j = i;
		while ((j > 0) && (itemPriority(items[j-1]) > itemPriority(index)))
		{
			items[j] = items[j-1];
			j = j - 1;
		}
		items[j] = index;
	}
}

function makeItem(doc, item)
{
	// Main container for item
	var container = doc.createElement("DIV");

	// Sub container for button, drop button and span
	var subContainer = doc.createElement("DIV");


	// Main button
	var itemForm = doc.createElement("FORM");
	itemForm.setAttribute("method", "post");

	var itemButton = doc.createElement("INPUT");
	itemButton.className = "itemButton";
	itemButton.value = "";
	itemButton.setAttribute("type", "submit");
	itemForm.appendChild(itemButton);


	// Drop button for item
	var dropForm = doc.createElement("FORM");
	dropForm.action = "map.cgi";
	dropForm.setAttribute("method", "post");
	
	var dropButton = doc.createElement("INPUT");
	dropButton.value = "";
	dropButton.className = "dropButton";
	dropButton.setAttribute("type", "submit");

	var dropItem = doc.createElement("INPUT");
	dropItem.setAttribute("name", "drop");
	dropItem.value = item.replace(/\./, "");
	dropItem.setAttribute("type", "hidden");

	dropForm.appendChild(dropButton);
	dropForm.appendChild(dropItem);

	subContainer.appendChild(itemForm);
	subContainer.appendChild(dropForm);

	// Title/Description for item
	var itemInfo = doc.createElement("DIV");
	itemInfo.className = "itemInfo";

	var title = doc.createElement("DIV");
	title.className = "itemTitle";

	var description = doc.createElement("DIV");
	description.className = "itemDesc";

	itemInfo.appendChild(title);
	itemInfo.appendChild(description);

	container.appendChild(itemInfo);
	container.appendChild(subContainer);

	var itemType = item.substr(0, 1); //Item type for use command is first letter

//Max
	// decorations and toolbox need to the whole item string appended to use-
	if ( item.indexOf("D") > -1 ||  item.indexOf("I") > -1 || item.indexOf("J") > -1 )
		itemForm.action = "map.cgi?use-" + item;
	else
		itemForm.action = "map.cgi?use-" + itemType;

	var ammoCount = item.substr(1, item.length - 1); //Ammo count if available, remaining portion of the string

	// decorations and toolbox need to have the ammoCount wiped off.
	if ( item.indexOf("D") > -1 || item.indexOf("I") > -1 || item.indexOf("J") > -1 ) ammoCount = null;

	if (itemType != itemType.toLowerCase())
		itemType = itemType + itemType; //To distinguish "A" from "a" in the CSS since the doctype used by UD makes the CSS case insensitive

	// decorations and toolbox can use the whole item string for the class name
	if ( item.indexOf("D") > -1 || item.indexOf("I") > -1 || item.indexOf("J") > -1 )
		container.className = "i" + item;
	else
		container.className = "i" + itemType;
//Max

	if (ammoCount)
	{
		if (ammoCount.length > 2) //Radio frequency rather than firearm ammo
		{
			var radioInput = doc.createElement("INPUT"); //Radios use an extra input for frequency
			radioInput.setAttribute("type", "hidden");
			radioInput.setAttribute("name", "freq");
			radioInput.setAttribute("value", item.substr(1, item.length - 1).replace(/\./, ""));
			itemForm.appendChild(radioInput);
		}
		var ammoCountSpan = doc.createElement("SPAN");
		ammoCountSpan.className = "ammoCount";
		ammoCountSpan.innerHTML = ammoCount;
		subContainer.appendChild(ammoCountSpan);
	}

	return container;
}

function addBinoculars(doc, tds)
{
	try{
		var icon = doc.createElement("DIV");
		icon.id = "binoculars";

		var directions = ["nw", "n", "ne", "w", "", "e", "sw", "s", "se"];
		var table = doc.createElement("TABLE");
		var tableRows = new Array();
		var tableCells = new Array();
		rowIndex = -1;
		for (var i = 0; i < 9; i++)
		{
			if (i % 3 == 0)
			{
				rowIndex++;
				tableRows[rowIndex] = table.insertRow(rowIndex);
			}
			tableCells[i] = tableRows[rowIndex].insertCell(i%3);
			
			if (i == 4)
				continue;

			var form = doc.createElement("FORM");
			form.action = "map.cgi?use-F";
			form.method = "post";

			var button = doc.createElement("INPUT");
			button.value = "";
			button.type = "submit";
			button.className = "binocularD" + directions[i];

			var buttonInfo = doc.createElement("INPUT");
			buttonInfo.name = "d";
			buttonInfo.type = "hidden";
			buttonInfo.value = directions[i];

			form.appendChild(buttonInfo);
			form.appendChild(button);

			tableCells[i].appendChild(form);
		}
		icon.appendChild(table);
		tds[5].appendChild(icon);
	}catch(err){err = "Error creating binocular interface "+err; /*alert(err);*/}
}

function inventory(doc, tds, headsUpDisplay, actionForms, isInventoryOpen)
{
	try{
		var forms = doc.getElementsByTagName("form");
		var itemType = new String();
		var items = new Array();

		var length = actionForms.length;
		for (var i = 0; i < length; i++)
		{
//Max
//			if (actionForms[i].action.search(/map\.cgi\?use\-[A-Za-z]/) > -1)
//			{
//				itemType = actionForms[i].action.match(/map\.cgi\?use\-(\w)/)[1];
			if (actionForms[i].action.search(/map\.cgi\?use\-[A-Za-z1-9]+/) > -1)
			{
				itemType = actionForms[i].action.match(/map\.cgi\?use\-([\w\d]+)/)[1];
//Max

				if (itemType == "b" || itemType == "s" || itemType == "B")
				{
					itemType += actionForms[i].innerHTML.match(/(\d+\.)?\d+/)[0];
				}
				if (itemType == "F" && actionForms[i].getElementsByTagName("select").length > 0)
				{
					addBinoculars(doc, tds);
				}
				items.push(itemType);
			}
		}

		inventorySort(items); //Sort items

		var inventoryRow = new Array();
		var inventoryCell = new Array();
		var ammoCount = new String();
		var pistolAmmo = 0;
		var shotgunAmmo = 0;
		var pistolClips = 0;
		var shotgunShells = 0;
		var FAKS = 0;
		var syringes = 0;
		var width = 10;
		var index = -1;
		var offset = 0;
		var j = 0;

		var inventoryTable = doc.createElement("TABLE");
		inventoryTable.className = "inventory";
		inventoryTable.id = "inventoryTable";

		for (var i = 0; i+offset < 60 || i < items.length; i++) //Loop to construct table
		{
			if ((i+offset) % width == 0)
			{
				index++;
				inventoryRow[index] = inventoryTable.insertRow(index);
				j = 0;
			}
			
			inventoryCell[i] = inventoryRow[index].insertCell(j);
			j++;
			if (i < items.length)
			{
				if (items[i].indexOf("B") > -1 && (i + offset) % 10 > 5) //Shift the radios so they don't screw up the table
				{
					for (var k = i+1; k < items.length; k++)
					{
						if ( items[k].indexOf("B") < 0 ) //Look for an item which isn't a radio
						{
							itemType = items[k]; //Swap items
							items[k] = items[i];
							items[i] = itemType;
							break;
						}
					}
				}

				inventoryCell[i].className = "item";
				inventoryCell[i].appendChild(makeItem(doc, items[i])); //Create and append item to cell

				if (items[i].search(/[bskrhzB]/) > -1) //Find important items, store item/ammo counts
				{
					if (items[i].indexOf("b") > -1 || items[i].indexOf("s") > -1)
					{
						itemType = items[i].substr(0, 1); //Item type
						ammoCount = items[i].substr(1, 1); //Ammo count
						inventoryCell[i].setAttribute("colspan", "2");
						offset+=1;
						if (items[i].indexOf("b") > -1)
							pistolAmmo += parseInt(ammoCount);
						else
							shotgunAmmo += parseInt(ammoCount);
					} else
					if (items[i] == "k")
					{
						pistolClips++;
					} else
					if (items[i] == "r")
					{
						shotgunShells++;
					} else
					if (items[i] == "h")
					{
						FAKS++;
					} else
					if (items[i] == "z")
					{
						syringes++;
					} else
					if (items[i].indexOf("B") > -1)
					{
						inventoryCell[i].setAttribute("colspan", "5");
						offset+=4;
					}
				}
			} else {
				inventoryCell[i].innerHTML = "&nbsp;";
				if (i + offset >= 51)
				{
					inventoryCell[i].className = "itotal";
				}
			}
		}

		inventoryCell[i-1].innerHTML = "<span>" + (items.length + offset) + "/51</span>";

		var summaryTable = doc.createElement("table");
		summaryTable.className = "inventory";
		summaryTable.id = "inventoryBar";

		var summaryRow = summaryTable.insertRow(0);
		var summaryCell = new Array();
		
		summaryCell[0] = summaryRow.insertCell(0);
		summaryCell[0].className = "item";
		summaryCell[0].appendChild(makeItem(doc, "b"+pistolAmmo));
		summaryCell[1] = summaryRow.insertCell(1);
		summaryCell[1].className = "item";
		summaryCell[1].appendChild(makeItem(doc, "s"+shotgunAmmo));
		summaryCell[2] = summaryRow.insertCell(2);
		summaryCell[2].className = "item";
		summaryCell[2].appendChild(makeItem(doc, "k"+pistolClips));
		summaryCell[3] = summaryRow.insertCell(3);
		summaryCell[3].className = "item";
		summaryCell[3].appendChild(makeItem(doc, "r"+shotgunShells));
		summaryCell[4] = summaryRow.insertCell(4);
		summaryCell[4].className = "item";
		summaryCell[4].appendChild(makeItem(doc, "h"+FAKS));
		summaryCell[5] = summaryRow.insertCell(5);
		summaryCell[5].className = "item";
		summaryCell[5].appendChild(makeItem(doc, "z"+syringes));

		var container = doc.createElement("DIV");

		var carrot = doc.createElement("DIV");
		carrot.id = "invCarrot";
		carrot.addEventListener('click', childToggle, false);

		container.appendChild(carrot);
		container.appendChild(inventoryTable);

		//summaryCell[6] = summaryRow.insertCell(6);
		//summaryCell[6].appendChild(carrot);
		//summaryCell[6].appendChild(inventoryTable);

		if (isInventoryOpen)
		{
			carrot.className = "carrotOpen";
		} else
		{
			inventoryTable.style.display = "none";
			carrot.className = "carrotClosed";
		}

		headsUpDisplay.appendChild(summaryTable);
		headsUpDisplay.appendChild(container);
//Max
//		headsUpDisplay.appendChild(createBarGraph(doc, "INV", items.length + offset, 51, 51, (items.length + offset > 45) ? true:false));

		// Encumbrance Scale
		var gameText = getElementsByClassName(doc, "gp", "td")[0];
		var ps = gameText.getElementsByTagName("P");
		var Cumber = null;
		var encumberance = 0;
		for (var p = ps.length - 1; p >= 0; p--)
		{
			Cumber = ps[p].innerHTML.match(/^You are (\d+)\% encumbered.$/); // You are 60% encumbered.
			if (Cumber)
			{
				encumberance = parseInt(Cumber[1]);

				gameText.removeChild(ps[p]);
				
				break;
			}
		}
		headsUpDisplay.appendChild(createBarGraph(doc, "INV", encumberance, 120, 60, (encumberance > 88) ? true:false));
//Max

	}catch(err){err = "Error constructing inventory "+err; /*alert(err);*/}
}

function repeatActions(doc, browser, actionForms, gameText)
{
	try {
		var postDataParams;
		var buttonText = "";

		var repeatForm = doc.createElement("FORM");
		repeatForm.setAttribute("method", "post");

		re = /(search\w?)|(barricade)|(use-(h|w))/;

		if (re.test(doc.location.href))
		{
			var type = doc.location.href.match(re)[0];
			for (var i = 0; i < actionForms.length; i++)
			{
				if (actionForms[i].action.indexOf(type) > -1)
				{
					repeatForm.action = actionForms[i].action;
				}
			}

			if (doc.location.href.search(/use/) > -1)
			{
				postDataParams = getPostData(browser);

				if (doc.location.href.search(/use-h/) > -1)
					buttonText = "Heal Again";
				else
					buttonText = "Extract DNA Again";			
			}

			if (doc.location.href.search(/search/) > -1)
				buttonText = "Search Again";
			if (doc.location.href.search(/barricade/) > -1)
				buttonText = "Barricade Again";
		} else {
			if (postDataParams = getPostData(browser))
			{
				for (var i = 0; i < postDataParams.length; i++)
				{
					if (postDataParams[i].search(/weapon/) > -1)
					{
						var inputs;
						for (var j = 0; j < actionForms.length; j++)
						{
							if (inputs = actionForms[j].getElementsByTagName("INPUT"))
							{
								if (inputs[0].value == "Attack")
									repeatForm.action = "map.cgi";
							}
						}
						buttonText = "Attack Again";
					}
				}
			}
		}


		if (!repeatForm.action)
			return;

		if (postDataParams)
		{
			var repeatPostData = new Array();
			for (var i = 0; i < postDataParams.length; i++)
			{
				var data = postDataParams[i].split("=");
				repeatPostData[i] = doc.createElement("INPUT");
				repeatPostData[i].setAttribute("type", "hidden");
				repeatPostData[i].setAttribute("name", data[0]);
				repeatPostData[i].setAttribute("value", data[1]);
				repeatForm.appendChild(repeatPostData[i]);
			}
		}

		var repeatButton = doc.createElement("INPUT");
		repeatButton.setAttribute("class", "m");
		repeatButton.setAttribute("type", "submit");
		repeatButton.setAttribute("value", buttonText);
		repeatForm.appendChild(repeatButton);

		var ps = gameText.getElementsByTagName("p");
		var br = doc.createElement("BR");

		for (var i = 0; i < ps.length; i++)
		{
			if (ps[i].firstChild.innerHTML.indexOf("You") == 0 || i == 0)
			{
				ps[i].insertBefore(repeatForm, ps[i].firstChild.nextSibling);
				ps[i].insertBefore(br, ps[i].firstChild.nextSibling);
			}
		}
		
       	}catch(err){err = "Error getting creating repeat button "+err; /*alert(err);*/}
}

function getPostData(browser)
{
	try {
		var targetPID = 0;
		var sessionHistory = browser.webNavigation.sessionHistory; //I've used session history so I can search for previous targets after other actions have been performed
		var entry = sessionHistory.getEntryAtIndex(sessionHistory.index, 0);
		entry = entry.QueryInterface(Components.interfaces.nsISHEntry);
		var postDataStream = entry.postData;
               	postDataStream.QueryInterface(Components.interfaces.nsISeekableStream).seek(0,0);
		var inputStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
               	inputStream.init(postDataStream);
		var postData = inputStream.read(0xFFFFFFFF);
               	var sParams = postData.split("\r\n\r\n")[1];
		var params = sParams.split("&");
		/*
		for (var i = 0; i < params.length; i++)
		{
			var data = params[i].split("=");
			if (data[0] == "target")
				targetPID = data[1];
		}
		//if (targetPID > 0)*/
		return params;
			
       	}catch(err){err = "Error getting post data "+err; /*alert(err);*/}
}

function floatMap(doc, cityMap, headsUpDisplay)
{
	try{
		var map = doc.createElement("DIV");
		map.className = "fm";
	
		var newTable = doc.createElement("TABLE");
		newTable.setAttribute("width", "300");
		cityMap.parentNode.replaceChild(newTable,cityMap); //Replace with an empty table to preserve place
	
		map.appendChild(cityMap);
		map.appendChild(headsUpDisplay);

		var links = getElementsByClassName(doc, "y", "a");
		for (var i = 0; i < links.length; i++)
		{
			map.appendChild(links[i].parentNode);
		}

		doc.getElementsByTagName("body")[0].appendChild(map);
	}catch(err){err = "floatMap:"+err; /*alert(err);*/}	
}

function actionsMenu(doc, headsUpDisplay, actionForms, gameText)
{
	try{
		var actions = new Array();
		var subMenus = new Array();

		var menu = doc.createElement("UL");
		menu.setAttribute("class", "menu");
		
		var title = doc.createElement("LI");
		title.className = "actionsLabel";

		var root = doc.createElement("UL");

		for (var i = actionForms.length -1; i >= 0; i--)
		{
			if (actionForms[i].innerHTML.indexOf('value="Attack"') > -1)
			{
				actionForms[i].parentNode.removeChild(actionForms[i]);
			}

			if (actionForms[i].action.search(/map.cgi\?\w+[^-]$/) > -1)
			{
				actions[actions.length] = doc.createElement("LI");
				
				var button = actionForms[i].getElementsByTagName("INPUT")[0]; //Get the button from the form
				button.parentNode.removeChild(button); //Remove it from the form
				button.value += actionForms[i].innerHTML; //Add in text to button, such as "(20AP)"
				actionForms[i].innerHTML = ""; //Remove text from form
				actionForms[i].appendChild(button); //Put the button back
				actionForms[i].className = ""; //Strip classname so d.css doesn't format these forms

				if (actionForms[i].action.search(/map.cgi\?search\w/) > -1)
				{
					if (root.innerHTML.indexOf("searchLabel") < 0)
					{
						var searchTitle = doc.createElement("LI");
						searchTitle.className = "searchLabel";
						var searchItem = doc.createElement("UL");
						searchTitle.appendChild(searchItem);

						root.appendChild(searchTitle);
					}
					var searchItemTitle = doc.createElement("LI");
					searchItemTitle.appendChild(actionForms[i]);

					root.lastChild.lastChild.appendChild(searchItemTitle);
					continue;
				}

				actions[actions.length-1].appendChild(actionForms[i]);
				root.appendChild(actions[actions.length-1]);
			}
		}

		if(root.childNodes.length == 0)
			return;

		title.appendChild(root);
		menu.appendChild(title);

		headsUpDisplay.appendChild(menu);

		var ps = gameText.getElementsByTagName("P");
		for (var i = ps.length - 1; i >= 0; i--)
		{
			if (ps[i].innerHTML.indexOf("Possible actions") > -1)
			{
				var br = doc.createElement("BR");
				gameText.replaceChild(br, ps[i]);
			}
		}
	}catch(err){err = "actions menu error:"+err; /*alert(err);*/}
}

function menus(doc, headsUpDisplay, coords)
{
	try{
	var yourProfile = headsUpDisplay.getElementsByTagName("a")[0];

	/* Add logout and contacts button to name menu */
	var menu = doc.createElement("UL");
	menu.setAttribute("class", "menu");
		
	var title = doc.createElement("LI");

	yourProfile.parentNode.replaceChild(menu, yourProfile);
	title.appendChild(yourProfile);

	var root = doc.createElement("UL");

	/*logout button menu element and form*/
	var logout = doc.createElement("FORM");
	logout.setAttribute("action", "map.cgi?logout");
	logout.setAttribute("method", "post");

	var logoutButton = doc.createElement("INPUT");
	logoutButton.setAttribute("class", "m");
	logoutButton.setAttribute("type", "submit");
	logoutButton.setAttribute("value", "Logout");

	logout.appendChild(logoutButton);

	var logoutMenu = doc.createElement("LI");
	logoutMenu.appendChild(logout);

	root.appendChild(logoutMenu);

	/*skills button menu element and form*/
	var skills = doc.createElement("FORM");
	skills.setAttribute("action", "skills.cgi");
	skills.setAttribute("method", "post");

	var skillsButton = doc.createElement("INPUT");
	skillsButton.setAttribute("class", "m");
	skillsButton.setAttribute("type", "submit");
	skillsButton.setAttribute("value", "Buy Skills");

	skills.appendChild(skillsButton);

	var skillsMenu = doc.createElement("LI");
	skillsMenu.appendChild(skills);

	root.appendChild(skillsMenu);

	/*contact button menu element and form*/
	var contacts = doc.createElement("FORM");
	contacts.setAttribute("action", "contacts.cgi");
	contacts.setAttribute("method", "post");

	var contactsButton = doc.createElement("INPUT");
	contactsButton.setAttribute("class", "m");
	contactsButton.setAttribute("type", "submit");
	contactsButton.setAttribute("value", "View Contacts");

	contacts.appendChild(contactsButton);

	var contactMenu = doc.createElement("LI");
	contactMenu.appendChild(contacts);

	root.appendChild(contactMenu);

	try{
		/*revive request button*/
		var requestButton = doc.createElement("INPUT");
		requestButton.setAttribute("class", "m");
		requestButton.setAttribute("type", "submit");
		requestButton.setAttribute("value", "Request DEM Revive");
		requestButton.addEventListener('click', showRequest, false)

		var requestMenu = doc.createElement("LI");
		requestMenu.appendChild(requestButton);

		root.appendChild(requestMenu);

		requestDEMRevive(doc, yourProfile, coords);
	}catch(err){err = "revive button error:"+err; /*alert(err);*/}

	title.appendChild(root);
	menu.appendChild(title);

	var syringe = 0;
	var FAK = 0;
	var DNA = 0;

	var forms = doc.getElementsByTagName("form");
	for (var i = 0; i < forms.length; i++) //Look for syringe, DNA Extractor and First Aid Kits
	{
		if (forms.item(i).className == "a")
		{
			if (forms.item(i).action.indexOf("use-h") > -1)
				FAK = 1;
			else
				if (forms.item(i).action.indexOf("use-z") > -1)
					syringe = 1;
				else
					if (forms.item(i).action.indexOf("use-w") > -1)
						DNA = 1;
		}
	}

	var weapons = new Array();

	var selects = doc.getElementsByTagName("select");
	for (var i = 0; i < selects.length; i++) //Get all the attack methods
	{
		if (selects[i].name == "weapon")
		{
			weapons = selects[i].getElementsByTagName("option"); 	
		}
	}

	/* Construct user name menu */
	var menu = doc.createElement("UL");
	menu.setAttribute("class", "menu2");
	menu.setAttribute("id", "userMenu");

	if (weapons.length > 0)
	{
		/* Add attack methods */
		var attackTitle = doc.createElement("LI");
		attackTitle.className = "attackLabel";

		var attackMenu = doc.createElement("UL");
			
		for (j = 0; j < weapons.length; j++)
		{
			var weaponMenu = doc.createElement("LI");

			attackForm = doc.createElement("FORM");
			attackForm.action = "map.cgi";
			attackForm.method = "post";

			targetInput = doc.createElement("INPUT");
			targetInput.type = "hidden";
			targetInput.name = "target";
			attackForm.appendChild(targetInput);

			var weaponItem = doc.createElement("INPUT");
			weaponItem.type = "hidden";
			weaponItem.name = "weapon";
			weaponItem.value = weapons[j].value;
			attackForm.appendChild(weaponItem);

			var weaponItem = doc.createElement("INPUT");
			weaponItem.className = "m";
			weaponItem.type = "submit";
			weaponItem.value = weapons[j].innerHTML;						
			attackForm.appendChild(weaponItem);

			weaponMenu.appendChild(attackForm);

			attackMenu.appendChild(weaponMenu);
		}
	attackTitle.appendChild(attackMenu);
	menu.appendChild(attackTitle);
	}

	if (FAK) //Yay for code re-use. I'm too lazy to fix now
	{
		/* Add heal menu item */
		var healTitle = doc.createElement("LI");

		var healForm = doc.createElement("FORM");
		healForm.setAttribute("action", "map.cgi?use-h");
		healForm.setAttribute("method", "post");

		var targetInput = doc.createElement("INPUT");
		targetInput.setAttribute("type", "hidden");
		targetInput.setAttribute("name", "target");
		healForm.appendChild(targetInput);

		var healValue = doc.createElement("INPUT");
		healValue.setAttribute("type", "hidden");
		healValue.setAttribute("value", "first-aid kit");
		healForm.appendChild(healValue);

		var healButton = doc.createElement("INPUT");
		healButton.setAttribute("class", "m");
		healButton.setAttribute("type", "submit");
		healButton.setAttribute("value", "Heal");
		healForm.appendChild(healButton);

		healTitle.appendChild(healForm);

		menu.appendChild(healTitle);
	}

	if (DNA)
	{
		/* Dna extractor menu item */ 
		var extractorTitle = doc.createElement("LI");

		var extractorForm = doc.createElement("FORM");
		extractorForm.setAttribute("action", "map.cgi?use-w");
		extractorForm.setAttribute("method", "post");

		var targetInput = doc.createElement("INPUT");
		targetInput.setAttribute("type", "hidden");
		targetInput.setAttribute("name", "target");
		extractorForm.appendChild(targetInput);

		var extractorValue = doc.createElement("INPUT");
		extractorValue.setAttribute("type", "hidden");
		extractorValue.setAttribute("value", "DNA extractor");
		extractorForm.appendChild(extractorValue);

		var extractorButton = doc.createElement("INPUT");
		extractorButton.setAttribute("class", "m");
		extractorButton.setAttribute("type", "submit");
		extractorButton.setAttribute("value", "Extract DNA");
		extractorForm.appendChild(extractorButton);

		extractorTitle.appendChild(extractorForm);

		menu.appendChild(extractorTitle);
	}

	if (syringe)
	{
		/* Add necrotech syringe menu item */
		var syringeTitle = doc.createElement("LI");

		var syringeForm = doc.createElement("FORM");
		syringeForm.setAttribute("action", "map.cgi?use-z");
		syringeForm.setAttribute("method", "post");

		var targetInput = doc.createElement("INPUT");
		targetInput.setAttribute("type", "hidden");
		targetInput.setAttribute("name", "target");
		syringeForm.appendChild(targetInput);

		var syringeValue = doc.createElement("INPUT");
		syringeValue.setAttribute("type", "hidden");
		syringeValue.setAttribute("value", "revivification syringe");
		syringeForm.appendChild(syringeValue);

		var syringeButton = doc.createElement("INPUT");
		syringeButton.setAttribute("class", "m");
		syringeButton.setAttribute("type", "submit");
		syringeButton.setAttribute("value", "Revive");
		syringeForm.appendChild(syringeButton);

		syringeTitle.appendChild(syringeForm);

		menu.appendChild(syringeTitle);
	}

	doc.getElementsByTagName("body")[0].appendChild(menu);
	}catch(err){err = "context menu:"+err; alert(err);}
}

function directionToCoords(gameText, cityMap, coords)
{
	try{
		var lis = gameText.getElementsByTagName("li"); //Need to fix for scent trail //(Now 1 west.) etc

		var north = 0;
		var east = 0;
		var south = 0;
		var west = 0;

		for (var i = 0; i < lis.length; i++)
		{
			if (lis[i].innerHTML.search(/A flare was fired/) > -1 || lis[i].innerHTML.search(/You heard a .*? groan/) > -1)
			{
				if (lis[i].innerHTML.search(/(\d+) blocks? to the north/) > -1) //Fix//Should change format //2 blocks to the east change to 2 east
					north = lis[i].innerHTML.match(/(\d+) blocks? to the north/)[1];
				else
					north = 0;
				if (lis[i].innerHTML.search(/(\d+) blocks? to the east/) > -1)
					east = lis[i].innerHTML.match(/(\d+) blocks? to the east/)[1];
				else
					east = 0;
				if (lis[i].innerHTML.search(/(\d+) blocks? to the south/) > -1)
					south = lis[i].innerHTML.match(/(\d+) blocks? to the south/)[1];
				else
					south = 0;
				if (lis[i].innerHTML.search(/(\d+) blocks? to the west/) > -1)
					west = lis[i].innerHTML.match(/(\d+) blocks? to the west/)[1];
				else
					west = 0;

				if (north || east || south || west) //Incase it was only "close by"
					lis[i].innerHTML = lis[i].innerHTML.replace(/(.*?\.)(.*)/, "$1 ["+ (coords[0] + parseInt(east) - parseInt(west)) +"-"+ (coords[1] - parseInt(north) + parseInt(south)) +"]$2");
			}
		}
	}catch(err){err = "directionToCoords:"+err; /*alert(err);*/}	
}

function nameLink(cityCells, coords, currentBlock, isSuburbLink)
{
	try{
	var suburb = Math.floor(coords[0] / 10) + coords[1] - coords[1]%10 + 1;

	var length = cityCells.length;
	for (var i = 0; i < length; i++)
	{
		if (cityCells[i].className == "sb")
		{
			var suburbName = cityCells[i].innerHTML.match(/[A-Za-z\s]+/)[0];
			
			if (isSuburbLink)
				cityCells[i].innerHTML = '<form name="suburbform" method=POST action="http://redrum.soul-fantasy.net/map.php?menu=goto" target="new_window">'
					+ '<input name="coord" type="hidden" value="' + coords[0] + "|" + coords[1] + '">'
					+ '<input class="sl" type=submit value="' + suburbName + '">'
					+ '</form>';

			cityCells[i].innerHTML += '&nbsp;[' + coords[0] + '-' + coords[1] + ']';
			break;
		}
	}
	}catch(err){err = "nameLink:"+err; /*alert(err);*/}	
}

function stripButtons(gameLinks)
{
	var length = gameLinks.length;
	for (var i = 0; i < length; i++)
	{
		gameLinks[i].parentNode.removeChild(gameLinks[i]);
	}
}

function requestDEMRevive(doc, yourProfile, coords)
{
	try{
		var PID = yourProfile.href.match(/profile\.cgi\?id=(\d+)/)[1];

		var requestDiv = doc.createElement("DIV");
		requestDiv.className = "requestDiv";
		
		var requestForm = doc.createElement("FORM");
		requestForm.setAttribute("action", "http://ud-malton.info/revive_requests.cgi");
		requestForm.setAttribute("method", "post");

		var idInput = doc.createElement("INPUT");
		idInput.setAttribute("type", "hidden");
		idInput.setAttribute("name", "UD_ID");
		idInput.setAttribute("value", PID);

		var xInput = doc.createElement("INPUT");
		xInput.setAttribute("type", "hidden");
		xInput.setAttribute("name", "X");
		xInput.setAttribute("value", coords[0]);

		var yInput = doc.createElement("INPUT");
		yInput.setAttribute("type", "hidden");
		yInput.setAttribute("name", "Y");
		yInput.setAttribute("value", coords[1]);

		var commentInput = doc.createElement("INPUT");
		commentInput.setAttribute("type", "text");
		commentInput.setAttribute("name", "Comments");
		commentInput.setAttribute("value", "UDToolbar");
		commentInput.setAttribute("size", "50");
		commentInput.setAttribute("maxlength", "255");

		var cancelButton = doc.createElement("INPUT");
		cancelButton.className = "m";
		cancelButton.setAttribute("type", "submit");
		cancelButton.setAttribute("value", "Cancel");
		cancelButton.addEventListener('click', hideRequest, false)
	
		var submitButton = doc.createElement("INPUT");
		submitButton.className = "m";
		submitButton.setAttribute("type", "submit");
		submitButton.setAttribute("name", "State");
		submitButton.setAttribute("value", "Submit Request");

		requestForm.appendChild(idInput);
		requestForm.appendChild(xInput);
		requestForm.appendChild(yInput);

		requestForm.appendChild(doc.createTextNode("Player ID: " + PID));
		requestForm.appendChild(doc.createElement("BR"));
		requestForm.appendChild(doc.createTextNode("Coordinates: " + coords[0] + "-" + coords[1]));
		requestForm.appendChild(doc.createElement("BR"));
		requestForm.appendChild(doc.createTextNode("Comment (Optional): "));
		requestForm.appendChild(doc.createElement("BR"));
		requestForm.appendChild(commentInput);
		requestForm.appendChild(doc.createElement("BR"));
		requestForm.appendChild(submitButton);

		if (coords[0] < 0)
		{
			requestDiv.innerHTML = "Unable to obtain your coordinates, try again when you have regained AP or IP hits.<br>";
		} else {
			requestDiv.appendChild(requestForm);
		}
		requestDiv.appendChild(doc.createTextNode(" "));
		requestDiv.appendChild(cancelButton);

		doc.getElementsByTagName("body")[0].appendChild(requestDiv);
	}catch(err){err = "DEM Revive error"+err; /*alert(err);*/}
}

function createBarGraph(doc, iconName, value, maxValue, notches, textHighlight)
{
	try{
		var barTable = doc.createElement("TABLE");
		barTable.setAttribute("id", iconName + "Table");
		barTable.className = "stattable";

		var iconRow = barTable.insertRow(0);
		var barRow = barTable.insertRow(1);
		var fillerRow = barTable.insertRow(2);

		var iconCell = iconRow.insertCell(0);
		iconCell.setAttribute("rowspan", "2");
		iconCell.className = "iconCell";

		iconCell.innerHTML = '<div class="statIcons"></div>'
			+ '<div class="statIconBackground" style="opacity:' + value / maxValue + '"></div>';

		var fillerCell = iconRow.insertCell(1);
		var barCell = barRow.insertCell(0);
		var barTable2 = doc.createElement("TABLE");
		var barRow2 = barTable2.insertRow(0);
		var barCell2 = new Array();

		for (var i = 0; i < notches; i++)
		{
			barCell2[i] = barRow2.insertCell(i);
			barCell2[i].setAttribute("style", "width:" + 100/notches + "%");
			barCell2[i].innerHTML += '<div class="notchBorders">'
				+ '<div class="barBackground'
				+ ((i < value/(maxValue/notches)) ? '':' clearNotch')
				+ '" style="opacity:' + ((i < value/(maxValue/notches)) ? (value / maxValue):0)
				+ '"></div></div>';
		}

		barCell.setAttribute("style", "width:100%");
		barCell.appendChild(barTable2);
		var statsCell = fillerRow.insertCell(0);
		fillerCell = fillerRow.insertCell(1);

		if (textHighlight)
			statsCell.innerHTML = '<span class="highLight">' + value + '</span>';
		else
			statsCell.innerHTML = '<span>' + value + '</span>';

		return barTable;
	}catch(err){err = "graphicalStats:"+err; /*alert(err);*/}
}

function graphicalStats(doc, isDead, cityCells, headsUpDisplay)
{
	try{
		var icons = ["HP", "AP", "XP"];
		var stats = [0,0,0];
		var scale = [60, 50, 150];
		var notches = [12, 10, 10];
		var highlight = 0;

		var isInfected = ((headsUpDisplay.innerHTML.search(/you are <b>infected<\/b>/) > -1) ?1:0); //Or infected
		if (isDead || isInfected) //set the appropriate HP icon
		{
			if (isDead)
			{
				icons[0] = "HPDead";
				//overlay(cityCells, "dead");
			}
			else
			{
				icons[0] = "HPInfected";
				//overlay(cityCells, "infection");
			}
		}

		var statsMatch = headsUpDisplay.innerHTML.match(/(<a.*a>).*?((\d+).*?(\d+).*?(\d+)|(-?\d+))/); //Grab all stats and name

		var nameLink = statsMatch[1]; //Get the name link

		if (statsMatch[3] == undefined) //Look for stats
		{
			if (statsMatch[6] != undefined) //Check if AP is shown
			{
				stats[1] = statsMatch[6]; //AP, other stats not shown
			}
		} else {
			stats[0] = statsMatch[3]; //HP
			stats[2] = statsMatch[4]; //XP
			stats[1] = statsMatch[5]; //AP
		}

		var statsTable = doc.createElement("TABLE"); //Create the main stats table
		statsTable.className = "statstable";
		var statRow = statsTable.insertRow(0);
		var statCells = new Array();
		for (var i = 0; i < 3; i++)
		{
			statCells[i] = statRow.insertCell(i);
			if (i < 2 && stats[i] < 10)
				highlight = true;
			else
				highlight = false;
			statCells[i].appendChild(createBarGraph(doc, icons[i], stats[i], scale[i], notches[i], highlight));
		}

		headsUpDisplay.innerHTML = nameLink;
		headsUpDisplay.appendChild(statsTable);
	}catch(err){err = "graphicalStats:"+err; /*alert(err);*/}
}

function overlay(cityCells, className)
{
	try{
		if (cityCells.length > 2) //Don't add if map not displayed
			cityCells[1].innerHTML = '<div class="' + className + '"></div>' + cityCells[1].innerHTML;
	}catch(err){err = "mapBorder:"+err; /*alert(err);*/}
}

function fillMapCells(doc, cityMap, cityCells, coords)
{
	try{
		if (cityCells.length < 10)
		{
			var left = ((coords[0] == 0) ? true:false);
			var right = ((coords[0] == 99) ? true:false);
			var top = ((coords[1] == 0) ? true:false);
			var bottom = ((coords[1] == 99) ? true:false);

			var cityRows = cityMap.getElementsByTagName("TR");
			var newRow;
			var newCell;

			if (top || bottom)
			{
				newRow = cityMap.insertRow(top?1:3);
				newCell = newRow.insertCell(0);
				newCell.className = "b c";
				newCell = newRow.insertCell(1);
				newCell.className = "b c";
				if (!left && !right)
				{
					newCell = newRow.insertCell(2);
					newCell.className = "b c";
				}
			}
			if (left || right)
			{
				newCell = cityRows[1].insertCell(left?0:2);
				newCell.className = "b c";
				newCell = cityRows[2].insertCell(left?0:2);
				newCell.className = "b c";
				newCell = cityRows[3].insertCell(left?0:2);
				newCell.className = "b c";
			}
		}
	}catch(err){err = "fillMapCells:"+err; /*alert(err);*/}
}


function buildingMap(doc)
{
	try{
		var tables = doc.getElementsByTagName("table");
		var citymap = tables.item(1);
		var tds = citymap.getElementsByTagName("td");
		var trs = citymap.getElementsByTagName("tr");
		var description = doc.getElementsByTagName("div").item(0);
		coords = getCurrentCoords(tds);

		renameMultiBlock(description, tds, trs.length);

//Max
//		if (tables.length == 3)
//		{
//			tds = tables[2].getElementsByTagName("td");
//			trs = tables[2].getElementsByTagName("tr");
//			necroNetMap(tables[2], tds, coords);
//			renameMultiBlock(description, tds, trs.length);
		if (tables.length > 2)
		{
			var t = 2;
			while (tables[t] && (tables[t].className != "nt") && (tables[t].className != "c bn") ) t++;
			if (tables[t])
			{
				tds = tables[t].getElementsByTagName("td");
				trs = tables[t].getElementsByTagName("tr");
				necroNetMap(tables[t], tds, coords);
				renameMultiBlock(description, tds, trs.length);
			}
		}
//Max

	}catch(err){err = "buildingmap:"+err; /*alert(err);*/}
}

function renameMultiBlock(description, tds, height)
{
	var inside = false;
	var offset = ((tds[0].className == "sb") ?0:1);
	height = height - 1 + offset;
	var length = tds.length - 1 + offset;	
	var width = Math.floor(length/height);
	var blocks = 0;
	var start = 0;
	var end = 0;
	var k = 0;
	var skip = 1;

	try{
	for (var i = 0; i < tds.length; i++)
	{
		if (tds[i].className == "b cx")
		{
			if (!inside)
			{
				inside = true;
				for (var j = 1; j < tds.length; j++)
				{
					if (tds[j].className != "b cx")
						tds[j].innerHTML = '<div class="fog"></div>' + tds[j].innerHTML;
				}
			}
			tds[i].className = getBuildingType(description.innerHTML.match(/((.*?\s*)*?\.){2}/)[0]); //Grab first two sentences, should contain the building type and skip usernames/sprays, returns building code.
		}

		if (tds[i].className.indexOf("c27") > -1)
			tds[i].className = "b c27"; //Fix oddly named club blocks

		if (tds[i].className.search(/\bc\d+\b/) > -1)
			tds[i].innerHTML = '<div class="building"></div>' + tds[i].innerHTML;


		if (tds[i].className.search(/\bc(2|6|16|25|31|39|4[0-5])\b/) > -1) //Look for non 4x4 multiblock buildings
		{
			if (tds[i].innerHTML.indexOf("52-80") > -1) //Check for Pole mall blocks
				tds[i].className = tds[i].className.replace(/c6/, "c60");
			if (tds[i].innerHTML.indexOf("53-80") > -1)
				tds[i].className = tds[i].className.replace(/c6/, "c61");
			if (tds[i].innerHTML.indexOf("53-81") > -1)
				tds[i].className = tds[i].className.replace(/c6/, "c63");

			if (tds[i].innerHTML.indexOf("51-81") > -1) //Check for Clapton stadium blocks
				tds[i].className = tds[i].className.replace(/c16/, "c160");
			if (tds[i].innerHTML.indexOf("52-81") > -1)
				tds[i].className = tds[i].className.replace(/c16/, "c164");
			if (tds[i].innerHTML.indexOf("51-82") > -1)
				tds[i].className = tds[i].className.replace(/c16/, "c162");
			if (tds[i].innerHTML.indexOf("52-82") > -1)
				tds[i].className = tds[i].className.replace(/c16/, "c163");

			if (tds[i].innerHTML.indexOf("64-55") > -1) //Check for UVA hq
				tds[i].className = tds[i].className.replace(/c2/, "c200");

			if (tds[i].innerHTML.indexOf("78-47") > -1) //Check for Fort Creedy
				tds[i].className = tds[i].className.replace(/c\d+/, "c310");
			if (tds[i].innerHTML.indexOf("79-47") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c311");
			if (tds[i].innerHTML.indexOf("80-47") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c312");
			if (tds[i].innerHTML.indexOf("78-48") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c313");
			if (tds[i].innerHTML.indexOf("80-48") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c314");
			if (tds[i].innerHTML.indexOf("78-49") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c315");
			if (tds[i].innerHTML.indexOf("79-49") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c316");
			if (tds[i].innerHTML.indexOf("80-49") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c317");

			if (tds[i].innerHTML.indexOf("84-89") > -1) //Check for Fort Perryn
				tds[i].className = tds[i].className.replace(/c\d+/, "c310");
			if (tds[i].innerHTML.indexOf("85-89") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c311");
			if (tds[i].innerHTML.indexOf("86-89") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c312");
			if (tds[i].innerHTML.indexOf("84-90") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c313");
			if (tds[i].innerHTML.indexOf("86-90") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c314");
			if (tds[i].innerHTML.indexOf("84-91") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c315");
			if (tds[i].innerHTML.indexOf("85-91") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c316");
			if (tds[i].innerHTML.indexOf("86-91") > -1)
				tds[i].className = tds[i].className.replace(/c\d+/, "c317");
		}

		if (tds[i].className.search(/\bc(6|16|25)\b/) > -1) //Search for multi-block buildings of type mall, stadium, or mansion
		{
			blocks++; //Store how many blocks of the building are currently displayed
			if (start == 0)
				start = i + offset; //Store where the building starts in the array
			end = i + offset; //And where it ends
		}
	}

	if (blocks == 1) //If only 1 block is visible, assign the corresponding value
	{
		k = start % width + ((end < width + 1) ? 2:0);
	}

	if (blocks == 2) //If 2 blocks are visible, the building is on the side of the map
	{
		if (end < width + 1) //Check for building on the top side
		{
			k = 2; //Start counting from 2 instead of 0
		} else {
			if (start < tds.length - width) //If not on top, check for left or right
			{
				k = start % width; //Start with corresponding value
				skip = 2;	//Skip a value in the count
			}
		} //If on bottom, nothing to be done
	}

	for (var i = 0; i < tds.length; i++)
	{
		if (tds[i].className.search(/\bc(6|16|25)\b/) > -1) //Search for multi-block buildings of type mall, stadium, or mansion
		{
			tds[i].className = tds[i].className.replace(/\b(c\d+)\b/, "$1"+k); //Add value to name
			k += skip; //Increment (or skip)
			k = k%4; //Incase two blocks are displayed on necroNet. Doesn't display properly in all cases, but doesn't try to display c64, c65, etc.
		}
	}

	}catch(err){err = "multiblock:"+err; /*alert(err);*/}
}

function necroNetMap(table, tds, coords) //Add label and zombie count to necronet map
{
	try{
		table.className = table.className + " fxMap";
		if (table.className.search(/bn/) > -1)
			return;
		for (var i = 0; i < tds.length; i++)
		{
			if (tds[i].className.search(/c\d+/) > -1)
			{
				var blockx = (i+1)%9;
				if (blockx == 0)
				blockx = 9; //Fix the 0 on right side
				blockx += coords[0] - 5;
				var blocky = Math.floor(i/9+1) + coords[1] - 5;
				var s = '<input value="[' + blockx + '-' + blocky + ']" class="m" type="submit">';		

				if (tds[i].innerHTML.search(/\d+/) > -1)
				{
					var zombieCount = tds[i].innerHTML.match(/\d+/)[0];
					tds[i].innerHTML.replace(/\d+/, "");
					zombieCount = parseInt(zombieCount);

					if (zombieCount > 0)
					s += '<br><span class="fz">' + zombieCount + ' zombie' + ((zombieCount > 1) ? "s":"") + '<\/span>';	
				}
				tds[i].innerHTML = s;
			}
		}
	}catch(err){err = "necroNetMap:"+err; /*alert(err);*/}
}

function getBuildingType(s) //Get building type given building name
{
	if (s.search(/\bNecroTech\b/) > -1) //NecroTech must be first, or "a NecroTech Building" will return type building
		return "b c20";
	if (s.search(/\bBuilding\b/) > -1)
		return "b c2";
	if (s.search(/\bcarpark\b/) > -1)
		return "b c3";
	if (s.search(/\bMall\b/) > -1)
		return "b c6";
	if (s.search(/\bSt.+Church\b/) > -1)
		return "b c7";
	if (s.search(/\bHospital\b/) > -1)
		return "b c9";
	if (s.search(/\bLibrary\b/) > -1)
		return "b c11";
	if (s.search(/\bArms\b/) > -1)
		return "b c10";
	if (s.search(/\bFire\s*Station\b/) > -1)
		return "b c13";
	if (s.search(/\bPolice\s*Dept\b/) > -1)
		return "b c12";
	if (s.search(/\bCinema\b/) > -1)
		return "b c14";
	if (s.search(/\bAuto\s*Repair\b/) > -1)
		return "b c15";
	if (s.search(/\bStadium\b/) > -1)
		return "b c16";
	if (s.search(/\bTowers\b/) > -1)
		return "b c17";
	if (s.search(/\bfactory\b/) > -1)
		return "b c18";
	if (s.search(/\bBank\b/) > -1)
		return "b c21";
	if (s.search(/\bZoo\b/) > -1)
		return "b c22";
	if (s.search(/\bMansion\b/) > -1)
		return "b c25";
	if (s.search(/\bClub\b/) > -1)
		return "b c27";
	if (s.search(/\bjunkyard\b/) > -1)
		return "b c29";
	if (s.search(/\b(M|H)otel\b/) > -1)
		return "b c30";
	if (s.search(/\bFort\b/) > -1)
		return "b c31";
	if (s.search(/\bArmoury\b/) > -1)
		return "b c32";
	if (s.search(/\bMuseum\b/) > -1)
		return "b c34";
	if (s.search(/\bRailway\s*Station\b/) > -1)
		return "b c35";
	if (s.search(/\bSchool\b/) > -1)
		return "b c36";
	if (s.search(/\bwarehouse\b/) > -1)
		return "b c38";

	return "b c";
}

function getCurrentCoords(tds) //Add a comment with current block coordinates, return coords
{
	try{
		if (tds.length < 4)
			return [-1,-1];
		var i = getCurrentBlock(tds); //Determine which td is your current block
		var x = 0;
		var y = 0;
		var x2 = 0;
		var y2 = 0;
		if (i + 1 >= tds.length) //Incase you're in the bottom right corner of the map
		{
			x = 99;
			y = 99;
		} else if (i > 1) //Skip if i = 1, you're in top left corner and x = y = 0
		{
			var coords = tds[i-1].innerHTML.match(/\d+-\d+/)[0]; //Check left and right, incase you're on the edge of the map
			coords = coords.split("-");
			x = parseInt(coords[0]);		
			y = parseInt(coords[1]);
			coords = tds[i+1].innerHTML.match(/\d+-\d+/)[0];
			coords = coords.split("-");
			x2 = parseInt(coords[0]);
			y2 = parseInt(coords[1]);
			x++; //First x is to left of your current block, so increment it
			x2--; //Second x value is to the right, so decrement
		}
		if (x != x2 && x == 2) //If not the same and x == 2, you're on left edge of map, x2 and y2 are correct coords
		{
			x = x2;
			y = y2;
		} //x and y have correct coordinates in other cases

		var s = "<!--" + x + "-" + y + "-->";
		if (tds[i].innerHTML.indexOf(s) < 0) //Do not add coordinates if already in html
			tds[i].innerHTML += s;

		coords = new Array(x, y);
		return (coords);

	}catch(err){err = "addCurrentCords:"+err; /*alert(err);*/}
}

function getCurrentBlock(tds) //Find your current block, the one without coords
{
	var i = 1;
	while(tds[i].innerHTML.search(/"\d+-\d+"/) > -1 && i < tds.length) {i++}
	return i;
}

function humanCount(doc, tds, description, currentBlock) //Strip names and add in human count to each cell
{
//Max
//	var humans = description.getElementsByTagName("a");
	var humans = null;
	var h = 0;
    var c = 0;
	while(description.childNodes[c])
	{
		var kid = description.childNodes[c];

		if (kid.tagName == "BR") { break; }

		if (kid.tagName == "A")
 		{
			if (kid.href.indexOf("profile.cgi?id=") > -1)
			{
				if (!humans) humans = new Array();
				humans[h++] = kid;
			}
		}

		c++;

	}  // while description childNodes
//Max

	try{
		for (var i = 1; i < tds.length; i++)
		{
			var as = tds[i].getElementsByTagName("a");
			var spans = tds[i].getElementsByTagName("span");
			var count = as.length;

			if (count > 0)
			{
				var s = " human" + ((count > 1) ? "s":""); //Begin string construction

				for (var j = 0; j < spans.length; j++) //Strip "..."'s and check if '+' needed
				{
					if (spans[j].className == "f")
					{
						spans.item(j).parentNode.removeChild(spans.item(j));
						j--;
						if (i != currentBlock) //Current block check based on room description
							s = "+" + s;
					}
				}

				for (var j = 0; j < as.length; j++) //Strip names, check for wounded
				{
					if (as.item(j).innerHTML.indexOf("*") > 0 && s.indexOf("*") < 0)
						s += "*";
					as.item(j).parentNode.removeChild(as.item(j));
					j--;
				}

				if (i == currentBlock) //Add in the human count
				{
					if (description.innerHTML.indexOf("wounded") > 0 && s.indexOf("*") < 0) //Check if * needed based on room description
						s += "*";
					if (description.innerHTML.indexOf("[list names]") > 0) //Check if description used or names links
					{
						s = description.innerHTML.match(/\d+/)[0] + s;
					} else {
						s = humans.length + s;
					}
				} else {
					s = count + s;
				}
				
				s = '<br><span class="f3">' + s + '</span><br>';
				tds[i].innerHTML = tds[i].innerHTML.replace(/<br>\s*(<br>)*/, s); //Add text to page
			}
		}
	}catch(err){err = "humanCount:"+err; /*alert(err);*/}
}