import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { dashboardStyles, screenWidth, screenHeight } from '@/styles/dashboardStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Definir la interfaz User
interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  image: string;
  position: string;
  available: boolean;
}

export default function DashboardScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [genderFilter, setGenderFilter] = useState('all');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.0.192:8000/api/users');

        // Verifica si la respuesta es un array
        if (Array.isArray(response.data)) {
          // Ordenamos los usuarios por disponibilidad (primero disponibles)
          const sortedUsers = response.data.sort((a: User, b: User) => {
            if (a.available === b.available) return 0;
            return a.available ? -1 : 1; // Los disponibles van primero
          });
          setUsers(sortedUsers); // Asigna los usuarios ordenados al estado
        } else {
          console.error('La respuesta de la API no es un array:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    if (genderFilter === 'all') return true;
    return user.gender === genderFilter;
  });

  return (
    <View style={[dashboardStyles.container, { width: screenWidth, height: screenHeight }]}>
      <Image source={require('../assets/images/icon.png')} style={dashboardStyles.logo} />
      <Text style={dashboardStyles.text}>Bienvenido al Dashboard</Text>

      {/* Filtros de búsqueda */}
      <View style={dashboardStyles.filterContainer}>
        {['Hombre', 'Mujer', 'Ambos'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              dashboardStyles.filterButton,
              genderFilter === (filter === 'Hombre' ? 'male' : filter === 'Mujer' ? 'female' : 'all') && {
                backgroundColor: '#66b3ff', // Color de fondo cuando está seleccionado
              }
            ]}
            onPress={() => {
              if (filter === 'Hombre') {
                setGenderFilter('male');
              } else if (filter === 'Mujer') {
                setGenderFilter('female');
              } else {
                setGenderFilter('all'); // Para 'Ambos'
              }
            }}
          >
            <Text style={dashboardStyles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Usuarios */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={dashboardStyles.userCard}>
            <Image source={{ uri: item.image }} style={dashboardStyles.userImage} />
            <View style={dashboardStyles.userInfo}>
              <Text style={dashboardStyles.userName}>{item.name}</Text>
              <Text>Edad: {item.age}</Text>
              <Text>Posición: {item.position}</Text>
              <Text style={{ color: item.available ? 'green' : 'red' }}>
                {item.available ? 'Disponible' : 'No disponible'}
              </Text>
            </View>
            <View style={dashboardStyles.userActions}>
              {item.available && (
                <TouchableOpacity style={dashboardStyles.chatButton}>
                  <Text style={dashboardStyles.chatButtonText}>Chatear</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}
