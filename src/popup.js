import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './MainView';

import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';

async function initApp() {
    const store = await createUIStore();
    const mountNode = document.getElementById('app');

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
