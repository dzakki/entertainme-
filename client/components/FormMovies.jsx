import React, { useState } from 'react';
import { Content, Form, Item, Input, Label,  Button, Text} from 'native-base';

export default function FormMovies({ data, onChangeForm, submitForm }) {

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
        <Content>
            <Form padder>
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
                        data={data.overview}
                        onChangeText={ (val) => handleInputChange('overview', val) }
                    />
                </Item>
                <Item floatingLabel>
                <Label>URL Poster</Label>
                    <Input
                        data={data.poster_path}
                        onChangeText={ (val) => handleInputChange('poster_path', val) }
                    />
                </Item>
                <Button 
                    dark
                    style={{
                        marginTop: 20,
                        marginLeft: 10,
                        width: 100,
                        justifyContent: 'center',
                        borderRadius: 10
                    }}
                    onPressIn={() => {
                        const validate = validateForm()
                        if (!validate) {
                            submitForm()   
                        }
                        alert(validate.join(', '))
                    }}
                >
                    <Text> Save </Text>
                </Button>
            </Form>
        </Content>
    )
}