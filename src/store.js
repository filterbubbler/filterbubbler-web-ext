import {createStore, applyMiddleware} from 'redux'
import {createBackgroundStore} from 'redux-webext'
import reducers from './reducers'
import {actions as formActions} from 'redux-form'
import {actionTypes as formActionTypes} from 'redux-form'
import thunk from 'redux-thunk'
import {
    MAIN_TAB,
    CHANGE_CLASSIFICATION,
    UI_REQUEST_ACTIVE_URL,
    UI_SHOW_ADD_RECIPE,
    UI_ADD_SERVER,
    UI_REMOVE_SERVER,
    ANALYZE_CONTENT,
    UI_LOAD_RECIPE,
    LOAD_RECIPE,
    UI_UPLOAD_RECIPE,
    UI_UPDATE_CONTENT,
    UI_ADD_RECIPE,
    UI_READ_RECIPE,
    UI_UPDATE_RECIPE,
    UI_REMOVE_RECIPE,
    UI_ADD_CORPUS,
    UI_REMOVE_CORPUS,
    UI_ADD_CLASSIFICATION,
    UI_REMOVE_CLASSIFICATION,
    UI_ADD_CLASSIFICATION_URL,
    UI_REMOVE_CLASSIFICATION_URL,
    UI_ADD_CORPUS_CLASSIFICATION,
} from './constants'
import {
    addCorpusClassification,
    changeMainTab,
    addServer,
    removeServer,
    addClassification,
    removeClassification,
    addClassificationUrl,
    removeClassificationUrl,
    requestActiveUrl,
    addRecipe,
    readRecipe,
    removeRecipe,
    updateRecipe,
    updateContent,
    readRecipes,
    uiShowAddRecipe,
    restoreStateFromLocalStorage,
    loadRecipe,
    uploadRecipe,
    addCorpus,
    removeCorpus,
} from './actions'

const actions = {}

// Pass through Redux-Form action types
actions[formActionTypes.INITIALIZE] = (data) => { return { type: formActionTypes.INITIALIZE, ...data }; }
actions[formActionTypes.REGISTER_FIELD] = (data) => { return { type: formActionTypes.REGISTER_FIELD, ...data }; }
actions[formActionTypes.SUBMIT] = (data) => { return { type: formActionTypes.SUBMIT, ...data }; }
actions[formActionTypes.SET_SUBMIT_SUCCEEDED] = (data) => { return { type: formActionTypes.SET_SUBMIT_SUCCEEDED, ...data }; }
actions[formActionTypes.TOUCH] = (data) => { return { type: formActionTypes.TOUCH, ...data }; }
actions[formActionTypes.CHANGE] = (data) => { return { type: formActionTypes.CHANGE, ...data }; }
actions[formActionTypes.BLUR] = (data) => { return { type: formActionTypes.BLUR, ...data }; }
actions[formActionTypes.FOCUS] = (data) => { return { type: formActionTypes.FOCUS, ...data }; }
actions[formActionTypes.UPDATE_SYNC_ERRORS] = (data) => { return { type: formActionTypes.UPDATE_SYNC_ERRORS, ...data }; }

// Misc app events
actions[CHANGE_CLASSIFICATION] = (data) => { return { type: CHANGE_CLASSIFICATION, ...data }; }
actions[UI_REQUEST_ACTIVE_URL] = (data) => { return requestActiveUrl(); }
actions[MAIN_TAB] = (data) => { return changeMainTab(data.index); }
actions[UI_ADD_SERVER] = (data) => { return addServer(data.server) }
actions[UI_LOAD_RECIPE] = loadRecipe
actions[UI_UPDATE_CONTENT] = updateContent

// Corpora
actions[UI_ADD_CORPUS] = addCorpus
actions[UI_REMOVE_CORPUS] = removeCorpus
actions[UI_ADD_CLASSIFICATION] = addClassification
actions[UI_REMOVE_CLASSIFICATION] = removeClassification
actions[UI_ADD_CORPUS_CLASSIFICATION] = addCorpusClassification
actions[UI_ADD_CLASSIFICATION_URL] = addClassificationUrl
actions[UI_REMOVE_CLASSIFICATION_URL] = removeClassificationUrl

// Recipes
actions[UI_ADD_RECIPE] = addRecipe
actions[UI_READ_RECIPE] = readRecipe
actions[UI_UPDATE_RECIPE] = updateRecipe
actions[UI_REMOVE_RECIPE] = removeRecipe
actions[UI_UPLOAD_RECIPE] = uploadRecipe

// Servers
actions[UI_REMOVE_SERVER] = removeServer

const store = createStore(
    reducers,
    applyMiddleware(thunk))

const backgroundStore = createBackgroundStore({
    store,
    actions: actions
})

// Fetch recipes from the current server
store.dispatch(restoreStateFromLocalStorage());

export default backgroundStore
