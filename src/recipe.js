class Recipe {
    constructor(props) {
        this.props = props
        this.state = {
            status: 'READY',
            progress: 0,
            corpus: '',
            source: 'DEFAULT',
            sink: 'DEFAULT',
            classifier: '',
            name: '',
        }
    }
    
    setState(state, dispatch) {
        this.state = { ...this.state, ...state }
    }

    getState() {
        return this.state
    }
}
