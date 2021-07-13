<template>
  <div style="height: 94vh; width: 95vw;">
    <l-map
        v-model="zoom"
        v-model:zoom="zoom"
        @move="log('move')"
        @click="addMarker"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />

      <l-marker v-for="(value, index) in markers" :key="index" :lat-lng="[value.lat,value.lng]" @click="remMarker">
      </l-marker>

    </l-map>
    
    <a class="fixedButton" href>
        <div class="roundedFixedBtn"><i class="fas fa-plus"></i></div>
    </a>

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
        };
    },
    computed: {
    },
    methods: {
        log(a) {
            console.log(a);
        },
        changeIcon() {
            this.iconWidth += 2;
            if (this.iconWidth > this.iconHeight) {
                this.iconWidth = Math.floor(this.iconHeight / 2);
            }
        },
        addMarker(event) {
            if(event.latlng){
                console.log('event',event.latlng)
                this.markers.push(event.latlng);
            }
        },
        remMarker(event) {
            console.log('event',event)
            // if(event.latlng){
            //     console.log('event',event.latlng)
            //     this.markers.push(event.latlng);
            // }
        },
    },
};
</script>

<style scoped>
.fixedButton{
    position: fixed;
    bottom: 0px;
    right: 0px; 
    padding: 20px;
    z-index: 99999;
}
.roundedFixedBtn{
    height: 60px;
    line-height: 70px;  
    width: 60px;  
    font-size: 2em;
    font-weight: bold;
    border-radius: 50%;
    background-color: #0dcaf0;
    color: white;
    text-align: center;
    cursor: pointer;
}
</style>