import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui'
import {List, ListItem} from 'material-ui/List'
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import CloudDownloadIcon from 'material-ui/svg-icons/file/cloud-download'
import {uiAddServer, uiLoadRecipe} from 'actions'

class SettingsPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newServer: '',
            serverError: ''
        }
    }

    changeNewServer(newValue) {
        this.setState({newServer: newValue}) 
    }

    doAddServer() {
        if (this.state.newServer != '') {
            this.props.addServer(this.state.newServer); 
            this.setState({
                newServer: '',
                serverError: ''
            })
        } else {
            this.setState({serverError: 'Required field'})
        }
    }

    render() {
        const {servers, currentServer, addServer, loadRecipe} = this.props

        const {newServer, serverError} = this.state

        return (
            <List style={{'overflow-y': 'scroll', height: '400px'}}>
                <Subheader>Servers</Subheader>

                {servers.length ? 
                    servers.map(server => 
                        <ListItem 
                            key={server.url} 
                            primaryText={server.url} 
                            nestedItems={server.recipes.map((recipe, index) => 
                                <ListItem
                                    leftCheckbox={<Checkbox checked={recipe.load} onCheck={(ev, shouldLoad) => loadRecipe(server, recipe, shouldLoad)} />}
                                    key={index}
                                    primaryText={recipe.name}
                                />
                            )} />
                    )
                :(
                    <ListItem key="NONE" primaryText="You have not added any servers" />
                )}

                <ListItem key="ADD" primaryText={
                    <div style="overflow:scroll">
                        <TextField
                            hintText="http://my.filterbubbler.server"
                            floatingLabelText="Add a FilterBubbler server"
                            floatingLabelFixed={true}
                            onChange={(ev, newValue) => this.changeNewServer(newValue)}
                            value={newServer}
                            errortext={serverError}
                        />
                        <IconButton
                            touch={true}
                            onTouchTap={() => this.doAddServer()}
                        >
                            <CloudDownloadIcon />
                        </IconButton>
                    </div>
                }>
                </ListItem>
            </List>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addServer: (server) => {
            dispatch(uiAddServer(server))
        },
        loadRecipe: (server, recipe, load) => {
            dispatch(uiLoadRecipe({server, recipe, load}))
        }
    }
}

SettingsPanel = connect(
    state => ({
        servers: state.servers,
        currentServer: state.currentServer
    }),
    mapDispatchToProps
)(SettingsPanel)

export default SettingsPanel
