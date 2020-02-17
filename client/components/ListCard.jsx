import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListCard({data}) {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback 
            onPress={ () => navigation.navigate('detailMovies', data) }
        >
            <View style={styles.container}>
                <View style={styles.deepContainer}>
                    <Image  
                        style={styles.image}
                        source={{
                            uri: data.poster_path
                        }}
                    />
                    <View style={styles.wrapTitle}>
                        <Text style={styles.title}>
                            {data.title}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )    
}
const styles = StyleSheet.create({
    container: {
        height: 280,
        width: '50%',
        padding: 8
    },
    deepContainer: {
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
    },
    image: {
        width: '100%',
        height: '75%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    wrapTitle: {
        padding: 8
    },
    title: {
        fontWeight: '700',
        fontSize: 15,
        fontFamily: 'sans-serif-light'
    }
})
