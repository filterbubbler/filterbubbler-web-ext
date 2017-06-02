import React from 'react'
import {connect} from 'react-redux'
import {TextField, RaisedButton} from 'material-ui'
import Paper from 'material-ui/Paper';

let ClassificationPanel = props => {
    const {url, currentClassification, handleSubmit, pristine, reset, submitting} = props

    const required = value => (value == null ? 'Required' : undefined);

    return (
        <Paper style={{margin: 10, padding: 5}}>
          <div><strong>{currentClassification}</strong></div>
          {url}
        </Paper>
    )
}

ClassificationPanel = connect(
    state => ({
        initialValues: state
    })
)(ClassificationPanel)

export default ClassificationPanel
