// screens/DashboardScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '@/styles/globalStyles'; // Importa los estilos globales

export default function DashboardScreen() {
  return (
    // Usando los estilos globales para contenedor y texto
    <View style={[globalStyles.container, globalStyles.dashboardScreen.container]}>
      <Text style={[globalStyles.text, globalStyles.dashboardScreen.text]}>
        Bienvenido al Dashboard
      </Text>
    </View>
  );
}
