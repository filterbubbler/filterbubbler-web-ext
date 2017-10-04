/*
 * No-Op dummy sink
 */
class DummySink {
    constructor(recipe) {
        this.recipe = recipe
    }

    consume(page, classification) {
    }
}

DummySink.label = 'Dummy Sink'
DummySink.description = 'A no-op demonstration sink'

export default DummySink
