console.log('FilterBubbler: Content script startup');

var fbblPort = browser.runtime.connect({name:"filterbubbler"});

window.filterBubbler = {
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
        fbblPort.postMessage({
            action: 'ANALYZE',
            title: 'document title',
            text: this.getText()
        });
    },
    classify: function(tag) {
        console.log('FilterBubbler: Content CLASSIFY');
        fbblPort.postMessage({
            action: 'CLASSIFY',
            title: 'document title',
            text: this.getText(),
            tag: tag
        });

        fbblPort.postMessage({
            action: 'ANALYZE',
            title: 'document title',
            text: this.getText()
        });
    }
}

window.filterBubbler.analyze()
