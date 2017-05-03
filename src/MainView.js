import 'material-icons-font/material-icons-font.css';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
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
            classification,
            url,
            content
        } = this.props;

        return (
            <div>
              <h1>{classification}</h1>
              <p>"{url}"</p>
              <TextField hintText="Classification" />
              <RaisedButton onClick={this.analyzeText}>Analyze</RaisedButton>
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
