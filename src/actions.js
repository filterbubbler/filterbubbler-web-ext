import {
    ADD_CORPUS,
    ADD_CLASSIFICATION,
    CHANGE_CLASSIFICATION,
    ACTIVE_URL,
    REPORT_ERROR,
    UI_REQUEST_ACTIVE_URL,
    ANALYZE_CONTENT,
    SET_CONTENT,
    REQUEST_ACTIVE_TAB_TEXT,
    COULD_NOT_FETCH_TAB_TEXT
} from './constants'
import { analyze, classify } from 'bayes-classifier'

export function addClassification(classification) {
    fetchActiveTabContent().then(
        content => {
            classify(content, classification.newClassification)
        }
    )
    return {
        type: ADD_CLASSIFICATION,
        classification: classification.newClassification
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
    return browser.tabs.query({active: true}).then(
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
                //console.log('Text retrieved', setContent(content))
                //dispatch(setContent(content));
                let classification = analyze(content);
                console.log('Classification', classification);
                dispatch(changeClassification(classification));
            },
            error => {
                console.log('Error occurred', error)
                dispatch(reportError('Could not fetch tab content'));
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
        chrome.tabs.query({active: true}, tabs => {
            dispatch(activeUrl(tabs[0].url));
            dispatch(requestActiveTabContent());
        })
    }
}

export function addCorpus({corpus}) {
    return {
        type: ADD_CORPUS,
        corpus
    }
}

export function analyzeContent({content}) {
    return {
        type: ANALYZE_CONTENT,
        content
    };
}
