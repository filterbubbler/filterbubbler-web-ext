import store from './store';
import {addClassification, addCorpus, setUrl, analyzeContent} from './actions';

console.log('FilterBubbler: Background script starting');

var port;
browser.runtime.onConnect.addListener(function(_port) {
    port = _port;
    port.onMessage.addListener(function(m) {
        console.log('FilterBubbler: Background: Message:', m);
        if (m.action === 'CLASSIFY') {
            classifier.learn(m.text.join(' '), m.tag);
            var db = {};
            db[DBNAME] = classifier.toJson();
            browser.storage.local.set(db).then(function(result) {
                console.log('Stored successfully');
            }, function(error) {
                console.log('Error storing DB');
            });
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


