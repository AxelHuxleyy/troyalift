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
  CheckBox
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import DatePicker from 'react-native-datepicker';


const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width * 0.90;


export default class revisionMapa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 20.7040277,
        longitude: -100.446026,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
      poll: [],
      checkedLunes: false,
      checkedMartes: false,
      checkedMiercoles: false,
      checkedJueves: false,
      checkedViernes: false,
      date: "2016-05-15",
      datelune: "7:00",
      datelunes: '15:00',
      datemarte: '7:00',
      datemarts: '15:00',
      datemiere: '7:00',
      datemiers: '15:00',
      datejueve: '7:00',
      datejuevs: '15:00',
      dateviere: '7:00',
      dateviers: '15:00'



    }
  }


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
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

  componentDidMount() {
    this.pointsPolyline();
  }

  pointsPolyline = async () => {


    try {

      const valore = await AsyncStorage.getItem("valores");

      let valores = JSON.parse(valore);

      this.setState({
        poll: valores
      })



    }
    catch (error) {
      alert("no existe el usuario")
      console.log(error.message);
    }


    const regioon = this.getRegionForCoordinates(this.state.poll)
    // console.warn(this.state.poll)
    this.setState({
      region: regioon
    })


  }

  mandardatos = async() => {



    const id = await AsyncStorage.getItem("_idftroyalift");
  
    var dias = {}


    if (this.state.checkedLunes) {
      dias.lunes = [this.state.datelune, this.state.datelunes]
    }
    if (this.state.checkedMartes) {
      dias.martes = [this.state.datemarte, this.state.datemarts]
    }
    if (this.state.checkedMiercoles) {
      dias.miercoles = [this.state.datemiere, this.state.datemiers]
    }
    if (this.state.checkedJueves) {
      dias.jueves = [this.state.datejueve, this.state.datejuevs]
    }
    if (this.state.checkedViernes) {
      dias.viernes = [this.state.dateviere, this.state.dateviers]
    }

    var principal = {
      _id: id,
      routes: {
        days: dias,
        coordinates: this.state.poll
      }

    }


    var routes2 = JSON.stringify(principal);


    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://148.220.208.60:3000/api/driver/addRoutes", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(routes2);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.views}>
          <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace', color: '#142955' }}>Configura tu ruta</Text>


          </View>

          <MapView
            initialRegion={this.state.region}
            style={styles.maps}
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
              strokeWidth={6}
            />

          </MapView>

        </View>


        <View style={{ flexDirection: 'column' }}>
          <Text style={{ margin: 5, fontFamily: 'sans-serif', }}>Marca en los checkbox los dias que puedes dar raite, y selecciona tu hora de entrada y salida</Text>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checkedLunes}
              onValueChange={() => this.setState({ checkedLunes: !this.state.checkedLunes })}
            />
            <Text style={{ marginTop: 5 }}> Lunes</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ marginTop: 10 }}> Hora entrada: </Text>
            <DatePicker
              date={this.state.datelune}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datelune: date }) }}
              is24Hour={true}
            />

          </View>
          <View style={{ flexDirection: 'row', marginLeft: 29, marginTop: 10 }}>
            <Text style={{ marginTop: 10 }}> Hora Salida: </Text>
            <DatePicker
              date={this.state.datelunes}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              is24Hour={true}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datelunes: date }) }}

            />

          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checkedMartes}
              onValueChange={() => this.setState({ checkedMartes: !this.state.checkedMartes })}
            />
            <Text style={{ marginTop: 5 }}> Martes</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ marginTop: 10 }}> Hora entrada: </Text>
            <DatePicker
              date={this.state.datemarte}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datemarte: date }) }}
            />

          </View>
          <View style={{ flexDirection: 'row', marginLeft: 29, marginTop: 10 }}>
            <Text style={{ marginTop: 10 }}> Hora Salida: </Text>
            <DatePicker
              date={this.state.datemarts}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datemarts: date }) }}
            />
          </View>


        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checkedMiercoles}
              onValueChange={() => this.setState({ checkedMiercoles: !this.state.checkedMiercoles })}
            />
            <Text style={{ marginTop: 5 }}> Miercoles</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ marginTop: 10 }}> Hora entrada: </Text>
            <DatePicker
              date={this.state.datemiere}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datemiere: date }) }}
            />

          </View>
          <View style={{ flexDirection: 'row', marginLeft: 29, marginTop: 10 }}>
            <Text style={{ marginTop: 10 }}> Hora Salida: </Text>
            <DatePicker
              date={this.state.datemiers}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datemiers: date }) }}
            />

          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checkedJueves}
              onValueChange={() => this.setState({ checkedJueves: !this.state.checkedJueves })}
            />
            <Text style={{ marginTop: 5 }}> Jueves</Text>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ marginTop: 10 }}> Hora entrada: </Text>
            <DatePicker
              date={this.state.datejueve}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datejueve: date }) }}
            />

          </View>
          <View style={{ flexDirection: 'row', marginLeft: 29, marginTop: 10 }}>
            <Text style={{ marginTop: 10 }}> Hora Salida: </Text>
            <DatePicker
              date={this.state.datejuevs}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ datejuevs: date }) }}
            />

          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checkedViernes}
              onValueChange={() => this.setState({ checkedViernes: !this.state.checkedViernes })}
            />
            <Text style={{ marginTop: 5 }}> Viernes</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ marginTop: 10 }}> Hora entrada: </Text>
            <DatePicker
              date={this.state.dateviere}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ dateviere: date }) }}
            />

          </View>
          <View style={{ flexDirection: 'row', marginLeft: 29, marginTop: 10 }}>
            <Text style={{ marginTop: 10 }}> Hora Salida: </Text>
            <DatePicker
              date={this.state.dateviers}
              mode="time"
              androidMode="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ dateviers: date }) }}
            />

          </View>
          <View style={{ marginVertical: 19 }}>

            <Text style={{ fontFamily: 'Ro' }}>Selecciona los dias en los cuales puedes echar raite y selecciona tus horas de entrada y salida</Text>
            <Button
              title="Estopy listo para dar raite"
              style={{ marginVertical: 10, }}
              onPress={this.mandardatos}
            />
          </View>
        </View>


      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: 'white'
  },

  maps: {
    height: CARD_HEIGHT,
  },

  views: {
    flex: 1,
    position: 'relative'
  }

});
