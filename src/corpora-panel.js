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
import FolderIcon from 'material-ui/svg-icons/file/folder'
import MenuItem from 'material-ui/MenuItem'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import AutoComplete from 'material-ui/AutoComplete'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import AddableListItem from 'addable-list-item'
import {
    uiAddCorpus,
    uiAddClassification,
    uiRemoveCorpus,
} from 'actions'

class CorpuraPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const {
            removeCorpus,
            addCorpus,
            addClassification,
            url,
            corpora,
            pristine,
            reset,
            submitting,
        } = this.props

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
            <List className="corporaList">
                <Subheader>Corpora</Subheader>
                {Object.keys(corpora).map(corpus => {
                    return <ListItem
                      leftIcon={<FolderIcon />}
                      key={corpus}
                      primaryText={corpus}
                      initiallyOpen={false}
                      primaryTogglesNestedList={true}
                      nestedItems={[
                        Object.keys(corpora[corpus].classifications).map((classification, index) => 
                            <ListItem
                                leftCheckbox={<Checkbox checked={false} />}
                                key={index}
                                primaryText={classification}
                            />),
                        <AddableListItem addText="Add classification" hintText="Classification label" callback={(name) => this.addClassification(corpus, name)} />,
                        <ListItem
                            leftIcon={<TrashIcon />}
                            key={'remove-' + corpus}
                            primaryText='Remove corpus'
                            onTouchTap={removeCorpus}
                        />
                      ]}/>
                })}
                <AddableListItem addText="Add corpus" hintText="Corpus name" callback={(name) => addCorpus(name)} />
            </List>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCorpus: (corpus) => {
            dispatch(uiAddCorpus({corpus}))
        },
        removeCorpus: (corpus) => {
            dispatch(uiRemoveCorpus({corpus}))
        },
        addClassification: (corpus, classification) => {
            dispatch(uiAddClassiciation(corpus, classification))
        },
    }
}

CorpuraPanel = connect(
    state => ({
        url: state.url,
        corpora: state.corpora
    }),
    mapDispatchToProps
)(CorpuraPanel)

export default CorpuraPanel
