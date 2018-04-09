import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import RootNavigator from './Root';

import combineReducers from './redux/reducers';

class App extends React.Component {
    render() {
        return (
            <RootNavigator navigation= {
                addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    })
                }
            />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav,
});

const AppNavigationWithState = connect(mapStateToProps)(App);

const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));

export default class Root extends React.Component {
    render() {
        return (
            <Provider store= {store}>
                <AppNavigationWithState />
            </Provider>
        );
    }
}