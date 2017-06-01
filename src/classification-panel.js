import React from 'react'
import {connect} from 'react-redux'
import {TextField, RaisedButton} from 'material-ui'
import Paper from 'material-ui/Paper';

let ClassificationPanel = props => {
    const {url, currentClassification, handleSubmit, pristine, reset, submitting} = props

    const required = value => (value == null ? 'Required' : undefined);

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <Paper style={{margin: 10, padding: 5}}>
              <div><strong>{currentClassification}</strong></div>
              {url}
            </Paper>

            <TextField name="newClassification" />
            <div className="right10">
            <RaisedButton
              primary
              type="submit"
              label="Classify" />
            </div>
        </form>
        </div>
    )
}

ClassificationPanel = connect(
    state => ({
        initialValues: state
    })
)(ClassificationPanel)

export default ClassificationPanel
