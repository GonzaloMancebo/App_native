import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window'); 

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const slideAnim = new Animated.Value(0); // Controla el desplazamiento
  const fadeAnim = new Animated.Value(1); // Controla la opacidad

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);

          // Esperar 2 segundos antes de la animación de salida
          setTimeout(() => {
            Animated.parallel([
              Animated.timing(slideAnim, {
                toValue: width, // Mueve la vista hacia la derecha
                duration: 800, // Más duración para suavidad
                easing: Easing.out(Easing.exp), // Movimiento más natural
                useNativeDriver: true,
              }),
              Animated.timing(fadeAnim, {
                toValue: 0, // Desvanece la pantalla
                duration: 800, // Más duración para suavidad
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
              }),
            ]).start(() => onFinish()); // Llama a onFinish después de la animación
          }, 2000); // Espera 2 segundos antes de desaparecer
          
          return 1;
        }
        return prev + 0.1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [slideAnim, fadeAnim, onFinish]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }], opacity: fadeAnim }]}>
      {/* Animación Lottie */}
      <LottieView
        source={require('@/assets/animation/Animation.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />

      {/* Barra de Carga */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  animation: {
    width: 300,
    height: 300,
  },
  progressBarContainer: {
    width: 200,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
});

export default SplashScreen;
