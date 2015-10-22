// ==UserScript==
// @name         VK Doc direct link
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       alezhu
// @match        http://vk.com/*
// @grant        none
// ==/UserScript==

(function(window){
    function _wait(name,fn) {
        if(typeof window[name] !== 'undefined') fn(); else setTimeout(_wait,100);
    }

    _wait('geByClass', function(){

        var doc_divs = window.geByClass('media_desc__doc','div');
        var reDoc = /<iframe[^>]+src="([^"]+)"/mi;
        for( var i = 0; i< doc_divs.length; i++) {
            var div = doc_divs[i];
            var a = window.geByTag1('a',div);
            //console.log(a.href);
            (function(parent){
                var r = ajax._getreq();
                r.onreadystatechange = function() {
                    if (r.readyState == 4) {
                        if (r.status >= 200 && r.status < 300) {
                            var match = reDoc.exec(r.responseText);
                            var src = match[1];
                            if(src.indexOf('dl=1') <0) {
                                if(src.indexOf('?') <0) src += '?dl=1'; else src += '&dl=1';
                            }
                            //console.log(src);
                            var link = ce('a', {href: src , innerHTML: '[ прямая ссылка ]', target: '_blank' });
                            parent.appendChild(link);
                        }
                    }
                };
                try {
                    r.open('GET', a.href, false);
                    r.send(null);
                } catch(e) {
                }
            })(div);
        }
    });

})(window);


