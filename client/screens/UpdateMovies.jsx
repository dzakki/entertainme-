import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import FormMovies from '../components/FormMovies';


const UPDATE_MOVIE  = gql`
    mutation updateMovie($input: inputUpdateMovie!, $id: String) {
        updateMovie (input: $input, id: $id) {
            _id,
            title
            overview
            popularity
            poster_path
            tags {
              name
            }
        }
    }
`

const GET_MOVIES = gql`

    query {
        movies {
            _id,
            title
            overview
            popularity
            poster_path
            tags {
              name
            }
        }
    }

`

export default function UpdateMovies (props) {
    const { dataMovie } = props.route.params
    const [formData, setFormData] = useState({
        ...dataMovie,
        popularity: String(dataMovie.popularity),
    })
    const [updateMovie, { loading }]  = useMutation(UPDATE_MOVIE);
    const navigation = useNavigation()

    const submitForm = () => {
        const form = {
            title: formData.title, 
            overview: formData.overview, 
            poster_path: formData.poster_path,
            popularity: Number(formData.popularity),
            tags: ["5e45144184f936fed373d1ec"],
            popularity: Number(formData.popularity)
        }
        updateMovie({
            variables: {
                input : form,
                id: dataMovie._id
            },
            refetchQueries: [{ query: GET_MOVIES }],
        })
        .then(() => {
            setFormData({
                title: "", 
                overview: "", 
                poster_path: "", 
                popularity: "", 
                tags: ["5e45144184f936fed373d1ec"]
            })
            alert('upated a movie')
            navigation.navigate('detailMovies', formData)
        })
        .catch(err => {
            console.log(err)
            alert('error')
        })   
    }


    return (
        <View style={styles.container}>
            <View style={styles.wrapForm}>
                <View style={styles.form}>
                    <FormMovies 
                        data={formData} 
                        onChangeForm={(data) => setFormData(data)} 
                        submitForm={submitForm}
                    />
                    {
                        loading
                            ? (<ActivityIndicator size="small" color="#00ff00" />)
                            : null
                    }
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'column'
    },
    wrapForm: {
        width: '100%',
        padding: 8,
        flex: 1,
    },
    form: {
        flex: 1,
        backgroundColor: 'white',
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
})