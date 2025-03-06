import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const handleAuthRequest = async (type, email, password, name = '', confirmPassword = '', setError, navigation) => {
    try {
        let response;

        // Si el tipo es login, hacemos la petición a login
        if (type === 'login') {
            response = await axios.post('http://192.168.0.192:8000/api/login', { email, password });
        } else {
            // Si es registro, validamos que las contraseñas coincidan
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            // Hacemos la petición a registro
            response = await axios.post('http://192.168.0.192:8000/api/register', { name, email, password, password_confirmation: confirmPassword });
        }

        const { token } = response.data;
        await AsyncStorage.setItem('token', token);

        // Navegamos a la pantalla principal
        navigation.replace('Dashboard');  // Usamos replace para evitar volver a la pantalla de login
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            const errorMessage = error.response.data.error.email ? error.response.data.error.email[0] : 'Something went wrong, please try again';
            setError(errorMessage);
        } else {
            setError('Something went wrong, please try again');
        }
    }
};
