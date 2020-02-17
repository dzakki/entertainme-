import React, { useState } from 'react';
import { 
    View, 
    ImageBackground, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Text, 
    Modal, 
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailMovies(props) {

    const { params } = props.route
    const dummies = 'Imagine you have a very long list of items you want to display, maybe several screens worth of content. Creating JS components and native views for everything all at once, much of which may not even be shown, will contribute to slow rendering and increased memory usage.'
    return (
        <ImageBackground source={{uri: params.poster_path}} style={{width: '100%', height: '100%'}}>
            <ScrollView>
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <View style={styles.container}>
                    <View 
                        style={[
                                styles.deepContainer, 
                                {
                                    height: params.overview.length >= 300 ? null : 300
                                }
                            ]}
                    >
                        <Text style={styles.title}> {params.title} </Text>
                        <View>
                            <Text style={{fontFamily: "sans-serif"}} > Ratings: {params.popularity} </Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            {/* <Text> {params.overview} </Text> */}
                            <Text style={{ fontFamily: 'sans-serif-light' }}>
                                { dummies }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
            <View style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                bottom: 30,
                right: 10
            }}>
                <TouchableOpacity>
                    <View style={[styles.btnMenu, { marginBottom: 10 }]}>
                        <Ionicons name='md-create' size={29} color="black"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.btnMenu}>
                        <Ionicons name='md-trash' size={29} color="black"/>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '50%',
        padding: 8,
        flex: 1,
    },
    deepContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 15,
    },
    titleWrap : {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'sans-serif-condensed'
    },
    btnMenu: {
        backgroundColor: 'white',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})
