console.log('FilterBubbler: Content!');

var port = browser.runtime.connect({name:"bubble-scan"});

browser.tabs.getCurrent().then((tabInfo) => {
    console.log('Current tab:', tabInfo);
});

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
        console.log('FilterBubbler: Content ANALYZE');
        port.postMessage({
            action: 'ANALYZE',
            title: 'document title',
            text: this.getText()
        });
    },
    classify: function(tag) {
        console.log('FilterBubbler: Content CLASSIFY');
        port.postMessage({
            action: 'CLASSIFY',
            title: 'document title',
            text: this.getText(),
            tag: tag
        });

        port.postMessage({
            action: 'ANALYZE',
            title: 'document title',
            text: this.getText()
        });
    }
}
