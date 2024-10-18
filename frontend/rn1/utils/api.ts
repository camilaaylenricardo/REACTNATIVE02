import axios from 'axios';

const API_URL = 'http://localhost/nodejs/pde/my-project/backend/'; 

export const registerUser = async (username: string, email: string, password: string) => {
    return await axios.post(`${API_URL}register.php`, {
        username,
        email,
        password,
    });
};

export const loginUser = async (email: string, password: string) => {
    return await axios.post(`${API_URL}other_api.php`, {
        email,
        password,
    });
};

// Nueva función para actualizar perfil
export const updateUserProfile = async (
    username: string,
    phone: string,
    address: string,
    photo: string | null,
    location: { latitude: number; longitude: number }
) => {
    return await axios.post(`${API_URL}updateProfile.php`, {
        username,
        phone,
        address,
        photo,
        latitude: location.latitude,
        longitude: location.longitude,
    });
};
