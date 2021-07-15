
// importamos socket.io-client para conectar con el endpoint
import { io } from 'socket.io-client';
import { baseURL } from './settings'

// instanciamos a partir de la URL base (endpoint)
export default io(baseURL);