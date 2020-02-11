import React from "react";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import App from "../Screens/App";
import App2 from "../Screens/App2";
import MydatePicker from "../Screens/pruebas";

const TabNavigator = createBottomTabNavigator({
  App2: App,  
  App: App2,
    pruebas: MydatePicker
  });
  
  export default createAppContainer(TabNavigator);