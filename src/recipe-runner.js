import Recipe from 'recipe'
import BayesClassifier from 'bayes-classifier'
import {changeClassification} from 'actions'

class RecipeRunner {
    constructor(props) {
        this.props = props
        this.recipes = {}
        this.analyzing = false
    }

    handleChange() {
        let nextState = this.store.getState()

        Object.keys(nextState.recipes).map(recipe => {
            let nextRecipe = nextState.recipes[recipe]
            let currentRecipe = this.currentState ? this.currentState.recipes[recipe] : {}

            if (nextRecipe !== currentRecipe) {
                if (!this.recipes[recipe]) {
                    this.recipes[recipe] = new Recipe(this, nextRecipe)
                }
                this.recipes[recipe].retrain({
                    recipe: nextRecipe.recipe,
                    classifier: new BayesClassifier(),
                    corpus: nextState.corpora[nextRecipe.corpus],
                    source: nextRecipe.source,
                    sink: nextRecipe.sink,
                })
            }
        })

        if (!this.analyzing && this.currentState && nextState.content != this.currentState.content) {
            this.analyzing = true
            let results = this.analyze(nextState.content)
            results.map(result => this.store.dispatch(changeClassification(result[0], result[1])))
            this.analyzing = false
        }

        this.currentState = nextState
    }

    analyze(content) {
        let results = []
        if (typeof content !== 'undefined') {
            Object.keys(this.recipes).map(recipe => {
               results.push([recipe, this.recipes[recipe].analyze(content)])
            })
        }
        console.log('RESULTS', results)
        return results
    }

    subscribe(store) {
        this.unsubscribe()
        this.store = store
        this._unsubscribe = store.subscribe(() => { this.handleChange() })
    }

    unsubscribe() {
        if (this._unsubscribe) {
            this._unsubscribe()
            delete this._unsubscribe
        }
    }
}

export default RecipeRunner
