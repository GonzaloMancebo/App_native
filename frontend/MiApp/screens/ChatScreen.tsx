import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';  // Importamos Axios
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

type ChatScreenProps = {
  route: RouteProp<RootStackParamList, 'ChatScreen'>;
};

export default function ChatScreen({ route }: ChatScreenProps) {
  const { userId, userName, userImage } = route.params;
  
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([]);  // Cambié el tipo de estado a Message[]
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);  // Tipamos la referencia correctamente

  useEffect(() => {
    axios.get(`http://192.168.0.192:8000/api/chat/${userId}`)
      .then(response => {
        console.log('Mensajes cargados correctamente:', response.data);
        setMessages(response.data);  // Asumimos que la respuesta es un array de mensajes
      })
      .catch(error => {
        console.error('Error al cargar los mensajes:', error);
      });
  }, [userId]);  // Se ejecuta cuando se monta el componente o cuando cambia userId

  // Función para enviar un mensaje
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user_id: userId,  // El ID del usuario (recibido desde las props)
        message: message,
        sender: 'me',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),  // Formato para la base de datos
        id: ''  // Aún no tiene ID, se lo asignará Laravel
      };

      // Enviar el mensaje a Laravel
      axios.post('http://192.168.0.192:8000/api/chat', newMessage)
        .then(response => {
          console.log('Mensaje enviado correctamente:', response.data);

          // Usamos el ID que Laravel devuelve para el mensaje
          const savedMessage = { ...newMessage, id: response.data.id };
          
          setMessages(prevMessages => [savedMessage, ...prevMessages]);  // Actualizamos la lista de mensajes con el nuevo mensaje
          setMessage('');  // Limpiamos el campo de entrada
        })
        .catch(error => {
          console.error('Error al enviar el mensaje:', error);
        });
    }
  };
  
  // Función para manejar el cierre del teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
            onPress={() => navigation.navigate('DashboardChatScreen')}  
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
            keyExtractor={(item) => item.id}  // Usamos el id del mensaje como clave
            renderItem={({ item }) => (
              <View style={[chatStyles.messageContainer, item.sender === 'me' ? chatStyles.myMessage : chatStyles.otherMessage]}>
                <Text style={chatStyles.messageText}>{item.message}</Text>
                <Text style={chatStyles.timestamp}>{item.timestamp}</Text>
              </View>
            )}
            inverted
            contentContainerStyle={chatStyles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}  // Asegura el desplazamiento al final
          />
          
          {/* Campo de entrada y botón de enviar */}
          <View style={chatStyles.inputContainer}>
            <TextInput
              style={chatStyles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Escribe un mensaje..."
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
