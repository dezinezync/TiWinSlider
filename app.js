// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	zIndex: 0
});

//
// create controls tab and under window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff',
    zIndex: 10
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab2);  


//create Top Window

var rootWin = Ti.UI.createWindow({
	width: 320,
	height: 460,
	top: 0,
	left: 0,
	zIndex: 0,
	backgroundColor: '999'
});

var rootWinLabel = Ti.UI.createLabel({
	width: 320,
	height: 'auto',
	left: 0,
	textAlign: 'center',
	text: 'Hello World',
	backgroundColor: 'fff'
});

rootWin.add(rootWinLabel);

var mainTabGroup = Ti.UI.createTabGroup({
	zIndex: 1
});

mainTabGroup.add(rootWin);

var isSliding = false;
var baseX = null;
var conX = null;
var diff = null;

rootWinLabel.addEventListener('dblclick', function(e) {
	rootWin.close();
});

rootWin.addEventListener('touchstart', function(e) {
	baseX = e.globalPoint.x;
	isSliding = true;
});

rootWin.addEventListener('touchmove', function(e) {
	if(isSliding) {
		
		if(e.globalPoint.x < 220) {
		
			rootWin.left = e.globalPoint.x;
			
		}
	
	}
});

rootWin.addEventListener('touchend', function(e) {
	if(isSliding) {
		diff = e.globalPoint.x - baseX;
		
		if(diff > 0 && rootWin.left < 50) {
			rootWin.animate({
				left: 0,
				duration: 300
			});
		}
		
		else if(diff <= 220 && diff > 0 && rootWin.left > 50) {
			rootWin.animate({
				left: 220,
				duration: 300
			});
		}
		
		else if(diff < 0){
			rootWin.animate({
				left: 0,
				duration: 300
			});
		}
	}
	
	isSliding = false;
});

// open tab groups
tabGroup.open();
mainTabGroup.open();