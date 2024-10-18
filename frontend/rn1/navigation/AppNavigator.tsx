import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './Types'; // Asegúrate de que este archivo tenga la definición correcta

// Importación de las pantallas
import LoginPage from '../components/Login'; // Renombré Login a LoginPage
import Register from '../components/Register';
import HomeScreen from '../app/(tabs)/index'; // Asegúrate de que esta importación sea correcta
import UserProfile from '../screens/UserProfile';
import LoginScreen from '../screens/LoginScreen'; // El nombre se mantiene pero asegúrate de que sea correcto

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"> {'Login'}
                <Stack.Screen name="Login" component={LoginPage} /> {'Login'}
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} /> {'LoginScreen'}
                <Stack.Screen name="Profile" component={UserProfile} /> {'UserProfile'}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;