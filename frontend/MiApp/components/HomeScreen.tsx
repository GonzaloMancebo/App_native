import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(true); // Controla la carga de permisos
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Mensaje de error

  // Función para solicitar el permiso de ubicación
  const requestLocationPermission = async () => {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permiso de ubicación denegado');
      setIsLoading(false);
      Alert.alert('Permiso Denegado', 'No podemos mostrar la ubicación sin permisos.');
      
      // Guardamos que el permiso fue denegado
      await AsyncStorage.setItem('locationPermission', 'denied');
      
      // Después de que el permiso sea denegado, navega al Dashboard
      navigation.replace('Dashboard'); // Usamos replace para evitar apilar pantallas
      return;
    }

    // Guardamos que el permiso fue concedido
    await AsyncStorage.setItem('locationPermission', 'granted');

    let currentLocation = await Location.getCurrentPositionAsync({});
    setIsLoading(false);

    // Navegar al Dashboard después de obtener la ubicación
    navigation.replace('Dashboard', { location: currentLocation.coords }); // Usamos replace aquí también
  };

  // Función para verificar el estado del permiso almacenado
  const checkLocationPermission = async () => {
    const permissionStatus = await AsyncStorage.getItem('locationPermission');

    if (permissionStatus === 'granted') {
      // Si el permiso ya fue concedido, obtenemos la ubicación y navegamos al Dashboard
      let currentLocation = await Location.getCurrentPositionAsync({});
      setIsLoading(false);

      // Navegamos al Dashboard
      navigation.replace('Dashboard', { location: currentLocation.coords });
    } else if (permissionStatus === 'denied') {
      setErrorMsg('Permiso de ubicación denegado');
      setIsLoading(false);
      Alert.alert('Permiso Denegado', 'No podemos mostrar la ubicación sin permisos.');
      
      // Si el permiso fue denegado previamente, también redirigimos al Dashboard
      navigation.replace('Dashboard');
    } else {
      // Si no se ha guardado nada, solicitamos el permiso
      requestLocationPermission();
    }
  };

  // Solo se verifica el permiso al cargar la pantalla, lo haremos al montarse el componente
  useEffect(() => {
    checkLocationPermission(); // Verificamos los permisos inmediatamente
  }, []);  // Este efecto solo se ejecuta una vez al montar el componente

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>{errorMsg || 'Accede a tu ubicación'}</Text>
          <Button title="Solicitar Permiso" onPress={requestLocationPermission} />
        </>
      )}
    </View>
  );
}
