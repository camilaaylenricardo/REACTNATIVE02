import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { loginUser } from '../utils/api'; // Importa la función desde tu archivo de API

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email && password) {
            try {
                // Usamos la función loginUser para hacer la llamada
                const response = await loginUser(email, password);

                // Suponiendo que la API devuelve un token o algún dato
                Alert.alert('Login Successful', `Email: ${email}, Token: ${response.data.token}`);
            } catch (error) {
                // Manejo de errores
                Alert.alert('Error', 'Login failed. Please check your credentials.');
            }
        } else {
            Alert.alert('Error', 'Please enter your email and password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
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
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
});

export default Login;