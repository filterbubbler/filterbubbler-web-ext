import store from './store';
import {addClassification, addCorpus, setUrl, analyzeContent} from './actions';

console.log('FilterBubbler: Background script starting')

// We'll stick with using messages to request content text in order to
// keep the footprint in external pages as minimal as possible
var port;
browser.runtime.onConnect.addListener(function(_port) {
    port = _port;
    port.onMessage.addListener(function(m) {
//        console.log('FilterBubbler: Background: Message:', m);
        if (m.action === 'CLASSIFY') {
            console.log('CONTENT: classify', m.text.join(' '), m.tag)
            /*
            classifier.learn(m.text.join(' '), m.tag);
            var db = {};
            db[DBNAME] = classifier.toJson();
            browser.storage.local.set(db).then(function(result) {
                console.log('Stored successfully');
            }, function(error) {
                console.log('Error storing DB');
            });
            */
        }
        if (m.action === 'ANALYZE') {
            store.dispatch(analyzeContent({content: m.text.join(' ')}))
        }
    });
});


