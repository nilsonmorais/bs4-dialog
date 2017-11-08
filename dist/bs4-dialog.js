'use strict';

/* 

bs4-dialog: Bootstrap 4 dialog lib.
Dependencies: lodash, fontawesome and jquery.

*/

/**
 * @class Dialog
 */
function Dialog(options) {
    var _Dialog = this;
    var id = _.uniqueId('dialog_');
    var modalSizes = {
        sm: "modal-sm",
        lg: "modal-lg"
    };
    var defaults = {
        size: "modal-lg",
        title: "Dialog",
        onShow: function() {},
        onSuccess: function() {},
        onClose: function() {},
        onHide: function() {},
        content: "",
        successLabel: "Save changes",
        successButton: true,
        closeLabel: "Close",
        closeButton: false,
    };

    this.options = _.assign(this.options, defaults);
    this.options = _.assign(this.options, options);

    this.addClass = function(className) {
        $(this.html).addClass(className);
    };

    this.setSize = function(size) {
        var size = modalSizes[size] || defaults.size;
        $(this.html).find(".modal-dialog").removeClass("modal-sm modal-lg").addClass(size);
    };

    this.setContent = function(content) {
        $(this.html).find(".modal-body").html("").append(content);
    };

    this.setTitle = function(text) {
        $(this.html).find(".modal-title").text(text);
    };

    this.render = function() {
        _Dialog.html = $("<div>").addClass("modal").attr("id", id).append(
            $("<div>").addClass("modal-dialog").addClass(_Dialog.options.size).attr("role", "document").append(
                $("<div>").addClass("modal-content").append(
                    $("<div>").addClass("modal-header").append(
                        $("<h5>").addClass("modal-title").text(_Dialog.options.title),
                        $("<button>").addClass("close").attr({
                            "type": "button",
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        }).append(
                            $("<span>").addClass("fa fa-fw fa-close").attr("aria-hidden", "true")
                        )
                    ),
                    $("<div>").addClass("modal-body").append(_Dialog.options.content),
                    $("<div>").addClass("modal-footer")
                )
            )
        );
        if (_Dialog.options.closeButton) {
            $(_Dialog.html).find(".modal-footer").append(
                $("<button>").addClass("btn btn-secondary").text(_Dialog.options.closeLabel)
            );
        }
        if (_Dialog.options.successButton) {
            $(_Dialog.html).find(".modal-footer").append(
                $("<button>").addClass("btn btn-primary").text(_Dialog.options.successLabel),
            );
        }
        $(_Dialog.html).find(".modal-footer > .btn-primary").click(function() {
            _Dialog.hide();
            _Dialog.options.onSuccess(_Dialog);
            console.log("Dialog Success");
        });
        $(_Dialog.html).find(".modal-footer > .btn-secondary").click(function() {
            _Dialog.close();
        });
        $("body").append(_Dialog.html);
    };

    _Dialog.show = function() {
        $(_Dialog.html).modal('show');
        _Dialog.options.onShow(_Dialog);
    };

    _Dialog.close = function() {
        $(_Dialog.html).modal('hide');
        _Dialog.options.onClose(_Dialog);
    };
    _Dialog.hide = function() {
        $(_Dialog.html).modal('hide');
        _Dialog.options.onHide(_Dialog);
    };

    _Dialog.render();
    return _Dialog;
}

function InputDialog(options) {
    Dialog.call(this);
    var _InputDialog = this;
    var defaults = {
        callback: function() {},
        title: "Input",
        onSuccess: function(dialogRef) {
            var r = $(dialogRef.html).find(".modal-body").find("input").val();
            options.callback(r);
            console.log("Input Success");
        },
        onShow: function(dialogRef) {
            $(dialogRef.html).find(".modal-body").find("input").focus();
            console.log("Input Show");
        },
        successLabel: "Save",
        content: $("<input>").addClass("form-control").attr({ type: "text", placeholder: "Type something" })
    };
    this.options = _.assign(this.options, defaults); // Apply Input defaults to Dialog
    this.options = _.assign(this.options, options); // Apply Input instance config 
    this.render();
    this.show();
    return this;
}
InputDialog.prototype = _.create(Dialog.prototype, { 'constructor': InputDialog });

