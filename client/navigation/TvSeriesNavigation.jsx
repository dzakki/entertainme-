import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TvSeries from '../screens/TvSeries';
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator()

export default function MoviesNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: '#F5F7F8' },
            }}
        >
            <Stack.Screen
                name="ListTvSeries"
                component={TvSeries}
                options={{
                    title: "Tv Series",
                    header: CustomHeader
                }}
            />
        </Stack.Navigator>
    )
}