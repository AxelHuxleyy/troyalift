import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import bienvenida from "../Screens/bienvenida";
import registroo from '../Screens/registro';
import login from '../Screens/inicioSesion'

const AppNavigator = createStackNavigator({
    bienvenida: {
        screen: bienvenida,
        navigationOptions:{
            header: null
        }
    },
    registroo: {
        screen: registroo,
        navigationOptions:{
            header: null
        }
    },
    login: {
        screen: login,
        navigationOptions:{
            header: null
        }
    },
        
    
});

export default createAppContainer(AppNavigator);
