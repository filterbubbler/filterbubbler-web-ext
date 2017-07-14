import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';

class ClassificationPanel extends React.Component {
    render() {
        const {url, classifications } = this.props

        console.log('CLASSIFICATIONS', classifications)

        return (
            <div>
            <Paper style={{margin: 10, padding: 5}}>
             <strong>URL:</strong>{url}
            </Paper>
            <Paper style={{margin: 10, padding: 5}}>
              {Object.keys(classifications).length == 0 ?
                  <div>You have not created any recipes</div> : ''
              }
              {Object.keys(classifications).map(recipe => {
                return <div><b>{recipe}:</b> {classifications[recipe]}</div>
              })}
            </Paper>
            </div>
        )
    }
}

ClassificationPanel = connect(
    state => ({
        url: state.url,
        classifications: state.classifications
    })
)(ClassificationPanel)

export default ClassificationPanel
