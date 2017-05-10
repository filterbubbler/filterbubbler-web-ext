import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import {ADD_CLASSIFICATION, SET_URL, ANALYZE_CONTENT} from './constants';
import reducers from './reducers';
import {addClassification, setUrl, analyzeContent} from './actions';

const store = createStore(reducers);

export default createBackgroundStore({
    store
});
