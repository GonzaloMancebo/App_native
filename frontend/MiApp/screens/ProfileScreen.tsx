import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '@/styles/profileStyles'; // Asegúrate de tener tus estilos

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                // Si no hay token, no mostramos el perfil y permitimos el acceso a login o registro
                return;
            }

            try {
                const response = await axios.get('http://192.168.0.192:8000/api/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                await AsyncStorage.removeItem('token'); // Si hay un error, eliminar token
                navigation.replace('Login');
            }
        };

        fetchUser();
    }, [navigation]);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
    };

    // Si no hay usuario (usuario no autenticado)
    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>You are not authenticated.</Text>
                <Text style={styles.info}>Please log in or register to continue.</Text>

                {/* Botón para navegar a Login */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>

                {/* Botón para navegar a Register */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Go to Register</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Si el usuario está autenticado, mostramos su perfil y el botón de logout
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user.name}!</Text>
            <Text style={styles.info}>Email: {user.email}</Text>

            {/* Botón de Logout */}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
