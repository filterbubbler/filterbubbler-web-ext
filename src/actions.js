import browser from 'webextension-polyfill'
import recipeRunner from 'recipe-runner'
import {
    DBNAME,
    APP_VERSION,
    UPDATE_APP_VERSION,
    APPLY_RESTORED_STATE,
    UPDATE_CORPUS,
    ADD_SERVER,
    UI_ADD_SERVER,
    REMOVE_SERVER,
    UI_REMOVE_SERVER,
    ACTIVE_URL,
    REPORT_ERROR,
    UI_REQUEST_ACTIVE_URL,
    ANALYZE_CONTENT,
    UPDATE_CONTENT,
    UI_UPDATE_CONTENT,
    REQUEST_ACTIVE_TAB_TEXT,
    COULD_NOT_FETCH_TAB_TEXT,
    MAIN_TAB,
    BEGIN_ANALYSIS,
    END_ANALYSIS,

    ADD_RECIPE,
    UI_ADD_RECIPE,
    REMOVE_RECIPE,
    UI_REMOVE_RECIPE,
    UPDATE_RECIPE,
    UI_UPDATE_RECIPE,
    UPDATE_RECIPES,
    UI_READ_RECIPE,
    READ_RECIPE,
    UI_UPLOAD_RECIPE,

    APPLY_CORPUS,
    APPLY_CORPORA,
    UPDATE_CORPORA,
    UI_REMOVE_CORPUS,
    REMOVE_CORPUS,
    UI_ADD_CORPUS,
    UI_UPLOAD_CORPUS,
    UPLOAD_CORPUS,
    ADD_CORPUS,
    READ_CORPUS,
    UI_READ_CORPUS,
    UI_ADD_CLASSIFICATION,
    ADD_CLASSIFICATION,
    UI_REMOVE_CLASSIFICATION,
    REMOVE_CLASSIFICATION,
    UI_ADD_CLASSIFICATION_URL,
    ADD_CLASSIFICATION_URL,
    UI_REMOVE_CLASSIFICATION_URL,
    REMOVE_CLASSIFICATION_URL,
    ADD_CORPUS_CLASSIFICATION,
    CHANGE_CLASSIFICATION,
} from './constants'

export function beginAnalysis() {
    return {
        type: BEGIN_ANALYSIS
    }
}

