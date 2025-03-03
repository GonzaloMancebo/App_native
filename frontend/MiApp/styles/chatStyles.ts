import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export  const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : 0, 
        backgroundColor: '#fff',
    },
    chatContainer: {
      flex: 1,
      padding: 16,
    },
    backButton: {
      padding: 10,
      position: 'absolute',
      top: 10,
      left: 5,
      zIndex: 1,
    },
    backButtonText: {
      fontSize: 30,
      color: '#0078FF',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      justifyContent: 'center',
    },
    userImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    messageContainer: {
      maxWidth: '80%',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      position: 'relative',
    },
    myMessage: {
      backgroundColor: '#0078FF',
      alignSelf: 'flex-start',
      marginRight: 10,
    },
    otherMessage: {
      backgroundColor: '#e0e0e0',
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    messageText: {
      color: 'white',
    },
    timestamp: {
      color: 'black',
      fontSize: 10,
      position: 'absolute',
      bottom: 5,
      left: "115%",
    },
    messageList: {
      paddingBottom: 50, // Para dejar espacio para el campo de entrada
    },
    inputContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    input: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingLeft: 10,
    },
    sendButton: {
      backgroundColor: '#0078FF',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
      marginLeft: 10,
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    
  });
  export { screenWidth, screenHeight };  
