'use strict';

/* 

bs4-dialog: Bootstrap 4 dialog lib.
Dependencies: lodash, fontawesome and jquery.

*/

/**
 * @class Dialog
 */
function Dialog(options) {
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
        content: "",
        successLabel: "Save changes",
        closeLabel: "Close",
    };
    this.options = _.assign(defaults, options);
    var _dialog = this;
    this.addClass = function(className) {
        $(this.html).addClass(className);
    };
    this.setSize = function(size) {
        var size = modalSizes[size] || defaults.modalSize;
        $(this.html).find(".modal-dialog").removeClass("modal-sm modal-lg").addClass(size);
    };
    this.setContent = function(content) {
        $(this.html).find(".modal-body").html("").append(content);
    };

    this.setTitle = function(text) {
        $(this.html).find(".modal-title").text(text);
    };
    this.render = function() {
        this.html = $("<div>").addClass("modal").attr("id", id).append(
            $("<div>").addClass("modal-dialog").addClass(this.options.size).attr("role", "document").append(
                $("<div>").addClass("modal-content").append(
                    $("<div>").addClass("modal-header").append(
                        $("<h5>").addClass("modal-title").text(this.options.title)
                    ).append(
                        $("<button>").addClass("close").attr({
                            "type": "button",
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        }).append(
                            $("<span>").addClass("fa fa-fw fa-close").attr("aria-hidden", "true")
                        )
                    )
                ).append(
                    $("<div>").addClass("modal-body").append(this.options.content)
                ).append(
                    $("<div>").addClass("modal-footer").append(
                        $("<button>").addClass("btn btn-primary").text(this.options.successLabel)
                    ).append(
                        $("<button>").addClass("btn btn-secondary").text(this.options.closeLabel)
                    )
                )
            )
        );
        $(this.html).find(".btn-primary").click(function() {
            _dialog.close();
            _dialog.options.onSuccess(_dialog);
            console.log("Dialog Success");
        });
        $(this.html).find(".btn-secondary").click(function() {
            _dialog.close();
        });
        $("body").append(this.html);
    };
    this.show = function() {
        this.render();
        $(this.html).modal('show');
        _dialog.options.onShow(_dialog);
        console.log("Dialog Show");
    };
    this.close = function() {
        $(this.html).modal('hide');
        _dialog.options.onClose(_dialog);
        console.log("Dialog Close");
    };
    return this;
}

function inputDialog(options) {
    Dialog.call(this);
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
    this.show();
    return this;
}
inputDialog.prototype = _.create(Dialog.prototype, { 'constructor': inputDialog });