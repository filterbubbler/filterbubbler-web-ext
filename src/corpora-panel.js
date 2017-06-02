import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import LinearProgress from 'material-ui/LinearProgress'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import AutoComplete from 'material-ui/AutoComplete'

let CorpuraPanel = props => {
    const {currentUrl, corpora, pristine, reset, submitting} = props

    console.log('CORPORA', corpora)

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

    const classifications = ['Cool', 'Funky', 'Fresh']

    const addClassification = (classification) => {
        console.log('ADD IT!', classification)
    }

    return (
        <div>
            <List>
                <Subheader>Corpura</Subheader>
                {Object.keys(corpora).map(corpusUrl => {
                return <ListItem
                  key={corpusUrl}
                  primaryText={corpora[corpusUrl].corpus}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem
                      primaryText="cool"
                      leftIcon={<ActionGrade />}
                    />,
                    <ListItem
                      onTouchTap={() => addClassification(corpusUrl)}
                      primaryText="Add classification..."
                    />,
                    ]}
                 />
                })}
            </List>
        </div>
    )
}

CorpuraPanel = connect(
    state => ({
        currentUrl: state.currentUrl,
        corpora: state.corpora
    })
)(CorpuraPanel)

export default CorpuraPanel
