import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader';
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import AddIcon from 'material-ui/svg-icons/content/add'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import ComputerIcon from 'material-ui/svg-icons/hardware/computer'
import DescriptionIcon from 'material-ui/svg-icons/action/description'
import {uiAddServer, uiReadRecipe, uiReadCorpus, uiRemoveServer} from 'actions'
import AddableListItem from 'addable-list-item'

class SettingsPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newServer: '',
            serverError: ''
        }
    }

    addServer(serverName) {
        this.props.addServer(serverName); 
    }

    render() {
        const {servers, removeServer, currentServer, addServer, readRecipe, readCorpus} = this.props

        const {newServer, serverError} = this.state

        return (
            <List style={{'overflow-y': 'scroll', height: '400px'}}>
                <Subheader>Servers</Subheader>

                {servers.length ? 
                    servers.map(server => 
                        <ListItem 
                            key={server.url} 
                            leftIcon={<ComputerIcon />}
                            primaryText={server.url} 
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={'recipes-' + server.url}
                                    leftIcon={<FolderIcon />}
                                    primaryText="Recipes"
                                    primaryTogglesNestedList={true}
                                    nestedItems={server.recipes ? [server.recipes.map((recipe, index) => 
                                        <ListItem
                                            key={index}
                                            leftIcon={<DescriptionIcon />}
                                            primaryText={recipe.name}
                                            rightIcon={<DownloadIcon />}
                                            onTouchTap={() => readRecipe({server: server.url, recipe: recipe.name})}
                                        />)] : []}
                                />,
                                <ListItem
                                    key={'corpora-' + server.url}
                                    leftIcon={<FolderIcon />}
                                    primaryText="Corpora"
                                    primaryTogglesNestedList={true}
                                    nestedItems={server.corpora ? [server.corpora.map((corpus, index) => 
                                        <ListItem
                                            key={index}
                                            leftIcon={<DescriptionIcon />}
                                            primaryText={corpus.name}
                                            secondaryText={corpus.description}
                                            rightIcon={<DownloadIcon />}
                                            onTouchTap={() => readCorpus({server: server.url, corpus: corpus.name})}
                                        />)] : []}
                                />,
                                <ListItem
                                    key={'delete-server-' + server.url}
                                    leftIcon={<TrashIcon />}
                                    primaryText="Disconnect server"
                                    onTouchTap={() => removeServer(server.url)}
                                />
                            ]} 
                        />
                    )
                :(
                    <ListItem key="NONE" primaryText="You have not added any servers" />
                )}

                <AddableListItem addText="Add server" hintText="Server name" callback={(name) => this.addServer(name)} />
            </List>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addServer: (server) => {
            dispatch(uiAddServer(server))
        },
        removeServer: (server) => {
            dispatch(uiRemoveServer(server))
        },
        readRecipe: ({server, recipe}) => {
            dispatch(uiReadRecipe({server, recipe: recipe.toLowerCase().replace(' ','-')}))
        },
        readCorpus: ({server, corpus}) => {
            dispatch(uiReadCorpus({server, corpus: corpus.toLowerCase().replace(' ','-')}))
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
