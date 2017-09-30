/*
 * No-op demo source
 */
class DummySource {
    constructor(dispatch, getState) {
        this.name = 'Dummy Source'
        this.description = 'A no-op demonstration source'
    }
}

export default new DummySource()
