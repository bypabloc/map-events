

import { io } from 'socket.io-client';
import { baseURL } from './settings'

export default io(baseURL);