var win = Ti.UI.currentWindow;

var rootTabGroup = Ti.UI.createTabGroup({
	zIndex: 0
});

var rootWin = Ti.UI.createWindow({
	width: 320,
	height: 460,
	top: 0,
	left: 0,
	zIndex: 0,
	backgroundColor: 'fff',
	tabBarHidden: true
});

var tableView = Ti.UI.createTableView({
	width: 320,
	height: 460,
	data: [{title: 'Window 1'}, {title: 'Window 2'}]
});

rootWin.add(tableView);

var rootWinTab = Titanium.UI.createTab({  
    title:'Root Window',
    window:rootWin
});

rootTabGroup.addTab(rootWinTab);

rootTabGroup.open();

//Modify this variable as per your needs. The default value is the recommneded one.

var slideLimit = 220; // If you modify this value, you might want to modify the animation duration in the eventListener.

//Dont modify these variables;
var isSliding = false;
var baseX = null;
var conX = null;
var diff = null;

win1.addEventListener('touchstart', function(e) {
	baseX = e.globalPoint.x;
	isSliding = true;
});

win1.addEventListener('touchmove', function(e) {
	if(isSliding) {
		
		if(e.globalPoint.x < slideLimit) {
		
			tabGroup.left = e.globalPoint.x;
			
		}
	
	}
});

win1.addEventListener('touchend', function(e) {
	if(isSliding) {
		
		slideFunc(e.globalPoint.x);
		
	}
	
	isSliding = false;
});

win2.addEventListener('touchstart', function(e) {
	baseX = e.globalPoint.x;
	isSliding = true;
});

win2.addEventListener('touchmove', function(e) {
	if(isSliding) {
		
		if(e.globalPoint.x < slideLimit) {
		
			tabGroup.left = e.globalPoint.x;
			
		}
	
	}
});

win2.addEventListener('touchend', function(e) {
	if(isSliding) {
		
		slideFunc(e.globalPoint.x);
		
	}
	
	isSliding = false;
});

var slideFunc = function(globalPointX) {
	diff = globalPointX - baseX;
		
	if(diff > 0 && tabGroup.left < 50) {
		tabGroup.animate({
			left: 0,
			duration: 300
		});
	}
	
	else if(diff <= slideLimit && diff > 0 && tabGroup.left > 50) {
		tabGroup.animate({
			left: slideLimit,
			duration: 300
		});
	}
	
	else if(diff < 0){
		tabGroup.animate({
			left: 0,
			duration: 300
		});
	}
}

//Switching tabs
tableView.addEventListener('click', function(e) {
	tabGroup.setActiveTab(e.index);
	tabGroup.animate({
		left: 0,
		duration: 300
	});
})
