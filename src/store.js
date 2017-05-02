import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import {ADD_CLASSIFICATION, ANALYZE_CONTENT} from './constants';
import reducer from './reducers';
import {addClassification, analyzeContent} from './actions';

const store = createStore(reducer);

export default createBackgroundStore({
    store,
    actions: {
        ADD_CLASSIFICATION: addClassification,
        ANALYZE_CONTENT: analyzeContent
    }
});
