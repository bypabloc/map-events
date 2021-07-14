

import { io } from 'socket.io-client';

export default io('https://map-events-api.herokuapp.com');
// export default io('http://localhost:3000');
/*
import VueSocketIO from '../packages/vue-socket.io/dist/vue-socketio'
import io from 'socket.io-client';
import store from '../store'

export default new VueSocketIO({
    debug: true,
    connection: io('http://localhost:3000'),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
});

*/
