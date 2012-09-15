//SETUP
var slideLimit = 260;
var catchMove = 50; //Limit after which action should be triggered on touchEnd

// Our Identity Matrix for all animations using transform
var t = Ti.UI.create2DMatrix();

var sl = 0;

var TiWinSlider = {

	drawNavigationWindow: function() {
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
			data: []
		}));
		
		navWin.children[0].addEventListener('click', switchWindow);

		return navWin;
		
	},

	/*
	* TabGroup
	* Parameters:
	*	hasShadow (optional): If you are using the viewshadow module, you can set this to true. 
	*/

	drawTabGroup: function(hasShadow) {
		tg = Ti.UI.createTabGroup({
			width: Ti.UI.FILL,
			height: Ti.UI.FILL,
			sliding: false
		});

		if(hasShadow != null) {
			if(hasShadow == true) tg.shadow = {
				shadowRadius: 4,
	            shadowOpacity: 1,
	            shadowOffset: {
	                x: 0,
	                y: 0
	            }
			};
		}

		return tg;
	},

	/*
	* function: drawWindow
	* parameters: 
	*	title: Title for the window
	*	tabgroup: tabGroup variable name you used when intializing your tabgroup.
	*	row (optional): Custom row you'd like to add to the tableView for this specific window.
	*/

	drawWindow: function(title, tabgroup, row) {
		var win = Ti.UI.createWindow({
			title: title,
			leftNavButton: slideButton,
			tabBarHidden: true,
			backgroundColor: Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND
		});

		var tab = Ti.UI.createTab({
			window: win,
			title: title
		});

		tabgroup.addTab(tab);

		if(row == null || typeof row == 'undefined') {
			navWin.children[0].appendRow({title: title});
		}
		else {
			navWin.children[0].appendRow(row);
		}
		
		tab = null;

		win.addEventListener('touchstart', tabGroupTouchStart);
		win.addEventListener('touchmove', tabGroupTouchMove);
		win.addEventListener('touchend', tabGroupTouchEnd);

		return win;
	}
};

//Button
var slideButton = Ti.UI.createButton({
	title: '|||',
	style: Ti.UI.iPhone.SystemButtonStyle.BORDERED	
});

	slideButton.addEventListener('click', slideButtonClick);


/* IN MOST CASES, EVERYTHING BELOW NEED NOT BE EDITED. GOOD ADVICE: DON'T! */
function switchWindow(e) {
	tabGroup.setActiveTab(e.index);
	slideIn();
}

//Private functions. Well, sorta.
function slideOut(time) {
	console.log(time);
	tabGroup.animate({
		transform: t.translate(slideLimit, 0),
		duration: ((time != null && time < 500) ? time : 500),
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	sl = slideLimit;
	tabGroup.sliding = true;
}

function slideIn(time) {
	console.log(time);
	tabGroup.animate({
		transform: t,
		duration: ((time != null && time < 400) ? time : 400),
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	sl = 0;
	tabGroup.sliding = false;
}

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
var start = {
	x: 0,
	gx: 0,
	t: 0
};

function tabGroupTouchStart(e) {
	if(e.source != "[object TiUIWindow]") return;	
	start.x = e.x;
	start.gx = e.globalPoint.x;
	start.t = new Date().getTime();
}

function tabGroupTouchMove(e) {
	if(e.source != "[object TiUIWindow]") return;
	var diff = e.globalPoint.x - start.x;

	//If the user is sliding the tabGroup away from the either edge, deny that.
	if(diff < 0 || diff > slideLimit) return;
	tabGroup.animate({
		transform: t.translate(diff, 0),
		duration: 0
	});
	sl = diff;
	tabGroup.sliding = true;

	diff = null;

}

function tabGroupTouchEnd(e) {
	if(e.source != "[object TiUIWindow]") return;

	te = new Date().getTime();

	if((sl - start.gx) < 0) {
		slideIn(te-start.t);
		return;
	}

	var diff = e.globalPoint.x - start.x;

	//Very small move? Let's take it back to where it began
	if(diff < catchMove) {
		slideIn(te-start.t);
	}
	
	if(diff >= catchMove) {
		slideOut(te-start.t);
	}
	
	diff = null;
	te = null;
}

module.exports = TiWinSlider;