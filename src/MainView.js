import 'material-icons-font/material-icons-font.css';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {connect} from 'react-redux'
import * as actions from './actions';

class MainView extends React.Component {
    render() {
        const matchesIcon = <FontIcon className="material-icons">assessment</FontIcon>;
        const dashboardIcon = <FontIcon className="material-icons">dashboard</FontIcon>;
        const cloudIcon = <FontIcon className="material-icons">cloud</FontIcon>;
        const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>;

        console.log('RENDER', this.props);

        const {
            currentClassification,
            url
        } = this.props;

        return (
            <div>
              <Paper style={{margin: 10, padding: 5}}>
                <p><strong>{currentClassification}</strong></p>
                {url}
              </Paper>
              <div className="classification">
                <TextField hintText="Classification" />
                <div className="right10"><RaisedButton onClick={this.analyzeText}>Analyze</RaisedButton></div>
              </div>
              <BottomNavigation>
                <BottomNavigationItem icon={matchesIcon} label="Matches" />
                <BottomNavigationItem icon={dashboardIcon} label="Dashboard" />
                <BottomNavigationItem icon={cloudIcon} label="Recipes" />
                <BottomNavigationItem icon={settingsIcon} label="Settings" />
              </BottomNavigation>
            </div>
        );
   }
}

export default connect(state => state, actions)(MainView)
