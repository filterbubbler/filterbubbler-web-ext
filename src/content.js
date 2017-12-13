// content-script.js
"use strict";

import browser from 'webextension-polyfill';
import $ from 'jquery'

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
    if (request.type) {
        switch (request.type) {
            case 'PAGE_TEXT':
                return Promise.resolve({
                    type: 'PAGE_TEXT_RESPONSE',
                    text: filterBubblerPageContent()
                })
            case 'FB_FEED':
                const articles = $('div.userContent')
                const results = []
                $(articles).each(function(idx) {
                    const container = $(this).parents('div[role="article"]')
                    results.push({
                        id: $(container).attr('id'),
                        content: $(this).text()
                    })
                })
                return Promise.resolve({
                    type: 'FB_FEED_RESULTS',
                    results
                })
            case 'FB_LABEL':
                $(`div[id="${request.id}"]`).prepend(`<p style="padding-left: 10px">CLASSIFICATION: <b>${request.classification}</b></p>`)
                return Promise.resolve({
                    type: 'FB_LABEL_RESPONSE',
                    results
                })
        }
    }
});

browser.runtime.sendMessage({
    type: 'FBBL_PAGE_TEXT', 
    url: document.location.href,
    content: filterBubblerPageContent()
});
