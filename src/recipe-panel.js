import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import LinearProgress from 'material-ui/LinearProgress'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

let RecipePanel = props => {
    const {recipes, pristine, reset, submitting} = props

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

    const RecipeList = recipes => {
    }

    return (
        <div>
            <List>
                <Subheader>Recipes</Subheader>
                {recipes.map(recipe => 
                    <ListItem key={recipe.name} primaryText={recipe.name} rightIconButton={rightIconMenu} />
                )}
            </List>
        </div>
    )
}

RecipePanel = connect(
    state => ({
        recipes: state.recipes
    })
)(RecipePanel)

export default RecipePanel
