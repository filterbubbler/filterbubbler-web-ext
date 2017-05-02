import {combineReducers} from 'redux';
import {
    ADD_CLASSIFICATION,
    ANALYZE_CONTENT
} from './constants';

const initialState = {
    url: 'http://test.com',
    content: '',
    classifications: []
}

function addClassification(state = initialState, action) {
    return state;
}

function analyzeContent(state = initialState, action) {
    return state;
}

export default combineReducers({
    addClassification,
    analyzeContent
});
