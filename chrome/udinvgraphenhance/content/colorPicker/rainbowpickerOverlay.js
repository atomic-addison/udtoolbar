function rainbowpickerInit()
{
    var cssDir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get('ProfD', Components.interfaces.nsIFile);
    cssDir.append('rainbowpicker');
    if (!cssDir.exists()) {
        cssDir.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0644);
        var file     = Components.classes['@mozilla.org/file/local;1'].getService(Components.interfaces.nsILocalFile);
        var foStream = Components.classes['@mozilla.org/network/file-output-stream;1'].getService(Components.interfaces.nsIFileOutputStream);
        file.initWithPath(cssDir.path);
        file.append('rainbowpicker.css');
        foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);
        foStream.write('colorpicker[type="button"]{-moz-binding:url(\'chrome://rainbowpicker/content/colorpicker.xml#colorpicker-button\')}', 113);
        foStream.close();
    }
    var sss        = Components.classes['@mozilla.org/content/style-sheet-service;1'].getService(Components.interfaces.nsIStyleSheetService);
    var file       = Components.classes['@mozilla.org/file/local;1'].getService(Components.interfaces.nsILocalFile);
    file.initWithPath(cssDir.path);
    file.append('rainbowpicker.css');
    var cssURI = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService).newFileURI(file, null, null);
    if (!sss.sheetRegistered(cssURI, sss.USER_SHEET)) { 
        sss.loadAndRegisterSheet(cssURI, sss.USER_SHEET);
    }
}

function rainbowpickerToolbar()
{
    try {
        var showWarning = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getIntPref('rainbowpicker.showWarning');
        if (showWarning != 0) {
            window.openDialog('chrome://udinvgraphenhance/content/colorPicker/warning.xul', '', 'chrome, modal, centerscreen, dialog');
        }
    } catch(e) {
        window.openDialog('chrome://udinvgraphenhance/content/colorPicker/warning.xul', '', 'chrome, modal, centerscreen, dialog');
    }
    var newColor = {elemCurrColor:'', cancel:false};
    window.openDialog('chrome://udinvgraphenhance/content/colorPicker/colorpicker.xul', '_blank', 'chrome, close, titlebar, modal', '', newColor);
    if (newColor.cancel || newColor.elemCurrColor == '') {
        return;
    }
    Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(newColor.elemCurrColor);
}

window.addEventListener('load', rainbowpickerInit, false);
