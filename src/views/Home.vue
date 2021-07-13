<template>
    <div style="height: 100vh; width: 100vw;">
        <l-map
            v-model="zoom"
            v-model:zoom="zoom"
            @click="addMarker"
        >

            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></l-tile-layer>

            <l-control-layers />

            <l-marker v-for="(value, index) in markers" :key="index" :lat-lng="[value.lat,value.lng]" @click="remMarker"/>

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
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
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
        'select2': Select2,
    },
    data() {
        return {
            zoom: 2,
            iconWidth: 25,
            iconHeight: 40,
            markers: [
                {
                    lat: -1.322748592538121,
                    lng: 76.26588639771171,
                },
                {
                    lat: -1.322748592538121,
                    lng: 70.26588639771171,
                },
            ],
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
            // keywords: [
            //     {
            //         id : 1,
            //         text : 'Estacion de polocia',
            //     },
            //     {
            //         id : 2,
            //         text : 'Bomberos',
            //     },
            //     {
            //         id : 3,
            //         text : 'Primeros auxilios',
            //     },
            // ],
        };
    },
    computed: {
        ...mapState([
            'events',
            'keywords',
        ]),
    },
    methods: {
        ...mapActions([
            'fetchEvents',
            'fetchKeywords',
            'saveEvent',
            'saveKeyword',
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
                console.log('event',event.latlng)
                const { lat, lng } = event.latlng;
                this.dataModal.coordenadas = { lat, lng };
                this.modalOpen()
                // this.markers.push(event.latlng);
            }
        },
        remMarker(event) {
            console.log('event',event)
            // if(event.latlng){
            //     console.log('event',event.latlng)
            //     this.markers.push(event.latlng);
            // }
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
            this.modalCloseKeyword()
        },
        addEvent(){
            this.saveEvent({...this.dataModal})
            this.modalClose()
        },
    },
    created(){
        this.fetchEvents();
        this.fetchKeywords();
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