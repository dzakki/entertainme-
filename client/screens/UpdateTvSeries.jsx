import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { UPDATE_TVSERIES, GET_ALL_TVSERIES } from '../store/queries/tvSeriesQueries';
import FormCustom from '../components/FormCustom';

export default function UpdateMovies (props) {
    const { dataTvSeries } = props.route.params
    const [formData, setFormData] = useState({
        ...dataTvSeries,
        tags: [dataTvSeries.tags[0]._id],
        popularity: String(dataTvSeries.popularity),
    })
    const [updateTvSeries, { loading }]  = useMutation(UPDATE_TVSERIES);
    const navigation = useNavigation()

    const submitForm = () => {
        const form = {
            title: formData.title, 
            overview: formData.overview, 
            poster_path: formData.poster_path,
            popularity: Number(formData.popularity),
            tags: formData.tags,
            popularity: Number(formData.popularity)
        }
        updateTvSeries({
            variables: {
                input : form,
                id: dataTvSeries._id
            },
            refetchQueries: [{ query: GET_ALL_TVSERIES }],
        })
        .then(() => {
            setFormData({
                title: "", 
                overview: "", 
                poster_path: "", 
                popularity: "", 
                tags: ["5e45144184f936fed373d1ec"]
            })
            alert('upated a tv series')
            navigation.navigate('detailTvSeries', formData)
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