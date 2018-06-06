import React, { Component } from "react";
import { Router, Scene, Tabs } from "react-native-router-flux";

import LoginScreen from "./container/LoginScreen";
import HomeScreen from "./container/HomeScreen";

export default class AppRouter extends Component {
  render () {
    return (
      <Router>
        <Scene
          key="root"
        >
          <Scene init key="LoginScreen" component={LoginScreen} title="" />
          <Scene key="HomeScreen" component={HomeScreen} title="" />
        </Scene>
      </Router>
    )
  }
}