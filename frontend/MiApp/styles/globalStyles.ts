// globalStyles.ts
import { StyleSheet, Dimensions, Platform } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Definir los estilos globales
const globalStyles = StyleSheet.create({
  // Estilos comunes
  container: {
    flex: 1,
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  safeAreaView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },

  // Estilo que usa las dimensiones de la pantalla de forma dinámica
  screenWidth: width,  // Esto puede cambiar dinámicamente si el dispositivo rota
  screenHeight: height, // Lo mismo para el alto

  // Estilos específicos para cada pantalla
  homeScreen: {
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: '#555',
    },
    button: {
      backgroundColor: '#28a745',
    },
  },
  dashboardScreen: {
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      color: '#000',
    },
  },
  // Puedes agregar más pantallas específicas aquí...
});

export default globalStyles;
