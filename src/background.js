import bayes from 'bayes';

console.log('InfoBubbles: Background script starting');

var classifier = bayes();

var port;
browser.runtime.onConnect.addListener(function(_port) {
    port = _port;
    port.onMessage.addListener(function(m) {
        console.log('InfoBubbles: Background: Message:', m);
        if (m.action === 'CLASSIFY') {
            classifier.learn(m.text.join(' '), m.tag);
        }
        if (m.action === 'ANALYZE') {
            var category = classifier.categorize(m.text.join(' '));
            port.postMessage({
                action: 'REPORT',
                tag: category
            });
        }
    });
});
