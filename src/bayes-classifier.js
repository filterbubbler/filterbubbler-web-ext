import bayes from 'bayes';

class BayesClassifier {
    constructor(props) {
        this.props = props
        this.name = 'BAYES'
        this.classifier = bayes()
    }

    toJson() {
        return classifier.toJson()
    }

    fromJson(json) {
        classifier.fromJson(json)
    }

    analyze(text) {
        return classifier.categorize(text)
    }

    classify(text, tag) {
        classifier.learn(text, tag)
    }
}

export default BayesClassifier
