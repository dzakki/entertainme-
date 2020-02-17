import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ scene, previous, navigation }) {
    const { options } = scene.descriptor;
    const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
    return (
        <View style={styles.container}>
            { 
                previous
                    ? (
                        <View style={styles.btnBack}>
                            <TouchableHighlight 
                                onPress={() => navigation.goBack()}
                                underlayColor="transparent"
                            >
                                <Ionicons name='md-arrow-back' size={29} color="black"/>
                            </TouchableHighlight>
                        </View>
                    )
                    : undefined
            }
            <View style={styles.wrapTitle}>
                <Text style={styles.title}> { title } </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: "white",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    btnBack: {
        position: 'absolute',
        zIndex: 999,
        marginLeft: 10,
        width: 30,
    },
    wrapTitle: {
        alignItems: "center"
    },  
    title: {
        fontWeight: '700',
    }
})