import browser from 'webextension-polyfill'
window.browser = browser
import store from './store';
import {addClassification, addCorpus, setUrl, analyzeContent} from './actions';
import RecipeRunner from 'recipe-runner'

console.log('FilterBubbler: Background script starting')

// Subscribe the recipe runner
export const recipeRunner = new RecipeRunner()
recipeRunner.subscribe(store)


