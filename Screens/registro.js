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


export default class registro extends Component {
    constructor(props) {
        super(props)
        this.state = {

            nombre: '',
            password: '',
            repeatpassword: '',
            expediente: "",
            correoelectronico: '',
            auto: false,
            tengoauto: '',
            telefono: '',


        }
    }



    componentDidMount() {

    }

    mandarjson = (object) => {

        var dates = JSON.stringify(object)

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "172.17.198.241:3000/api/driver/new", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(dates);

        alert("creo que funcino")


    }



    mandardatos = () => {

        var objeto = {}

        if (this.state.nombre.length <= 0 || this.state.expediente.length <= 0 || this.state.correoelectronico.length <= 0
            || this.state.password.length <= 0 || this.state.repeatpassword.length <= 0 || this.state.telefono.length <= 0) {
            alert('por favor llena todos los campos')
        }
        else {
            alert(this.state.nombre + ' ' + this.state.password + ' ' + this.state.repeatpassword + ' ' + this.state.telefono,
                this.state.expediente + ' ' + this.state.correoelectronico + ' ' + this.state.auto)

            if (this.state.password == this.state.repeatpassword) {
                objeto.name = this.state.nombre;
                objeto.password = this.state.password
                objeto.phone = this.state.telefono
                objeto.expediente = this.state.expediente
                objeto.mail = this.state.correoelectronico


                if (this.state.auto) {
                    objeto.userType = 'con auto'
                }
                else {
                    objeto.userType = 'sin auto'
                }



                var dates = JSON.stringify(objeto)

                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://148.220.208.60:3000/api/driver/new", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(dates);

                alert("creo que funcino")


                //this.mandarjson(objeto)
            }
            else {
                alert('Las contraseñas no coinciden')
            }





        }




    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0389ff' }}>

                <ScrollView >


                    <View style={styles.container}>

                        <Text style={styles.titulo}>Con <Text style={{ fontWeight: 'bold' }}>Troyalift</Text> podras ayudar a tus compañeros</Text>


                        <Text style={styles.textos}>Ingresa tu nombre</Text>
                        <TextInput
                            style={styles.inputs}
                            placeholder='Nombre'
                            onChangeText={(text) => this.setState({ nombre: text })}

                        />
                        <Text style={styles.textos} >Ingresa tu numero de expediente</Text>
                        <TextInput
                            type='numeric' keyboardType='numeric'
                            style={styles.inputs}
                            placeholder="267916"
                            onChangeText={(text) => this.setState({ expediente: text })}

                        />
                        <Text style={styles.textos}>Ingresa tu correo electronico</Text>
                        <TextInput
                            style={styles.inputs}
                            placeholder="alguien@uaq.com.mx"
                            keyboardType='email-address' type='email-address'
                            onChangeText={(text) => this.setState({ correoelectronico: text })}

                        />
                        <Text style={styles.textos}>Ingresa tu password </Text>
                        <TextInput
                            style={styles.inputs}
                            secureTextEntry={true}
                            placeholder="******"
                            onChangeText={(text) => this.setState({ password: text })}

                        />
                        <Text style={styles.textos}>Repite tu password </Text>
                        <TextInput
                            style={styles.inputs}
                            placeholder="******"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ repeatpassword: text })}
                        />

                        <View style={{ flexDirection: 'row', alignContent: 'center', width: '90%', marginBottom: 10 }}>
                            <CheckBox
                                value={this.state.auto}
                                onValueChange={() => this.setState({ auto: !this.state.auto })}
                                style={{ color: 'white', }}
                                checkedColor='red'
                                checkedIcon='clear'
                            />
                            <Text style={styles.textos}>Marca el CheckBox si tienes auto para dar raite </Text>

                        </View>



                        <Text style={styles.textos}>Ingresa tu numero telefónico </Text>

                        <TextInput
                            style={styles.inputs}
                            placeholder="## #### ####"
                            keyboardType='number-pad' type='numeric'
                            onChangeText={(text) => this.setState({ telefono: text })}

                        />

                        <TouchableOpacity
                            style={styles.boton}
                            onPress={this.mandardatos}
                        >
                            <Text> Registrar  </Text>
                        </TouchableOpacity>



                    </View>

                </ScrollView>


            </View>



        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#142955',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40
    },



    inputs: {
        width: CARD_WIDTH,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 20,
        marginVertical: 10,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 20
    },

    views: {
        flex: 1,
        position: 'relative'
    },

    boton: {
        width: CARD_WIDTH2,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 10
    },
    titulo: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'tahoma',
        fontWeight: '900',
        marginBottom: 20,


    },
    textos: {
        textAlign: 'left',
        color: 'white',
        fontSize: 16
    }

});
