import bayes from 'bayes';

console.log('FilterBubbler: Background script starting');

var classifier = bayes();
var DBNAME = 'FilterBubblerDB';

browser.storage.local.get(DBNAME).then(function(existingdb) {
    console.log('Existing DB', existingdb);
    if (existingdb[DBNAME]) {
        console.log('Loaded classification DB from localstorage:', existingdb);
        classifier = bayes.fromJson(existingdb[DBNAME]);
    } else {
        console.log('No pre-existing DB');
    }
});

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
