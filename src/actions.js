import {
    ADD_CORPUS,
    ADD_CLASSIFICATION,
    CHANGE_CLASSIFICATION,
    SET_URL,
    ANALYZE_CONTENT
} from './constants';

export function addClassification({value}) {
    console.log('Add classification', arguments);
    return {
        type: ADD_CLASSIFICATION,
        value
    };
}

export function changeClassification(obj, value) {
    console.log('Change classification', arguments);
    return {
        type: CHANGE_CLASSIFICATION,
        value
    }
}

export function setUrl({url}) {
    return {
        type: SET_URL,
        url
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
