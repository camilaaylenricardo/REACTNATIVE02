import React, { useState } from 'react';
import { Alert, StyleSheet, Button, View, TextInput, Image } from 'react-native';
import { registerUser } from '../../utils/api'; // Importa la función desde el archivo api.ts

const HomeScreen: React.FC = () => {
    // Definimos los estados necesarios para manejar los datos del usuario
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [profilePic, setProfilePic] = useState<string | null>(null); // Para la foto de perfil

    // Simula la carga de la foto de perfil (esto debería ser manejado por una librería como expo-image-picker)
    const handleProfilePicUpload = () => {
        // Esta función puede abrir un selector de imágenes (ej. Expo ImagePicker)
        setProfilePic('https://via.placeholder.com/150'); // Placeholder por ahora
    };

    // Función que maneja el registro de usuario y muestra alertas
    const handleSubmit = async () => {
        if (email && username && password && phone && address) {
            try {
                const response = await registerUser(username, email, password);

                if (response.data.success) {
                    Alert.alert('Success', 'Your information has been saved successfully.');
                } else {
                    Alert.alert('Error', 'There was an issue saving your information. Please try again.');
                }
            } catch (error) {
                Alert.alert('Error', 'There was an error communicating with the server. Please try again.');
            }
        } else {
            Alert.alert('Error', 'Please fill out all fields before submitting.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Mostrar la imagen de perfil */}
            {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
                <View style={styles.profilePicPlaceholder}>
                    <Button title="Upload Profile Pic" onPress={handleProfilePicUpload} />
                </View>
            )}

            {/* Campos de texto para editar perfil */}
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
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />

            <Button title="Submit Info" onPress={handleSubmit} />
        </View>
    );
};

// Estilos para la pantalla de perfil
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
    },
    profilePicPlaceholder: {
        width: 150,
        height: 150,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
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

export default HomeScreen;