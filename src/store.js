import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import {ADD_CLASSIFICATION, SET_URL, ANALYZE_CONTENT} from './constants';
import reducers from './reducers';
import {addClassification, setUrl, analyzeContent} from './actions';
import {actions as formActions} from 'redux-form';
import {actionTypes as formActionTypes} from 'redux-form';

const store = createStore(reducers)

const actions = {}
/*
actions[formActionTypes.INITIALIZE] = formActions.initialize
actions[formActionTypes.REGISTER_FIELD] = formActions.registerField
actions[formActionTypes.SUBMIT] = formActions.sumbit
actions[formActionTypes.SET_SUBMIT_SUCCEEDED] = formActions.setSubmitSucceeded
actions[formActionTypes.TOUCH] = formActions.touch
actions[formActionTypes.CHANGE] = formActions.change
actions[formActionTypes.BLUR] = formActions.blur
actions[formActionTypes.FOCUS] = formActions.focus
*/

actions[formActionTypes.INITIALIZE] = (data) => { return { type: formActionTypes.INITIALIZE, ...data }; }
actions[formActionTypes.REGISTER_FIELD] = (data) => { return { type: formActionTypes.REGISTER_FIELD, ...data }; }
actions[formActionTypes.SUBMIT] = (data) => { return { type: formActionTypes.SUBMIT, ...data }; }
actions[formActionTypes.SET_SUBMIT_SUCCEEDED] = (data) => { return { type: formActionTypes.SET_SUBMIT_SUCCEEDED, ...data }; }
actions[formActionTypes.TOUCH] = (data) => { return { type: formActionTypes.TOUCH, ...data }; }
actions[formActionTypes.CHANGE] = (data) => { return { type: formActionTypes.CHANGE, ...data }; }
actions[formActionTypes.BLUR] = (data) => { return { type: formActionTypes.BLUR, ...data }; }
actions[formActionTypes.FOCUS] = (data) => { return { type: formActionTypes.FOCUS, ...data }; }

export default createBackgroundStore({
    store,
    actions: actions
})
