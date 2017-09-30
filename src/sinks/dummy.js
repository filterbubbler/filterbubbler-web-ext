/*
 * No-Op dummy sink
 */
class DummySink {
    constructor(dispatch, getState) {
        this.dispatch = dispatch
        this.getState = getState
        this.name = 'Dummy Sink'
        this.description = 'A no-op demonstration sink'
    }

    receiveClassification(url, classification, data) {
    }
}

export default new DummySink()
