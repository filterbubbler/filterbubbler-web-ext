import bayes from 'bayes';

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

var reducer = (state = 'None', action) => {
    switch (action.type) {
        case 'CLASSIFY':
            classifier.learn(action.text, m.tag);
            var db = {};
            db[DBNAME] = classifier.toJson();
            browser.storage.local.set(db).then(function(result) {
                console.log('Stored successfully');
            }, function(error) {
                console.log('Error storing DB');
            });
            return state;
        case 'ANALYZE':
            return classifier.categorize(action.text);
        default:
            return state;
    }
}

export default reducer;
