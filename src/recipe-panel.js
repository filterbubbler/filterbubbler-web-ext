import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import DescriptionIcon from 'material-ui/svg-icons/action/description'
import AddIcon from 'material-ui/svg-icons/content/add'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import SelectField from 'material-ui/SelectField'
import AddableListItem from 'addable-list-item'
import IconButton from 'material-ui/IconButton'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import {uiAddRecipe, uiUpdateRecipe} from 'actions'

// Panel list items
class RecipeListItem extends React.Component {
    render() {
        const {
            classifier,
            corpus,
            sink,
            source,
            uploadRecipe,
            updateRecipe,
            removeRecipe,
            corpora,
            classifiers,
            sources,
            sinks,
            recipe,
        } = this.props

        return (
            <ListItem 
                leftIcon={<DescriptionIcon />}
                key={recipe}
                primaryText={recipe}
                primaryTogglesNestedList={true}
                nestedItems={[
                <div style={{'padding-left': 40, 'margin-top': -20}}>
                    <SelectField 
                        floatingLabelText="Classifier"
                        value={classifier}
                        onChange={(ev, key, classifier) => updateRecipe({recipe, classifier, source, sink, corpus})}>
                        {Object.keys(classifiers).map(cname =>  
                            <MenuItem value={cname} primaryText={classifiers[cname].name} />
                        )}
                    </SelectField>
                    <SelectField 
                        floatingLabelText="Source"
                        value={source}
                        onChange={(ev, key, source) => updateRecipe({recipe, classifier, source, sink, corpus})}>
                        {Object.keys(sources).map(sname =>  
                            <MenuItem key={sname} value={sname} primaryText={sources[sname].name} />
                        )}
                    </SelectField>
                    <SelectField 
                        floatingLabelText="Sink"
                        value={sink}
                        onChange={(ev, key, sink) => updateRecipe({recipe, classifier, source, sink, corpus})}>
                        {Object.keys(sinks).map(sname =>  
                            <MenuItem key={sname} value={sname} primaryText={sinks[sname].name} />
                        )}
                    </SelectField>
                    <SelectField 
                        floatingLabelText="Corpus"
                        value={corpus}
                        onChange={(ev, key, corpus) => updateRecipe({recipe, classifier, source, sink, corpus})}>
                        {Object.keys(corpora).map(cname =>  
                            <MenuItem key={cname} value={cname} primaryText={cname} />
                        )}
                    </SelectField>
                </div>,
                <ListItem primaryText="Upload recipe" 
                    key={"upload-recipe-" + recipe}
                    leftIcon={<UploadIcon />}
                    onTouchTap={() => uploadRecipe(recipe)}
                />,
                <ListItem primaryText="Remove recipe" 
                    key={"remove-recipe-" + recipe}
                    leftIcon={<TrashIcon />}
                    onTouchTap={() => removeRecipe(recipe)}
                />
            ]} />
        )
    }
}

RecipeListItem = connect(
    state => ({
        sources: state.sources,
        sinks: state.sinks,
        corpora: state.corpora,
        classifiers: state.classifiers,
    })
)(RecipeListItem)

// Panel dialog
class RecipePanelDialog extends React.Component {
}
RecipePanelDialog = connect(
    state => ({
    })
)(RecipePanelDialog)

// Main Recipe panel
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
            updateRecipe,
            uploadRecipe,
            removeRecipe,
        } = this.props

        return (
            <div>
                <List>
                    <Subheader>Recipes</Subheader>
                    {Object.keys(recipes).map(recipe => 
                        <RecipeListItem
                            recipe={recipe}
                            corpus={recipes[recipe].corpus}
                            source={recipes[recipe].source} 
                            sink={recipes[recipe].sink}
                            classifier={recipes[recipe].classifier}
                            updateRecipe={updateRecipe}
                            uploadRecipe={uploadRecipe}
                            removeRecipe={removeRecipe}
                            />
                    )}
                   <AddableListItem addText="Add recipe" hintText="Recipe name" callback={(recipe) => addRecipe({recipe})} />
                </List>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe: ({recipe}) => { dispatch(uiAddRecipe({recipe})) },
        updateRecipe: ({recipe, source, sink, classifier, corpus}) => { dispatch(uiUpdateRecipe({recipe, source, sink, classifier, corpus})) },
        uploadRecipe: (recipe) => { console.log("Upload a recipe", recipe) },
        removeRecipe: (recipe) => { console.log("Remove a recipe", recipe) },
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
