import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const ClassificationForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props

    const renderTextField = props => (
        <TextField hintText={props.label}
            floatingLabelText={props.label}
            errorText={props.touched && props.error}
            {...props}
        />
    )

    return (
        <form onSubmit={handleSubmit}>
            <Field name="currentClassification" component={renderTextField} label="Current Classification"/>
            <div className="right10"><RaisedButton type="submit">Classify</RaisedButton></div>
        </form>
    )
}

export default reduxForm({
    form: 'ClassificationForm',
})(ClassificationForm)
