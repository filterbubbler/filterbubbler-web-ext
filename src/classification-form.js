import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

let ClassificationForm = props => {
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
            <Field name="firstName" component="input" type="text" placeholder="First Name" />
            <Field name="currentClassification" component={renderTextField} label="Current Classification"/>
            <div className="right10"><RaisedButton type="submit">Classify</RaisedButton></div>
        </form>
    )
}

ClassificationForm = reduxForm({
    form: 'ClassificationForm',
})(ClassificationForm)

ClassificationForm = connect(
    state => state,
)(ClassificationForm)

export default ClassificationForm
