import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { 
    View, 
    ImageBackground, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Text, 
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DELETE_MOVIE, GET_MOVIES } from '../store/queries/moviesQueries';


export default function DetailMovies(props) {

    const [deleteMovie] = useMutation(DELETE_MOVIE)
    const { params } = props.route
    const navigation = useNavigation()

    const preDeleteMovie = () => {
        deleteMovie({
            variables: {
                id: params._id
            },
            update : (cache) => {
                const  cacheData = cache.readQuery({ query: GET_MOVIES })
                const movies = cacheData.movies.filter(m => m._id !== params._id)
                cache.writeQuery({
                    query: GET_MOVIES,
                    data: { movies },
                });
            }
        })
        .then(() => {
            navigation.navigate('lisMovies')
        })
        .catch(console.log)
    }

    const confirmAlert = () => {
        Alert.alert(
            'Delete a movie',
            'Are you sure, want to delete this a movie?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: preDeleteMovie},
            ],
            {cancelable: false},
        );
    }

    return (
        <ImageBackground source={{uri: params.poster_path}} style={{width: '100%', height: '100%'}}>
            <ScrollView>
            <View 
                style={{
                    flex: 1,
                    flexDirection: 'column'
                }}
            >
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
                            <Text 
                                style={{fontFamily: "sans-serif"}} 
                            > 
                                Ratings: {params.popularity} 
                            </Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text 
                                style={{ fontFamily: 'sans-serif-light' }}
                            >
                                { params.overview }
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
                <TouchableOpacity 
                    onPress={() => navigation.navigate('updateMovies', { dataMovie: params })}
                >
                    <View
                        style={[styles.btnMenu, { marginBottom: 10 }]}
                    >
                        <Ionicons 
                            name='md-create' 
                            size={29} 
                            color="black"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => confirmAlert()}
                >
                    <View style={styles.btnMenu}>
                        <Ionicons 
                            name='md-trash' 
                            size={29} 
                            color="black"
                        />
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
