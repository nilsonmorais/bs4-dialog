# About bs4-dialog

Creates Bootstrap 4 modal dialogs in js.

# Install

clone this repo
include `dist/bs4-dialog.js` or `dist/bs4-dialog-old` (Old browsers) in your html.

# Dependencies

- Lodash
- Jquery
- Bootstrap 4
- Font Awesome

# Examples

## Confirmation Dialog

```
var d = new ConfirmDialog({ 
    text: "Confirmation", 
    callback: responseValue => { 
        console.log("Result: "+ responseValue); 
    } 
});

// Result: true
// Result: false
```
## Input Dialog

```
var d = new InputDialog({ 
    callback: responseValue => { 
        console.log("Result: "+ responseValue); 
    } 
});

// Result: blablabla
```

## FontAwesome Dialog

```
var d = new IconDialog({ 
    callback: responseValue => { 
        console.log("Result: "+ responseValue); 
    } 
});
d.show();

// Result: fa-cogs
```

## BS4-Background Dialog

```
var d = new ColorDialog({ 
    callback: responseValue => { 
        console.log("Result: "+ responseValue); 
    } 
});
d.show();
>> Selected: bg-success
```
## Color Picker Dialog

```
var d = new ColorPickerDialog({ 
    callback: responseValue => { 
        console.log("Result: "+ responseValue); 
    } 
});
d.show();
>> Selected: #FF0000
```


