/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  Image,
  Button,
  AsyncStorage
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

  

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 6;
const CARD_WIDTH = width * 0.90 ;


export default class App2 extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
        markers: [],
        latitude: 20.7040277,
        longitude: -100.446026,
    }
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(e) {
    this.setState({
      markers: [

        ...this.state.markers,

        e.nativeEvent.coordinate

      ]
    })
  }

  handleRemoveMarker = e => {
    longitudee= e.nativeEvent.coordinate.longitude
    latitudee= e.nativeEvent.coordinate.latitude
    this.setState(state => {
      const markers = state.markers.filter((item, e) => {
        if (item.latitude !== latitudee && item.longitude !== longitudee) {
          return true
        }
      });
      return {
        markers,
      };

    })

  }


  componentDidMount() {

    Geolocation.getCurrentPosition(
      (position) => {

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        // See error code charts below.
        alert(error.code, error.message);
      }, { enableHighAccuracy: false, timeout: 15000 });
        
      console.log("hola")

  }      
  
  mandardatos = () => {
    AsyncStorage.setItem("valores", JSON.stringify(this.state.markers), (error) => {
      if (error) {
        console.log("ocurrio un error");
      }
      

      console.log(JSON.stringify(this.state.markers));

      this.props.navigation.navigate("Revision");

    }); 
  }





  render() {

    MapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]



    return (
      <View style={styles.container}>

        <MapView
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          }}
          style={styles.container}
          //customMapStyle={MapStyle}
          showsUserLocation={true}
          onPress={this.handlePress}
        >


          <Marker coordinate={this.state} >

          </Marker>

          {this.state.markers.map((marker) => {
            return <Marker coordinate={marker} onPress={this.handleRemoveMarker} />
          })}

          <Polyline
            coordinates={this.state.markers}
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

       
        <View style={styles.card}>

              <Text>ingresa aceptar cuando termines de dibujar tu ruta</Text>
              <Button
              title="estoy listo"
              onPress={this.mandardatos}
              />


        </View>
      </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  marker: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  },
  boton: {
    position: "absolute",
    top: 30
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
    height: "auto",
    width: CARD_WIDTH,  
    overflow: "hidden",
    marginHorizontal: 20,
    position: 'absolute',
    bottom:0,
    marginBottom: 10,
    borderRadius: 10,
  },
 
});