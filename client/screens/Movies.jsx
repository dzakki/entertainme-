import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    FlatList,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GET_MOVIES } from '../store/queries/moviesQueries';
import ListCard from '../components/ListCard'


export default function Movies() {
    const { loading, error, data } = useQuery(GET_MOVIES);
    console.log(data?.movies.length, 'MOVIES')
    const navigation = useNavigation()

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error! {error.message}</Text>;  

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    numColumns={2}
                    data={data.movies}
                    renderItem={({item}) => <ListCard data={item} url="detailMovies" />}
                />
            </ScrollView>
            <View style={styles.floatingMenuButton}>
                <TouchableOpacity onPress={() => navigation.navigate('addMovies')} >
                    <View style={styles.btnMenu}>
                        <Ionicons name='md-add' size={29} color="black"/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        flexDirection: 'column'
    },
    listCard: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    floatingMenuButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 30,
        right: 10
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