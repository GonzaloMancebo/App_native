import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 80 : 0,  // Ajuste para el padding en iOS
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    backgroundColor: "#f0f0f0", 
    borderRadius: 10, 
    padding: 10, 
    borderBottomColor: "#d9d9d9",
  },
  
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContainer: {
    flex: 1, // Ocupa el espacio restante para el texto
  },
  messageRow: {
    flexDirection: 'row', // Para colocar el mensaje y el tiempo en una fila
    justifyContent: 'space-between', // Espacio entre el último mensaje y el tiempo
    alignItems: 'center', // Alinear verticalmente el texto
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
    maxWidth: '80%', // Limitar el largo del mensaje
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#888',
  },
});

export { screenWidth, screenHeight };
