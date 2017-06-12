import {combineReducers} from 'redux';
import { reducer as bayesReducer } from 'bayes-classifier';
import { 
    UPDATE_RECIPES,
    MAIN_TAB,
    ADD_SERVER,
    UI_REQUEST_ACTIVE_URL,
    UI_SHOW_ADD_RECIPE,
    REQUEST_ACTIVE_TAB_TEXT,
    SET_CONTENT,
    APPLY_CORPUS,
    APPLY_CORPORA,
    CHANGE_CLASSIFICATION,
    ADD_CORPUS_CLASSIFICATION,
    ACTIVE_URL,
    LOAD_RECIPE,
    UI_LOAD_RECIPE,
    APPLY_RESTORED_STATE
} from './constants';
import { reducer as formReducer } from 'redux-form';

const initialState = {
    url: '',
    content: '',
    classifierStatus: '',
    currentClassification: '',
    servers: [],
    currentServer: '',
    classifications: [],
    corpora: {},
    recipes: [],
    addRecipeDialogOpen: false,
    repositories: [],
    ui: {
        classification: ''
    }
}

function classifications(state = initialState.classifications, action) {
//    console.log('REDUCER', action)
    return state;
}

const corpora = (state = initialState.corpora, action) => {
    let newState = {...state}
    switch (action.type) {
        case APPLY_CORPUS:
            newState[action.corpus.url] = action.corpus
            return newState
        case APPLY_CORPORA:
            return action.corpora
        case ADD_CORPUS_CLASSIFICATION:
            console.log('CLASSIFICATION', newState)
            newState[action.classification].classifications = [...(newState[action.classification].classifications), action.url]
            return newState
        case APPLY_RESTORED_STATE:
            return action.state.corpora ? action.state.corpora : state
        default:
            return state
    }
}

function content(state = initialState.content, action) {
    switch (action.type) {
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

const recipes = (state = initialState.recipes, action) => {
    switch (action.type) {
        case LOAD_RECIPE:
            let newState = [...state]
            let existing = newState.find(recipe => recipe.name == action.recipe.name)
            console.log('Recipe state', newState, existing)
            if (action.load && !existing) {
                console.log('Add ', action.recipe.name)
                newState.push(action.recipe)
            }
            if (!action.load && existing) {
                console.log('Remove ' + existing.name + ' at ' + newState.indexOf(existing))
                newState.splice(newState.indexOf(existing), 1)
            }
            console.log('New recipe state', newState)
            return newState
        case APPLY_RESTORED_STATE:
            return action.state.recipes ? action.state.recipes : state
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

const servers = (state = initialState.servers, action) => {
    switch (action.type) {
        case UPDATE_RECIPES:
            let newState = [...state]
            newState = newState.map(server => {
                server.recipes = (server.url == action.url) ? server.recipes : action.recipes
                return server
            })
            return newState
        case LOAD_RECIPE:
            return state.map(server => {
                return (server.url == action.server.url) ?
                {
                    ...server,
                    recipes: server.recipes.map(recipe => {
                        return (recipe.name == action.recipe.name) ? {...recipe, load: action.load} : recipe
                    })
                } :
                server
            })
        case APPLY_RESTORED_STATE:
            return action.state.servers ? action.state.servers : state
        case ADD_SERVER:
            return [...state, { url: action.server, recipes: [], status: '' }]
        default:
            return state
    }
}

const currentServer = (state = initialState.currentServer, action) => {
    switch (action.type) {
        case APPLY_RESTORED_STATE:
            return action.state.currentServer ? action.state.currentServer : state
        default:
            return state
    }
}

const addRecipeDialogOpen = (state = initialState.addRecipeDialogOpen, action) => {
    switch (action.type) {
        case UI_SHOW_ADD_RECIPE:
            return action.visible
        default:
            return state
    }
}

export default combineReducers({
    url: urls,
    servers: servers,
    recipes: recipes,
    corpora: corpora,
    addRecipeDialogOpen: addRecipeDialogOpen,
    currentServer: currentServer,
    currentClassification: classify,
    classifications: classifications,
    content: content,
    form: formReducer,
    mainTab: tabs,
    ui: ui
});
