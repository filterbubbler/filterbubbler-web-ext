import {
    ADD_CORPUS,
    ADD_CLASSIFCATION,
    SET_URL,
    ANALYZE_CONTENT
} from './constants';

export function addClassification({value}) {
    return {
        type: ADD_CLASSIFICATION,
        value
    };
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

export function analyzeContent({}) {
    return {
        type: ANALYZE_CONTENT
    };
}
