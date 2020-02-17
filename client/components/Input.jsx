import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function Input() {
    const [ value, setValue ] = useState("")
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChange={text => setValue(text)}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 0.9,
    }
})