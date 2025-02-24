import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.192:8000/test');  // La URL de tu backend Laravel
      setMessage(response.data.message); // Accede a 'message' dentro de la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message ? message : 'Cargando...'}</Text>
      <Button title="Refrescar" onPress={fetchData} />
    </View>
  );
};

export default App;
