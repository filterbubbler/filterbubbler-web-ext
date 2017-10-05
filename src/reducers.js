import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import Recipe from 'recipe'
import allSources from 'sources'
import allSinks from 'sinks'
import allClassifiers from 'classifiers'
import { 
    UPDATE_RECIPES,
    UPDATE_APP_VERSION,
    APP_VERSION,
    MAIN_TAB,
    ADD_SERVER,
    REMOVE_SERVER,
    UI_REQUEST_ACTIVE_URL,
    UI_SHOW_ADD_RECIPE,
    REQUEST_ACTIVE_TAB_TEXT,
    UPDATE_CONTENT,
    APPLY_CORPUS,
    APPLY_CORPORA,
    UPDATE_CORPORA,
    CHANGE_CLASSIFICATION,
    ADD_CORPUS,
    REMOVE_CORPUS,
    ADD_CLASSIFICATION,
    REMOVE_CLASSIFICATION,
    ADD_CLASSIFICATION_URL,
    REMOVE_CLASSIFICATION_URL,
    ADD_CORPUS_CLASSIFICATION,
    ACTIVE_URL,
    LOAD_RECIPE,
    ADD_RECIPE,
    REMOVE_RECIPE,
    UPDATE_RECIPE,
    UI_LOAD_RECIPE,
    APPLY_RESTORED_STATE
} from './constants';

function extractDescriptions(components) {
    return Object.keys(components).reduce(function(results, ckey) {
        results[ckey] = {
            label: components[ckey].label,
            description: components[ckey].description
        } 
        return results 
    }, {})
}

console.log(allSources, extractDescriptions(allSources))

const initialState = {
    analyze: false,
    url: '',
    content: '',
    version: '',
    classifierStatus: '',
    classifications : {},
    classifiers: extractDescriptions(allClassifiers),
    sources: extractDescriptions(allSources),
    sinks: extractDescriptions(allSinks),
    servers: [],
    currentServer: '',
    corpora: {},
    recipes: {},
    repositories: [],
    ui: {
        classification: ''
    }
}

const classifications = (state = initialState.classifications, action) => {
    let newState = {...state}
    switch (action.type) {
        case CHANGE_CLASSIFICATION:
            newState[action.recipe] = action.classification
            return newState
    }
    return newState
}

const corpora = (state = initialState.corpora, action) => {
    let newState = {...state}
    switch (action.type) {
        case ADD_CORPUS:
            newState[action.corpus] = {
                corpus: action.corpus,
                classifications: action.classifications ? action.classifications : {}
            }
            return newState
        case REMOVE_CORPUS:
            delete newState[action.corpus]
            return newState
        case APPLY_CORPUS:
            if (typeof newState[action.corpus.corpus] == 'undefined') {
                newState[action.corpus.corpus] = {classifications: {}, corpus: action.corpus.corpus}
            }
            action.corpus.classifications.map(classification => {
                if (typeof newState[action.corpus.corpus].classifications[classification.classification] == 'undefined') {
                    newState[action.corpus.corpus].classifications[classification.classification] = []
                }
                newState[action.corpus.corpus].classifications[classification.classification].push(classification.url)
            })
            return newState
        case APPLY_CORPORA:
            return action.corpora
        case ADD_CLASSIFICATION:
            newState[action.corpus].classifications[action.classification] = []
            return newState
        case REMOVE_CLASSIFICATION:
            delete newState[action.corpus].classifications[action.classification]
            return newState
        case ADD_CLASSIFICATION_URL:
            newState[action.corpus].classifications[action.classification].push(action.url)
            return newState
        case REMOVE_CLASSIFICATION_URL:
            let cArray = newState[action.corpus].classifications[action.classification]
            if (cArray.includes(action.url)) {
                cArray.splice(cArray.indexOf(action.url),1)
            }
            return newState
        case APPLY_RESTORED_STATE:
            return action.state.corpora ? action.state.corpora : state
        default:
            return state
    }
}

function content(state = initialState.content, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case UPDATE_CONTENT:
            newState = action.content
            return newState
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

function ui(state = initialState.ui, action) {
    return state;
}

const recipes = (state = initialState.recipes, action) => {
    let newState = {...state}
    switch (action.type) {
        case ADD_RECIPE:
            newState[action.recipe] = {
                recipe: action.recipe,
                source: 'DEFAULT',
                sink: 'DEFAULT',
                classifier: 'BAYES',
            }
            return newState
        case UPDATE_RECIPE:
            newState[action.recipe] = {
                recipe: action.recipe,
                source: action.source,
                sink: action.sink,
                classifier: action.classifier,
                corpus: action.corpus,
            }
            return newState
        case REMOVE_RECIPE:
            delete newState[action.recipe]
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
    let newState
    switch (action.type) {
        case UPDATE_RECIPES:
            newState = [...state]
            newState = newState.map(server => {
                server.recipes = (server.url == action.server) ? action.recipes : server.recipes
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
        case UPDATE_CORPORA:
            newState = [...state].map(server => {
                if (server.url == action.server) {
                    server.corpora = action.corpora
                }
                return server
            })
            return newState
        case APPLY_RESTORED_STATE:
            return action.state.servers ? action.state.servers : state
        case ADD_SERVER:
            return [...state, { url: action.server, recipes: [], status: '' }]
        case REMOVE_SERVER:
            newState = [...state].filter(server => {if (server.url != action.server.server) return server})
            return newState
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

const version = (state = initialState.version, action) => {
    switch (action.type) {
        case UPDATE_APP_VERSION:
            return action.version
        case APPLY_RESTORED_STATE:
            return action.state.version ? action.state.version : state
        default:
            return state
    }
}

const sinks = (state = initialState.sinks, action) => {
    return state
}

const sources = (state = initialState.sources, action) => {
    return state
}

const classifiers = (state = initialState.classifiers, action) => {
    return state
}

export default combineReducers({
    analyze: analyze,
    url: urls,
    servers: servers,
    recipes: recipes,
    corpora: corpora,
    version: version,
    sinks: sinks,
    sources: sources,
    classifiers: classifiers,
    currentServer: currentServer,
    classifications: classifications,
    content: content,
    form: formReducer,
    mainTab: tabs,
    ui: ui
});
