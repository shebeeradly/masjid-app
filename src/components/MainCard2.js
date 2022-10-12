import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images, } from '../constants';
import { Display } from '../utils';
import Seperator from './Seperator';


const MainCard2 = ({ image4, image10, image12, image11, image8, image, image6 }) => {
    return (
        <View style={styles.container}>
            <LinearGradient style={styles.Card}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}>
                <Text numberOfLines={2} style={styles.titleText}>Near Me</Text>
            </LinearGradient>
            <View style={styles.imageContainer}>

                <View style={styles.rowImage}>
                    <ImageBackground style={styles.image1} imageStyle={{ borderRadius: 10 }} source={Images[image10]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image1} imageStyle={{ borderRadius: 10 }} source={Images[image12]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image1} imageStyle={{borderRadius: 10}} source={Images[image6]} resizeMode="contain" />
                </View>

                <View style={styles.rowImage}>
                    <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={Images[image4]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={Images[image11]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={Images[image8]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={Images[image]} resizeMode="contain" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    image1: {
        height: Display.setHeight(15),
        width: Display.setWidth(43),
    },
    image: {
        width: 100,
        height: 75,
        marginTop: 15
    },
    imageContainer: {
        height: Display.setHeight(30),
    },
    titleText: {
        fontSize: 15,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center'
    },
    Card: {
        height: Display.setHeight(27),
        width: Display.setWidth(40),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 30,
        marginRight: 15,
        paddingVertical: 20
    },
    rowImage: {
        flexDirection: 'row',
    }
});

export default MainCard2;