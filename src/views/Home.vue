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
            class="btn btn-primary fixedButton rounded-circle m-3"
            @click="newMarker({})"
        >
            <i class="fas fa-plus"></i>
        </button>

        <div class="modal fade" id="modalPrueba" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ dataModal.title }}</h5>
                        <button type="button" class="btn-close" v-on:click="modalClose" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <pre><code>{{ dataModal }}</code></pre>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" v-on:click="modalClose">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import { Modal } from 'bootstrap';

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LControlLayers,
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
                keyword: '',
                active: false,
                coordenadas: {
                    lat: null,
                    lng: null,
                },
            },
            modal: null,
        };
    },
    computed: {
    },
    methods: {
        add() {
            console.log('add')
        },
        newMarker(){
            this.dataModal.coordenadas = null;
            this.modalOpen()
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
            this.modal = new Modal(document.getElementById('modalPrueba'), {
                keyboard: false
            })
            this.modal.show();
        },
        modalClose(){
            console.log('modalClose')
            this.modal.hide();
        },
    },
};
</script>