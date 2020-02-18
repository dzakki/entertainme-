import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Movies from '../screens/Movies';
import CustomHeader from '../components/CustomHeader';
import AddMovies from '../screens/AddMovies';
import DetailMovies from '../screens/DetailMovies';
import UpdateMovies from '../screens/UpdateMovies';

const Stack = createStackNavigator()

export default function MoviesNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: '#F5F7F8' },
            }}
        >
            <Stack.Screen
                name="lisMovies"
                component={Movies}
                options={{
                    title: "Movies",
                    header: CustomHeader
                }}
            />
            <Stack.Screen
                name="addMovies"
                component={AddMovies}
                options={{
                    title: "Add Movies",
                    header: CustomHeader
                }}
            />
            <Stack.Screen
                name="detailMovies"
                component={DetailMovies}
                options={{
                    title: "Detail a movie",
                    header: CustomHeader
                }}
            />
            <Stack.Screen
                name="updateMovies"
                component={UpdateMovies}
                options={{
                    title: "Update a movie",
                    header: CustomHeader
                }}
            />
        </Stack.Navigator>
    )
}