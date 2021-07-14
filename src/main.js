import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import socketio from './endpoint/socket'
import VueSocketIOExt from 'vue-socket.io-extended';
// import router from './router'
// import VueSocketIO from 'vue-socket.io'

// export const SocketInstance = socketio('http://localhost:3000');

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import '/node_modules/@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

document.title = "Map Events";

app.mixin({  
    methods: {
        swalFire({
            title='',
            text='',
            type=1,
            toExec=()=>{},
        }) {
            let icon = '';
            switch (type) {
                case 1:
                    icon = 'info';
                    title = '<strong>Información</strong>';
                    break;
        
                case 2:
                    icon = 'warning';
                    title = '<strong>Advertencia</strong>';
                    break;
        
                case 3:
                    icon = 'error';
                    title = '<strong>Error</strong>';
                    break;
        
                case 4:
                    icon = 'success';
                    break;
            
                default:
                    icon = 'info';
                    title = '<strong>Información</strong>';
                    break;
            }
            this.$swal.fire({
                title,
                icon,
                html: text,
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                willClose: () => {
                    toExec()
                },
            })
        },
        toast({title='',text='',type=1,timer=3000}) {
            let icon = '';
            switch (type) {
                case 1:
                    icon = 'success';
                    break;
            
                case 2:
                    icon = 'warning';
                    break;
            
                case 3:
                    icon = 'danger';
                    break;
        
                default:
                    icon = 'success';
                    break;
            }

            this.$swal({
                toast: true,
                icon,
                title,
                text,
                position: 'bottom-end',
                showConfirmButton: false,
                timer,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            });
        },
    },
})
app.use(VueSweetalert2);
app.use(store)
app.use(VueSocketIOExt, socketio, { store });
app.mount('#app')
