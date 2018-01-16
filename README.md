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

## Color Dialog
```
var _c = new ColorDialog({ 
    callback: color => {
        console.log("Result: ",color);
    }
});
// Result: "danger"
// Result: "success"
```

## Confirmation Dialog

```
var _d = new ConfirmDialog({ 
    text: "Confirmation", 
    callback: val => { 
        console.log("Result: ",val); 
    } 
});

// Result: true
// Result: false
```

## FontAwesome Dialog

```
var i = new iconDialog({ callback: icon => { console.log("Selected: ", icon) } });
i.show();
>> Selected: fa-rebel
```

