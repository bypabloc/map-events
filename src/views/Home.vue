<template>
    <div style="height: 100vh; width: 100vw;">
        <l-map
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[me.lat,me.lng]"
            @update:center="updateZoom"
            @click="addMarker"
        >

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

<!-- <script src="http://localhost:3000/socket.io/socket.io.js"></script> -->

<script>
import { mapState, mapActions } from "vuex";

import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import Select2 from 'vue3-select2-component';

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
            me: {
                lat: 10.148944,
                lng: -68.563356,
            },
            meError: '',
            zoom: 5,
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
            keywordsFiltered: [],
        };
    },
    computed: {
        ...mapState([
            'events',
            'keywords',
        ]),
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        keywords({ keywords }) {
            console.log('{ keywords }',{ keywords })
            // this.keywordsFiltered = keywords;
        },
    },
    watch: {
        connect: function () {
        },
        /*
        ['keywords.data.list'] ( newValue, oldValue ) {
            if((newValue?.length>0)&&(!oldValue)){
                const keys = newValue.map(x=>x.text)
                this.$socket.client.emit('room', {keywords:keys});
            }
        },
        */
    },
    methods: {
        ...mapActions([
            'fetchEvents',
            'fetchKeywords',
            'saveEvent',
            'saveKeyword',
            'setKeywordsFiltered',
        ]),
        newMarker(){
            this.dataModal.coordenadas = { lat: null, lng: null };
            this.modalOpen()
        },
        newKeyword(){
            this.modalOpenKeyword()
        },
        modalOpenKeyword(){
            if(this.modal) this.modal.hide()
            this.modal = new Modal(document.getElementById('modalKeyword'), {
                keyboard: false
            })
            this.modal.show();
        },
        modalCloseKeyword(){
            this.keywordsNew = '';
            this.modal.hide();
        },
        
        addMarker(event) {
            if(event.latlng){
                const { lat, lng } = event.latlng;
                this.dataModal.coordenadas = { lat, lng };
                this.modalOpen()
                // this.markers.push(event.latlng);
            }
        },
        remMarker(event) {
            console.log('event',event)
        },
        
        listKeywords(){
            if(this.modal) this.modal.hide()
            this.modal = new Modal(document.getElementById('modalKeywords'), {
                keyboard: false
            })
            this.modal.show();
        },
        modalOpen(){
            if(this.modal) this.modal.hide()
            this.modal = new Modal(document.getElementById('modalEvent'), {
                keyboard: false
            })
            this.modal.show();
        },
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

        addKeyword(){
            this.saveKeyword({text:this.keywordsNew})
            // this.$socket.emit('addKeyword',{text:this.keywordsNew})
            this.modalCloseKeyword()
        },

        addEvent(){
            this.saveEvent({...this.dataModal})
            this.modalClose()
        },
        filterKeywords(){
            this.$socket.client.emit('room', {keywords:this.keywordsFiltered});
            this.fetchEvents({keywords:this.keywordsFiltered});
            this.modalClose()
        },
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
        updateZoom(){
            this.zoom = 15;
        },
    },
    created(){
        this.fetchKeywords();

        const urlParams = new URLSearchParams(window.location.search);
        
        const keywords = urlParams.get('keywords');
        if(keywords){
            const keywordsToFilter = [];
            const arr = keywords.split(",");
            if(arr?.length>0){
                for (const e of arr) {
                    keywordsToFilter.push(e)
                }
            }
            this.keywordsFiltered = keywordsToFilter;
        }

        this.fetchEvents({keywords:this.keywordsFiltered});

        this.geoFindMe()
    },
};
</script>

<style>
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

    .select2-container--open .select2-dropdown--below {
        z-index: 9999;
    }
</style>