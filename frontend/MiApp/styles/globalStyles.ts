import { StyleSheet, Dimensions, Platform } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Definir los estilos globales
const globalStyles = StyleSheet.create({
  // Estilos comunes
  

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
 
  // Puedes agregar más pantallas específicas aquí...
});

export default globalStyles;
