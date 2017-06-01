import {combineReducers} from 'redux';
import { reducer as bayesReducer } from 'bayes-classifier';
import { 
    UPDATE_RECIPES,
    MAIN_TAB,
    UI_REQUEST_ACTIVE_URL,
    REQUEST_ACTIVE_TAB_TEXT,
    SET_CONTENT,
    ADD_CORPUS,
    CHANGE_CLASSIFICATION,
    ACTIVE_URL
} from './constants';
import { reducer as formReducer } from 'redux-form';

const initialState = {
    url: '',
    content: '',
    classifierStatus: '',
    currentClassification: '',
    classifications: [],
    corpora: [],
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

function corpora(state = initialState.corpora, action) {
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

const recipes = (state = [], action) => {
    switch (action.type) {
        case UPDATE_RECIPES:
            return action.recipes
        default:
            return state
    }
}

const tabs = (state = 0, action) => {
    switch (action.type) {
        case MAIN_TAB:
            return action.index
        default:
            return state
    }
}

export default combineReducers({
    url: urls,
    corpora: corpora,
    recipes: recipes,
    currentClassification: classify,
    classifications: classifications,
    content: content,
    form: formReducer,
    mainTab: tabs,
    ui: ui
});
