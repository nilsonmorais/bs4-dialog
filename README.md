# About bs4-dialog

Creates Bootstrap 4 modal dialogs in js.

# Install

clone this repo
include `dist/bs4-dialog.js` in your html.

# Dependencies

- Lodash
- Jquery
- Bootstrap 4
- Font Awesome

# Examples

```
var _c = new ColorDialog({ 
    callback: function(color){
        console.log("Result: ",color);
    }
});
// Result: "danger"
// Result: "success"

..

var _d = new ConfirmDialog({ 
    text: "Confirmation", 
    callback: function(val){ 
        console.log("Result: ",val); 
    } 
});

// Result: true
// Result: false
```
