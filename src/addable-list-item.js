import React from 'react'
import {List, ListItem} from 'material-ui/List'
import AddIcon from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'

class AddableListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            adding: false,
            addText: props.addText,
            hintText: props.hintText,
            callback: props.callback,
            nestedLevel: props.nestedLevel,
            value: '',
            error: ''
        }
    }

    doBlur() {
        this.setState({adding: false})
    }

    doSubmit() {
        this.state.callback(this.state.value)
        this.setState({value:  '', adding: false})
    }

    startEdit() {
        this.setState({adding: true})
        setTimeout(() => this.refs.inputField.focus(), 100)
    }

    submitOnEnter(ev) {
        ev.charCode == 13 && this.doSubmit()
    }

    updateValue(value) {
        this.setState({value})
    }

    render() {
        const { nestedLevel, addText, hintText, value, adding } = this.state

        return adding ?
            <ListItem
                nestedLevel={nestedLevel}
                leftIcon={<AddIcon />}
                key="add"
                disabled={true}
                style={{height: 16}}
                primaryText={
                    <TextField
                        value={value}
                        ref="inputField"
                        onBlur={() => this.doBlur()}
                        style={{top: -18}}
                        hintText={hintText}
                        onChange={(ev, value) => this.updateValue(value)}
                        onKeyPress={(ev) => this.submitOnEnter(ev)} />
                }
            />
            :
            <ListItem
                nestedLevel={nestedLevel}
                leftIcon={<AddIcon />}
                key="prepare-add"
                primaryText={addText}
                onTouchTap={() => this.startEdit()}
            />
    }
}

export default AddableListItem
