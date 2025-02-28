import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { dashboardStyles, screenWidth, screenHeight } from '@/styles/dashboardStyles';
import { useNavigation } from '@react-navigation/native';

// Simulación de usuarios
const users = [
  { id: '1', name: 'Juan', age: 25, position: 'Delantero', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Maria', age: 22, position: 'Defensa', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Carlos', age: 28, position: 'Mediocampista', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Laura', age: 24, position: 'Delantero', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '5', name: 'Pedro', age: 27, position: 'Defensa', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: '6', name: 'Sofía', age: 23, position: 'Mediocampista', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: '7', name: 'Luis', age: 26, position: 'Delantero', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { id: '8', name: 'Ana', age: 29, position: 'Defensa', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: '9', name: 'Diego', age: 25, position: 'Mediocampista', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { id: '10', name: 'Valentina', age: 24, position: 'Delantero', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: '11', name: 'Ricardo', age: 27, position: 'Defensa', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: '12', name: 'Camila', age: 23, position: 'Mediocampista', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '13', name: 'Javier', age: 26, position: 'Delantero', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/13.jpg' },
  { id: '14', name: 'Catalina', age: 29, position: 'Defensa', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { id: '15', name: 'Roberto', age: 25, position: 'Mediocampista', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { id: '16', name: 'Elena', age: 24, position: 'Delantero', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { id: '17', name: 'Fernando', age: 27, position: 'Defensa', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/17.jpg' },
  { id: '18', name: 'Isabella', age: 23, position: 'Mediocampista', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/18.jpg' },
  { id: '19', name: 'Gonzalo', age: 26, position: 'Delantero', available: true, gender: 'male', image: 'https://randomuser.me/api/portraits/men/19.jpg' },
  { id: '20', name: 'Valeria', age: 29, position: 'Defensa', available: false, gender: 'female', image: 'https://randomuser.me/api/portraits/women/20.jpg' },
];

export default function DashboardScreen() {

  const [genderFilter, setGenderFilter] = useState('all');
  const navigation = useNavigation();

  // Filtrar los usuarios según el filtro de género
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
        // Condicional para aplicar color si el filtro está activo
        genderFilter === (filter === 'Hombre' ? 'male' : filter === 'Mujer' ? 'female' : 'all') && {
          backgroundColor: '#66b3ff',  // Color de fondo cuando está seleccionado
        }
      ]}
      onPress={() => {
        // Establecer el filtro al género seleccionado
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
        keyExtractor={(item) => item.id}
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
            {/* Colocamos el botón de chat en una columna */}
            <View style={dashboardStyles.userActions}>
              {item.available && (
           <TouchableOpacity
           style={dashboardStyles.chatButton}
           onPress={() => {
             // Navegamos a la pantalla de chat con el id y nombre del usuario
             navigation.navigate('Chat', { userId: item.id, userName: item.name });
           }}
         >
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