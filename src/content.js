console.log('InfoBubbles: Content!');

var port = browser.runtime.connect({name:"bubble-scan"});

window.infobubble = {
    getText: function() {
        var text = [];
        var nodes = document.querySelectorAll('body *');
        nodes.forEach(function(node) {
            if (node.innerText != null && node.tagName != 'SCRIPT' && node.tagName != 'STYLE' && node.innerText.trim() !== '') {
                text.push('' + node.innerText);
            }
        });
        return text;
    },
    analyze: function() {
        console.log('Content ANALYZE');
        port.postMessage({
            action: 'ANALYZE',
            title: 'document title',
            text: this.getText()
        });
    },
    classify: function(tag) {
        console.log('Content CLASSIFY');
        port.postMessage({
            action: 'CLASSIFY',
            title: 'document title',
            text: this.getText(),
            tag: tag
        });
    }
}
