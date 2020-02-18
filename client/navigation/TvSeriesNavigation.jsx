import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TvSeries from '../screens/TvSeries';
import AddTvSeries from '../screens/AddTvSeries';
import UpdateTvSeries from '../screens/UpdateTvSeries';
import DetailTvSeries from '../screens/DetailTvSeries';

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
            <Stack.Screen
                name="addTvSeries"
                component={AddTvSeries}
                options={{
                    title: "Add TV Series",
                    header: CustomHeader
                }}
            />
            <Stack.Screen
                name="detailTvSeries"
                component={DetailTvSeries}
                options={{
                    title: "Detail a TV series",
                    header: CustomHeader
                }}
            />
            <Stack.Screen
                name="updateTvSeries"
                component={UpdateTvSeries}
                options={{
                    title: "Update a TV Series",
                    header: CustomHeader
                }}
            />
        </Stack.Navigator>
    )
}