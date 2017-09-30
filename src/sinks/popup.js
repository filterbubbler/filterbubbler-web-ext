/*
 * Displays the results of a classifier in the classification popup
 */
class PopUpSync {
    constructor(dispatch, getState) {
        this.dispatch = dispatch
        this.getState = getState
        this.name = 'Pop-up Sink'
        this.description = 'Shows the current classification in the UI'
    }

    receiveClassification(url, classification, data) {
    }
}

export default new PopUpSync()
