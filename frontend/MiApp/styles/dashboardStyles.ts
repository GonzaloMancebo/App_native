import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const dashboardStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: Platform.OS === 'ios' ? 80 : 0, // Usamos paddingTop en lugar de marginTop
      backgroundColor: '#fff',
    },
    logo: {
      width: "100%",
      height: 150,
      alignSelf: 'center',
      marginBottom: 20,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 10,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginBottom: 20,
      borderRadius: 8,
      width: '100%',
      paddingHorizontal: 5,
    },
    filterButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
      flex: 1,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    filterText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    userCard: {
      flexDirection: 'row',
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      marginBottom: 15, // Espacio entre cada tarjeta de usuario
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    // Cambiado para alinear los elementos de la tarjeta de usuario en columna
    userActions: {
      flexDirection: 'column',
      alignItems: 'center',  // Centra los botones debajo de la información
      justifyContent: 'center',
    },
    chatButton: {
      marginTop: 10,
      padding: 12,
      borderRadius: 5,
      backgroundColor: '#4CAF50',
      alignItems: 'center',
      width: '100%',  // Para que el botón ocupe todo el ancho disponible
    },
    chatButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  

export { screenWidth, screenHeight };  // ✅ Exporta estos valores numéricos aparte
