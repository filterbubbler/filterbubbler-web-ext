import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import CloudDownloadIcon from 'material-ui/svg-icons/file/cloud-download'
import IconMenu from 'material-ui/IconMenu'
import AddIcon from 'material-ui/svg-icons/content/add'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import AutoComplete from 'material-ui/AutoComplete'
import DropDownMenu from 'material-ui/DropDownMenu'
import * as actions from 'actions'
import Paper from 'material-ui/Paper';
import AddableListItem from 'addable-list-item'

class RecipePanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    addRecipe(recipeName) {
        console.log('Add recipe ' + recipeName)
    }

    render() {
        const {addServer, uiShowAddRecipe, panelOpen, recipes, servers, currentServer} = this.props

        const recipeDialogStyle = {
            width: '100%',
            maxWidth: 'none',
            height: '80vh',
            transform: 'translate(0, 10px)'
        };

        const iconButtonElement = (
          <IconButton
            touch={true}
            tooltip="more"
            tooltipPosition="bottom-left"
          >
            <MoreVertIcon color={grey400} />
          </IconButton>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem>Add classification</MenuItem>
                <MenuItem>Remove classification</MenuItem>
            </IconMenu>
        )

        const dialogActions = [
          <FlatButton
            label="Cancel"
            onTouchTap={() => uiShowAddRecipe(false)}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={() => uiShowAddRecipe(false)}
          />,
        ]

        const test = () => {
            console.log('click')
        }

        let newServer = currentServer

        return (
            <div>
                <List>
                    <Subheader>Recipes</Subheader>
                    {recipes.map(recipe => 
                        <ListItem key={recipe.name} primaryText={recipe.name} nestedItems={[
                            <Paper>
                                <h2>Test</h2>
                            </Paper>,
                            <ListItem
                                key={recipe.name + '-classifier'}
                                primaryText="Classifier: Bayes"
                            />,
                            <ListItem
                                key={recipe.name + '-source'}
                                primaryText="Source: Default"
                            />,
                            <ListItem
                                key={recipe.name + '-sink'}
                                primaryText="Sink: Default"
                            />,
                            <ListItem
                                key={recipe.name + '-corpora'}
                                primaryText="Corpora: Clowns"
                            />
                        ]} />
                    )}
                    <AddableListItem addText="Add recipe" hintText="Recipe name" callback={(name) => this.addRecipe(name)} />
                </List>
            </div>
        )
    }
}

RecipePanel = connect(
    state => ({
        servers: state.servers,
        currentServer: state.currentServer,
        serverRecipes: state.serverRecipes,
        recipes: state.recipes,
        panelOpen: state.addRecipeDialogOpen
    }),
    actions
)(RecipePanel)

export default RecipePanel
