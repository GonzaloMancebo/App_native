// authFormStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const authFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.08,  // Tamaño grande para el título
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: width * 0.05,
    color: '#333',
    textAlign: 'center'
  },
  button: {
    width: 90,
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: width * 0.04,
    marginBottom: 15,
    textAlign: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontSize: width * 0.04,
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default authFormStyles;
