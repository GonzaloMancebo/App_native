import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/components/HomeScreen';
import MapScreen from '@/screens/MapScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import FavoritesScreen from '@/screens/FavoritesScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import Icon from '@expo/vector-icons/MaterialIcons';
import ChatDashboardScreen from '@/screens/ChatDashboardScreen';
import ChatScreen from '@/screens/ChatScreen';
import AuthScreen from '@/screens/AuthScreen'; // Importamos AuthScreen
import { RootStackParamList } from '@/navigation/types'; 

const Stack = createStackNavigator<RootStackParamList>(); 
const Tab = createBottomTabNavigator();

// TabNavigator para las pantallas principales
function DashboardTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="favorite" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator para las pantallas de Stack, como el Chat y Perfil
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardTabs" component={DashboardTabs} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Ruta inicial, primero pasa por AuthScreen */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      {/* Las pantallas principales, solo se muestran después de iniciar sesión */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardStack} />
    </Stack.Navigator>
  );
}
