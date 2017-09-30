/*
 * Submits any page loaded by the browser for classification
 */
class CurrentPageSource {
    constructor(dispatch, getState) {
        this.name = 'Current page'
        this.description = 'Asks for current page content to be classified'
    }
}

export default new CurrentPageSource()
