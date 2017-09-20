import browser from 'webextension-polyfill'
window.browser = browser
import store from './store';
import {addClassification, addCorpus, setUrl, analyzeContent} from './actions';

console.log('FilterBubbler: Background script starting')
