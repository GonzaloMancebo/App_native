import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '@/styles/profileStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Tipar las props de LoginScreen para incluir la propiedad 'navigation'
type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Estado para el loading

  const handleLogin = async () => {
    setLoading(true); // Activar loading antes de hacer la petición
    
    // Validación de email
    if (!email.includes('@') || !email.includes('.')) {
      setLoading(false);
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Validación de contraseña
    if (password.length < 6) {
      setLoading(false);
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.192:8000/api/login', { email, password });
      console.log(response.data); // Imprime la respuesta del servidor para asegurarte de que contiene el token

      const { token } = response.data;
      if (!token) {
        setLoading(false);
        Alert.alert('Error', 'Invalid credentials');
        return;
      }

      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('token', token);

      setLoading(false); // Desactivar loading
      navigation.replace('ProfileDashboard'); // Redirigir a la pantalla de perfil
    } catch (error) {
      setLoading(false); // Desactivar loading

      // Mostrar el mensaje de error genérico que devuelve el servidor
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message); // Usamos el mensaje genérico del backend
      } else {
        Alert.alert('Error', 'Invalid credentials'); // Si el error no tiene mensaje, mostramos un genérico
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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

      {/* Si está cargando, muestra el indicador de carga */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
