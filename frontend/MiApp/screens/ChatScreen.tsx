import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import axios from 'axios';
import { chatStyles } from '@/styles/chatStyles';
import { RootStackParamList } from '@/navigation/types';

// Definimos la interfaz para el tipo de mensaje
interface Message {
  user_id: string;
  message: string;
  sender: string;
  timestamp: string;
  id: string;
}

// Tipamos las props para el componente ChatScreen
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

type ChatScreenProps = {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { userId, userName, userImage } = route.params;
  
  const [messages, setMessages] = useState<Message[]>([]);  // Cambié el tipo de estado a Message[]
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);  // Tipamos la referencia correctamente

  useEffect(() => {
    axios.get(`http://192.168.0.192:8000/api/chat/${userId}`)
      .then(response => {
        console.log('Mensajes cargados correctamente:', response.data);

        // Ordenamos los mensajes por timestamp antes de setear el estado
        const sortedMessages = response.data.sort((a: Message, b: Message) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });

        setMessages(sortedMessages);  // Asumimos que la respuesta es un array de mensajes
      })
      .catch(error => {
        console.error('Error al cargar los mensajes:', error);
      });
  }, [userId]);  // Se ejecuta cuando se monta el componente o cuando cambia userId

  // Función para enviar un mensaje
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user_id: userId,  
        message: message,
        sender: 'me',  // Suponemos que 'me' es el identificador del usuario
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
      };
  
      axios.post('http://192.168.0.192:8000/api/chat', newMessage, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        console.log('Mensaje enviado correctamente:', response.data);
  
        // Agregar el mensaje con el ID devuelto por Laravel
        setMessages(prevMessages => [...prevMessages, { ...newMessage, id: String(response.data.id) }]);
        setMessage('');  // Limpiamos el campo de texto
      })
      .catch(error => {
        console.error('Error al enviar el mensaje:', error.response?.data || error.message);
      });
    }
  };
  
  // Función para manejar el cierre del teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    // Desplazar automáticamente hacia el final después de que los mensajes cambien
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]); // Se ejecuta cada vez que la lista de mensajes cambie

  return (
    <KeyboardAvoidingView
      style={chatStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}  // Ajuste del comportamiento para iOS
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={chatStyles.chatContainer}>
          
          {/* Botón de regreso */}
          <TouchableOpacity
            style={chatStyles.backButton}
            onPress={() => navigation.goBack()}  
          >
            <Text style={chatStyles.backButtonText}>←</Text>
          </TouchableOpacity>

          {/* Header: Imagen y nombre del usuario */}
          <View style={chatStyles.headerContainer}>
            <Image source={{ uri: userImage }} style={chatStyles.userImage} />
            <Text style={chatStyles.header}>Chat con {userName}</Text>
          </View>

          {/* Lista de mensajes */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => String(item.id)}  // Asegúrate de convertir el id a string
            renderItem={({ item }) => (
              <View style={[chatStyles.messageContainer, item.sender === 'me' ? chatStyles.myMessage : chatStyles.otherMessage]}>
                <Text style={chatStyles.messageText}>{item.message}</Text>
                <Text style={chatStyles.timestamp}>
                  {moment(item.timestamp).calendar()}  {/* Usamos calendar() para formato de calendario */}
                </Text>
              </View>
            )}
            contentContainerStyle={chatStyles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}  // Desplazarse hacia abajo al final
          />
          
          {/* Campo de entrada y botón de enviar */}
          <View style={chatStyles.inputContainer}>
            <TextInput
              style={chatStyles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="gray"
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={sendMessage} style={chatStyles.sendButton}>
              <Text style={chatStyles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ChatScreen;
