import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui'
import Paper from 'material-ui/Paper';
import {
    AutoComplete,
    Checkbox,
    DatePicker,
    TimePicker,
    RadioButtonGroup,
    SelectField,
    Slider,
    TextField,
    Toggle,
} from 'redux-form-material-ui';

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

            <Field
              name="newClassification"
              component={TextField}
              hintText="Name"
              floatingLabelText="Name"
              validate={required}
              ref="newClassification"
              withRef
            />
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

ClassificationPanel = reduxForm({
    form: 'ClassificationPanel',
})(ClassificationPanel)

ClassificationPanel = connect(
    state => ({
        initialValues: state
    })
)(ClassificationPanel)

export default ClassificationPanel
