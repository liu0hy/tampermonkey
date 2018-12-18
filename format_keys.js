// ==UserScript==
// @name         Format keys
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Format keys to be redeemed by ASF
// @author       liu0hy
// @match        https://liu0hy.cn:2096/page/commands
// @updateURL    https://raw.githubusercontent.com/liu0hy/tampermonkey/master/format_keys.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var e = document.createElement("script");
    var t = document.createTextNode("function magic() {\n\
var str = document.getElementsByClassName(\"terminal__input\")[0].value;\n\
var n = str.match(/\\w{5}-\\w{5}-\\w{5}/g);\n\
if (!n) {\n\
console.log(\"No valid key found\");\n\
return;\n\
}\n\
str = \"redeem master \" + n.join(\",\");\n\
console.log(str);\n\
}");
    e.appendChild(t);
    document.body.appendChild(e);
})();
