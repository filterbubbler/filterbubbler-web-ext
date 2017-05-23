// content-script.js
"use strict";

import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(request => {
    console.log("Message from the background script:", request);
    if (request.type && request.type == 'PAGE_TEXT') {
        var text = [];
        var nodes = document.querySelectorAll('body *');

        nodes.forEach(function(node) {
            if (node.innerText != null && node.tagName.toUpperCase() != 'SCRIPT' &&
                node.tagName.toUpperCase() != 'STYLE' && node.innerText.trim() !== '') {
                text.push('' + node.innerText);
            }
        });

        var allText = text.join(' ')

        return Promise.resolve({
            type: 'PAGE_TEXT_RESPONSE',
            text: allText
        });
    }
});
