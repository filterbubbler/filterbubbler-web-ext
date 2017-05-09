import {combineReducers} from 'redux';
import reducer from 'bayes-reducer';
import {
    ADD_CLASSIFICATION,
    ADD_CORPUS,
    ANALYZE_CONTENT,
    CLASSIFY,
    SET_URL
} from './constants';

const initialState = {
    url: 'http://test.com',
    content: '',
    classifierStatus: '',
    currentClassification: 'None',
    classifications: [],
    corpura: [],
    recipes: [],
    repositories: []
}

function addClassification(state = initialState.classifications, action) {
    return state;
}

function addCorpus(state = initialState.corpura, action) {
    switch (action.type) {
        case ADD_CORPUS:
            return [...state, action.corpus]
        case SET_URL:
            console.log('ADD CORPUS WAS CALLED')
            return state;
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

function classify(state = initialState.currentClassification, action) {
    return state;
}

console.log('BAYES REDUCER', reducer)

export default combineReducers({
    url: urls,
    corpura: addCorpus,
    currentClassification: reducer,
    classifications: addClassification,
    content: analyzeContent
});

