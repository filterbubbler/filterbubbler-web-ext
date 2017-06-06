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
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import * as actions from 'actions'

let CorpuraPanel = props => {
    const {addCorpusClassification, url, corpora, pristine, reset, submitting} = props

    console.log('CORPORA', url, corpora)

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

    let newClassification = ''

    const changeClassification = (ev, newValue) => {
        console.log('Change classification', ev, newValue)
        newClassiciation = newClassification + newValue
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
                      leftCheckbox={<Checkbox />}
                    />,
                    <ListItem
                      onTouchTap={() => addCorpusClassification(corpusUrl, url)}
                      primaryText={<TextField floatingLabelText="Add a classification..." value={newClassification} onChange={changeClassification} />}
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
        url: state.url,
        corpora: state.corpora
    }),
    actions
)(CorpuraPanel)

export default CorpuraPanel
