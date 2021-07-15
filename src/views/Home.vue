<template>
    <div style="height: 100vh; width: 100vw;">
        <l-map
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[me.lat,me.lng]"
            @update:center="updateZoom"
            @click="addMarker">

            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></l-tile-layer>

            <l-control-layers />

            <l-marker v-for="(value, index) in events.data.list" :key="index" :lat-lng="[value.coordenadas.lat,value.coordenadas.lng]" @click="remMarker">
                <l-tooltip>
                    Descripción: {{ value.description }}
                    <br/>
                    Coordenadas:
                    <ul>
                        <li>
                            Latitud: {{ value.coordenadas.lat }}
                        </li>
                        <li>
                            Longitud: {{ value.coordenadas.lng }}
                        </li>
                    </ul>
                    Keywords
                    <ul>
                        <li v-for="(item, i) in value.keywords" :key="i" >
                            {{ item }}
                        </li>
                    </ul>
                </l-tooltip>
            </l-marker>

        </l-map>

        <button 
            type="button"
            class="btn btn-primary fixedButtonLeft rounded-circle m-3"
            @click="newKeyword({})"
        >
            <i class="far fa-keyboard"></i>
        </button>

        <div class="modal fade" id="modalKeyword" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Keyword</h5>
                        <button type="button" class="btn-close" v-on:click="modalClose" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3 row">
                            <label for="name" class="col-sm-3 col-form-label">Nombre</label>
                            <div class="col-sm-9">
                                <input type="text" name="name" class="form-control" v-model="keywordsNew">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="modalClose">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click="addKeyword">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <button 
            type="button"
            class="btn btn-primary fixedButton rounded-circle m-3"
            @click="newMarker({})"
        >
            <i class="fas fa-plus"></i>
        </button>

        <div class="modal fade" id="modalEvent" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Evento</h5>
                        <button type="button" class="btn-close" v-on:click="modalClose" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3 row">
                            <label for="description" class="col-sm-3 col-form-label">Descripción</label>
                            <div class="col-sm-9">
                                <input type="text" name="description" class="form-control" v-model="dataModal.description">
                            </div>
                        </div>
                        <div v-if="dataModal.coordenadas">
                            <label class="col-sm-3 col-form-label">Coordenadas</label>
                            
                            <div class="mb-3 row">
                                <label for="lat" class="col-sm-3 col-form-label">Latitud</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" v-model="dataModal.coordenadas.lat">
                                </div>
                            </div>
                            
                            <div class="mb-3 row">
                                <label for="lat" class="col-sm-3 col-form-label">Longitud</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" v-model="dataModal.coordenadas.lng">
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="lat" class="col-sm-3 col-form-label">Keywords</label>
                                <div class="col-sm-9">
                                    <select2 
                                        v-model="dataModal.keywords" 
                                        :options="keywords.data?.list" 
                                        :settings="{ 
                                            width: '100%' , 
                                            class : 'form-control' , 
                                            allowClear : true ,
                                            placeholder : 'Elija...',
                                            multiple: true,
                                        }" 
                                        class="form-control" 
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="modalClose">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click="addEvent">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <button 
            type="button"
            class="btn btn-primary fixedButtonLeftList rounded-circle m-3"
            @click="listKeywords({})"
        >
            <i class="fas fa-list-ul"></i>
        </button>

        <div class="modal fade" id="modalKeywords" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Keywords</h5>
                        <button type="button" class="btn-close" v-on:click="modalClose" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check" v-for="(item, i) in keywords.data.list" :key="i">
                            <input class="form-check-input" type="checkbox" :value="item.text" :id="item.text" name="keywords" v-model="keywordsFiltered">
                            <label class="form-check-label" :for="item.text">
                                {{ item.text }}
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="modalClose">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click="filterKeywords">Filtrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// importamos Vuex para el manejador de estados
import { mapState, mapActions } from "vuex";

// importamos los paquetes necesarios de la libreria "leaflet" para Vue
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

// importamos "select2" para un select mejor presencial
import Select2 from 'vue3-select2-component';