export function endAnalysis() {
    return {
        type: END_ANALYSIS
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

export function uiUpdateRecipe({recipe, source, sink, classifier, corpus}) {
    return {
        type: UI_UPDATE_RECIPE,
        recipe,
        source,
        sink,
        classifier,
        corpus,
    }
}

export function updateRecipe({recipe, source, sink, classifier, corpus}) {
    return function (dispatch, getState) {
        dispatch({
            type: UPDATE_RECIPE,
            recipe,
            source,
            sink,
            classifier,
            corpus,
        })
        recipeRunner.updateRecipe({recipe, source, sink, classifier, corpus}, getState())
        return dispatch(persistStateToLocalStorage())
    }
}

function updateRecipesWithCorpus(corpus, dispatch, getState) {
    let recipes = getState().recipes
    Object.keys(recipes).map(recipeId => {
        let recipe = recipes[recipeId]
        if (recipe.corpus === corpus) {
            recipeRunner.retrain(recipe, getState())
        }
    })
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
    return function(dispatch, getState) {
        dispatch({
            type: ADD_CLASSIFICATION_URL,
            corpus,
            classification,
            url
        })
        updateRecipesWithCorpus(corpus, dispatch, getState)
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
    return function(dispatch, getState) {
        dispatch({
            type: REMOVE_CLASSIFICATION_URL,
            corpus,
            classification,
            url
        })
        updateRecipesWithCorpus(corpus, dispatch, getState)
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

export function uiRemoveClassification({corpus, classification}) {
    return {
        type: UI_REMOVE_CLASSIFICATION,
        corpus,
        classification
    }
}

export function removeClassification({corpus, classification}) {
    return function(dispatch) {
        dispatch({
            type: REMOVE_CLASSIFICATION,
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

export function changeClassification(recipe, classification) {
    return {
        type: CHANGE_CLASSIFICATION,
        recipe: recipe,
        classification: classification
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
            console.log('Error fetching tab content', error)
            return 'error sending'
        }
    )
}

export function requestActiveTabContent() {
    return function (dispatch) {
        fetchActiveTabContent().then(
            content => {
                dispatch(updateContent({content}))
                return Promise.resolve()
            },
            error => {
                console.log('Error occurred', error)
                dispatch(reportError('Could not fetch tab content'))
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

export function applyCorpus({corpus}) {
    return {
        type: APPLY_CORPUS,
        corpus
    }
}

// Fetch a remote corpus local
export function uiReadCorpus({server, corpus}) {
    return {
        type: UI_READ_CORPUS,
        server,
        corpus
    }
}

export function readCorpus({server, corpus}) {
    return (dispatch) => fetch(server + '/wp-json/filterbubbler/v1/corpus/' + corpus).then(
        result => result.json(),
        error => dispatch(reportError('Could not read corpus'))
    ).then(
        corpus => dispatch(applyCorpus({ corpus })),
        error => dispatch(reportError('Could not decode json'))
    ).then(
        () => dispatch(persistStateToLocalStorage()),
        error => dispatch(reportError('Error applying corpus'))
    )
}

export function changeMainTab(index) {
    return {
        type: MAIN_TAB,
        index
    }
}

export function uiUpdateContent({content}) {
    return {
        type: UI_UPDATE_CONTENT,
        content
    };
}

export function updateContent({content}) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_CONTENT,
            content
        })
        recipeRunner.analyze(content)
        return dispatch(persistStateToLocalStorage())
    }
}

// Read the list of available recipes from a server
export function readRecipes(server) {
    return fetch(server + '/wp-json/filterbubbler/v1/recipe').then(
        result => result.json(),
        error => dispatch(reportError('Could not fetch recipes'))
    )
}

// Corpora retrieval
export function readCorpora(server) {
    return fetch(server + '/wp-json/filterbubbler/v1/corpus').then(
        result => result.json(),
        error => dispatch(reportError('Could not fetch corpora'))
    )
}

export function uiUploadCorpus({server, corpus}) {
    return {
        type: UI_UPLOAD_CORPUS,
        server,
        corpus
    }
}

export function uploadCorpus({server, corpus}) {
    return (dispatch, getState) => {
        const corpora = getState().corpora
        return fetch(server + '/wp-json/filterbubbler/v1/corpus', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(corpora[corpus])
        }).then(
            () => dispatch(refreshServer(server)),
            error => dispatch(reportError('Could not upload corpus'))
        ).then(
            () => dispatch(persistStateToLocalStorage()),
            error => dispatch(reportError('Could not refresh server'))
        )
    }
}

// Fetch a remote recipe local
export function uiReadRecipe({server, recipe}) {
    return {
        type: UI_READ_RECIPE,
        server,
        recipe
    }
}

export function readRecipe({server, recipe}) {
    return dispatch => {
        return fetch(server + '/wp-json/filterbubbler/v1/recipe/' + recipe).then(
            result => result.json(),
            error => dispatch(reportError('Could not read recipe'))
        ).then(
            newRecipe => dispatch(updateRecipe({
                recipe: newRecipe.name,
                corpus: newRecipe.corpora,
                source: newRecipe.source,
                sink: newRecipe.sink,
                classifier: newRecipe.classifier,
            })),
            error => dispatch(reportError('Could not convert recipe JSON'))
        ).then(
            () => dispatch(persistStateToLocalStorage()),
            error => dispatch(reportError('Could not apply corpora'))
        )
    }
}

export function uiUploadRecipe({server, recipe}) {
    return {
        type: UI_UPLOAD_RECIPE,
        server,
        recipe
    }
}

export function uploadRecipe({server, recipe}) {
    return (dispatch, getState) => {
        const recipes = getState().recipes
        return fetch(server + '/wp-json/filterbubbler/v1/recipe', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(recipes[recipe])
        }).then(
            () => dispatch(refreshServer(server)),
            error => dispatch(reportError('Could not upload recipe'))
        ).then(
            () => dispatch(persistStateToLocalStorage()),
            error => dispatch(reportError('Could not refresh server'))
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
        return dispatch(refreshServer(server)).then(
            () => dispatch(persistStateToLocalStorage()),
            error => dispatch(reportError('Could not update corpora'))
        )
    }
}

export function refreshServer(server) {
    return dispatch => {
        return readRecipes(server).then(
            recipes => dispatch(updateRecipes(server, recipes)),
            error => dispatch(reportError('Could not read recipes'))
        ).then(
            result => readCorpora(server),
            error => dispatch(reportError('Could not update recipes'))
        ).then(
            corpora => dispatch(updateCorpora({server, corpora})),
            error => dispatch(reportError('Could not read corpora'))
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

export function updateCorpora({ server, corpora }) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CORPORA,
            server,
            corpora
        })
        return dispatch(persistStateToLocalStorage())
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
                    dispatch(applyRestoredState(db[DBNAME]))
                    let state = getState()
                    console.log('STATE', state)
                    Object.keys(state.recipes).map(recipe => recipeRunner.updateRecipe(state.recipes[recipe], getState()))
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
