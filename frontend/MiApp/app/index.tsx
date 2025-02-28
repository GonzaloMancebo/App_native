import React from 'react';
import Navigation from '../navigation/Navigation';  
import { StatusBar, View } from 'react-native';  

export default function App() {
  return (
    <View style={{ flex: 1 }}>  
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </View>
  );
}
