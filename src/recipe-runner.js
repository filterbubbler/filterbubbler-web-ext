import Recipe from 'recipe'
import BayesClassifier from 'classifiers/bayes'
import {changeClassification} from 'actions'

class RecipeRunner {
    constructor() {
        this.recipes = {}
    }
s
    connect(dispatch, getState) {
        this.dispatch = dispatch
        this.getState = getState

        Object.values(getState().recipes).map(recipe => {
            this.updateRecipe(recipe)
        })
    }

    updateRecipe(recipe) {
        let corpus = this.getState().corpora[recipe.corpus]
        let newRecipe = new Recipe(
            this,
            recipe.recipe,
            recipe.source,
            recipe.sink,
            recipe.classifier,
            corpus
        )
        this.recipes[recipe.recipe] = newRecipe

        newRecipe.retrain()
    }

    /*
    retrain(recipe) {
        this.recipes[recipe.recipe].retrain({
            recipe: recipe.recipe,
            classifier: new BayesClassifier(),
            corpus: this.getState().corpora[recipe.corpus],
            source: recipe.source,
            sink: recipe.sink,
        })
    }

    analyze(content) {
        let results = []
        if (typeof content !== 'undefined') {
            Object.keys(this.recipes).map(recipe => {
               results.push([recipe, this.recipes[recipe].analyze(content)])
            })
        }
        results.map(result => this.dispatch(changeClassification(result[0], result[1])))
        return results
    }
    */
}

export default RecipeRunner
