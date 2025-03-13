import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, ActivityIndicator, View, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '@/styles/authFormStyles';
import { AuthFormProps } from '@/navigation/types';




const AuthForm: React.FC<AuthFormProps> = ({ type, setError, navigation, toggleAuthType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    // Validar formato del email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email:', email);  // Console log added here
      setError('Invalid Email: Please enter a valid email address.');
      return false;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      console.log('Invalid password length:', password.length);  // Console log added here
      setError('Invalid Password: Password must be at least 6 characters.');
      return false;
    }

    // En el registro, aseguramos que las contraseñas coincidan
    if (type === 'register' && password !== confirmPassword) {
      console.log('Passwords do not match:', password, confirmPassword);  // Console log added here
      setError('Password Mismatch: Passwords do not match.');
      return false;
    }

    // Si todas las validaciones pasan
    setError('');
    console.log('Validation passed, email:', email, 'password:', password);  // Console log added here
    return true;
  };

  const handleSubmit = async () => {
    console.log('Submit pressed with authType:', type);  // Console log added here

    if (!validateInputs()) return;

    setLoading(true);
    try {
      let response;

      // Manejo de login y registro
      if (type === 'login') {
        console.log('Logging in with email:', email, 'password:', password);  // Console log added here
        response = await axios.post('http://192.168.0.192:8000/api/login', { email, password });
      } else {
        console.log('Registering with name:', name, 'email:', email, 'password:', password);  // Console log added here
        response = await axios.post('http://192.168.0.192:8000/api/register', {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        });
      }

      // Almacenar el token recibido del backend
      const { token } = response.data;
      console.log('Token received:', token);  // Console log added here
      await AsyncStorage.setItem('token', token);

      // Redirigir al dashboard
      Alert.alert('Success', 'You have successfully logged in or registered!', [
        { text: 'OK', onPress: () => navigation.replace('Home') },
      ]);
    } catch (error: any) {
      console.error('Error during request:', error);  // Console log added here
      Alert.alert('Error', error.response ? error.response.data.message : 'Something went wrong, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'login' ? 'Login to your account' : 'Create an account'}
      </Text>

      {type === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={'grey'}
          value={name}
          onChangeText={setName}
        />
      )}

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

      {type === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={'grey'}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{type === 'login' ? 'Login' : 'Register'}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={toggleAuthType}>
        <Text style={styles.linkText}>
          {type === 'login' ? "Don't have an account? Register here" : "Already have an account? Login here"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;
