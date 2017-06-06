import {
    ADD_CORPUS,
    ADD_CLASSIFICATION,
    ADD_CORPUS_CLASSIFICATION,
    CHANGE_CLASSIFICATION,
    CHANGE_SERVER,
    ACTIVE_URL,
    REPORT_ERROR,
    UI_REQUEST_ACTIVE_URL,
    ANALYZE_CONTENT,
    SET_CONTENT,
    REQUEST_ACTIVE_TAB_TEXT,
    COULD_NOT_FETCH_TAB_TEXT,
    MAIN_TAB,
    UPDATE_RECIPES,
    UI_SHOW_ADD_RECIPE
} from './constants'
import { analyze, classify } from 'bayes-classifier'

export function addClassification(form) {
    return function (dispatch) {
        fetchActiveTabContent().then(
            content => {
                console.log('CLASSIFY', form.newClassification, content)
                classify(content, form.newClassification)
                dispatch(requestActiveTabContent())
            }
        )
    }
}

export const uiShowAddRecipe = (visible) => {
    return {
        type: UI_SHOW_ADD_RECIPE,
        visible
    }
}

export const addCorpusClassification = (classification, url) => {
    return {
        type: ADD_CORPUS_CLASSIFICATION,
        classification,
        url
    }
}

export const uiAddClassification = (classification) => {
    return {
        type: ADD_CLASSIFICATION,
        classification: classification
    }
}

export function changeClassification(classification) {
    classification = classification ? classification : 'None'
    console.log('Change classification', classification);
    return {
        type: CHANGE_CLASSIFICATION,
        classification: classification
    }
}

export function setContent(content) {
    return {
        type: SET_CONTENT,
        content
    }
}

export function reportError(error) {
    return {
        type: REPORT_ERROR,
        error
    }
}

function fetchActiveTabContent() {
    return browser.tabs.query({active: true, currentWindow: true}).then(
        tabs => {
            return browser.tabs.sendMessage(
                tabs[0].id,
                {
                    type: 'PAGE_TEXT'
                }
            )
        },
        error => {
            return 'error fetching'
        }
    ).then(
        response => {
            return response.text
        },
        error => {
            return 'error sending'
        }
    )
}

export function requestActiveTabContent() {
    return function (dispatch) {
        fetchActiveTabContent().then(
            content => {
                let classification = analyze(content);
                console.log('Classification', classification);
                dispatch(changeClassification(classification));
                return Promise.resolve()
            },
            error => {
                console.log('Error occurred', error)
                dispatch(reportError('Could not fetch tab content'));
                return Promise.resolve()
            }
        )
    }
}

export function activeUrl(url) {
    return {
        type: ACTIVE_URL,
        url
    }
}

// Plain object for WebExtension bridge
export function uiRequestActiveUrl() {
    return {
        type: UI_REQUEST_ACTIVE_URL
    }
}

export function requestActiveUrl() {
    return dispatch => {
        return browser.tabs.query({active: true, currentWindow: true}).then(
            tabs => {
                if (tabs && tabs[0] && tabs[0].url) {
                    dispatch(activeUrl(tabs[0].url))
                }
                dispatch(requestActiveTabContent());
            }
        )
    }
}

export const addCorpus = (corpus) => {
    return {
        type: ADD_CORPUS,
        corpus
    }
}

export const readCorpus = (corpusUrl) => {
    return dispatch => fetch(corpusUrl).then(
        result => result.json().then(
            corpus => dispatch(addCorpus({...corpus, url: corpusUrl})),
            error => dispatch(reportError('Could not decode corpus'))
        ),
        error => dispatch(reportError('Could not read corpus'))
    )
}

export const changeMainTab = (index) => {
    return {
        type: MAIN_TAB,
        index
    }
}

export function analyzeCurrentTab() {
    return {
        type: ANALYZE_CONTENT,
        content
    };
}

// Recipe retrieval
export const readRecipes = () => {
    return (dispatch, getState) => {
        return fetch('http://' + getState().currentServer + '/wp-json/filterbubbler/v1/recipe').then(
        result => result.json().then(
            recipes => {
                recipes.map(recipe => {
                    recipe.corpora.map(corpusUrl => {
                        dispatch(readCorpus(corpusUrl))
                    })
                })
                dispatch(updateRecipes(recipes))
            },
            error => dispatch(reportError('Could not decode recipe response'))
        ),
        error => dispatch(reportError('Could not fetch recipes'))
    )
    }
}

export const changeServer = (server) => {
    return {
        type: CHANGE_SERVER,
        server
    }
}

export function updateRecipes(recipes) {
    return {
        type: UPDATE_RECIPES,
        recipes
    }
}
