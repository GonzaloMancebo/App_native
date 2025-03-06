import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '@/styles/profileStyles';
import * as ImagePicker from 'expo-image-picker'; 

export default function ProfileDashboard({ navigation }) {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Cargar los datos del usuario desde la API si es necesario
    }, []);

    const handleUpdateProfile = async () => {
        setLoading(true);

        const token = await AsyncStorage.getItem('token');
        const formData = new FormData();
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('position', position);

        // Si se seleccionó una imagen, agregarla al formData
        if (profileImage) {
            const imageUri = profileImage.uri;
            const localUri = imageUri.split('?')[0];
            const filename = localUri.split('/').pop();
            const fileType = filename.split('.').pop();

            formData.append('profile_image', {
                uri: localUri,
                type: `image/${fileType}`,
                name: filename,
            });
        }

        try {
            const response = await axios.post(
                'http://192.168.0.192:8000/api/update-profile',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLoading(false);
            navigation.goBack(); // Regresar después de actualizar el perfil
        } catch (error) {
            setLoading(false);
            setError('Error updating profile');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileImage(result);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="Position"
                value={position}
                onChangeText={setPosition}
            />
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Select Profile Image</Text>
            </TouchableOpacity>
            {profileImage && <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />}
            {error && <Text style={styles.error}>{error}</Text>}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
