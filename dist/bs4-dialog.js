'use strict';

/* 

bs4-dialog: Bootstrap 4 dialog lib.
Dependencies: lodash, fontawesome and jquery.

*/

/**
 * @class Dialog
 */
function Dialog() {
    var id = _.uniqueId('dialog_');
    this.html = $("<div>").addClass("modal").append(
        $("<div>").addClass("modal-dialog").attr("role", "document").append(
            $("<div>").addClass("modal-content").append(
                $("<div>").addClass("modal-header").append(
                    $("<h5>").addClass("modal-title").text("Dialog")
                ).append(
                    $("<button>").addClass("close").attr({
                        "type": "button",
                        "data-dismiss": "modal",
                        "aria-label": "Close"
                    }).append(
                        $("<span>").attr("aria-hidden", "true").text("&times;")
                    )
                )
            ).append(
                $("<div>").addClass("modal-body")
            ).append(
                $("<div>").addClass("modal-footer").append(
                    $("<button>").addClass("btn btn-primary").text("Save Changes")
                ).append(
                    $("<button>").addClass("btn btn-secondary").text("Close")
                )
            )
        )
    );
    this.addClass = function(className) {
        $(this.html).addClass(className);
    };

    return this;
}