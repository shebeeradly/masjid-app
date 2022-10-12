import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images, } from '../constants';
import { Display } from '../utils';
import Favorite from '../assets/images/favorite.svg';
import Seperator from './Seperator';

const MainCard = ({ title, image6, image1, image9, image8, image12, image4, image11 }) => {
    return (
        <View style={styles.container}>
            <LinearGradient style={styles.Card}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}>
                <Favorite width={30} height={30} />
                <Text style={styles.titleText}>{title}</Text>
                <Image source={Images.RIGHTARROW} height={25} width={25} />
            </LinearGradient>
            <View style={styles.imageContainer}>
                <View style={styles.rowImage}>            
                   <ImageBackground style={styles.image1} imageStyle={{borderRadius: 10}} source={Images[image9]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image1} imageStyle={{borderRadius: 10}} source={Images[image6]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image1} imageStyle={{borderRadius: 10}} source={Images[image12]} resizeMode="contain" />
                </View>
                <View style={styles.rowImage}>
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 10}} source={Images[image1]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 10}} source={Images[image8]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 10}} source={Images[image4]} resizeMode="contain" />
                    <Seperator width={10} />
                    <ImageBackground style={styles.image} imageStyle={{borderRadius: 10}} source={Images[image11]} resizeMode="contain" />
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
        width: Display.setWidth(40),
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
        color: Colors.DEFAULT_WHITE
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

export default MainCard;