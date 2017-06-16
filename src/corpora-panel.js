import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import LinearProgress from 'material-ui/LinearProgress'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import AddIcon from 'material-ui/svg-icons/content/add'
import MenuItem from 'material-ui/MenuItem'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import AutoComplete from 'material-ui/AutoComplete'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import * as actions from 'actions'

class CorpuraPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addingCorpora: false,
            newCorpora: '',
            corporaError: ''
        }
    }


    addClassification(classification) {
        console.log('ADD IT!', classification)
    }

    changeClassification(ev, newValue) {
        console.log('Change classification', ev, newValue)
        newClassiciation = newClassification + newValue
    }

    addCorpus() {
       this.setState({addingCorpora: false}) 
    }

    prepareAddCorpora() {
       this.setState({addingCorpora: true}) 
       setTimeout(() => this.refs.corpusInput.focus(), 100)
    }
    
    render() {
        const {addCorpusClassification, url, corpora, pristine, reset, submitting} = this.props

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

        let newClassification = ''

        return (
            <List>
                <Subheader>Corpura</Subheader>
                {Object.keys(corpora).map(corpusUrl => {
                    return <ListItem
                      key={corpusUrl}
                      primaryText={corpora[corpusUrl].corpus}
                      initiallyOpen={false}
                      primaryTogglesNestedList={true}
                      nestedItems={[
                        corpora[corpusUrl].classifications.map((classification, index) => 
                            <ListItem
                                leftCheckbox={<Checkbox checked={false} />}
                                key={index}
                                primaryText={classification.classification}
                            />),
                        <ListItem
                            leftIcon={<AddIcon />}
                            key="add-classification"
                            primaryText="Add classification"
                        />
                      ]}/>
                })}
                {this.state.addingCorpora ?
                    <ListItem
                        leftIcon={<AddIcon />}
                        key="add-corpora"
                        disabled={true}
                        primaryText={<TextField ref="corpusInput" style={{top: -18}} hintText="Corpus name" onKeyPress={(ev) => ev.charCode == 13 && this.addCorpus()} />}
                    />
                    :
                    <ListItem
                        leftIcon={<AddIcon />}
                        key="prepare-add-corpora"
                        primaryText="Add corpus"
                        onTouchTap={() => this.prepareAddCorpora()}
                    />
                }
            </List>
        )
    }
}

CorpuraPanel = connect(
    state => ({
        url: state.url,
        corpora: state.corpora
    }),
    actions
)(CorpuraPanel)

export default CorpuraPanel
