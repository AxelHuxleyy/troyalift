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

} from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';


const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width * 0.95;

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    poll: [],
    usuarios:
      [
        
        
        {
          name: "Alejandro Ruiz Suarez",
          mail: "alejandro@gmail.com",
          password: "asd",
          expediente: "267812",
          telefono: "218000",
          userType: "con auto",

          routes:{
            days:
            {
              lunes: [12.00, 11.00],
              martes: [11.00, 10.00],
              miercoles: [10.11, 12.22],
              jueves: [10.11, 12.22],
              viernes: [10.11, 12.22]
            },
            coordinates: [
              { "longitude": -100.46224996447565, "latitude": 20.632765424134895 },
              { "longitude": -100.45823134481908, "latitude": 20.633796471835147 },
              { "longitude": -100.45760203152895, "latitude": 20.637903649713614 },
              { "longitude": -100.4534013569355, "latitude": 20.638043900506908 },
              { "longitude": -100.45043382793664, "latitude": 20.642025776795705 },
              { "longitude": -100.45078553259373, "latitude": 20.63599503378393 },
              { "longitude": -100.4427533224225, "latitude": 20.641206882377656 }],
            checkPoints: [
              "hola", "dos"
            ],
          },

         


          image: Images[0],

        },


      ],
    region: {
      latitude: 20.7040277,
      longitude: -100.446026,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };
  getRegionForCoordinates = points => {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;
    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);
    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);
    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX + 0.0015,
      longitudeDelta: deltaY + 0.0015
    };
  }
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {

    this.getdates();
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.5); // animate 30% away from landing on the next item
      if (index >= this.state.usuarios.length) {
        index = this.state.usuarios.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const [coordinate] = this.state.usuarios[index].routes.coordinates;
          console.warn("se movio");
          this.setState({
            poll: this.state.usuarios[index].routes.coordinates
          })
          const puntos = this.getRegionForCoordinates(this.state.usuarios[index].routes.coordinates)
          console.warn(puntos)
          this.map.animateToRegion(
            {
              ...puntos
            },
            1000
          );
        }
      }, 10);
    });
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          }
        })
      },
      (error) => {
        // See error code charts below.
        alert(error.code, error.message);
      }, { enableHighAccuracy: false, timeout: 15000 });

  }
  _login = async () => {
    try {
      const valore = await AsyncStorage.getItem("valores");
      
      
      const valores = JSON.parse(valore);
      this.setState({
        poll: valores
      })
      const [coordinate] = this.state.usuarios[0].routes.coordinates;
      console.warn(this.state.usuarios[0].routes.coordinates)

    }
    catch (error) {
      alert("no existe el usuario")
      console.log(error.message);
    }


  }

  _cerrarsesion = async () => {
    try {
      await AsyncStorage.removeItem("sessiontroyalift");;
      this.props.navigation.navigate("loading");
    }
    catch (error) {
      alert("ocurrio un error");
      console.log(error.message);

    }
  }

  getdates = () =>{
    var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://148.220.208.60:3000/api/driver/all", true);
            //console.log(jsonString);
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {


                    var matchedEmployee = JSON.parse(xhr.responseText);

                    if(matchedEmployee.length != 0)
                    {
                        alert(matchedEmployee.length);

                        matchedEmployee.map((usuarioo, index)  =>{
                            if(usuarioo.userType == "con auto"){
                              alert(index)

                              this.setState({
                                usuarios: [
                          
                                  ...this.state.usuarios,
                          
                                  usuarioo
                          
                                ]
                              })
                              
                            }
                        })
                    }
                    else{
                        alert('corre o contrasñea invalida')
                    }
                    //modified = matchedEmployee;
                    //INSERTING MATCH INFO

                    

                    
                }
            }
  }
  render() {
    const interpolations = this.state.usuarios.map((usuario, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
          showsUserLocation={true}

        >
          <Polyline
            coordinates={this.state.poll}
            strokeColor="#042f60"
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            lineCap="round"
            strokeWidth={6}
          />
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.usuarios.map((usuario, index) => {

            if (usuario.userType == 'con auto') {
              return (
                <View style={styles.card} key={index}>
                  <View style={styles.principal}>
                    <Image
                      source={this.state.usuarios[0].image}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{usuario.name}</Text>
                      <Text numberOfLines={1} style={styles.telefono}>
                        {usuario.phone}
                      </Text>
                      <View style={styles.puntosclave}>
                        {usuario.routes.checkPoints.map((puntos, index) => (
                          <Text numberOfLines={1} style={styles.cardDescription}>
                            {puntos},
                      </Text>

                        ))}
                      </View>
                    </View>

                  </View>
                  <View style={styles.textContent}>
                    <View style={styles.contenido}>


                      <View style={styles.flexdias}>

                        {usuario.routes.days.lunes &&
                          <View style={styles.dias}>

                            <Text style={styles.cardDescription}>Lunes:</Text>

                            <Text style={styles.cardDescription}>{usuario.routes.days.lunes[0]}-{usuario.routes.days.lunes[1]}</Text>

                          </View>
                        }
                        {usuario.routes.days.martes &&
                          <View style={styles.dias}>
                            <Text style={styles.cardDescription}>Martes:</Text>
                            <Text style={styles.cardDescription}>{usuario.routes.days.martes[0]}-{usuario.routes.days.martes[1]}</Text>
                          </View>
                        }
                        {usuario.routes.days.miercoles &&
                          <View style={styles.dias}>
                            <Text style={styles.cardDescription}>Miercoles:</Text>
                            <Text style={styles.cardDescription}>{usuario.routes.days.miercoles[0]}-{usuario.routes.days.miercoles[1]}</Text>
                          </View>
                        }
                        {usuario.routes.days.jueves &&
                          <View style={styles.dias}>
                            <Text style={styles.cardDescription}>Jueves:</Text>
                            <Text style={styles.cardDescription}>{usuario.routes.days.jueves[0]}-{usuario.routes.days.jueves[1]}</Text>
                          </View>
                        }
                        {usuario.routes.days.viernes &&
                          <View style={styles.dias}>
                            <Text style={styles.cardDescription}>Viernes</Text>
                            <Text style={styles.cardDescription}>{usuario.routes.days.viernes[0]}-{usuario.routes.days.viernes[1]}</Text>
                          </View>
                        }

                      </View>



                    </View>

                  </View>
                </View>


              )
            }


          })}
        </Animated.ScrollView>
        <View style={styles.boton}>
          <TouchableOpacity onPress={this._cerrarsesion}>

            <Image
              style={{ width: 40, height: 40 }}
              source={require('../assets/salir.png')}

            />

          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 13,
    left: 0,
    right: 0,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  principal: {
    flexDirection: "row",
    flex: 1
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    bottom: -10,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardImage: {

    width: 100,
    height: 100,
    borderRadius: 200
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 30,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
    marginLeft: 2
  },
  telefono: {
    fontSize: 12,
    color: "#444",
  },

  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  boton: {
    position: "absolute",
    top: 10,
    right: 10
  },
  contenido: {
    marginTop: 25
  },
  puntosclave: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  dias: {
    flexDirection: 'column'
  },
  flexdias: {
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-between',
  }
});  