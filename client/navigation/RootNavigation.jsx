import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesNavigation from './MoviesNavigation';
import TvSeriesNavigation from './TvSeriesNavigation';

const Tab = createBottomTabNavigator()

export default function RootNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="movies"
                component={MoviesNavigation}
                options={{
                    title: 'Movies'
                }}
            />
            <Tab.Screen
                name="tvSeries"
                component={TvSeriesNavigation}
                options={{
                    title:"Tv Series"
                }}
            />
        </Tab.Navigator>
    )
}  