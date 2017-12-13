/*
 * Labels a Facebook post with a classification
 */

import {fbLabel} from 'actions'

class FBSink {
    constructor(recipe) {
        this.recipe = recipe
    }

    async consume(page, classification) {
        console.log(`FB classify ${page.id} ${classification}`)
        const results = await window.store.dispatch(fbLabel(page.id, classification))
    }
}

FBSink.label = 'Social Labeler'
FBSink.description = 'Labels social feed posts with their classiciation'

export default FBSink
