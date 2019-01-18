//Home Screen and Container
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Alert,
    ScrollView,
    Linking,
} from 'react-native';
// Testing react-native-maps for this project
import MapView from 'react-native-maps';
import Infocard from './Infocard/Infocard';

//  ✔ TODO: Test a fetch request to server 
//  ✔ TODO: Send the lat/lan to server and retrieve restaurants from yelp api
//  ✔ TODO: Sort out response 
//  ✔ TODO: Make markers for each place
//  ✔ TODO: Map state.results out into proper cards and display

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 1000000,
            lon: 1000000,
            location: null,
            // API results
            results: [],
            // Marker Store
            markers: [],
        }
        this.locator = this.locator.bind(this)
    }

    // Function to get lat/lon using react geolocation
    // IOS emulator default returns Apple hq coordinates
    locator = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                this.stateSet(position)
            }
        );
    }

    // Function to change state 
    stateSet = (data) => {
        this.setState({
            location: data,
            lat: data.coords.latitude,
            lon: data.coords.longitude,
            // Changed componentDidMount to another fuction
            // Componentdidmount was runing 2x which returned undefined first time
            // undefined returned an error which stopped the app from running
        }, () => this.coord(data.coords.latitude, data.coords.longitude));
    }

    // Call locator function
    componentWillMount = () => {
        this.locator()
    }


    // Zoom to region once mounted
    coord = () => {
        // Telling map to zoom in on region
        var startRegion = {
            latitude: this.state.lat,
            longitude: this.state.lon,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
        };
        this.mapView.animateToRegion(startRegion, 3000)
        this.finder()
    }

    // Function to fetch node server
    finder = () => {
        fetch("http://localhost:9090/api", {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lat: this.state.lat,
                lon: this.state.lon,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                // Store results in state
                this.setState({
                    results: res.data,
                }, () => this.mapMarker(res.data))
            })
            .done()
    }

    // Marker Mapping
    mapMarker = (data) => {
        var mark = this.state.markers
        for (var i = 0; i < data.length; i++) {
            mark.push(
                {
                    latitude: data[i].coordinates.latitude,
                    longitude: data[i].coordinates.longitude,
                    title: data[i].name,
                    price: data[i].price,
                    phone: data[i].display_phone,
                    rating: data[i].rating,
                    image: data[i].image_url,
                    open: data[i].is_closed,
                    link: data[i].url,
                    distance: Math.ceil(data[i].distance * 1) / 100,
                }
            )
            this.setState({
                markers: mark
            })
        }
        console.log(data)
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    }}
                    zoomEnabled={true}
                    ref={ref => { this.mapView = ref }}
                >
                    {/* Initial Marker for location */}
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.lat,
                            longitude: this.state.lon
                        }}
                        title={"You are here!"}
                        pinColor={'#4d4dff'}
                    />

                    {/* Mapping restaurant markers */}
                    {this.state.markers.map((info, index) => {
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={{
                                    latitude: info.latitude,
                                    longitude: info.longitude
                                }}
                                title={info.title}
                                description = {info.price}
                                pinColor = {'#663300'}
                                onPress = {() => {
                                    Alert.alert(
                                        info.title,
                                        info.distance + 'km away',
                                        [
                                            {
                                                text: "Close",
                                            }
                                        ]
                                    )
                                }}
                            >
                            </MapView.Marker>
                        )
                    })}
                </MapView>
                <ScrollView style={styles.box}>
                    <Text style={styles.textBox}>
                        Coffee Shops Near You
                    </Text>
                    <Text style={styles.textLine}>
                        __________________________________________________
                    </Text>
                    {/* Mapping Info Cards here */}
                    {this.state.markers.map((info, index) => {
                        return (
                            <Infocard
                            key = {index}
                            title = {info.title}
                            price = {info.price}
                            number = {info.phone}
                            distance = {info.distance}
                            rating = {info.rating}
                            handlePress = {() => {
                                Linking.canOpenURL(info.link).then(supported => {
                                    if (supported) {
                                      Linking.openURL(info.link);
                                    } else {
                                      console.log("Error cannot open: " + info.link);
                                    }
                                  });
                            }}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

// Styling
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
        height: '40%',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        zIndex: 1,
    },
    box: {
        position: 'relative',
        backgroundColor: 'white',
        width: '100%',
        marginTop: '82%',
        zIndex: 0,
        backgroundColor: '#3d3d5c'
    },
    textBox: {
        marginTop: '10%',
        marginBottom: '1%',
        marginLeft: '12%',
        backgroundColor: '#3d3d5c',
        zIndex: 2,
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
    },
    textLine: {
        color: 'white',
        marginLeft: '8%',
        marginBottom: '4%',
        fontWeight: 'bold',
    },
    button: {
        fontSize: 30,
    }
})

export default Home;
AppRegistry.registerComponent('Home', () => Home);