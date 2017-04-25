import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

class MainView extends React.Component {
    render() {
        const matchesIcon = <FontIcon className="material-icons">assessment</FontIcon>;
        const dashboardIcon = <FontIcon className="material-icons">dashboard</FontIcon>;
        const cloudIcon = <FontIcon className="material-icons">cloud</FontIcon>;
        const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>;

        return (
            <div>
              <h1>{this.props.classification}</h1>
              <p>{this.props.url}</p>
              <TextField hintText="Classification" />
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

export default MainView;
