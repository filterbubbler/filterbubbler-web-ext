import {combineReducers} from 'redux';
import {
    ADD_CLASSIFICATION,
    ANALYZE_CONTENT,
    SET_URL
} from './constants';

const initialState = {
    url: 'http://test.com',
    content: '',
    classification: '',
    classifications: [],
    corpura: [],
    recipes: []
}

function addClassification(state = initialState.classifications, action) {
    return state;
}

function addCorpus(state = initialState.corpura, action) {
    switch (action.type) {
        case ADD_CORPUS:
            return [...state, action.corpus];
        default:
            return state;
    }
}

function analyzeContent(state = initialState.content, action) {
    return state;
}

function urls(state = initialState.url, action) {
    switch (action.type) {
        case SET_URL:
            return action.url
        default:
            return state;
    }
}

function classification(state = initialState.classification, action) {
    return state;
}

export default combineReducers({
    url: urls,
    classification: classification,
    classifications: addClassification,
    content: analyzeContent
});
