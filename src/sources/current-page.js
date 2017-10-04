/*
 * Submits any page loaded by the browser for classification
 */

import browser from 'webextension-polyfill';

class CurrentPageSource {
    constructor(recipe) {
        this.recipe = recipe
        this.lastPage = null
        let self = this
        browser.runtime.onMessage.addListener(function(msg) {
            if (msg.type == 'FBBL_PAGE_TEXT') self.contentUpdate(msg)
        })
    }

    contentUpdate(page) {
        this.lastPage = page
        this.recipe.classifier.analyze(page)
    }

    trigger() {
        if (this.lastPage != null) this.recipe.classifier.analyze(this.lastPage)
    }
}

CurrentPageSource.label = 'Current page'
CurrentPageSource.description = 'Asks for current page content to be classified'

export default CurrentPageSource
