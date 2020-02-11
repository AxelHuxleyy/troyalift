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




export default class loading extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        this._verifySession();
    }
    

    _verifySession = async () => {


        try {
            const session = await AsyncStorage.getItem("sessiontroyalift");
            if (session) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://148.220.208.60:3000/api/driver/find"+session, true);
            //console.log(jsonString);
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {


                    console.log(JSON.parse(xhr.responseText))
                    var matchedEmployee = JSON.parse(xhr.responseText);


                    AsyncStorage.setItem("_idftroyalift", matchedEmployee[0]._id, (error) => {
                        if (error) {
                          alert("ocurrio un error");
                        }
                      });

                    if(matchedEmployee.length != 0)
                    {
                        if(matchedEmployee[0].userType == 'con auto')
                        {
                            this.props.navigation.navigate('cnauto')
                        }
                        else
                        {
                            this.props.navigation.navigate('snauto')
                        }
                    }
                    else{
                        alert('El usuario no existe')
                        this.props.navigation.navigate('stackNavigator')
                    }
                    //modified = matchedEmployee;
                    //INSERTING MATCH INFO

                    

                    
                }
            }

                /*alert(session)
                this.props.navigation.navigate("TabNavigator");*/
            } else {
                this.props.navigation.navigate("StackNavigator");
            }
        }
        catch(error)
            {
                alert("ocurrio un eror")
                console.log(error)
            }

    }

    render() {
        return (

            <View style={styles.container}>


                <Image 
                    style={{width: '60%', height:"40%"}}
                    source={require('../assets/logo1.png')}
                
                />



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



    


});
