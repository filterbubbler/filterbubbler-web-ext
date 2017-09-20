import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';

class ClassificationPanel extends React.Component {
    render() {
        const {url, classifications, recipes } = this.props

        console.log('CLASSIFICATIONS', classifications)

        return (
            <div>
            <Paper style={{margin: 10, padding: 5}}>
             <strong>URL:</strong>{url}
            </Paper>
            <Paper style={{margin: 10, padding: 5}}>
              {Object.keys(recipes).length == 0 ?
                  <div>You have not created any recipes</div> : ''
              }
              {Object.keys(recipes).map(recipe => {
                return <div><b>{recipe}:</b> {classifications[recipe] ? classifications[recipe] : 'Processing...'}</div>
              })}
            </Paper>
            </div>
        )
    }
}

ClassificationPanel = connect(
    state => ({
        url: state.url,
        recipes: state.recipes,
        classifications: state.classifications
    })
)(ClassificationPanel)

export default ClassificationPanel
