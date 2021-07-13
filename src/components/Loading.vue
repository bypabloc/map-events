<template>
    <div class="pt-2 d-flex justify-content-center">
        <ring-loader class="text-center " :loading="true" ></ring-loader>  
    </div>
    

    <!-- <div class="row">
        <div class="text-center">
            <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div> -->
    <!-- <div id="circle">
        <div class="loader">
            <div class="loader">
                <div class="loader">
                    <div class="loader">
                    </div>
                </div>
            </div>
        </div>
    </div>  -->

    <!--
    <pulse-loader :loading="true"></pulse-loader>
    <bounce-loader :loading="true"></bounce-loader>   
    <grid-loader :loading="true"></grid-loader>
    <clip-loader :loading="true"></clip-loader>
    <rise-loader :loading="true"></rise-loader>
    <beat-loader :loading="true"></beat-loader>
    <sync-loader :loading="true"></sync-loader>
    <rotate-loader :loading="true"></rotate-loader>
    <fade-loader :loading="true"></fade-loader>
    <pacman-loader :loading="true"></pacman-loader>
    <square-loader :loading="true"></square-loader>
    <scale-loader :loading="true"></scale-loader>
    <skew-loader :loading="true"></skew-loader>
    <moon-loader :loading="true"></moon-loader>     
    <dot-loader :loading="true"></dot-loader>
    -->
</template>

<script>

import RingLoader from 'vue-spinner/src/RingLoader.vue'

export default {
    name: 'Loading',
    components:{
        RingLoader,
    },
    methods:{
        setColor() {
            const rings = document.querySelector('.v-ring')?.children
            if(rings){
                const ringsArray = Array.from(rings);
                for (const e of ringsArray) {
                    e.classList.add(`theme-border-${this.theme}-500`);
                }
            }
        },
    },
    mounted() {
        this.setColor();
    },
};
</script>

<style scoped>

    /* #circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 70px;
        height: 70px;	
    }

    .loader {
        width: calc(100% - 0px);
        height: calc(100% - 0px);
        border: 8px solid #162534;
        border-top: 8px solid #09f;
        border-radius: 50%;
        animation: rotate 5s linear infinite;
    }

    @keyframes rotate {
        100% {transform: rotate(360deg);}
    }  */
</style>