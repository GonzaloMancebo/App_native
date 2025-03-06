import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from '@/styles/profileStyles';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carga
    const [success, setSuccess] = useState(false); // Estado de éxito

    const handleRegister = async () => {
        // Validación de email
        if (!email.includes('@') || !email.includes('.')) {
            setError('Please enter a valid email address');
            return;
        }

        // Validación de contraseña
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // Confirmación de contraseñas
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true); // Iniciar carga

        try {
            const response = await axios.post('http://192.168.0.192:8000/api/register', 
                { 
                    name, 
                    email, 
                    password, 
                    password_confirmation: confirmPassword // Asegúrate de enviar password_confirmation correctamente
                }, 
                { 
                    withCredentials: true // Si tu API usa cookies, asegúrate de que esto esté habilitado
                }
            );

            setLoading(false); // Detener carga

            if (response.status === 201) {  // Cambié 200 por 201
                setSuccess(true);  // Set success state
                Alert.alert('Success', 'You have successfully registered!', [
                    { text: 'OK', onPress: () => navigation.replace('Login') }
                ]);
            }
        } catch (error) {
            setLoading(false); // Detener carga

            if (error.response) {
                const errorMessage = error.response.data.message || 'Registration failed';
                setError(errorMessage);  // Mostrar mensaje de error del backend
                Alert.alert('Error', errorMessage);
            } else {
                setError('An unknown error occurred');
                Alert.alert('Error', 'An unknown error occurred');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={'grey'}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={'grey'}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'grey'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={'grey'}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Si el estado loading es true, muestra el ActivityIndicator */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            )}
            
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}
