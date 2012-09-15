TiWinSlider is a quick implementation of sliding windows as found in the Facebook iOS and Path iOS app. 

TiWinSlider is in no way connected/affiliated to either of the above mentioned apps in any way.

#### API
~~~~  

/* To draw the navigation window. */

drawNavigationWindow()

/* 
*	To draw a tabGroup 
*	If using the viewshadow module, the parameter can be replaced with true.
*/

drawTabGroup(false)

/* 
*	To draw a window 
*	Parameters:
*		title: Title for your window.
*		tabgroup: The tabGroup variable you used when drawing the tabGroup.
*		row (optional): If you wish to use a custom row for the navigation for this window, the third parameter will accept a TableViewRow object.
*
*	These windows will automatically be added to the specified tabGroup and an entry will be created in the navigation.
*
/

drawWindow(title, tabgroup, row);

~~~~

#### Example
~~~~  
//Initialize the module
var ws = require('winslider'); 

//Drawing the navigation (underlying) window

//Do not change the variable name. If you do so, change it in the library as well.
var navWin = ws.drawNavigationWindow();

//Let's make our tabGroup
var tabGroup = ws.drawTabGroup(true);

var win1 = ws.drawWindow('Window 1', tabGroup);

//Window with a custom Row in the tabGroup
var customRowWindow2 = Ti.UI.createTableViewRow({
	width: 290,
	title: 'Custom Row',
	backgroundColor: 'white',
	selectedBackgroundColor: 'gray'
});

var win2 = ws.drawWindow('Window 2', tabGroup, customRowWindow2);

//Example of setting Titanium provided properties to a window.
win2.backgroundColor = 'red';

//Open the navigation window and the tabGroup.
navWin.open();
tabGroup.open();

~~~~  

Tested on Ti SDK 2.1.0 - 2.1.2 on iOS 5.1, 6 Beta 4.

####Changelog

##### v2.1.1
- **Tracking for velocity.** Earlier, if you moved the panel quickly, it completed the animation with the default values for duration, thereby adding a distinct "lag". Now the module tracks time between the start and end events and uses that time as velocity.
- Fixed **non-window views tracking** the touchStart, touchMove and touchEnd events. Now, only the windows shall trigger these. Added two dummy views (a label and a button) to demonstrate the same. 

##### v2.1
Converted TiWinSlider into a CommonJS module.  

- 2.1 has been adapted to utilize the CommonJS format, for easier and more adaptable use.
- 2.1 is all contained in a single file `winslider.js` which you will essentially need.
- 2.1 exposes certain API methods described before the changelog section.


##### v2.0
- 2.0 now uses a `2DMatrix()` for all involved animations, based around a single identity matrix. Doing so reduces the load on the UIThread of the app.
- 2.0 utilizes <https://github.com/omorandi/TiViewShadow> by Olivier Morandi to drop beautiful and natively rendered shadows on the underlying table.
- This is more <strong>Ready to use</strong> as compared to any of the previous versions. Simple adapt the code to your requirements and code away.

<strong>Improvements, bug fixes (if any), are most welcome. Fork away.</strong>


#### License valid from 2.0
License? What? Just use it as you wish. Just note that, the above code is provided as is. In no event shall the author or contributors be liable for any direct, indirect, incidental, special, exemplary or consequential damages of any kind. 


##### v1.1
1. I have updated the entire code set. All the sliding magic(for pros, I am talking about eventListeners, etc) is all included in the slider.js file. This makes it easier for you to simply pick up the code and use it in your project. 

2. I have added a few variables which can be edited in the slider.js file to suit your requirements.

3. Added an example to show how to switch between windows using this method.