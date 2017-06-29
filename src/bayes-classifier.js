import bayes from 'bayes';

class BayesClassifier {
    constructor(props) {
        this.props = props
        this.name = 'BAYES'
        this.classifier = bayes()
    }

    toJson() {
        return this.classifier.toJson()
    }

    fromJson(json) {
        this.classifier.fromJson(json)
    }

    analyze(content) {
        let classification = 'None'
        if (content) {
            console.log('ANALYZING', content)
            classification = this.classifier.categorize(content.replace(/<[^>]+>/g, ''))
            console.log('CLASSIFIED', classification)
        }
        return classification
    }

    classify(content, label) {
        this.classifier.learn(content.replace(/<[^>]+>/g, ''), label)
    }
}

export default BayesClassifier
