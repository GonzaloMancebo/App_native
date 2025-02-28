import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Para navegación
import moment from 'moment'; // Para manejar la hora y la fecha

export default function ChatScreen({ route }) {
  const { userId, userName } = route.params; // Obtienes los parámetros enviados desde DashboardScreen
  
  const navigation = useNavigation(); // Para navegar hacia atrás
  
  // Estado para manejar los mensajes
  const [messages, setMessages] = useState([]);
  
  // Estado para el texto de entrada
  const [message, setMessage] = useState('');
  
  // Ref para el FlatList para poder hacer scroll al final
  const flatListRef = useRef();
  
  // Función para enviar un mensaje
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: message,
        sender: 'me',
        timestamp: moment().format('hh:mm A'), // Agrega la hora
        date: moment().format('YYYY-MM-DD'), // Agrega la fecha
      };
      
      setMessages(prevMessages => [newMessage, ...prevMessages]); // Agrega el nuevo mensaje al inicio
      setMessage('');
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // Desplaza el scroll al final
    }
  };
  
  // Función para manejar el cierre del teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.chatContainer}>
          {/* Botón de regreso */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          {/* Nombre del usuario */}
          <Text style={styles.header}>Chat con {userName}</Text>

          {/* Lista de mensajes */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            )}
            inverted // Los mensajes más recientes estarán abajo
            contentContainerStyle={styles.messageList}
          />
          
          {/* Campo de entrada y botón de enviar */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Escribe un mensaje..."
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 30,
    color: '#0078FF',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
