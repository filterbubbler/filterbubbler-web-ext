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

let CorpuraPanel = props => {
    const {pristine, reset, submitting} = props

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

    return (
        <div>
            <List>
                <Subheader>Corpura</Subheader>
                <ListItem primaryText="Corpura 1" rightIconButton={rightIconMenu} />
                <ListItem primaryText="Corpura 2" rightIconButton={rightIconMenu} />
                <ListItem primaryText="Corpura 3" rightIconButton={rightIconMenu} />
            </List>
        </div>
    )
}

CorpuraPanel = connect(
    state => ({
        initialValues: state
    })
)(CorpuraPanel)

export default CorpuraPanel
