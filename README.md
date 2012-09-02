TiWinSlider is a quick implementation of sliding windows as found in the Facebook iOS and Path iOS app. 

TiWinSlider is in no way connected/affiliated to either of the above mentioned apps in any way.

##### Update 2.0
- 2.0 now uses a `2DMatrix()` for all involved animations, based around a single identity matrix. Doing so reduces the load on the UIThread of the app.
- 2.0 utilizes <https://github.com/omorandi/TiViewShadow> by Olivier Morandi to drop beautiful and natively rendered shadows on the underlying table.
- This is more <strong>Ready to use</strong> as compared to any of the previous versions. Simple adapt the code to your requirements and code away.

<strong>Improvements, bug fixes (if any), are most welcome. Fork away.</strong>


#### License valid from 2.0
License? What? Just use it as you wish. Just note that, the above code is provided as is. In no event shall the author or contributors be liable for any direct, indirect, incidental, special, exemplary or consequential damages of any kind. 


##### Update 1.1
1. I have updated the entire code set. All the sliding magic(for pros, I am talking about eventListeners, etc) is all included in the slider.js file. This makes it easier for you to simply pick up the code and use it in your project. 

2. I have added a few variables which can be edited in the slider.js file to suit your requirements.

3. Added an example to show how to switch between windows using this method.