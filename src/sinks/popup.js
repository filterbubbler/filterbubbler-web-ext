/*
 * Displays the results of a classifier in the classification popup
 */

import { changeClassification } from '../actions'

class PopUpSink {
    constructor(recipe) {
        this.recipe = recipe
    }

    consume(page, classification) {
        this.recipe.runner.dispatch(changeClassification(this.recipe.label, classification))
    }
}

PopUpSink.label = 'Pop-up Sink'
PopUpSink.description = 'Shows the current classification in the UI'

export default PopUpSink
