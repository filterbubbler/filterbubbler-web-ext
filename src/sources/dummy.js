/*
 * No-op demo source
 */
class DummySource {
    constructor(recipe) {
    }

    trigger() {
        console.log('Dummy source triggered, doing nothing')
    }
}

DummySource.label = 'Dummy Source'
DummySource.description = 'A no-op demonstration source'

export default DummySource
