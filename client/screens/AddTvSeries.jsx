import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ADD_TVSERIES, GET_ALL_TVSERIES } from '../store/queries/tvSeriesQueries';
import FormCustom from '../components/FormCustom';

export default function AddMovies() {

    const [addTvSeries, { loading }]  = useMutation(ADD_TVSERIES);

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
        addTvSeries({
            variables: {
                input: form
            },
            update : (cache , { data }) => {
                const  cacheData = cache.readQuery({ query: GET_ALL_TVSERIES })
                cache.writeQuery({
                    query: GET_ALL_TVSERIES,
                    data: { tvSeries: cacheData.tvSeries.concat([data.addTvSeries]) },
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
            alert('Added a TV series')
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
                    <FormCustom 
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
        flex: 1
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