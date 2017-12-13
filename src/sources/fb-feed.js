/*
 * Submits any page loaded by the browser for classification
 */

import browser from 'webextension-polyfill';
import {fbFeed} from 'actions'

class FBSource {
    constructor(recipe) {
        this.recipe = recipe
    }

    async trigger() {
        const self = this
        const results = await window.store.dispatch(fbFeed())
        console.log('FB response', results)
        results.forEach(function(record) {
            self.recipe.classifier.analyze(record)
        })
    }
}

FBSource.label = 'Social Feed'
FBSource.description = 'Classify social feed items'

export default FBSource
