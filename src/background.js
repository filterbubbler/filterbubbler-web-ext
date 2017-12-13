import browser from 'webextension-polyfill'
window.browser = browser
import store from './store';
import {addClassification, addCorpus, setUrl, analyzeContent} from './actions';

window.store = store
console.log('FilterBubbler: Background script starting',window.store)