function ColorDialog(options) {
    Dialog.call(this);
    var _ColorDialog = this;
    var _content = $("<div>").append(
        $("<div>").addClass("btn-toolbar mb-3 justify-content-center").attr({ "role": "toolbar", "aria-label": "Cores para seleção" }).append(
            $("<div>").addClass("btn-group").attr({ "role": "group", "aria-label": "Cores para seleção" }).append(
                $("<button>").addClass("px-3 btn btn-primary").attr({ type: "button", 'data-color': "primary" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
                $("<button>").addClass("px-3 btn btn-secondary").attr({ type: "button", 'data-color': "secondary" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
                $("<button>").addClass("px-3 btn btn-success").attr({ type: "button", 'data-color': "success" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
            )
        ),
        $("<div>").addClass("btn-toolbar mb-3 justify-content-center").attr({ "role": "toolbar", "aria-label": "Cores para seleção" }).append(
            $("<div>").addClass("btn-group").attr({ "role": "group", "aria-label": "Cores para seleção" }).append(
                $("<button>").addClass("px-3 btn btn-danger").attr({ type: "button", 'data-color': "danger" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
                $("<button>").addClass("px-3 btn btn-warning").attr({ type: "button", 'data-color': "warning" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
                $("<button>").addClass("px-3 btn btn-info").attr({ type: "button", 'data-color': "info" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
            )
        ),
        $("<div>").addClass("btn-toolbar mb-3 justify-content-center").attr({ "role": "toolbar", "aria-label": "Cores para seleção" }).append(
            $("<div>").addClass("btn-group").attr({ "role": "group", "aria-label": "Cores para seleção" }).append(
                $("<button>").addClass("px-3 btn btn-light").attr({ type: "button", 'data-color': "light" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
                $("<button>").addClass("px-3 btn btn-dark").attr({ type: "button", 'data-color': "dark" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
                $("<button>").addClass("px-3 btn btn-white").attr({ type: "button", 'data-color': "white" }).html("&nbsp;").click(function() { _ColorDialog.clickAction(this); }),
            )
        )
    );
    var defaults = {
        callback: function() {},
        title: "Color Dialog",
        onSuccess: function(dialogRef) {
            var r = $(dialogRef.html).find(".modal-body").find(".selected").attr("data-color");
            options.callback(r);
        },
        onShow: function(dialogRef) {},
        successButton: false,
        closeButton: true,
        closeLabel: "Fechar",
        content: _content
    };
    _ColorDialog.options = _.assign(_ColorDialog.options, defaults); // Apply defaults to options
    _ColorDialog.options = _.assign(_ColorDialog.options, options); // Apply Instance options to options
    _ColorDialog.clickAction = function(ele) {
        var color = $(ele).attr("data-color");
        _ColorDialog.options.callback(color);
        _ColorDialog.close();
    };

    _ColorDialog.render();
    _ColorDialog.setSize("sm");
    return _ColorDialog;
}
ColorDialog.prototype = _.create(Dialog.prototype, { 'constructor': ColorDialog });

function ConfirmDialog(options) {
    Dialog.call(this);
    var _ConfirmDialog = this;
    var defaults = {
        callback: function() {},
        title: "Confirmation Dialog",
        onSuccess: function(dialogRef) {
            options.callback(true);
        },
        onClose: function(dialogRef) {
            options.callback(false);
        },
        successButton: true,
        successLabel: "Yes",
        closeButton: true,
        closeLabel: "No",
        text: "Confirm?",
        content: $("<h2>").text(options.text)
    };
    _ConfirmDialog.options = _.assign(_ConfirmDialog.options, defaults); // Apply defaults to options
    _ConfirmDialog.options = _.assign(_ConfirmDialog.options, options); // Apply Instance options to options

    _ConfirmDialog.render();
    _ConfirmDialog.setSize("sm");
    _ConfirmDialog.show();
    return _ConfirmDialog;
}
ConfirmDialog.prototype = _.create(Dialog.prototype, { 'constructor': ConfirmDialog });