import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '@/styles/profileDashboardStyles';
import ImagePickerComponent from '@/components/ImagePickerComponent';
import SaveProfileButton from '@/button/SaveProfileButton';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');
  const [profileImage, setProfileImage] = useState<{ uri: string } | null>(null);
  const [userName, setUserName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    gender: '',
    age: '',
    position: '',
    profileImage: null,
    userName: '',
  });

  // Cargar datos del usuario desde la API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('Token no disponible, por favor inicia sesión');
          return;
        }

        const response = await axios.get('http://192.168.0.192:8000/api/get-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          const { name, gender, age, position, profile_image, online_status } = response.data;
          setUserName(name);
          setGender(gender);
          setAge(age.toString());
          setPosition(position);
          setProfileImage(profile_image);
          setIsOnline(online_status === 1);
        } else {
          console.log('No se encontró el perfil del usuario');
        }
      } catch (error) {
        console.log('Error al obtener los datos del usuario', error);
      }
    };

    fetchUserData();
  }, []);

  // Validar formulario cuando cambian los valores
  useEffect(() => {
    setIsFormValid(!!gender && !!age && !!position && !!profileImage);
  }, [gender, age, position, profileImage]);

  // Cambiar entre modo edición y vista normal
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // Cambiar el estado de conexión
  const toggleOnlineStatus = async () => {
    try {
      const newStatus = isOnline ? 0 : 1;
      setIsOnline(!isOnline);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('Token no disponible');
        return;
      }

      await axios.post('http://192.168.0.192:8000/api/update-status',
        { online_status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Estado actualizado');
    } catch (error) {
      console.log('Error al cambiar el estado', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Mostrar nombre de usuario y estado */}
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Hello, {userName || 'User'}</Text>
        <TouchableOpacity style={styles.statusButton} onPress={toggleOnlineStatus}>
          <Ionicons
            name={isOnline ? 'cloud-done' : 'cloud-offline'}
            size={30}
            color={isOnline ? '#4cd137' : '#e74c3c'}
          />
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de imagen de perfil */}
      <View style={styles.profileRow}>
  <View style={styles.profileImageContainer}>
    <ImagePickerComponent
      profileImage={profileImage}
      setProfileImage={setProfileImage}
      setError={setError}
      isEditMode={isEditMode}
    />
  </View>

  {/* Botón Edit / Cancel */}
  <TouchableOpacity
    style={[styles.editButton, isEditMode && { backgroundColor: '#e74c3c' }]}
    onPress={toggleEditMode}
  >
    {isEditMode ? (
      <Ionicons name="close-circle" size={24} color="white" />
    ) : (
      <Ionicons name="settings-sharp" size={24} color="white" />
    )}
    <Text style={styles.editButtonText}>{isEditMode ? 'Cancel' : 'Edit'}</Text>
  </TouchableOpacity>
</View>


      {/* Sección de información */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.choiceContainer}>
        <TouchableOpacity
          style={[styles.choiceButton, gender === 'male' && styles.selectedChoiceButton]}
          onPress={() => setGender('male')}
          disabled={!isEditMode}
        >
          <Text style={styles.choiceText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.choiceButton, gender === 'female' && styles.selectedChoiceButton]}
          onPress={() => setGender('female')}
          disabled={!isEditMode}
        >
          <Text style={styles.choiceText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor={'grey'}
        keyboardType="numeric"
        value={age}
        onChangeText={(value) => setAge(value.replace(/[^0-9]/g, ''))}
        returnKeyType="done"
        blurOnSubmit={true}
        editable={isEditMode}
      />

      <Text style={styles.label}>Position</Text>
      <View style={styles.choiceContainer}>
        {['forward', 'midfielder', 'defender', 'goalkeeper'].map((pos) => (
          <TouchableOpacity
            key={pos}
            style={[styles.choiceButton, position === pos && styles.selectedChoiceButton]}
            onPress={() => setPosition(pos)}
            disabled={!isEditMode}
          >
            <Text style={styles.choiceText}>{pos.charAt(0).toUpperCase() + pos.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón de Guardar solo si está en modo edición */}
      {isEditMode && (
        <SaveProfileButton
          gender={gender}
          age={age}
          position={position}
          profileImage={profileImage}
          setError={setError}
          isFormValid={isFormValid}
          setUserData={setUserData}
        />
      )}
    </View>
  );
}
