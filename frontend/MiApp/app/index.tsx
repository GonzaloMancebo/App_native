import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import SplashScreen from '@/screens/SplashScreen';
import Navigation from '@/navigation/Navigation';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Navigation/>
    </View>
  );
}
