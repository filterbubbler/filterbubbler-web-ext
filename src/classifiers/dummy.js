class DummyClassifier {
    constructor(recipe) {
        this.recipe = recipe
    }

    train(content, label) {
        console.log('Dummy classifier: train: doing nothing')
    }

    analyze(content) {
    }
}

DummyClassifier.label = 'Dummy Classifier'
DummyClassifier.description = 'A no-op classifier that sketches out the API'

export default DummyClassifier
