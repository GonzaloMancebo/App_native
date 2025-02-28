import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/components/HomeScreen';  // Ajusta las rutas de acuerdo a tu estructura
import MapScreen from '@/screens/MapScreen';   // Ajusta las rutas de acuerdo a tu estructura
import ProfileScreen from '@/screens/ProfileScreen'; // Perfil
import FavoritesScreen from '@/screens/FavoritesScreen'; // Favoritos
import DashboardScreen from '@/screens/DashboardScreen';  // Asegúrate de importar DashboardScreen

// Importa los iconos desde react-native-vector-icons
import { Ionicons } from 'react-native-vector-icons';  // Puedes usar diferentes familias de iconos como Ionicons, FontAwesome, etc.

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Esta pantalla se reemplaza con el DashboardTabs si se cumple la lógica en HomeScreen */}
      <Stack.Screen name="Dashboard" component={DashboardTabs} />
    </Stack.Navigator>
  );
}
