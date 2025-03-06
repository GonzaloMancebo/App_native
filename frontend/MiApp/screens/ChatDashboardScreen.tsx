import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { styles } from '@/styles/dashboardChatStyle';

interface MergedUser {
  user_id: number;
  user_name: string;
  user_image: string;
  last_message: string;
  timestamp: string;
  last_message_time: string;
}

export default function ChatDashboardScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState<MergedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado para indicador de carga

  const fetchChats = useCallback(async () => {
    try {
      const response = await axios.get<MergedUser[]>('http://192.168.0.192:8000/api/chat/users');
      console.log('Respuesta de la API:', response);  // Agregar log detallado de la respuesta
  
      if (!response.data || response.data.length === 0) {
        console.log("No hay conversaciones disponibles.");
        setUsers([]);
        return;
      }
  
      // Verificar que los campos existen y están correctos
      const formattedUsers = response.data.map(user => ({
        user_id: user.user_id ?? 0, // Asegúrate de usar 'user_id' correctamente
        user_name: user.user_name || 'Usuario Desconocido',
        user_image: user.user_image || 'https://example.com/default-profile.jpg',
        last_message: user.last_message || 'No hay mensajes',
        timestamp: user.timestamp || '',
        last_message_time: user.timestamp ? moment(user.timestamp).fromNow() : 'Sin fecha',
      }));
  
      console.log('Usuarios formateados:', formattedUsers); // Ver los usuarios formateados
  
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error al obtener conversaciones:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch chats al cargar el componente
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleChatPress = (userId: number, userName: string, userImage: string) => {
    if (!userId) {
      console.warn('Intentando abrir un chat sin un ID válido');
      return;
    }
    navigation.navigate('ChatScreen', { userId, userName, userImage });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversaciones</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : users.length === 0 ? (
        <Text style={styles.noChatsText}>No hay conversaciones disponibles.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress(item.user_id, item.user_name, item.user_image)}>
              <View style={styles.userItem}>
                <Image source={{ uri: item.user_image }} style={styles.userImage} />
                <View style={styles.messageContainer}>
                  <Text style={styles.userName}>{item.user_name}</Text>
                  <View style={styles.messageRow}>
                    <Text style={styles.lastMessage}>{item.last_message}</Text>
                    <Text style={styles.lastMessageTime}>{item.last_message_time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
