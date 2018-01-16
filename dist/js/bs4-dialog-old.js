'use strict';

/* 

bs4-dialog: Bootstrap 4 dialog lib.
Dependencies: lodash, fontawesome and jquery.

*/

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dialog = function () {
    function Dialog(options) {
        _classCallCheck(this, Dialog);

        this.options = {
            id: _.uniqueId('dialog_'),
            size: "modal-lg",
            title: "Dialog",
            onShow: function onShow() {},
            onSuccess: function onSuccess() {},
            onClose: function onClose() {},
            onHide: function onHide() {},
            content: "",
            successLabel: "Save changes",
            successButton: true,
            closeLabel: "Close",
            closeButton: false,
            modalSizes: {
                sm: "modal-sm",
                lg: "modal-lg"
            }
        };
        _.merge(this.options, options);
        this.render();
    }

    _createClass(Dialog, [{
        key: 'setSize',
        value: function setSize(value) {
            var size = this.options.modalSizes[value] || this.options.size;
            this.modalDialogElement.removeClass("modal-sm modal-lg").addClass(size);
        }
    }, {
        key: 'setContent',
        value: function setContent(content) {
            this.modalBodyElement.html("").append(content);
        }
    }, {
        key: 'setTitle',
        value: function setTitle(text) {
            this.modalTitleElement.text(text);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            this.footerElement = $("<div>").addClass("modal-footer");
            this.modalDialogElement = $("<div>").addClass("modal-dialog").addClass(this.options.size).attr("role", "document");
            this.modalBodyElement = $("<div>").addClass("modal-body");
            this.modalTitleElement = $("<h5>").addClass("modal-title");

            this.html = $("<div>").addClass("modal").attr("id", this.options.id).append(this.modalDialogElement.append($("<div>").addClass("modal-content").append($("<div>").addClass("modal-header").append(this.modalTitleElement.text(this.options.title), $("<button>").addClass("close").attr({
                "type": "button",
                "data-dismiss": "modal",
                "aria-label": "Close"
            }).append($("<span>").addClass("fa fa-fw fa-close").attr("aria-hidden", "true"))), this.modalBodyElement.append(this.options.content), this.footerElement)));
            this.html.on('keydown', function (ev) {
                if (ev.keyCode == 13) {
                    _this.hide();
                    _this.options.onSuccess(_this);
                }
                if (ev.keyCode == 27) {
                    _this.close();
                }
            });
            if (this.options.closeButton) {
                this.footerElement.append($("<button>").addClass("btn btn-secondary").text(this.options.closeLabel));
            }
            if (this.options.successButton) {
                this.footerElement.append($("<button>").addClass("btn btn-primary").text(this.options.successLabel));
            }
            this.footerElement.find(".btn-primary").click(function () {
                _this.hide();
                _this.options.onSuccess(_this);
            });
            this.footerElement.find(".btn-secondary").click(function () {
                _this.close();
            });
            $("body").append(this.html);
        }
    }, {
        key: 'show',
        value: function show() {
            this.html.modal('show');
            this.options.onShow(this);
        }
    }, {
        key: 'close',
        value: function close() {
            this.html.modal('hide');
            this.options.onClose(this);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.html.modal('hide');
            this.options.onHide(this);
        }
    }]);

    return Dialog;
}();

var InputDialog = function (_Dialog) {
    _inherits(InputDialog, _Dialog);

    function InputDialog(options) {
        _classCallCheck(this, InputDialog);

        var _options = {
            callback: function callback() {},
            title: "Input",
            onSuccess: function onSuccess(dialogRef) {
                var r = $(dialogRef.html).find(".modal-body").find("input").val();
                _this2.options.callback(r);
            },
            onShow: function onShow(dialogRef) {
                $(dialogRef.html).find(".modal-body").find("input").focus();
            },
            successLabel: "Save"
        };
        _.merge(_options, options);

        var _this2 = _possibleConstructorReturn(this, (InputDialog.__proto__ || Object.getPrototypeOf(InputDialog)).call(this, _options));

        _this2.setContent($("<input>").addClass("form-control").attr({ type: "text", placeholder: "Type something" }).attr("value", _this2.options.value));
        _get(InputDialog.prototype.__proto__ || Object.getPrototypeOf(InputDialog.prototype), 'show', _this2).call(_this2);
        return _this2;
    }

    return InputDialog;
}(Dialog);

