///////////////////////////////////////////////////////////////////////////////////////////
// Urban Dead Enhancer Script
// By Dobos Andras (Assassin Ravenlord)
// Released under the LGPL license; see http://www.gnu.org/copyleft/lesser.txt
// You may freely use and distribute this file, but you must release any changes you commit to the code.
// Author email: dobos_andras@hotmail.com
///////////////////////////////////////////////////////////////////////////////////////////

function selectGraphicsFile()
{
	var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	fp.init(window, "Select the file", nsIFilePicker.modeOpen);
	fp.appendFilter("CSS Stylesheet files","*.css");
	fp.appendFilter("All files", "*.*");
	var res = fp.show();
	if (res == nsIFilePicker.returnOK)
	{
		var file = fp.file;
		var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		preferences = preferences.getBranch("extensions.gaietool.");

		try
		{
			AccountName = preferences.getCharPref("lastProfileUsed");
			preferences.setComplexValue("UDCSSFile_", Components.interfaces.nsILocalFile, file);
			preferences.setCharPref("UDCSSFilePath_", file.path);
		}
		catch(err){}
	}
		else
	if (res == nsIFilePicker.returnCancel) return;
}

// ===Extension Preferences Window=== //

function initgaieOptions() {
	try {
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		prefs = prefs.getBranch("extensions.gaietool.");

		var isGAIEEnabled = true;
		try{
			isGAIEEnabled = prefs.getBoolPref("isGAIEEnabled");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var isGAIEMEnabled = true;
		try {
			isGAIEMEnabled = prefs.getBoolPref("isGAIEMEnabled");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var isGAIEGEnabled = true;
		try {
			isGAIEGEnabled = prefs.getBoolPref("isGAIEGEnabled");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var isGAIEHCEnabled = true;
		try {
			isGAIEHCEnabled = prefs.getBoolPref("isGAIEHCEnabled");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var hideBrainRot = false;
		try {
			hideBrainRot = prefs.getBoolPref("hideBrainRot");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var menusEnabled = true;
		try {
			menusEnabled = prefs.getBoolPref("isGAIEMenusEnabled");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var displayBorders = false;
		try {
			displayBorders = prefs.getBoolPref("isGAIEMBorders");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var fixedMap = true;
		try {
			fixedMap = prefs.getBoolPref("isGAIEMFixed");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var graphicalInventory = true;
		try {
			graphicalInventory = prefs.getBoolPref("isGAIEGInventory");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var graphicalStats = true;
		try {
			graphicalStats = prefs.getBoolPref("isGAIEGStats");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var nameTable = true;
		try {
			nameTable = prefs.getBoolPref("isGAIENameTable");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		var suburbLink = true;
		try {
			suburbLink = prefs.getBoolPref("isGAIESuburbLink");
		} catch (e) {
			//alert("pref missing: "+e);
		}
		
		document.getElementById("gaieenable").checked = isGAIEEnabled;
		document.getElementById("gaiegraphic").checked = isGAIEMEnabled;
		document.getElementById("gaiecssoverride").checked = isGAIEGEnabled;
		document.getElementById("gaiehumancount").checked = isGAIEHCEnabled;
		document.getElementById("gaiebrainrot").checked = hideBrainRot;
		document.getElementById("gaiemenus").checked = menusEnabled;
		document.getElementById("gaieblockborders").checked = displayBorders;
		document.getElementById("gaiefixedmap").checked = fixedMap;
		document.getElementById("gaieinventoryenable").checked = graphicalInventory;
		document.getElementById("gaiestatsenable").checked = graphicalStats;
		document.getElementById("gaienametableenable").checked = nameTable;
		document.getElementById("gaiesuburblink").checked = suburbLink;
	} catch (e) {
		//alert("UDToolbar's initOptions had an exception: "+e);
	}
}

function savegaieOptions() {
	try{
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		prefs = prefs.getBranch("extensions.gaietool.");
		prefs.setBoolPref("isGAIEEnabled", document.getElementById("gaieenable").checked);
		prefs.setBoolPref("isGAIEMEnabled", document.getElementById("gaiegraphic").checked);
		prefs.setBoolPref("isGAIEGEnabled", document.getElementById("gaiecssoverride").checked);
		prefs.setBoolPref("isGAIEHCEnabled", document.getElementById("gaiehumancount").checked);
		prefs.setBoolPref("isGAIEMenusEnabled", document.getElementById("gaiemenus").checked);
		prefs.setBoolPref("hideBrainRot", document.getElementById("gaiebrainrot").checked);
		prefs.setBoolPref("isGAIEMBorders", document.getElementById("gaieblockborders").checked);
		prefs.setBoolPref("isGAIEMFixed", document.getElementById("gaiefixedmap").checked);
		prefs.setBoolPref("isGAIEGInventory", document.getElementById("gaieinventoryenable").checked);
		prefs.setBoolPref("isGAIEGStats", document.getElementById("gaiestatsenable").checked);
		prefs.setBoolPref("isGAIENameTable", document.getElementById("gaienametableenable").checked);
		prefs.setBoolPref("isGAIESuburbLink", document.getElementById("gaiesuburblink").checked);
	} catch (e) {
		//alert("Failed to save preference: "+e);
	}
}

function dogaieCancel()
{
	return true;
}