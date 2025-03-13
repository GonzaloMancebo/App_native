import { StyleSheet, Dimensions } from 'react-native';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#fff',
    paddingTop: height * 0.09, // Agrega espacio en la parte superior
    maxHeight: height * 0.95, // Evita que se expanda más allá del 95% de la pantalla
    overflow: 'hidden', // Asegura que los elementos no salgan del contenedor
  },
  
  profileImageContainer: {
    height: height * 0.21,
    width: width * 0.40,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06, 
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
  },
  subtitle: {
    flexDirection: 'row',
    justifyContent: 'center',  
    alignItems: 'center',  
    height: height * 0.06,
    marginTop: height * 0.02,
  },
  subtitleText: {
    fontSize: width * 0.045,
    color: '#666',
    textAlign: 'center', 
    marginRight: height * 0.12,
    
  },
  
  label: {
    fontSize: width * 0.045,
    color: '#333',
    marginBottom: height * 0.010,
    fontWeight: 'bold',
  },
  input: {
    width: width * 0.8, 
    height: height * 0.06,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: height * 0.015,
    paddingLeft: 10,
    fontSize: width * 0.045,
    color: '#333',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.4,
    height: height * 0.047,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginLeft: height * 0.1,
    marginBottom: height * 0.0025,

  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },


  choiceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.010,
  },
  choiceButton: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: height * 0.015,
    paddingVertical: height * 0.01,
  },
  selectedChoiceButton: {
    backgroundColor: '#007BFF',
  },
  choiceText: {
    fontSize: width * 0.04,
    color: '#333',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    height: height * 0.06,
    width: width * 0.3,
  },
  statusText: {
    fontSize: width * 0.04,
    color: '#333',
    marginLeft: 10,
  },
  editButton: {
    width: width * 0.25, // El botón ocupa el 20% del ancho
    height: height * 0.06, // Puede ser ajustado al 7% de la altura
    backgroundColor: '#007BFF', // Color de fondo
    justifyContent: 'center',
    flexDirection: 'row',
    gap:10,
    alignItems: 'center',
    borderRadius: 25, 
    marginTop: height * 0.25,
    position: 'absolute', // Coloca el ícono flotando
    marginLeft: height * 0.26, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  editButtonText: {
    color: 'white',
    fontSize: width * 0.040,
    fontWeight: 'bold',
  },
});

export default styles;
