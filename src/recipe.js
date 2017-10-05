import sources from 'sources'
import sinks from 'sinks'
import classifiers from 'classifiers'

class Recipe {
    constructor(runner, label, source, sink, classifier, corpus) {
        this.label = label
        this.runner = runner
        this.status = 'READY'
        this.progress = 0
        this.source = new sources[source](this)
        this.sink = new sinks[sink](this)
        this.classifier = new classifiers[classifier](this)
        this.corpus = corpus
    }

    retrain() {
        let items = []
        if (this.isValid()) {
            Object.keys(this.corpus.classifications).map(label => {
                this.corpus.classifications[label].map(url => {
                    items.push([label, url])
                })
            })
            if (items.length > 0) this._retrain(items)
        }
    }

    isValid() {
        if (this.source == null ||
            this.sink == null ||
            this.classifier == null ||
            this.corpus == null) {
            return false
        } else {
            return true
        }
    }

    // This is a dumb hack to keep the training process from freezing the
    // background thread. Recipes really need to use WebWorkers
    _retrain(items) {
        let next = items.pop(1)
        let classifier = this.classifier
        if (classifier) {
            console.log('Training: ', next)
            fetch(next[1]).then(
                response => {
                    response.text().then(
                        text => {
                            classifier.train(text, next[0])
                            if (items.length > 0) {
                                setTimeout(() => this._retrain(items), 0)
                            }
                        },
                        error => {
                            console.log('ERROR FETCHING BODY')
                        }
                    )
                },
                error => {
                    console.log('ERROR TRAINING', error, next[1])
                }
            )
        }
    }
}

export default Recipe
