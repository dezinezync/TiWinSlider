require('ti.viewshadow');

var ws = require('winslider'); 

//Do not change the variable name. If you do so, change it in the library as well.
var navWin = ws.drawNavigationWindow();

var tabGroup = ws.drawTabGroup(true);

var customRowWindow2 = Ti.UI.createTableViewRow({
	width: 290,
	title: 'Custom Row',
	backgroundColor: 'white',
	selectedBackgroundColor: 'gray'
});

var win1 = ws.drawWindow('Window 1', tabGroup);
var win2 = ws.drawWindow('Window 2', tabGroup, customRowWindow2);

//Example of setting Titanium provided properties to a window.
win2.backgroundColor = 'red';
	
navWin.open();
tabGroup.open();

