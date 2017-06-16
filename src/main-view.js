import 'material-icons-font/material-icons-font.css'
import React, {Component} from 'react'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import {connect} from 'react-redux'
import * as actions from './actions'
import ClassificationPanel from 'classification-panel'
import SettingsPanel from './settings-panel'
import CorpuraPanel from './corpora-panel'
import RecipePanel from './recipe-panel'
import SwipeableViews from 'react-swipeable-views'
import {RaisedButton} from 'material-ui'

const matchesIcon = <FontIcon className="material-icons">assessment</FontIcon>;
const dashboardIcon = <FontIcon className="material-icons">dashboard</FontIcon>;
const cloudIcon = <FontIcon className="material-icons">cloud</FontIcon>;
const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>;

class MainView extends Component {

    select = (index) => { console.log('CLICK', index) }
    changeIndex = (index) => { console.log('CHANGE INDEX', index) }

    render() {
        const {
            requestActiveUrl,
            currentClassification,
            url,
            ui,
            panel,
            uiAddClassification,
            mainTab,
            changeMainTab
        } = this.props;

        return (
            <div>
            <SwipeableViews index={mainTab}>
                <div>
                  <ClassificationPanel url={url} currentClassification={currentClassification} onSubmit={uiAddClassification} />
                </div>
                <div>
                    <CorpuraPanel />
                </div>
                <div>
                    <RecipePanel />
                </div>
                <div>
                    <SettingsPanel onSubmit={() => console.log('submit')} />
                </div>
            </SwipeableViews>

              <BottomNavigation selectedIndex={mainTab}>
                <div onTouchTap={() => changeMainTab(0)}><BottomNavigationItem label="Matches" icon={matchesIcon} /></div>
                <div onTouchTap={() => changeMainTab(1)}><BottomNavigationItem icon={dashboardIcon} label="Corpora" /></div>
                <div onTouchTap={() => changeMainTab(2)}><BottomNavigationItem icon={cloudIcon} label="Recipes" /></div>
                <div onTouchTap={() => changeMainTab(3)}><BottomNavigationItem icon={settingsIcon} label="Settings" /></div>
              </BottomNavigation>
            </div>
        );
   }
}

export default connect(state => state, actions)(MainView)
