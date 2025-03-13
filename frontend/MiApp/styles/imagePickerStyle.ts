import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
    width: 120,
    height: 120,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    alignContent: 'center',
    justifyContent: 'center',
  }
});

export default styles;
