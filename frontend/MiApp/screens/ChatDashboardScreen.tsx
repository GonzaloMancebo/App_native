import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '@/styles/dashboardChatStyle';

// Definir el tipo de usuario correctamente
interface User {
  user_id: string;
  user_name: string;
  user_image: string;
}

export default function ChatDashboardScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const currentUserId = 1;  // Simulación del usuario actual, esto debería venir de la sesión

  useEffect(() => {
    axios.get(`http://192.168.0.192:8000/api/chat/${currentUserId}`)
      .then(response => {
        console.log('Usuarios recibidos:', response.data);  // Verificar la respuesta de la API
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener conversaciones:', error);
      });
  }, [currentUserId]);

  const handleChatPress = (userId: string, userName: string, userImage: string) => {
    navigation.navigate('ChatScreen', { userId, userName, userImage });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversaciones</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatPress(item.user_id, item.user_name, item.user_image)}>
            <View style={styles.userItem}>
              <Image source={{ uri: item.user_image }} style={styles.userImage} />
              <Text style={styles.userName}>{item.user_name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
