import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import {ADD_CLASSIFICATION, SET_URL, ANALYZE_CONTENT} from './constants';
import reducer from './reducers';
import {addClassification, setUrl, analyzeContent} from './actions';

const store = createStore(reducer);

export default createBackgroundStore({
    store,
    actions: {
        'ADD_CLASSIFICATION': addClassification,
        'SET_URL': setUrl,
        'ANALYZE_CONTENT': analyzeContent
    }
});
