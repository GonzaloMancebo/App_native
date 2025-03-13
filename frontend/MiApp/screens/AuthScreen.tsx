import React, { useState } from 'react';
import { View } from 'react-native';
import AuthForm from '@/components/AuthForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types'; 

// Definir el tipo de navegación de esta pantalla
type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthScreen'>;

interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');

  const toggleAuthType = () => {
    setAuthType((prevType) => {
      const newType = prevType === 'login' ? 'register' : 'login';
      console.log('Toggling authType to:', newType);  // Console log added here
      return newType;
    });
  };

  console.log('Current authType in AuthScreen:', authType);  // Console log added here

  return (
    <View style={{ flex: 1 }}>
      <AuthForm
        type={authType}
        setError={setError}
        navigation={navigation}
        toggleAuthType={toggleAuthType}
      />
    </View>
  );
};

export default AuthScreen;
