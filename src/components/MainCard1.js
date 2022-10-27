import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images, } from '../constants';
import { Display } from '../utils';
import Collection from '../assets/images/collection.svg';
import Seperator from './Seperator';

const MainCard1 = ({onPress, image, image7, image2, image5, image13 }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={onPress}>
            <LinearGradient style={styles.Card}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}>
                <Collection width={30} height={30} />
                <Text numberOfLines={2} style={styles.titleText}>Collection {"\n"} (Added New Masjid)</Text>
                <Image source={Images.RIGHTARROW} height={25} width={25} />
            </LinearGradient>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <View style={styles.rowImage}>
                    <ImageBackground style={styles.image1} imageStyle={{borderRadius: 10}} source={Images[image7]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image1} imageStyle={{borderRadius: 10}} source={Images[image2]} resizeMode="contain" />
                </View>

                <View style={styles.rowImage}>
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 10}} source={Images[image]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 10}} source={Images[image5]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 10}} source={Images[image13]} resizeMode="contain" />
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

export default MainCard1;