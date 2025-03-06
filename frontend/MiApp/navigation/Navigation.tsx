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
import RegisterScreen from '@/screens/RegisterScreen';
import LoginScreen from '@/screens/LoginScreen';
import ProfileDashboard from '@/screens/ProfileDashboard';
import { RootStackParamList } from '@/navigation/types';  // Asegúrate de importar correctamente

// Crea los tipos de navegación basados en RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

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

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardTabs} /> 
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileDashboard" component={ProfileDashboard} />
    </Stack.Navigator>
  );
}
