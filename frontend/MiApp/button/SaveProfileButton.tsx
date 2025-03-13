import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Modal, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { modalStyles, buttonStyles } from '@/styles/saveProfileButtonStyle';

interface SaveProfileButtonProps {
  gender: string;
  age: string;
  position: string;
  profileImage: { uri: string } | null;
  setError: (error: string) => void;
  isFormValid: boolean;
  setUserData: (data: any) => void;  // Actualizar datos del usuario
}

const SaveProfileButton: React.FC<SaveProfileButtonProps> = ({
  gender, age, position, profileImage, setError, isFormValid, setUserData
}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  // Convertir la URI a un objeto Blob para cargar la imagen
  const uriToBlob = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error al convertir el URI a Blob:', error);
      setError('Error al cargar la imagen');
      throw error;  // Asegúrate de que el error se maneje correctamente.
    }
  };

  // Función para actualizar el perfil
  const handleUpdateProfile = async () => {
    setLoading(true);   // Indicador de carga activado
    setModalVisible(true);
    setSuccess(null);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Token no disponible, por favor inicia sesión');
        setLoading(false);
        setModalVisible(false);
        return;
      }

      const formData = new FormData();
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('position', position);

      // Manejo de la imagen si está disponible
      if (profileImage) {
        const imageBlob = await uriToBlob(profileImage.uri);
        formData.append('image', imageBlob, profileImage.fileName || 'profile.jpg');
      }

      // Solicitud para actualizar el perfil
      const updateResponse = await axios.post(
        'http://192.168.0.192:8000/api/update-profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Verificar la respuesta de la actualización
      if (updateResponse.status === 200) {
        // Solicitud para obtener los datos actualizados del usuario
        const getResponse = await axios.get(
          'http://192.168.0.192:8000/api/get-profile',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        // Actualizar el estado con los datos actualizados
        setUserData(getResponse.data);

        // Mostrar éxito
        setSuccess(true);
        setError('');
      } else {
        throw new Error('No se pudo actualizar el perfil');
      }
    } catch (error) {
      // Manejo de errores
      setSuccess(false);
      setError('Error desconocido');
      console.error('Error al actualizar perfil:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setModalVisible(false), 5000);  // Cerrar modal después de 5 segundos
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={isFormValid ? buttonStyles.button : [buttonStyles.button, buttonStyles.disabledButton]}
          onPress={handleUpdateProfile}
          disabled={!isFormValid}
        >
          <Text style={buttonStyles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      {/* Modal de Loading */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            {success === null ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : success ? (
              <Ionicons name="checkmark-circle" size={50} color="green" />
            ) : (
              <Ionicons name="close-circle" size={50} color="red" />
            )}
            <Text style={modalStyles.modalText}>
              {success === null
                ? 'Saving changes...'
                : success
                ? 'Profile updated successfully!'
                : 'There was an error updating the profile.'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SaveProfileButton;
