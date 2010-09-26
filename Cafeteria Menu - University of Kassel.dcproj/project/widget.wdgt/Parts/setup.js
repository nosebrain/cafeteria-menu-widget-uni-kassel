/* 
 This file was generated by Dashcode and is covered by the 
 license.txt included in the project.  You may edit this file, 
 however it is recommended to first turn off the Dashcode 
 code generator otherwise the changes will be lost.
 */
var dashcodePartSpecs = {
    "button": { "creationFunction": "CreateButton", "leftImageWidth": 5, "onclick": "manupdate", "rightImageWidth": 5, "text": "Update data manually" },
    "cafeteria-name": { "text": "Cafeteria", "view": "DC.Text" },
    "cafeteriaChooser": { "creationFunction": "CreatePopupButton", "leftImageWidth": 5, "onchange": "changeCafeteria", "options": ["Item 1", "Item 2", "Item 3"], "rightImageWidth": 16 },
    "cafLabel": { "text": "Cafeteria", "view": "DC.Text" },
    "copyStuff": { "text": "icon by  Joseph Wain (CC)", "view": "DC.Text" },
    "glassButton": { "creationFunction": "CreateGlassButton", "onclick": "showFront", "text": "Done" },
    "image": { "view": "DC.ImageLayout" },
    "info": { "backgroundStyle": "black", "creationFunction": "CreateInfoButton", "foregroundStyle": "white", "frontID": "front", "onclick": "showBack", "view": "DC.View" },
    "information": { "autoHideScrollbars": true, "creationFunction": "CreateScrollArea", "hasVerticalScrollbar": true, "scrollbarDivSize": 18, "scrollbarMargin": 6, "spacing": 4 },
    "priceChooser": { "creationFunction": "CreatePopupButton", "leftImageWidth": 5, "onchange": "changePrice", "options": [["Student", "Item 1"], ["Staff", "Item 2"], ["Guest", "Item 3"]], "rightImageWidth": 16 },
    "priveLabel": { "text": "Show price for", "view": "DC.Text" },
    "scrollArea": { "autoHideScrollbars": true, "creationFunction": "CreateScrollArea", "hasVerticalScrollbar": true, "scrollbarDivSize": 18, "scrollbarMargin": 6, "view": "DC.View" },
    "state": { "text": " ", "view": "DC.Text" },
    "week": { "text": "01.01-31.12.2010", "view": "DC.Text" },
    "weekdayChooser": { "creationFunction": "CreatePopupButton", "leftImageWidth": 3, "onchange": "switchWeekday", "options": [["MONDAY", "0"], ["TUESDAY", "1"], ["WEDNESDAY", "2"], ["THURSDAY", "3"], ["FRIDAY", "4"]], "rightImageWidth": 16, "view": "DC.View" }
};


















