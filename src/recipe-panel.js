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
import SelectField from 'material-ui/SelectField'
import * as actions from 'actions'
import Paper from 'material-ui/Paper'
import AddableListItem from 'addable-list-item'
import {uiAddRecipe} from 'actions'

class RecipePanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const {
            addRecipe,
            recipes,
            corpora,
            classifiers,
            sources,
            sinks,
        } = this.props

        return (
            <div>
                <List>
                    <Subheader>Recipes</Subheader>
                    {Object.keys(recipes).map(recipe => 
                        <ListItem key={recipe} primaryText={recipe} nestedItems={[
                            <div style={{'padding-left': 30, 'margin-top': -20}}>
                                <SelectField 
                                    floatingLabelText="Classifier"
                                    value={recipes[recipe].classifier}
                                    onChange={() => { console.log('Change classifier')}}>
                                    {Object.keys(classifiers).map(cname =>  
                                        <MenuItem value={cname} primaryText={classifiers[cname].name} />
                                    )}
                                </SelectField>
                                <SelectField 
                                    floatingLabelText="Source"
                                    value={recipes[recipe].source}
                                    onChange={() => {console.log('Change source')}}>
                                    {Object.keys(sources).map(sname =>  
                                        <MenuItem value={sname} primaryText={sources[sname].name} />
                                    )}
                                </SelectField>
                                <SelectField 
                                    floatingLabelText="Sink"
                                    value={recipes[recipe].sink}
                                    onChange={() => { console.log('Change sink')}}>
                                    {Object.keys(sinks).map(sname =>  
                                        <MenuItem value={sname} primaryText={sinks[sname].name} />
                                    )}
                                </SelectField>
                                <SelectField 
                                    floatingLabelText="Corpus"
                                    value={recipes[recipe].corpus}
                                    onChange={() => { console.log('Change corpus')}}>
                                    {Object.keys(corpora).map(cname =>  
                                        <MenuItem value={cname} primaryText={cname} />
                                    )}
                                </SelectField>
                            </div>
                        ]} />
                    )}
                    <AddableListItem addText="Add recipe" hintText="Recipe name" callback={(recipe) => addRecipe({recipe})} />
                </List>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe: ({recipe}) => { dispatch(uiAddRecipe({recipe})) }
    }
}

RecipePanel = connect(
    state => ({
        recipes: state.recipes,
        sources: state.sources,
        sinks: state.sinks,
        corpora: state.corpora,
        classifiers: state.classifiers,
    }),
    mapDispatchToProps
)(RecipePanel)

export default RecipePanel
