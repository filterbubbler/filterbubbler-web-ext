import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui'
import {List, ListItem} from 'material-ui/List'
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import {
    AutoComplete,
    Checkbox,
    DatePicker,
    TimePicker,
    RadioButtonGroup,
    SelectField,
    Slider,
    TextField,
} from 'redux-form-material-ui';

let SettingsPanel = props => {
    const {handleSubmit, pristine, reset, submitting} = props

    const required = value => (value == null ? 'Required' : undefined);

    return (
        <div>
            <List>
                <Subheader>Active Recipes</Subheader>
                <ListItem primaryText="Recipe 1" rightToggle={<Toggle />} />
                <ListItem primaryText="Recipe 2" rightToggle={<Toggle />} />
                <ListItem primaryText="Recipe 3" rightToggle={<Toggle />} />
            </List>

            <form onSubmit={handleSubmit}>
                <Field
                  name="newRecipe"
                  component={TextField}
                  hintText="Recipe server"
                  floatingLabelText="Name"
                  validate={required}
                  ref="newRecipe"
                  withRef
                />
                <RaisedButton
                  primary
                  type="submit"
                  label="Add"/>
            </form>
        </div>
    )
}

SettingsPanel = reduxForm({
    form: 'SettingsPanel',
})(SettingsPanel)

SettingsPanel = connect(
    state => ({
        initialValues: state
    })
)(SettingsPanel)

export default SettingsPanel
