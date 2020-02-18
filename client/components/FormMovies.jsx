import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Content, Form, Item, Input, Label,  Button, Text, Icon} from 'native-base';

export default function FormMovies({ data, onChangeForm, submitForm }) {
    const navigation = useNavigation()

    const handleInputChange = (key, value) => {
        const newDataFormTemp = {}
        newDataFormTemp[key] = value
        const newDataForm = {
            ...data,
            ...newDataFormTemp,
        }
        onChangeForm(newDataForm);
    }

    const validateForm = () => {
        const errors = []
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (!data[key]) {
                    errors.push(`${key} is required`)
                }
            }
        }
        if (errors.length) {
            return errors
        }
        return false
    }

    return (
        <Content style={{
            flex: 1,
            flexDirection: 'column'
        }}>
            <Form padder style={{
                flex: 1,
                height: 600,
            }}>
                <Item floatingLabel>
                <Label>Title</Label>
                    <Input
                        value={data.title}
                        onChangeText={ (val) => handleInputChange('title', val) }
                    />
                </Item>
                <Item floatingLabel>
                <Label>Popularity</Label>
                    <Input
                        value={data.popularity}
                        onChangeText={ (val) => handleInputChange('popularity', val) }
                    />
                </Item>
                <Item floatingLabel>
                <Label>Overview</Label>
                    <Input
                        value={data.overview}
                        onChangeText={ (val) => handleInputChange('overview', val) }
                        multiline={true}
                    />
                </Item>
                <Item floatingLabel>
                <Label>URL Poster</Label>
                    <Input
                        value={data.poster_path}
                        onChangeText={ (val) => handleInputChange('poster_path', val) }
                        multiline={true}
                    />
                </Item>
            </Form>

            <View style={{
                alignSelf: 'flex-end',
                marginTop: 10,
                bottom: 10,
                right: 10,
                flex: 1,
                flexDirection: 'row',
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.btnMenu}>
                    <Icon name="md-close" color="black" fontSize={29} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPressIn={() => {
                        const validate = validateForm()
                        if (!validate) {
                            submitForm()   
                            return;
                        }
                        alert(validate?.join(', '))
                    }}
                >
                    <View style={styles.btnMenu}>
                    <Icon name="md-checkmark" color="black" fontSize={29} />
                    </View>
                </TouchableOpacity>
            </View>
        </Content>
    )
}

const styles = StyleSheet.create({
    btnMenu: {
        marginLeft: 10,
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