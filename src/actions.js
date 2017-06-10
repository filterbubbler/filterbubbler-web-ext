import browser from 'webextension-polyfill';
import { analyze, classify } from 'bayes-classifier'
import {
    DBNAME,
    APPLY_RESTORED_STATE,
    ADD_CORPUS,
    ADD_CLASSIFICATION,
    ADD_CORPUS_CLASSIFICATION,
    CHANGE_CLASSIFICATION,
    ADD_SERVER,
    UI_ADD_SERVER,
    ACTIVE_URL,
    REPORT_ERROR,
    UI_REQUEST_ACTIVE_URL,
    ANALYZE_CONTENT,
    SET_CONTENT,
    REQUEST_ACTIVE_TAB_TEXT,
    COULD_NOT_FETCH_TAB_TEXT,
    MAIN_TAB,
    UPDATE_RECIPES,
    UI_LOAD_RECIPE,
    LOAD_RECIPE,
    UI_SHOW_ADD_RECIPE
} from './constants'

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
    return fetch(corpusUrl).then(
        result => {
            return result.json()
        },
        error => dispatch(reportError('Could not read corpus'))
    ).then(
        json => {
            return json
        },
        error => dispatch(reportError('Could not decode json'))
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
export const readRecipes = (server) => {
    return fetch('http://' + server + '/wp-json/filterbubbler/v1/recipe').then(
        result => result.json(),
        error => dispatch(reportError('Could not fetch recipes'))
    )
}
    /*
        .then(
            recipes => {
                recipes.map(recipe => {
                    recipe.corpora.map(corpusUrl => {
                        dispatch(readCorpus(corpusUrl))
                    })
                })
                dispatch(updateRecipes(server, recipes))
            },
            error => dispatch(reportError('Could not decode recipe response'))
        ),
    )
    }
    */

// Set whether a given recipe should be loaded locally
export const uiLoadRecipe = ({server, recipe, load}) => {
    return {
        type: UI_LOAD_RECIPE,
        server,
        recipe,
        load
    }
}

export const loadRecipe = ({server, recipe, load}) => {
   return dispatch => {
        dispatch({
            type: LOAD_RECIPE,
            server, 
            recipe, 
            load
        })
        return dispatch(persistStateToLocalStorage())
    }
}

export const uiAddServer = (server) => {
    return {
        type: UI_ADD_SERVER,
        server
    }
}

export const addServer = (server) => {
    return dispatch => {
        dispatch({
            type: ADD_SERVER,
            server
        })
        return readRecipes(server).then(
            recipes => dispatch(updateRecipes(server, recipes)),
            error => dispatch(reportError('Could not recipes'))
        ).then(
            () => dispatch(persistStateToLocalStorage()),
            error => dispatch(reportError('Could not persist to local storage'))
        )
    }
}

export function updateRecipes(server, recipes) {
    return {
        type: UPDATE_RECIPES,
        server,
        recipes
    }
}

// Restore the application state from local storage
export const restoreStateFromLocalStorage = () => {
    return (dispatch, getState) => {
        return browser.storage.local.get(DBNAME).then(db => {
            console.log('Existing DB', db)
            if (db[DBNAME]) {
                console.log('Loaded classification DB from localstorage:', db)
                return dispatch(applyRestoredState(db[DBNAME]))
            } else {
                console.log('No pre-existing DB')
                return dispatch(reportError('Could not fetch recipes'))
            }
        })
    }
}

export const applyRestoredState = (restoredState) => {
    return {
        type: APPLY_RESTORED_STATE,
        state: restoredState
    }
}

// Persist the application state to local storage
export const persistStateToLocalStorage = () => {
    return (dispatch, getState) => {
        var db = {}
        db[DBNAME] = getState()
        return browser.storage.local.set(db).then(
            result => {
                console.log('Stored successfully', result)
            }, 
            error => {
                console.log('Error storing DB', error)
            }
        )
    }
}

