// content-script.js
"use strict";

import browser from 'webextension-polyfill';

function filterBubblerPageContent() {
    var text = [];
    var nodes = document.querySelectorAll('body *');

    nodes.forEach(function(node) {
        if (node.innerText != null && node.tagName.toUpperCase() != 'SCRIPT' &&
            node.tagName.toUpperCase() != 'STYLE' && node.innerText.trim() !== '') {
            text.push('' + node.innerText);
        }
    });

    var allText = text.join(' ');
    return allText;
}

browser.runtime.onMessage.addListener(request => {
    if (request.type && request.type == 'PAGE_TEXT') {
        return Promise.resolve({
            type: 'PAGE_TEXT_RESPONSE',
            text: filterBubblerPageContent()
        });
    }
});

browser.runtime.sendMessage({
    type: 'FBBL_PAGE_TEXT', 
    url: document.location.href,
    content: filterBubblerPageContent()
});
