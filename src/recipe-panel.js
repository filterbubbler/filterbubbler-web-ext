import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import CloudDownloadIcon from 'material-ui/svg-icons/file/cloud-download'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import AutoComplete from 'material-ui/AutoComplete'
import * as actions from 'actions'

let RecipePanel = props => {
    const {changeServer, uiShowAddRecipe, panelOpen, recipes, servers, currentServer} = props

    const recipeDialogStyle = {
        width: '100%',
        maxWidth: 'none',
        transform: 'translate(0, 10px)'
    };

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButtont >
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
            <Dialog
                contentStyle={recipeDialogStyle}
                title="Add a new recipe"
                modal={false}
                actions={dialogActions}
                autoDetectWindowHeight={false}
                open={panelOpen}
                onRequestClose={() => uiShowAddRecipe(false)}
            >
                <AutoComplete
                    floatingLabelText="Enter a FilterBubbler server name"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={servers}
                    maxSearchResults={3}
                    searchText={newServer}
                />
                <IconButton
                    touch={true}
                    onTouchTap={() => changeServer(newServer)}
                >
                    <CloudDownloadIcon />
                </IconButton><br />
                <AutoComplete
                    floatingLabelText="Choose a recipe"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={recipes.map(recipe => recipe.name)}
                    maxSearchResults={2}
                />
            </Dialog>
            <List>
                <Subheader>Recipes</Subheader>
                {recipes.map(recipe => 
                    <ListItem leftCheckbox={<Checkbox />} key={recipe.name} primaryText={recipe.name} rightToggle={<Toggle />} />
                )}
            </List>
            <RaisedButton className="add-recipe" label="Add a recipe" onTouchTap={() => uiShowAddRecipe(true)} fullWidth={true} />
        </div>
    )
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
