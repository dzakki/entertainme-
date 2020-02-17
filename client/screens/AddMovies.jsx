import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import FormMovies from '../components/FormMovies';

const ADD_MOVIES  = gql`

    mutation addMovie($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        addMovie (title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
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
export default function AddMovies() {

    const [addMovie, { loading }]  = useMutation(ADD_MOVIES);

    const [formData, setFormData] = useState({
        title: "", 
        overview: "", 
        poster_path: "", 
        popularity: "", 
        tags: ["5e45144184f936fed373d1ec"]
    })
    const submitForm = () => {
        const form = {
            ...formData,
            popularity: Number(formData.popularity)
        }
        
        console.log(form)
        addMovie({
            variables: form,
            update : (cache , { data }) => {
                const  cacheData = cache.readQuery({ query: GET_MOVIES })
                cache.writeQuery({
                    query: GET_MOVIES,
                    data: { movies: cacheData.movies.concat([data.addMovie]) },
                });
            }
        })
        .then(() => {
            setFormData({
                title: "", 
                overview: "", 
                poster_path: "", 
                popularity: "", 
                tags: ["5e45144184f936fed373d1ec"]
            })
            alert('Added a movie')
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
    },
    form: {
        height: 350,
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