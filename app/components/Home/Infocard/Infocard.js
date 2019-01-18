// Info Card for each POI
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

class Infocard extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <TouchableOpacity className = 'card' style = {styles.card} onPress = {this.props.handlePress}>
                <View className = 'title'>
                    <Text style = {styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style = {styles.underline}>
                        ------------------------------------------
                    </Text>
                </View>
                <View className='Price'>
                    <Text style = {styles.price}>
                        Yelp Rating: {this.props.rating}
                    </Text>
                </View>
                <View className='Price'>
                    <Text style = {styles.price}>
                        Price: {this.props.price}
                    </Text>
                </View>
                <View className='number'>
                    <Text style = {styles.number}>
                        #: {this.props.number}
                    </Text>
                </View>
                <View className='number'>
                    <Text style = {styles.distance}>
                        Distance: {this.props.distance} km
                    </Text>
                </View>
                <View className='link' style = {styles.linkBox}>
                    <Text style = {styles.link}>
                        View on Yelp
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

// Styling
const styles = StyleSheet.create({
    card: {
        width: "90%",
        marginLeft: '5%',
        backgroundColor: '#2d2d86',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginBottom: '8%',
    },
    title: {
        marginTop: '2%',
        marginLeft: '2%',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'TrebuchetMS-Italic',
    },
    underline: {
        marginBottom: '1%',
        marginLeft: '2%',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'TrebuchetMS-Italic',
    },
    price: {
        marginTop: '2%',
        marginBottom: '1%',
        marginLeft: '10%',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'TrebuchetMS-Italic',
    },
    number: {
        marginTop: '2%',
        marginBottom: '1%',
        marginLeft: '10%',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'TrebuchetMS-Italic',
    },
    distance: {
        marginTop: '2%',
        marginBottom: '4%',
        marginLeft: '10%',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'TrebuchetMS-Italic',
    },
    link: {
        marginTop: '2%',
        marginBottom: '4%',
        marginLeft: '33%',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'TrebuchetMS-Italic',
    },
    linkBox: {
        backgroundColor: '#8080ff',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    }
})

export default Infocard;
AppRegistry.registerComponent('Infocard', () => Infocard);