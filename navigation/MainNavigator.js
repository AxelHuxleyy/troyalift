import {createStackNavigator, createAppContainer,createSwitchNavigator, } from 'react-navigation';


import TabNavigator from "./TabNavigator";
import StackNavigator from "./StackNavigator";


import revisionMapa from "../Screens/revisionMapa";

import inicioSesion from "../Screens/inicioSesion";

import loading from "../Screens/loading";

import registro from "../Screens/registro";
import bienvenido from "../Screens/bienvenida";

import sinauto from "../Screens/App";
import conauto from "../Screens/App2";



export default createAppContainer ( createSwitchNavigator({
    loading: loading,
    cnauto: conauto,
    snauto: sinauto,
    StackNavigator: StackNavigator,

    registro: registro,


    TabNavigator: TabNavigator,

    sesion: inicioSesion,


    bienvenida: bienvenido,



    Revision: revisionMapa,

    Revision: revisionMapa,
}
    
));