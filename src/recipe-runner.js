import Recipe from 'recipe'
import BayesClassifier from 'bayes-classifier'
import {endAnalysis, changeClassification} from 'actions'

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

        // If content has changed then reanalyze
        if (nextState.analyze) {
            this.store.dispatch(endAnalysis())
            let results = this.analyze(nextState.content)
            results.map(result => this.store.dispatch(changeClassification(result[0], result[1])))
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
