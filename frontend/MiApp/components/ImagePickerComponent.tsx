import React, { useEffect } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '@/styles/imagePickerStyle';
import { ImagePickerComponentProps } from '@/navigation/types';



const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ profileImage, setProfileImage, setError }) => {
  
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setError('Se necesita permiso para acceder a la galería de imágenes');
      }
    };
    getPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri }); // Actualiza el estado del perfil con la imagen
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.logoContainer}>
    {profileImage ? (
      <Image 
        source={{ uri: profileImage.uri }} 
        style={styles.profileImage} 
      />
    ) : (
      <Text style={styles.text}>Tap to select image</Text> 
    )}
  </TouchableOpacity>
  
  );
};

export default ImagePickerComponent;
