import browser from 'webextension-polyfill';
import { analyze, classify } from 'bayes-classifier'
import {
    DBNAME,
    APP_VERSION,
    UPDATE_APP_VERSION,
    APPLY_RESTORED_STATE,
    UPDATE_CORPUS,
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

    ADD_RECIPE,
    UI_ADD_RECIPE,
    REMOVE_RECIPE,
    UI_REMOVE_RECIPE,
    UPDATE_RECIPES,
    UI_LOAD_RECIPE,
    LOAD_RECIPE,
    UI_SHOW_ADD_RECIPE,

    APPLY_CORPUS,
    APPLY_CORPORA,
    UI_REMOVE_CORPUS,
    REMOVE_CORPUS,
    UI_ADD_CORPUS,
    ADD_CORPUS,
    UI_ADD_CLASSIFICATION,
    ADD_CLASSIFICATION,
    UI_ADD_CLASSIFICATION_URL,
    ADD_CLASSIFICATION_URL,
    UI_REMOVE_CLASSIFICATION_URL,
    REMOVE_CLASSIFICATION_URL,
    ADD_CORPUS_CLASSIFICATION,
    CHANGE_CLASSIFICATION,
} from './constants'

export function reclassify(form) {
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

export function uiShowAddRecipe(visible) {
    return {
        type: UI_SHOW_ADD_RECIPE,
        visible
    }
}

export function uiAddRecipe({recipe}) {
    return {
        type: UI_ADD_RECIPE,
        recipe
    }
}

export function addRecipe({recipe}) {
    return function (dispatch) {
        dispatch({
            type: ADD_RECIPE,
            recipe
        })
        return dispatch(persistStateToLocalStorage())
    }
}

export function uiRemoveRecipe({recipe}) {
    return {
        type: UI_REMOVE_RECIPE,
        recipe
    }
}

export function removeRecipe({recipe}) {
    return function (dispatch) {
        dispatch({
            type: REMOVE_RECIPE,
            recipe
        })
        return dispatch(persistStateToLocalStorage())
    }
}

export function uiAddClassificationUrl({corpus, classification, url}) {
    return {
        type: UI_ADD_CLASSIFICATION_URL,
        corpus,
        classification,
        url
    }
}

export function addClassificationUrl({corpus, classification, url}) {
    return function(dispatch) {
        dispatch({
            type: ADD_CLASSIFICATION_URL,
            corpus,
            classification,
            url
        })
        return dispatch(persistStateToLocalStorage())
    }
}

export function uiRemoveClassificationUrl({corpus, classification, url}) {
    return {
        type: UI_REMOVE_CLASSIFICATION_URL,
        corpus,
        classification,
        url
    }
}

export function removeClassificationUrl({corpus, classification, url}) {
    return function(dispatch) {
        dispatch({
            type: REMOVE_CLASSIFICATION_URL,
            corpus,
            classification,
            url
        })
        return dispatch(persistStateToLocalStorage())
    }
}

export function uiAddClassification({corpus, classification}) {
    return {
        type: UI_ADD_CLASSIFICATION,
        corpus,
        classification
    }
}

export function addClassification({corpus, classification}) {
    return function(dispatch) {
        dispatch({
            type: ADD_CLASSIFICATION,
            corpus,
            classification
        })
        return dispatch(persistStateToLocalStorage())
    }
}

export function uiAddCorpus({corpus, classifications}) {
    return {
        type: UI_ADD_CORPUS,
        corpus,
        classifications
    }
}

export function addCorpus({corpus, classifications}) {
    return function(dispatch) {
        dispatch({
            type: ADD_CORPUS,
            corpus,
            classifications
        }) 
        return dispatch(persistStateToLocalStorage())
    }
}

export function uiRemoveCorpus({corpus}) {
    return {
        type: UI_REMOVE_CORPUS,
        corpus
    }
}

export function removeCorpus({corpus}) {
    return function(dispatch) {
        dispatch({
            type: REMOVE_CORPUS,
            corpus
        })
        return dispatch(persistStateToLocalStorage())
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

export function applyCorpus(corpus) {
    return {
        type: APPLY_CORPUS,
        corpus
    }
}

export function readCorpus(corpusUrl) {
    return (dispatch) => fetch(corpusUrl).then(
        result => result.json(),
        error => dispatch(reportError('Could not read corpus'))
    ).then(
        corpus => dispatch(applyCorpus({ ...corpus, url: corpusUrl})),
        error => dispatch(reportError('Could not decode json'))
    )
}

export function changeMainTab(index) {
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
export function readRecipes(server) {
    return fetch('http://' + server + '/wp-json/filterbubbler/v1/recipe').then(
        result => result.json(),
        error => dispatch(reportError('Could not fetch recipes'))
    )
}

// Set whether a given recipe should be loaded locally
export function uiLoadRecipe({server, recipe, load}) {
    return {
        type: UI_LOAD_RECIPE,
        server,
        recipe,
        load
    }
}

export function loadRecipe({server, recipe, load}) {
   return dispatch => {
        dispatch({
            type: LOAD_RECIPE,
            server, 
            recipe, 
            load
        })
        return dispatch(updateCorporaFromRecipes()).then(
            corpora => dispatch(applyCorpora({corpora})),
            error => dispatch(reportError('Could not update corpora from recipes'))
        ).then(
            () => dispatch(persistStateToLocalStorage()),
            error => dispatch(reportError('Could not apply corpora'))
        )
    }
}

export function uiAddServer(server) {
    return {
        type: UI_ADD_SERVER,
        server
    }
}

export function addServer(server) {
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

export function uiRemoveServer(server) {
    return {
        type: UI_REMOVE_SERVER,
        server
    }
}

export function removeServer(server) {
    return dispatch => {
        dispatch({
            type: REMOVE_SERVER,
            server
        })
        return dispatch(persistStateToLocalStorage())
    }
}

export function applyCorpora({ corpora }) {
    return {
        type: APPLY_CORPORA,
        corpora
    }
}

export function updateCorporaFromRecipes() {
    return (dispatch, getState) => {
        let activeCorpora = getState().servers
            .map(server => server.recipes)
            .reduce((acc, cur) => acc.concat(cur), [])
            .reduce((acc, cur) => cur.load ? acc.concat(cur) : acc, [])
            .reduce((acc, cur) => acc.concat(cur.corpora.filter(corpus => !acc.includes(corpus))), [])
            .map(corpus => {
                return fetch(corpus).then(
                    body => body.json(),
                    error => dispatch(reportError('Could not read corpus', corpus))
                )
            })

        console.log('CORPORA', activeCorpora)

        return Promise.all(activeCorpora)
    }
}

export function updateRecipes(server, recipes) {
    return {
        type: UPDATE_RECIPES,
        server,
        recipes
    }
}

export function updateAppVersion(version) {
    return {
        type: UPDATE_APP_VERSION,
        version
    }
}

// Restore the application state from local storage
export function restoreStateFromLocalStorage() {
    return (dispatch, getState) => {
        return browser.storage.local.get(DBNAME).then(db => {
            if (db[DBNAME] && db[DBNAME].version && db[DBNAME].version != APP_VERSION) {
               console.log('DB version mismatch') 
               dispatch(updateAppVersion(APP_VERSION))
               return dispatch(persistStateToLocalStorage())
            } else {
                if ("undefined" !== typeof db[DBNAME]) {
                    console.log('Loaded classification DB from localstorage:', db)
                    return dispatch(applyRestoredState(db[DBNAME]))
                } else {
                    console.log('No pre-existing DB')
                    dispatch(updateAppVersion(APP_VERSION))
                    return dispatch(persistStateToLocalStorage())
                }
            }
        })
    }
}

export function applyRestoredState(restoredState) {
    return {
        type: APPLY_RESTORED_STATE,
        state: restoredState
    }
}

// Persist the application state to local storage
export function persistStateToLocalStorage() {
    return (dispatch, getState) => {
        var db = {}
        db[DBNAME] = getState()
        return browser.storage.local.set(db).then(
            result => {
                console.log('Stored successfully', db)
            }, 
            error => {
                dispatch(reportError('Error storing DB', error))
            }
        )
    }
}
