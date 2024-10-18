import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Usamos Expo para seleccionar imagen
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Types';  // Ajusta la ruta según tu proyecto

type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const UserProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);  // Para almacenar la foto

  const navigation = useNavigation<UserProfileNavigationProp>();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);  // Guardamos la URI de la imagen
      }
    } else {
      Alert.alert('Error', 'Permission to access media library is required.');
    }
  };

  const updateProfile = () => {
    if (name && phone && address) {
      // Simula la actualización del perfil (puedes conectarlo con la API aquí)
      Alert.alert('Success', 'Your profile has been updated successfully.');

      // Navegar al home o a otra pantalla
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>No photo selected</Text>
        </View>
      )}

      <Button title="Pick a Photo" onPress={pickImage} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
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

      <Button title="Update Profile" onPress={updateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default UserProfile;