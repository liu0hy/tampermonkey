// ==UserScript==
// @name         Format keys
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Format keys to be redeemed by ASF
// @author       liu0hy
// @match        https://liu0hy.cn:2096/page/*
// @updateURL    https://raw.githubusercontent.com/liu0hy/tampermonkey/master/format_keys.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function magic(bg) {
        var str = document.getElementsByClassName("terminal__input")[0].value;
        var n = str.match(/\w{5}-\w{5}-\w{5}/g);
        if (!n) {
            alert("No valid key found");
            return;
        }
        console.log('redeem master ' + n.join(','));
        if (bg) {
            var c = "https://liu0hy.cn:2096/api/command/redeem%20master%20" + n.join(",");
            fetch(c, {method:"POST", headers: {'authentication': 'rqbc6n@ASF'}})
                .then((res)=>res.json())
                .then((data)=>{alert(data.Result);console.log(data.Result);});
        }
    }
    function prepare_magic() {
        var f = document.getElementsByClassName("footer__link")[0];
        var m = f.cloneNode(true);
        m.innerText = "Yin";
        m.setAttribute("href", "javascript:void(magic(true))");
        f.parentNode.appendChild(m);
        m = f.cloneNode(true);
        m.innerText = "Yang";
        m.setAttribute("href", "javascript:void(magic(false))");
        f.parentNode.appendChild(m);
        var s = document.createElement("script");
        s.innerHTML = magic.toString();
        document.body.appendChild(s);
    }
    var tm = setInterval(function() {
        var f = document.getElementsByClassName("footer__link")[0];
        if (f) {
            prepare_magic();
            clearInterval(tm);
        }
    }, 1000);
})();
