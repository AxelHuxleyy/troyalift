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
    TextInput
} from "react-native";



const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width * 0.90;
const CARD_WIDTH2 = width * 0.70;


export default class inicioSesion extends Component {
    constructor(props) {
        super(props)
        this.state = {

            usuario: '',
            password: '',

        }
    }



    componentDidMount() {

    }



    inicarSesion = () => {



        if (this.state.usuario.length > 0 && this.state.password.length > 0) {
            user = this.state.usuario
            pass = this.state.password



            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://148.220.208.60:3000/api/driver/find"+user, true);
            //console.log(jsonString);
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {


                    console.log(JSON.parse(xhr.responseText))
                    var matchedEmployee = JSON.parse(xhr.responseText);

                    if(matchedEmployee.length != 0)
                    {
                        alert(matchedEmployee[0].name)
                        if(pass == matchedEmployee[0].password)
                        {
                            AsyncStorage.setItem("sessiontroyalift", matchedEmployee[0].mail, (error) => {
                                if (error) {
                                  alert("ocurrio un error");
                                }
                                else{
                                    this.goloading()
                                }
                          
                              });
                        }
                        else
                        {
                            alert('corre o contrasñea invalida')
                        }
                    }
                    else{
                        alert('corre o contrasñea invalida')
                    }
                    //modified = matchedEmployee;
                    //INSERTING MATCH INFO

                    

                    
                }
            }

        }
        else {
            alert('llena todos los datos')
        }

         
    }

    goloading = () =>{
        this.props.navigation.navigate("loading")
    }

    registro = () => {
        this.props.navigation.navigate('registroo');
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={{
                    width: '80%', position: 'absolute', alignContent: 'center', justifyContent: 'center', height: '20%',
                    top: '2%',
                }}>

                    <Text style={{ color: 'white', fontSize: 30 }}>Inicia sesion para poder conseguir raite o dar raite</Text>

                </View>

                <View style={{ width: '90%', position: 'absolute', top: '25%', height: '33%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ height: '100%', width: '48%' }}
                        source={require('../assets/logo3.png')}

                        resizeMode='cover'
                    />
                </View>

                <View style={{ position: 'absolute', top: '60%', justifyContent: 'center', alignContent: 'center', }}>

                    <TextInput
                        style={styles.inputs2}
                        placeholder='Ingreas tu usuario'
                        placeholderTextColor="white"
                        onChangeText={(text) => this.setState({ usuario: text })}

                    />

                    <TextInput
                        style={styles.inputs2}
                        placeholder="ingreas tu contraseña"
                        placeholderTextColor="white"
                        onChangeText={(text) => this.setState({ password: text })}

                    />

                    <TouchableOpacity
                        style={styles.boton}

                        onPress={this.inicarSesion}
                    >
                        <Text> Iniciar sesion  </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '90%', position: 'absolute', bottom: '3%', justifyContent: 'center', alignItems: 'center', left: '10%' }}>

                    <Text style={{ color: 'white' }}>Si aun no tienes cuenta <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} onPress={this.registro}>pulsa aqui para registarte</Text></Text>

                </View>




            </View>



        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#142955',
        justifyContent: "center",
        alignItems: "center"
    },



    inputs: {
        width: CARD_WIDTH,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 20,
        marginVertical: 10,

    },

    views: {
        flex: 1,
        position: 'relative'
    },

    boton: {
        width: CARD_WIDTH2,
        height: height * 0.06,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 25,
        marginLeft: width * 0.10,
        justifyContent: 'center',
    },
    inputs2: {
        width: CARD_WIDTH,
        borderColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 10,
        color: 'white'
    }

});
