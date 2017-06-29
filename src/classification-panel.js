import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';

class ClassificationPanel extends React.Component {
    render() {
        const {url, classifications } = this.props

        console.log('CLASSIFICATIONS', classifications)

        return (
            <Paper style={{margin: 10, padding: 5}}>
              {url}
              {Object.keys(classifications).map(recipe => {
                return <div><b>{recipe}:</b> {classifications[recipe]}</div>
              })}
            </Paper>
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
