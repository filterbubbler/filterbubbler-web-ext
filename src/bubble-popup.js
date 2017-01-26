console.log('Bubble popup');

var bubblename = document.querySelector('#bubblename');
var button = document.querySelector('#classify');

button.onclick = function(e) {
    // Test
    console.log('clickity');
};

chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});