var ColorDialog = function (_Dialog2) {
    _inherits(ColorDialog, _Dialog2);

    function ColorDialog(options) {
        _classCallCheck(this, ColorDialog);

        var _options = {};
        _.merge(_options, options);

        // let color = $(ele).attr("data-color");
        // this.options.callback(color);
        var _this3 = _possibleConstructorReturn(this, (ColorDialog.__proto__ || Object.getPrototypeOf(ColorDialog)).call(this, _options));

        _this3.setSize("sm");
        // this.close();
        return _this3;
    }

    return ColorDialog;
}(Dialog);

var ConfirmDialog = function (_Dialog3) {
    _inherits(ConfirmDialog, _Dialog3);

    function ConfirmDialog(options) {
        _classCallCheck(this, ConfirmDialog);

        var _options = {
            callback: function callback() {},
            title: "Confirmation Dialog",
            onSuccess: function onSuccess(dialogRef) {
                _this4.options.callback(true);
            },
            onClose: function onClose(dialogRef) {
                _this4.options.callback(false);
            },
            successButton: true,
            successLabel: "Yes",
            closeButton: true,
            closeLabel: "No",
            text: "Confirm?",
            content: $("<h2>").text(options.text)
        };
        _.merge(_options, options);

        var _this4 = _possibleConstructorReturn(this, (ConfirmDialog.__proto__ || Object.getPrototypeOf(ConfirmDialog)).call(this, _options));

        _this4.setSize("sm");
        _this4.show();
        return _this4;
    }

    return ConfirmDialog;
}(Dialog);

