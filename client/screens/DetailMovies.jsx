import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { 
    View, 
    ImageBackground, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Alert,
} from 'react-native';
import { Badge, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DELETE_MOVIE, GET_MOVIES, GET_MOVIE } from '../store/queries/moviesQueries';


export default function DetailMovies(props) {

    const [deleteMovie] = useMutation(DELETE_MOVIE)
    const { params } = props.route
    const navigation = useNavigation()
    
    const { data, loading, error } = useQuery(GET_MOVIE, {
        variables: {
            id: params._id
        } 
    });

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

    if (loading) return <Text>Loading...</Text>
    if (error) return <Text> Something error </Text>

    return (
        <ImageBackground source={{uri: data.movie.poster_path}} style={{width: '100%', height: '100%'}}>
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
                                    height: data.movie.overview.length >= 300 ? null : 300
                                }
                            ]}
                    >
                        <Text style={styles.title}> {data.movie.title} </Text>
                        <Badge primary>
                            <Text style={{ fontSize: 12 }}> {data.movie.tags[0].name} </Text>
                        </Badge>
                        <View>
                            <Text 
                                style={{fontFamily: "sans-serif"}} 
                            > 
                                Ratings: {data.movie.popularity} 
                            </Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text 
                                style={{ fontFamily: 'sans-serif-light' }}
                            >
                                { data.movie.overview }
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
                    onPress={() => navigation.navigate('updateMovies', { dataMovie: data.movie })}
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
