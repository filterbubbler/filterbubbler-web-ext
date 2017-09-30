import Recipe from 'recipe'
import BayesClassifier from 'classifiers/bayes'
import {endAnalysis, changeClassification} from 'actions'
import sources from 'sources'
import sinks from 'sinks'
import classifiers from 'classifiers'

class RecipeRunner {
    constructor() {
        this.store = null
        this.recipes = {}
        this.analyzing = false

        console.log('SOURCES', sources)
        console.log('SINKS', sinks)
        console.log('CLASSIFIERS', classifiers)
    }

    setStore(store) {
        this.store = store
    }

    dispatch(action) {
        if (this.store != null) {
            this.store.dispatch(action)
        }
    }

    updateRecipe(recipe, state) {
        console.log('Recipe update', recipe)

        if (!this.recipes[recipe.recipe]) {
            this.recipes[recipe.recipe] = new Recipe(this, recipe)
        } 
        this.recipes[recipe.recipe].retrain({
            recipe: recipe.recipe,
            classifier: new BayesClassifier(),
            corpus: state.corpora[recipe.corpus],
            source: recipe.source,
            sink: recipe.sink,
        })
    }

    retrain(recipe, state) {
        this.recipes[recipe.recipe].retrain({
            recipe: recipe.recipe,
            classifier: new BayesClassifier(),
            corpus: state.corpora[recipe.corpus],
            source: recipe.source,
            sink: recipe.sink,
        })
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
            results.map(result => this.dispatch(changeClassification(result[0], result[1])))
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
        console.log('ANALYZE', results)
        results.map(result => this.dispatch(changeClassification(result[0], result[1])))
        return results
    }

    unsubscribe() {
        if (this._unsubscribe) {
            this._unsubscribe()
            delete this._unsubscribe
        }
    }
}

export default new RecipeRunner()
