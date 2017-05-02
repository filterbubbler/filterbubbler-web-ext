import {
    ADD_CLASSIFCATION,
    ANALYZE_CONTENT
} from './constants';

export function addClassification({value}) {
    return {
        type: ADD_CLASSIFICATION,
        value
    };
}

export function analyzeContent({}) {
    return {
        type: ANALYZE_CONTENT
    };
}
