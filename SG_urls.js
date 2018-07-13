// ==UserScript==
// @name         SG urls
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  get urls of created giveaways
// @author       liu0hy
// @match        https://www.steamgifts.com/giveaways/created
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var nodes = document.getElementsByClassName("table__row-inner-wrap");
    var urls = [];
    var images = [];
    var BB_code = "[url=https://steamgifts.com/giveaway/$CODE/][img]https://steamgifts.com/giveaway/$CODE/signature.png[/img][/url]";
    for (var n of nodes) {
        if (n.getElementsByClassName("fa-check-circle").length==0) {
            var href = n.getElementsByClassName("table__column__heading")[0].href;
            urls.push(href);
            var code = href.split("/")[4];
            images.push(BB_code.replace(/\$CODE/g, code));
        }
    }
    var elem = document.createElement("div");
    elem.className = "nav__button-container";
    elem.innerHTML = "<div class=\"nav__relative-dropdown is-hidden\">\
<div class=\"nav__absolute-dropdown\">\
<a class=\"nav__row\" id=\"direct_link\">\
<div class=\"nav__row__summary\">\
<p class=\"nav__row__summary__name\">Direct link</p>\
</div>\
</a>\
<a class=\"nav__row\" id=\"bb_code\">\
<div class=\"nav__row__summary\">\
<p class=\"nav__row__summary__name\">BB code</p>\
</div>\
</a>		\
</div>\
</div>	\
<span id=\"sg_urls\" class=\"nav__button nav__button--is-dropdown\">SG urls</span>\
<div class=\"nav__button nav__button--is-dropdown-arrow\"><i class=\"fa fa-angle-down\"></i></div>";
    document.getElementsByClassName("nav__left-container")[0].appendChild(elem);

    document.getElementById("sg_urls").onclick = function(){console.log(urls.join("\n"));};
    document.getElementById("direct_link").onclick = function(){console.log(urls.join("\n"));};
    document.getElementById("bb_code").onclick = function(){console.log(images.join("\n"));};
})();
