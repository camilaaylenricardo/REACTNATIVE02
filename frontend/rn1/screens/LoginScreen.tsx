import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput } from 'react-native'; // Importación correcta de TextInput
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import { loginUser } from '../utils/api'; // Asegúrate de tener la función loginUser en api.ts

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useIdTokenAuthRequest({
        clientId: 'YOUR_GOOGLE_CLIENT_ID', // Reemplaza con tu Google Client ID
    });

    // Configuración correcta de Facebook sin 'appId'
    const [requestFacebook, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest({
        // No es necesario appId aquí, o lo puedes definir como una propiedad global
    });

    const handleGoogleLogin = async () => {
        try {
            const result = await promptAsyncGoogle();
            if (result?.type === 'success') {
                const idToken = result.params.id_token;
                // Llama a tu API para autenticar o almacenar el token
                Alert.alert('Google Login Success', `Token: ${idToken}`);
            }
        } catch (error) {
            Alert.alert('Google Login Failed', 'Please try again.');
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await promptAsyncFacebook();
            if (result?.type === 'success') {
                const accessToken = result.params.access_token;
                // Llama a tu API para autenticar o almacenar el token
                Alert.alert('Facebook Login Success', `Token: ${accessToken}`);
            }
        } catch (error) {
            Alert.alert('Facebook Login Failed', 'Please try again.');
        }
    };

    const handleAppleLogin = async () => {
        try {
            const credentials = await AppleAuthentication.signInAsync();
            if (credentials) {
                // Llama a tu API para autenticar o almacenar el token
                Alert.alert('Apple Login Success', `Apple ID: ${credentials.user}`);
            }
        } catch (error) {
            Alert.alert('Apple Login Failed', 'Please try again.');
        }
    };

    const handleLogin = async () => {
        if (email && password) {
            try {
                const response = await loginUser(email, password);
                Alert.alert('Login Successful', `Email: ${email}, Token: ${response.data.token}`);
            } catch (error) {
                Alert.alert('Error', 'Login failed. Please check your credentials.');
            }
        } else {
            Alert.alert('Error', 'Please enter your email and password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login with</Text>

            {/* Botones para login con Google, Facebook y Apple */}
            <Button title="Login with Google" onPress={handleGoogleLogin} disabled={!requestGoogle} />
            <Button title="Login with Facebook" onPress={handleFacebookLogin} disabled={!requestFacebook} />
            <Button title="Login with Apple" onPress={handleAppleLogin} />

            <Text style={styles.or}>or</Text>

            {/* Formulario de login con email y contraseña */}
            <View>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                />
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Enter your password"
                />
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    or: {
        marginVertical: 10,
        fontSize: 18,
    },
    input: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LoginScreen;