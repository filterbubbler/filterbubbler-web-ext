import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import LinearProgress from 'material-ui/LinearProgress'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
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
    uiUploadCorpus,
} from 'actions'

// Panel dialog
class CorporaUploadDialog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            corpus: ''
        }
    }

    open(corpus) {
        this.setState({open: true, corpus})
    }

    close() {
        this.setState({open: false})
    }

    setServer(server) {
        this.setState({server})
    }

    doUpload() {
        this.props.uploadCorpus(this.state.corpus, this.state.server.url)
        this.setState({open: false})
    }

    render() {
        const { servers } = this.props

        return (
            <Dialog
                title="Upload corpus"
                actions={[
                    <FlatButton label="Cancel" primary={true} onTouchTap={() => this.close()} />,
                    <FlatButton label="Upload" onTouchTap={() => this.doUpload()} />
                ]}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                contentStyle={{width: '90%'}}
            >
                Push <strong>{this.state.corpus}</strong> to:

                <SelectField 
                    floatingLabelText="Server"
                    value={this.state.server}
                    onChange={(ev, key, server) => this.setServer(server)}>
                    {this.props.servers.map(server =>  
                        <MenuItem value={server} primaryText={server.url} />
                    )}
                </SelectField>
            </Dialog>
        )
    }
}


class CorpuraPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    hideUploadDialog = () => {
        this.dialog.close()
    }

    showUploadDialog = (corpus) => {
        this.dialog.open(corpus)
    }

    render() {
        const {
            removeCorpus,
            addCorpus,
            addClassification,
            removeClassification,
            addClassificationUrl,
            removeClassificationUrl,
            servers,
            uploadCorpus,
            url,
            corpora,
            pristine,
            reset,
            submitting,
        } = this.props

        return (
            <div>
            <CorporaUploadDialog ref={(ref) => this.dialog = ref} uploadCorpus={uploadCorpus} servers={servers} />
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
                        <ListItem primaryText="Upload corpus" 
                            key={"upload-corpus-" + corpus}
                            leftIcon={<UploadIcon />}
                            onTouchTap={() => this.showUploadDialog(corpus)}
                        />,
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
            </div>
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
        uploadCorpus: (corpus, server) => {
            dispatch(uiUploadCorpus({corpus, server}))
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
        servers: state.servers,
        corpora: state.corpora
    }),
    mapDispatchToProps
)(CorpuraPanel)

export default CorpuraPanel
