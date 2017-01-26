console.log('InfoBubbles: Content');

function documentText() {
    var text = [];
    var nodes = document.querySelectorAll('body *');
    nodes.forEach(function(node) {
        if (node.innerText !== null && node.tagName != 'SCRIPT' && node.tagName != 'STYLE' && node.innerText !== '') {
            text.push(node.innerText);
        }
    });

    return text;
}

var bubblePort = browser.runtime.connect({name:"bubble-scan"});

console.log('InfoBubbles: Content: Text', documentText());

bubblePort.postMessage({
    type: 'PAGE_TEXT',
    title: 'document title',
    text: documentText()
});