var iconDialog = function (_Dialog4) {
    _inherits(iconDialog, _Dialog4);

    function iconDialog(options) {
        _classCallCheck(this, iconDialog);

        var _options = {
            id: _.uniqueId("iconpicker_"),
            value: "",
            classNameDefault: "fa fa-lg",
            validIcons: ["fa-500px", "fa-address-book", "fa-address-book-o", "fa-address-card", "fa-address-card-o", "fa-adjust", "fa-adn", "fa-align-center", "fa-align-justify", "fa-align-left", "fa-align-right", "fa-amazon", "fa-ambulance", "fa-american-sign-language-interpreting", "fa-anchor", "fa-android", "fa-angellist", "fa-angle-double-down", "fa-angle-double-left", "fa-angle-double-right", "fa-angle-double-up", "fa-angle-down", "fa-angle-left", "fa-angle-right", "fa-angle-up", "fa-apple", "fa-archive", "fa-area-chart", "fa-arrow-circle-down", "fa-arrow-circle-left", "fa-arrow-circle-o-down", "fa-arrow-circle-o-left", "fa-arrow-circle-o-right", "fa-arrow-circle-o-up", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-down", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrows", "fa-arrows-a", "fa-arrows-h", "fa-arrows-v", "fa-asl-interpreting", "fa-assistive-listening-systems", "fa-asterisk", "fa-at", "fa-audio-description", "fa-automobile", "fa-backward", "fa-balance-scale", "fa-ban", "fa-bandcamp", "fa-bank", "fa-bar-chart", "fa-bar-chart-o", "fa-barcode", "fa-bars", "fa-bath", "fa-bathtub", "fa-battery", "fa-battery-0", "fa-battery-1", "fa-battery-2", "fa-battery-3", "fa-battery-4", "fa-battery-empty", "fa-battery-full", "fa-battery-half", "fa-battery-quarter", "fa-battery-three-quarters", "fa-bed", "fa-beer", "fa-behance", "fa-behance-square", "fa-bell", "fa-bell-o", "fa-bell-slash", "fa-bell-slash-o", "fa-bicycle", "fa-binoculars", "fa-birthday-cake", "fa-bitbucket", "fa-bitbucket-square", "fa-bitcoin", "fa-black-tie", "fa-blind", "fa-bluetooth", "fa-bluetooth-b", "fa-bold", "fa-bolt", "fa-bomb", "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-braille", "fa-briefcase", "fa-btc", "fa-bug", "fa-building", "fa-building-o", "fa-bullhorn", "fa-bullseye", "fa-bus", "fa-buysellads", "fa-cab", "fa-calculator", "fa-calendar", "fa-calendar-check-o", "fa-calendar-minus-o", "fa-calendar-o", "fa-calendar-plus-o", "fa-calendar-times-o", "fa-camera", "fa-camera-retro", "fa-car", "fa-caret-down", "fa-caret-left", "fa-caret-right", "fa-caret-square-o-down", "fa-caret-square-o-left", "fa-caret-square-o-right", "fa-caret-square-o-up", "fa-caret-up", "fa-cart-arrow-down", "fa-cart-plus", "fa-cc", "fa-cc-amex", "fa-cc-diners-club", "fa-cc-discover", "fa-cc-jcb", "fa-cc-mastercard", "fa-cc-paypal", "fa-cc-stripe", "fa-cc-visa", "fa-certificate", "fa-chain", "fa-chain-broken", "fa-check", "fa-check-circle", "fa-check-circle-o", "fa-check-square", "fa-check-square-o", "fa-chevron-circle-down", "fa-chevron-circle-left", "fa-chevron-circle-right", "fa-chevron-circle-up", "fa-chevron-down", "fa-chevron-left", "fa-chevron-right", "fa-chevron-up", "fa-child", "fa-chrome", "fa-circle", "fa-circle-o", "fa-circle-o-notch", "fa-circle-thin", "fa-clipboard", "fa-clock-o", "fa-clone", "fa-close", "fa-cloud", "fa-cloud-download", "fa-cloud-upload", "fa-cny", "fa-code", "fa-code-fork", "fa-codepen", "fa-codiepie", "fa-coffee", "fa-cog", "fa-cogs", "fa-columns", "fa-comment", "fa-comment-o", "fa-commenting", "fa-commenting-o", "fa-comments", "fa-comments-o", "fa-compass", "fa-compress", "fa-connectdevelop", "fa-contao", "fa-copy", "fa-copyright", "fa-creative-commons", "fa-credit-card", "fa-credit-card-alt", "fa-crop", "fa-crosshairs", "fa-css3", "fa-cube", "fa-cubes", "fa-cut", "fa-cutlery", "fa-dashboard", "fa-dashcube", "fa-database", "fa-deaf", "fa-deafness", "fa-dedent", "fa-delicious", "fa-desktop", "fa-deviantart", "fa-diamond", "fa-digg", "fa-dollar", "fa-dot-circle-o", "fa-download", "fa-dribbble", "fa-drivers-license", "fa-drivers-license-o", "fa-dropbox", "fa-drupal", "fa-edge", "fa-edit", "fa-eercast", "fa-eject", "fa-ellipsis-h", "fa-ellipsis-v", "fa-empire", "fa-envelope", "fa-envelope-o", "fa-envelope-open", "fa-envelope-open-o", "fa-envelope-square", "fa-envira", "fa-eraser", "fa-etsy", "fa-eur", "fa-euro", "fa-exchange", "fa-exclamation", "fa-exclamation-circle", "fa-exclamation-triangle", "fa-expand", "fa-expeditedssl", "fa-external-link", "fa-external-link-square", "fa-eye", "fa-eye-slash", "fa-eyedropper", "fa-fa", "fa-facebook", "fa-facebook-f", "fa-facebook-official", "fa-facebook-square", "fa-fast-backward", "fa-fast-forward", "fa-fax", "fa-feed", "fa-female", "fa-fighter-jet", "fa-file", "fa-file-archive-o", "fa-file-audio-o", "fa-file-code-o", "fa-file-excel-o", "fa-file-image-o", "fa-file-movie-o", "fa-file-o", "fa-file-pdf-o", "fa-file-photo-o", "fa-file-picture-o", "fa-file-powerpoint-o", "fa-file-sound-o", "fa-file-text", "fa-file-text-o", "fa-file-video-o", "fa-file-word-o", "fa-file-zip-o", "fa-files-o", "fa-film", "fa-filter", "fa-fire", "fa-fire-extinguisher", "fa-firefox", "fa-first-order", "fa-flag", "fa-flag-checkered", "fa-flag-o", "fa-flash", "fa-flask", "fa-flickr", "fa-floppy-o", "fa-folder", "fa-folder-o", "fa-folder-open", "fa-folder-open-o", "fa-font", "fa-font-awesome", "fa-fonticons", "fa-fort-awesome", "fa-forumbee", "fa-forward", "fa-foursquare", "fa-free-code-camp", "fa-frown-o", "fa-futbol-o", "fa-gamepad", "fa-gavel", "fa-gbp", "fa-ge", "fa-gear", "fa-gears", "fa-genderless", "fa-get-pocket", "fa-gg", "fa-gg-circle", "fa-gift", "fa-git", "fa-git-square", "fa-github", "fa-github-alt", "fa-github-square", "fa-gitlab", "fa-gittip", "fa-glass", "fa-glide", "fa-glide-g", "fa-globe", "fa-google", "fa-google-plus", "fa-google-plus-circle", "fa-google-plus-official", "fa-google-plus-square", "fa-google-wallet", "fa-graduation-cap", "fa-gratipay", "fa-grav", "fa-group", "fa-h-square", "fa-hacker-news", "fa-hand-grab-o", "fa-hand-lizard-o", "fa-hand-o-down", "fa-hand-o-left", "fa-hand-o-right", "fa-hand-o-up", "fa-hand-paper-o", "fa-hand-peace-o", "fa-hand-pointer-o", "fa-hand-rock-o", "fa-hand-scissors-o", "fa-hand-spock-o", "fa-hand-stop-o", "fa-handshake-o", "fa-hard-of-hearing", "fa-hashtag", "fa-hdd-o", "fa-header", "fa-headphones", "fa-heart", "fa-heart-o", "fa-heartbeat", "fa-history", "fa-home", "fa-hospital-o", "fa-hotel", "fa-hourglass", "fa-hourglass-1", "fa-hourglass-2", "fa-hourglass-3", "fa-hourglass-end", "fa-hourglass-half", "fa-hourglass-o", "fa-hourglass-start", "fa-houzz", "fa-html5", "fa-i-cursor", "fa-id-badge", "fa-id-card", "fa-id-card-o", "fa-ils", "fa-image", "fa-imdb", "fa-inbox", "fa-indent", "fa-industry", "fa-info", "fa-info-circle", "fa-inr", "fa-instagram", "fa-institution", "fa-internet-explorer", "fa-intersex", "fa-ioxhost", "fa-italic", "fa-joomla", "fa-jpy", "fa-jsfiddle", "fa-key", "fa-keyboard-o", "fa-krw", "fa-language", "fa-laptop", "fa-lastfm", "fa-lastfm-square", "fa-leaf", "fa-leanpub", "fa-legal", "fa-lemon-o", "fa-level-down", "fa-level-up", "fa-life-bouy", "fa-life-buoy", "fa-life-ring", "fa-life-saver", "fa-lightbulb-o", "fa-line-chart", "fa-link", "fa-linkedin", "fa-linkedin-square", "fa-linode", "fa-linux", "fa-list", "fa-list-alt", "fa-list-ol", "fa-list-ul", "fa-location-arrow", "fa-lock", "fa-long-arrow-down", "fa-long-arrow-left", "fa-long-arrow-right", "fa-long-arrow-up", "fa-low-vision", "fa-magic", "fa-magnet", "fa-mail-forward", "fa-mail-reply", "fa-mail-reply-all", "fa-male", "fa-map", "fa-map-marker", "fa-map-o", "fa-map-pin", "fa-map-signs", "fa-mars", "fa-mars-double", "fa-mars-stroke", "fa-mars-stroke-h", "fa-mars-stroke-v", "fa-maxcdn", "fa-meanpath", "fa-medium", "fa-medkit", "fa-meetup", "fa-meh-o", "fa-mercury", "fa-microchip", "fa-microphone", "fa-microphone-slash", "fa-minus", "fa-minus-circle", "fa-minus-square", "fa-minus-square-o", "fa-mixcloud", "fa-mobile", "fa-mobile-phone", "fa-modx", "fa-money", "fa-moon-o", "fa-mortar-board", "fa-motorcycle", "fa-mouse-pointer", "fa-music", "fa-navicon", "fa-neuter", "fa-newspaper-o", "fa-object-group", "fa-object-ungroup", "fa-odnoklassniki", "fa-odnoklassniki-square", "fa-opencart", "fa-openid", "fa-opera", "fa-optin-monster", "fa-outdent", "fa-pagelines", "fa-paint-brush", "fa-paper-plane", "fa-paper-plane-o", "fa-paperclip", "fa-paragraph", "fa-paste", "fa-pause", "fa-pause-circle", "fa-pause-circle-o", "fa-paw", "fa-paypal", "fa-pencil", "fa-pencil-square", "fa-pencil-square-o", "fa-percent", "fa-phone", "fa-phone-square", "fa-photo", "fa-picture-o", "fa-pie-chart", "fa-pied-piper", "fa-pied-piper-alt", "fa-pied-piper-pp", "fa-pinterest", "fa-pinterest-p", "fa-pinterest-square", "fa-plane", "fa-play", "fa-play-circle", "fa-play-circle-o", "fa-plug", "fa-plus", "fa-plus-circle", "fa-plus-square", "fa-plus-square-o", "fa-podcast", "fa-power-off", "fa-print", "fa-product-hunt", "fa-puzzle-piece", "fa-qq", "fa-qrcode", "fa-question", "fa-question-circle", "fa-question-circle-o", "fa-quora", "fa-quote-left", "fa-quote-right", "fa-ra", "fa-random", "fa-ravelry", "fa-rebel", "fa-recycle", "fa-reddit", "fa-reddit-alien", "fa-reddit-square", "fa-refresh", "fa-registered", "fa-remove", "fa-renren", "fa-reorder", "fa-repeat", "fa-reply", "fa-reply-all", "fa-resistance", "fa-retweet", "fa-rmb", "fa-road", "fa-rocket", "fa-rotate-left", "fa-rotate-right", "fa-rouble", "fa-rss", "fa-rss-square", "fa-rub", "fa-ruble", "fa-rupee", "fa-s15", "fa-safari", "fa-save", "fa-scissors", "fa-scribd", "fa-search", "fa-search-minus", "fa-search-plus", "fa-sellsy", "fa-send", "fa-send-o", "fa-server", "fa-share", "fa-share-alt", "fa-share-alt-square", "fa-share-square", "fa-share-square-o", "fa-shekel", "fa-sheqel", "fa-shield", "fa-ship", "fa-shirtsinbulk", "fa-shopping-bag", "fa-shopping-basket", "fa-shopping-cart", "fa-shower", "fa-sign-in", "fa-sign-language", "fa-sign-out", "fa-signal", "fa-signing", "fa-simplybuilt", "fa-sitemap", "fa-skyatlas", "fa-skype", "fa-slack", "fa-sliders", "fa-slideshare", "fa-smile-o", "fa-snapchat", "fa-snapchat-ghost", "fa-snapchat-square", "fa-snowflake-o", "fa-soccer-ball-o", "fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc", "fa-sort-amount-desc", "fa-sort-asc", "fa-sort-desc", "fa-sort-down", "fa-sort-numeric-asc", "fa-sort-numeric-desc", "fa-sort-up", "fa-soundcloud", "fa-space-shuttle", "fa-spinner", "fa-spoon", "fa-spotify", "fa-square", "fa-square-o", "fa-stack-exchange", "fa-stack-overflow", "fa-star", "fa-star-half", "fa-star-half-empty", "fa-star-half-full", "fa-star-half-o", "fa-star-o", "fa-steam", "fa-steam-square", "fa-step-backward", "fa-step-forward", "fa-stethoscope", "fa-sticky-note", "fa-sticky-note-o", "fa-stop", "fa-stop-circle", "fa-stop-circle-o", "fa-street-view", "fa-strikethrough", "fa-stumbleupon", "fa-stumbleupon-circle", "fa-subscript", "fa-subway", "fa-suitcase", "fa-sun-o", "fa-superpowers", "fa-superscript", "fa-support", "fa-table", "fa-tablet", "fa-tachometer", "fa-tag", "fa-tags", "fa-tasks", "fa-taxi", "fa-telegram", "fa-television", "fa-tencent-weibo", "fa-terminal", "fa-text-height", "fa-text-width", "fa-th", "fa-th-large", "fa-th-list", "fa-themeisle", "fa-thermometer", "fa-thermometer-0", "fa-thermometer-1", "fa-thermometer-2", "fa-thermometer-3", "fa-thermometer-4", "fa-thermometer-empty", "fa-thermometer-full", "fa-thermometer-half", "fa-thermometer-quarter", "fa-thermometer-three-quarters", "fa-thumb-tack", "fa-thumbs-down", "fa-thumbs-o-down", "fa-thumbs-o-up", "fa-thumbs-up", "fa-ticket", "fa-times", "fa-times-circle", "fa-times-circle-o", "fa-times-rectangle", "fa-times-rectangle-o", "fa-tint", "fa-toggle-down", "fa-toggle-left", "fa-toggle-off", "fa-toggle-on", "fa-toggle-right", "fa-toggle-up", "fa-trademark", "fa-train", "fa-transgender", "fa-transgender-alt", "fa-trash", "fa-trash-o", "fa-tree", "fa-trello", "fa-tripadvisor", "fa-trophy", "fa-truck", "fa-try", "fa-tty", "fa-tumblr", "fa-tumblr-square", "fa-turkish-lira", "fa-tv", "fa-twitch", "fa-twitter", "fa-twitter-square", "fa-umbrella", "fa-underline", "fa-undo", "fa-universal-access", "fa-university", "fa-unlink", "fa-unlock", "fa-unlock-alt", "fa-unsorted", "fa-upload", "fa-usb", "fa-usd", "fa-user", "fa-user-circle", "fa-user-circle-o", "fa-user-md", "fa-user-o", "fa-user-plus", "fa-user-secret", "fa-user-times", "fa-users", "fa-vcard", "fa-vcard-o", "fa-venus", "fa-venus-double", "fa-venus-mars", "fa-viacoin", "fa-viadeo", "fa-viadeo-square", "fa-video-camera", "fa-vimeo", "fa-vimeo-square", "fa-vine", "fa-vk", "fa-volume-control-phone", "fa-volume-down", "fa-volume-off", "fa-volume-up", "fa-warning", "fa-wechat", "fa-weibo", "fa-weixin", "fa-whatsapp", "fa-wheelchair", "fa-wheelchair-alt", "fa-wifi", "fa-wikipedia-w", "fa-window-close", "fa-window-close-o", "fa-window-maximize", "fa-window-minimize", "fa-window-restore", "fa-windows", "fa-won", "fa-wordpress", "fa-wpbeginner", "fa-wpexplorer", "fa-wpforms", "fa-wrench", "fa-xing", "fa-xing-square", "fa-y-combinator", "fa-y-combinator-square", "fa-yahoo", "fa-yc", "fa-yc-square", "fa-yelp", "fa-yen", "fa-yoast", "fa-youtube", "fa-youtube-play", "fa-youtube-square"],
            callback: function callback() {},
            onSuccess: function onSuccess(dialogRef) {
                var r = $(dialogRef.html).find(".modal-body").find("input").attr('data-value');
                _this5.options.callback(r);
            },
            title: "Selecione ícone"
        };
        _.merge(_options, options);

        var _this5 = _possibleConstructorReturn(this, (iconDialog.__proto__ || Object.getPrototypeOf(iconDialog)).call(this, _options));

        _this5.setSize("sm");
        _this5.render();
        return _this5;
    }

    _createClass(iconDialog, [{
        key: 'render',
        value: function render() {
            var _this6 = this;

            _get(iconDialog.prototype.__proto__ || Object.getPrototypeOf(iconDialog.prototype), 'render', this).call(this);
            var _html = $("<div>");

            this.iconElement = $("<i>").addClass(this.options.classNameDefault).addClass(this.options.value);
            this.inputElement = $("<input>").addClass("form-control").attr("value", this.options.value).attr("type", "text").attr("data-value", this.options.value).attr("id", this.options.id);

            _html.append($("<div>").addClass("form-group").append($("<div>").addClass("input-group").append(this.inputElement, $("<div>").addClass("input-group-append").append($("<div>").addClass("input-group-text btn btn-light").append(this.iconElement)))));
            this.inputElement.change(function (e) {
                _this6.inputChangeEvent(e);
            });

            var iconList = $("<ul>").addClass("list-inline iconpicker").css({ 'max-height': '350px', 'overflow': 'auto' });
            this.options.validIcons.forEach(function (i) {
                iconList.append($("<li>").addClass("list-inline-item").append($("<i>").attr("data-value", i).addClass("fa fa-fw").addClass(i).click(function (e) {
                    _this6.setInputValue($(e.target).attr('data-value'));
                    _this6.refreshIcon();
                })));
            });
            _html.append(iconList);
            this.setContent(_html);
        }
    }, {
        key: 'isValid',
        value: function isValid(value) {
            if (this.options.validIcons.indexOf(value) > -1) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'setInputValue',
        value: function setInputValue(value) {
            $(this.inputElement).attr("data-value", value).val(value);
        }
    }, {
        key: 'refreshIcon',
        value: function refreshIcon() {
            $(this.iconElement).removeClass().addClass(this.options.classNameDefault).addClass(this.inputValue);
        }
    }, {
        key: 'inputChangeEvent',
        value: function inputChangeEvent(event) {
            if (this.isValid(this.inputElement.val())) {
                this.setInputValue(this.inputElement.val());
                this.refreshIcon();
            }
        }
    }, {
        key: 'inputValue',
        get: function get() {
            return $(this.inputElement).attr("data-value");
        }
    }]);

    return iconDialog;
}(Dialog);
