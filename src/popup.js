import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './MainView';

import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';

import {setUrl} from './actions';

async function initApp() {
    const store = await createUIStore();
    console.log('store', store);

    const mountNode = document.getElementById('app');

    browser.tabs.query({active: true}).then((tabs) => {
        for (let tab of tabs) {
            store.dispatch(setUrl({url: tab.url})); 
            console.log(tab.url);
        }
    });

    ReactDOM.render(
        <MuiThemeProvider>
            <Provider store={store}>
                <MainView/>
            </Provider>
        </MuiThemeProvider>,
        mountNode
    );
}

initApp();
