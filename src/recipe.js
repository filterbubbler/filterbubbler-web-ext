class Recipe {
    constructor(runner, props) {
        this.runner = runner
        this.state = {
            status: 'READY',
            progress: 0,
            ...props,
        }
    }

    analyze(content) {
        let classification = 'None'
        if (this.state.classifier) {
            classification = this.state.classifier.analyze(content)
        }
        return classification
    }

    classify(content, label) {
    }

    retrain(recipe) {
        this.state = {...recipe}
        let items = []
        if (this.state.corpus) {
            Object.keys(this.state.corpus.classifications).map(label => {
                this.state.corpus.classifications[label].map(url => {
                    items.push([label, url])
                })
            })
            if (items.length > 0) this._retrain(items)
        }
    }

    _retrain(items) {
        let next = items.pop(1)
        let classifier = this.state.classifier
        if (classifier) {
            fetch(next[1]).then(
                response => {
                    response.text().then(
                        text => {
                            classifier.classify(text, next[0])
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
                    console.log('ERROR TRAINING')
                }
            )
        }
    }
    
    setState(state, dispatch) {
        if (this.state !== state) {
            status = 'REFRESH'
        }
        this.state = {...this.state, ...state}
    }

    getState() {
        return this.state
    }
}

export default Recipe
