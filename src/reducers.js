import {combineReducers} from 'redux';
import bayesReducer from 'bayes-reducer';
import {ADD_CORPUS, CHANGE_CLASSIFICATION, SET_URL} from './constants';
import { reducer as formReducer } from 'redux-form';

const initialState = {
    url: 'http://test.com',
    content: '',
    classifierStatus: '',
    currentClassification: 'None',
    classifications: [],
    corpura: [],
    recipes: [],
    repositories: [],
    ui: {
        classification: ''
    }
}

function addClassification(state = initialState.classifications, action) {
    console.log('REDUCER', action)
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

function ui(state = initialState.ui, action) {
    switch (action.type) {
        case CHANGE_CLASSIFICATION:
            return {...state, classification: state.classification + action.value}
        default:
            return state
    }
    return state;
}

export default combineReducers({
    url: urls,
    corpura: addCorpus,
    currentClassification: bayesReducer,
    classifications: addClassification,
    content: analyzeContent,
    form: formReducer,
    ui: ui
});

