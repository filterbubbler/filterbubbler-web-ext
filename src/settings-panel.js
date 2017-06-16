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
import AddIcon from 'material-ui/svg-icons/content/add'
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
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={server.recipes.map((recipe, index) => 
                                <ListItem
                                    key={index}
                                    primaryText={recipe.name}
                                    rightIcon={<CloudDownloadIcon />}
                                />
                            )} />
                    )
                :(
                    <ListItem key="NONE" primaryText="You have not added any servers" />
                )}

                <ListItem leftIcon={<AddIcon />} key="ADD" primaryText="Add server" />
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
