require('ti.viewshadow');

//SETUP
var slideLimit = 260;
var catchMove = 50; //Limit after which action should be triggered on touchEnd 

// Our Identity Matrix for all animations using transform
var t = Ti.UI.create2DMatrix();

var navWin = Ti.UI.createWindow({
	width: 320,
	height: Ti.UI.FILL,
	left: 0,
	top: 0,
	backgroundColor: '#454545'
});

	navWin.add(Ti.UI.createTableView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor: 'transparent',
		separatorColor: '#555555',
		data: [{title: 'Window 1'}, {title: 'Window 2'}]
	}));
	
	navWin.children[0].addEventListener('click', switchWindow);
	
	/*	
	 *	The reason for not doing something like var tableView = Ti..... 
	 *	and then navWin.add(tableView) is to avoid polluting
	 *	the global namespace with unnecessary variables
	 */
	
var tabGroup = Ti.UI.createTabGroup({
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	sliding: false,
	shadow:{
		shadowRadius: 5,
		shadowOpacity: 1,
		shadowOffset: {x: 0, y: 0}
	}
});

//fLeft is a custom prop we set to know the current position of the tabGroup in the globalViewPointSystem

// Sliding is a custom prop we set to know if the tabGroup is sliding or not. 

	//Button
	var slideButton = Ti.UI.createButton({
		title: '|||',
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED	
	});
	
		slideButton.addEventListener('click', slideButtonClick);
	
	//Windows

	var win1 = drawWindow('Window 1');
	var win2 = drawWindow('Window 2');
	
	var tab1 = Ti.UI.createTab({
		window: win1,
		title: 'Window 1'
	});
	
	var tab2 = Ti.UI.createTab({
		window: win2,
		title: 'Window 2'
	});
	
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

	win1.addEventListener('touchstart', tabGroupTouchStart);
	win1.addEventListener('touchmove', tabGroupTouchMove);
	win1.addEventListener('touchend', tabGroupTouchEnd);
	
	win2.addEventListener('touchstart', tabGroupTouchStart);
	win2.addEventListener('touchmove', tabGroupTouchMove);
	win2.addEventListener('touchend', tabGroupTouchEnd);

navWin.open();
tabGroup.open();
	
// Listener Functions
function slideButtonClick() {
	if(tabGroup.sliding) {
		slideIn();
	}
	else {
		slideOut();
	}
}

/*Moving tabGroup variants. Do not edit*/
var startPoint = 0;

function tabGroupTouchStart(e) {
	startPoint = e.globalPoint.x;
}

function tabGroupTouchMove(e) {
	var diff = e.globalPoint.x - startPoint;
	
	//If the user is sliding the tabGroup away from the right edge, deny that.
	if(diff < 0) return false;
	
	tabGroup.animate({
		transform: t.translate(diff, 0),
		duration: 0
	});
	tabGroup.sliding = true;
	diff = null;
}

function tabGroupTouchEnd(e) {
	var diff = e.globalPoint.x - startPoint;
	
	//Very small move? Let's take it back to where it began
	if(diff < catchMove) {
		slideIn();
	}
	
	if(diff >= catchMove) {
		slideOut();
	}
	else if((startPoint - e.globalPoint.x) > catchMove) {
		slideIn();
	} 
	
	diff = null;
}

function switchWindow(e) {
	tabGroup.setActiveTab(e.index);
	slideIn();
}

//Private functions. Well, sorta.
function slideOut() {
	tabGroup.animate({
		transform: t.translate(slideLimit, 0),
		duration: 500,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	tabGroup.sliding = true;
}

function slideIn() {
	tabGroup.animate({
		transform: t,
		duration: 400,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	tabGroup.sliding = false;
}

function drawWindow(t) {
	return Ti.UI.createWindow({
		title: t,
		leftNavButton: slideButton,
		tabBarHidden: true,
		backgroundColor: 'white'
	});
}
