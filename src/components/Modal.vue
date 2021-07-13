<template>
    <div>
        <!-- <button 
            type="button"
            class="btn btn-primary fixedButton rounded-circle m-3"
            @click="openModal"
        >
            <i class="fas fa-plus"></i>
        </button> -->

        <!-- Modal -->
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    props: {
        data: Object,
    },
    emits: ["enlargeText"],
    watch: {
        ['data.active'] ( active ) {

            const modal = new Modal(document.getElementById('modalPrueba'), {});

            if(active){
                modal.show();
            }else{
                modal.hide()
            }
        },
    },
    methods: {
        close() {
            console.log("trying");
            this.$emit("enlargeText", "someValue");
        },
    },
};
</script>

<style scoped>
    .fixedButton{
        position: fixed;
        bottom: 0px;
        right: 0px; 
        z-index: 99999;
    }
</style>