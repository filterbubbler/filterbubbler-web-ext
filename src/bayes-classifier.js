import bayes from 'bayes';
import browser from 'webextension-polyfill';
import DBNAME from 'constants'
//import changeClassification from './actions';

var classifier = bayes();

browser.storage.local.get(DBNAME).then(function(existingdb) {
    console.log('Existing DB', existingdb);
    if (existingdb[DBNAME]) {
        console.log('Loaded classification DB from localstorage:', existingdb);
        classifier = bayes.fromJson(existingdb[DBNAME]);
    } else {
        console.log('No pre-existing DB');
    }
});

const analyze = (text) => {
    return classifier.categorize(text);
}
export { analyze }

const classify = (text, tag) => {
    classifier.learn(text, tag);
    var db = {};
    db[DBNAME] = classifier.toJson();
    browser.storage.local.set(db).then(function(result) {
        console.log('Stored successfully');
    }, function(error) {
        console.log('Error storing DB');
    });
}
export { classify }

const reducer = (state = 'None', action) => {
    console.log('BAYES REDUCER', action)
    return state
}
export default reducer;
