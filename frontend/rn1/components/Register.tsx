import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://192.168.1.51/register.php', {
                username,
                email,
                password,
            });
            Alert.alert(response.data.message || response.data.error);
        } catch (error) {
            Alert.alert('Error', 'Failed to register user.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

export default Register;