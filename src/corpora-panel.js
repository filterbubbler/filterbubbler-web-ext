import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import LinearProgress from 'material-ui/LinearProgress'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import AutoComplete from 'material-ui/AutoComplete'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import AddableListItem from 'addable-list-item'
import {
    uiAddCorpus,
    uiAddClassification,
    uiAddClassificationUrl,
    uiRemoveClassification,
    uiRemoveClassificationUrl,
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
            removeClassification,
            addClassificationUrl,
            removeClassificationUrl,
            url,
            corpora,
            pristine,
            reset,
            submitting,
        } = this.props

        return (
            <List className="corporaList" style={{'overflow-y': 'scroll', height: '400px'}}>
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
                                leftCheckbox={<Checkbox 
                                    checked={corpora[corpus].classifications[classification].includes(url)} 
                                    onCheck={
                                        () => { 
                                            corpora[corpus].classifications[classification].includes(url) ?
                                            removeClassificationUrl(corpus, classification, url) :
                                            addClassificationUrl(corpus, classification, url) 
                                        }
                                    }
                                    />}
                                key={index}
                                primaryText={classification}
                                rightIconButton={
                                    <IconButton touch={true} onTouchTap={() => removeClassification(corpus, classification)}>
                                        <TrashIcon />
                                    </IconButton>
                                }
                            />),
                        <AddableListItem addText="Add classification" hintText="Classification label" callback={(name) => addClassification(corpus, name)} />,
                        <ListItem
                            leftIcon={<TrashIcon />}
                            key={'remove-' + corpus}
                            primaryText='Remove corpus'
                            onTouchTap={() => removeCorpus(corpus)}
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
            dispatch(uiAddClassification({corpus, classification}))
        },
        removeClassification: (corpus, classification) => {
            console.log('REMOVE CLASSIFICATION', corpus, classification)
            dispatch(uiRemoveClassification({corpus, classification}))
        },
        addClassificationUrl: (corpus, classification, url) => {
            dispatch(uiAddClassificationUrl({corpus, classification, url}))
        },
        removeClassificationUrl: (corpus, classification, url) => {
            dispatch(uiRemoveClassificationUrl({corpus, classification, url}))
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
