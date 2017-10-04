import bayes from 'bayes';

class BayesClassifier {
    constructor(recipe) {
        this.recipe = recipe
        this.classifier = bayes()
    }

    toJson() {
        return this.classifier.toJson()
    }

    fromJson(json) {
        this.classifier.fromJson(json)
    }

    analyze(page) {
        let classification = 'None'
        if (page) {
            classification = this.classifier.categorize(page.content.replace(/<[^>]+>/g, ''))

            if (this.recipe.sink != null) {
                this.recipe.sink.consume(page, classification)
            }
        }

        return classification
    }

    train(content, label) {
        this.classifier.learn(content.replace(/<[^>]+>/g, ''), label)
    }
}

BayesClassifier.label = 'Bayesian Classifier'
BayesClassifier.description = 'A classifier that uses Bayesian analysis for categorizing content'

export default BayesClassifier
