import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui'
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

let ClassificationForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props

    const required = value => (value == null ? 'Required' : undefined);

    return (
        <form onSubmit={handleSubmit}>
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
              label="Classify"/>
            </div>
        </form>
    )
}

ClassificationForm = reduxForm({
    form: 'ClassificationForm',
})(ClassificationForm)

ClassificationForm = connect(
    state => ({
        initialValues: state
    })
)(ClassificationForm)

export default ClassificationForm
