'use strict';

import React from 'react';
import { Provider } from "react-redux";
import store from "./src/store";
import { AppLoading, Asset, Font, Constants } from 'expo'

// import start component
import AppRouter from "./src/Router";

/* npm */
import twitter from 'react-native-simple-twitter'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoadingComplete: false
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={(error) => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }
    else {
      return (
        <Provider store={store}>
          <AppRouter />
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      twitter.setConsumerKey(Constants.manifest.extra.twitter.consumerKey, Constants.manifest.extra.twitter.consumerKeySecret)
    ])
  };

}