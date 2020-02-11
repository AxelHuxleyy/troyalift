import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Button,
    CheckBox,
    TextInput,
    ImageBackground
} from "react-native";


var { width, height } = Dimensions.get('window');


export default class bienvenida extends Component {
    constructor(props) {
        super(props)
        this.state = {

            usuario: '',
            password: '',

        }
    }



    componentDidMount() {

    }



    iniciarsesion = () => {
        this.props.navigation.navigate('login');
    }

    registrar = () => {
        this.props.navigation.navigate('registroo');
    }

    render() {
        return (

            <ImageBackground source={require('../assets/fondo2.jpg')} style={{ width: '100%', height: '100%', opacity: 1 }}>


                <View style={styles.container}>

                    <Image
                        style={styles.image}
                        source={require('../assets/logo4.png')}

                        resizeMode='cover'
                    />







                </View>

                <View style={styles.botones}>
                    <TouchableOpacity style={styles.boton} onPress={this.iniciarsesion}>

                        <Text>Iniciar sesion</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.boton} onPress={this.registrar}>

                        <Text>Registro</Text>

                    </TouchableOpacity>
                </View>

                <View style={{position:'absolute', bottom: '3%', width: '100%', justifyContent: 'center', alignContent: 'center',
                                alignItems: 'center', opacity: 0.3}}>

                <Text style={{color: 'white'}}>Selecciona una de las opciones</Text>

                </View>

                


            </ImageBackground>



        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        position: 'absolute',
        top: '1%',
        left: '28%',
        width: width * 0.46,
        height: height * 0.36,
        overflow: 'visible',
        opacity: 0.70
    },

    boton: {
        width: '45%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        opacity: 0.5,

    },
    botones: {
        flexDirection: 'row',
        width: width * 0.90,
        height: height * 0.07,
        position: 'absolute',
        bottom: '10%',
        left: width * 0.05,
        alignContent: 'space-between',

        justifyContent: 'space-between'
        

    }






});
