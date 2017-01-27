console.log('InfoBubbles: Content!');

var text = [];
var nodes = document.querySelectorAll('body *');
nodes.forEach(function(node) {
    if (node.innerText !== null && node.tagName != 'SCRIPT' && node.tagName != 'STYLE' && node.innerText.trim() !== '') {
        text.push('' + node.innerText);
    }
});


var bubblePort = browser.runtime.connect({name:"bubble-scan"});

bubblePort.postMessage({
    type: 'PAGE_TEXT',
    title: 'document title',
    text: text
});
