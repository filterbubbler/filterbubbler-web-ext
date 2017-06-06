import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui'
import {List, ListItem} from 'material-ui/List'
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';

let SettingsPanel = props => {
    const {servers, currentServer, pristine, reset, submitting} = props

    const required = value => (value == null ? 'Required' : undefined);

    const changeServer = (server) => {
        console.log('CHANGE SERVER', server)
    }

    return (
        <Paper style={{ padding: 10 }} zDepth={0}>
                <h3>Server</h3>
                <p><b>Current server: </b>{currentServer}</p>
                <AutoComplete
                    floatingLabelText="Enter a FilterBubbler server name"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={servers}
                    maxSearchResults={5}
                /><br />
                <RaisedButton label="Connect" onTouchTap={changeServer} />
        </Paper>
    )
}

SettingsPanel = reduxForm({
    form: 'SettingsPanel',
})(SettingsPanel)

SettingsPanel = connect(
    state => ({
        servers: state.servers,
        currentServer: state.currentServer
    })
)(SettingsPanel)

export default SettingsPanel