// importamos Modal de Bootstrap para manejar un filtrado
import { Modal } from 'bootstrap';

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LControlLayers,
        LTooltip,
        'select2': Select2,
    },
    data() {
        return {
            // este objeto es un valor estandar para centrar el mapa
            me: {
                lat: 10.148944,
                lng: -68.563356,
            },
            // si llegasemos a obtener algun error de la funcion "findMe"
            meError: '',
            // seteamos un valor default para el zoom
            zoom: 5,
            // creamos un objeto base para el formulario de un nuevo registro
            dataModal: {
                title: 'Evento',
                description: '',
                active: false,
                keywords: '',
                coordenadas: {
                    lat: null,
                    lng: null,
                },
            },
            modal: null,
            keywordsNew: '',
            // array para tener los keywords filtrados
            keywordsFiltered: [],
        };
    },
    computed: {
        // obtenemos los estados "events" y "keywords" para trabajarlos en la vista
        ...mapState([
            'events',
            'keywords',
        ]),
    },
    sockets: {
        // aca podemos evaluar en la vista si conectamos con el socket en el backend
        connect: function () {
            console.log('socket connected')
        },
    },
    methods: {
        // llamamos todas las acciones necesarias (funciones en Vuex)
        ...mapActions([
            'fetchEvents', // para obtener todos los eventos
            'fetchKeywords', // para obtener todos los keywords
            'saveEvent', // para guardar un evento
            'saveKeyword', // para guardar un keyword
        ]),
        // para abrir un modal con las coordenadas limpias 
        newMarker(){
            // 
            this.dataModal.coordenadas = { lat: null, lng: null };
            this.modalOpen()
        },
        newKeyword(){
            this.modalOpenKeyword()
        },
        // para abrir el modal para un nuevo Keyword
        modalOpenKeyword(){
            if(this.modal) this.modal.hide()
            // instanciamos Modal de Bootstrap
            this.modal = new Modal(document.getElementById('modalKeyword'), {
                keyboard: false
            })
            // ejecutamos "show" para mostrar el modal
            this.modal.show();
        },
        modalCloseKeyword(){
            // limpiamos el formulario y cerramos el modal
            this.keywordsNew = '';
            this.modal.hide();
        },
        
        // para abrir un modal con las coordenadas seteadas (en el lugar en el que fue dado clic en el mapa)
        addMarker(event) {
            if(event.latlng){
                const { lat, lng } = event.latlng;
                this.dataModal.coordenadas = { lat, lng };
                this.modalOpen()
            }
        },

        // funcion para mas adelante, la cual puede servir para remover o interactuar con un evento
        remMarker(event) {
            console.log('event',event)
        },
        
        // modal para mostrar la lista de los keywords
        listKeywords(){
            if(this.modal) this.modal.hide()
            this.modal = new Modal(document.getElementById('modalKeywords'), {
                keyboard: false
            })
            this.modal.show();
        },
        // para mostrar un modal para eventos
        modalOpen(){
            if(this.modal) this.modal.hide()
            this.modal = new Modal(document.getElementById('modalEvent'), {
                keyboard: false
            })
            this.modal.show();
        },
        // para limpiar el form de eventos y cerrar el modal
        modalClose(){
            this.dataModal = {
                description: '',
                keywords: '',
                coordenadas: {
                    lat: null,
                    lng: null,
                },
            },
            this.modal.hide();
        },

        // para agregar un keyword y enviarlo al endpoint
        addKeyword(){
            this.saveKeyword({text:this.keywordsNew})
            // this.$socket.emit('addKeyword',{text:this.keywordsNew})
            this.modalCloseKeyword()
        },

        // para agregar un evento y enviarlo al endpoint
        addEvent(){
            this.saveEvent({...this.dataModal})
            this.modalClose()
        },

        // para filtrar keywords
        filterKeywords(){
            // se indica una lista de keywords a las cuales se quiere filtrar 
            this.$socket.client.emit('room', {keywords:this.keywordsFiltered});

            // luego se obtiene del endpoint la lista de eventos a partir de los keywords filtrados
            this.fetchEvents({keywords:this.keywordsFiltered});
            this.modalClose()
        },
        // para obtener la ubicacion actual
        geoFindMe(){
            if (!navigator.geolocation){
                this.meError = "Geolocation is not supported by your browser";
            }
            navigator.geolocation.getCurrentPosition((position) => {
                this.me = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                this.meError = null;
            }, () => {
                this.me = null
                this.meError = "Unable to retrieve your location";
            });
        },
        // para actualizar el zoom del mapa
        updateZoom(){
            this.zoom = 15;
        },
    },
    // esto se carga al iniciar el componente
    created(){

        // se ejecuta para llamar todos los keywords del backend
        this.fetchKeywords();

        const urlParams = new URLSearchParams(window.location.search);
        
        // verificamos si indico keywords por los parametros de la url
        const keywords = urlParams.get('keywords');
        if(keywords){
            // de ser asi se setean para mostrarlos en la vista
            const keywordsToFilter = [];
            const arr = keywords.split(",");
            if(arr?.length>0){
                for (const e of arr) {
                    keywordsToFilter.push(e)
                }
            }
            // se setean tambien en la data del componente
            this.keywordsFiltered = keywordsToFilter;
        }

        // se obtiene la lista de eventos
        this.fetchEvents({keywords:this.keywordsFiltered});

        // se ejecuta findMe, solo servira si se autoriza que la pagina tenga dicho permiso
        this.geoFindMe()
    },
};
</script>

<style>
    /* estilos para mover los botones a donde se quiere */
    .fixedButtonLeft{
        position: fixed;
        bottom: 0px;
        left: 0px; 
        z-index: 999;
    }
    .fixedButtonLeftList{
        position: fixed;
        bottom: 50px;
        left: 0px; 
        z-index: 999;
    }
    .fixedButton{
        position: fixed;
        bottom: 0px;
        right: 0px; 
        z-index: 999;
    }

    /* un pequeño fix para el select2 */
    .select2-container--open .select2-dropdown--below {
        z-index: 9999;
    }
</style>