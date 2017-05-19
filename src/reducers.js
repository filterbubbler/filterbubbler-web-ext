import {combineReducers} from 'redux';
import { reducer as bayesReducer } from 'bayes-classifier';
import {UI_REQUEST_ACTIVE_URL, REQUEST_ACTIVE_TAB_TEXT, SET_CONTENT, ADD_CORPUS, CHANGE_CLASSIFICATION, ACTIVE_URL} from './constants';
import { reducer as formReducer } from 'redux-form';

const initialState = {
    url: '',
    content: '',
    classifierStatus: '',
    currentClassification: '',
    classifications: [],
    corpura: [],
    recipes: [],
    repositories: [],
    ui: {
        classification: ''
    }
}

function classifications(state = initialState.classifications, action) {
    console.log('REDUCER', action)
    return state;
}

function corpura(state = initialState.corpura, action) {
    switch (action.type) {
        case ADD_CORPUS:
            return [...state, action.corpus]
        default:
            return state;
    }
}

function content(state = initialState.content, action) {
    switch (action.type) {
        /*
        case REQUEST_ACTIVE_TAB_TEXT:
            return {...state, content: action.content}
            */
        default:
            return state
    }

    return state;
}

function urls(state = initialState.url, action) {
    switch (action.type) {
        case ACTIVE_URL:
            return (action.url != undefined) ? action.url : state
        default:
            return state
    }
}

function classify(state = initialState.currentClassification, action) {
    switch (action.type) {
        case CHANGE_CLASSIFICATION:
            return action.classification
        default:
            return state
    }
}

function ui(state = initialState.ui, action) {
    return state;
}

export default combineReducers({
    url: urls,
    corpura: corpura,
    currentClassification: classify,
    classifications: classifications,
    content: content,
    form: formReducer,
    ui: ui
});
