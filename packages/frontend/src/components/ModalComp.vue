<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from '@vueuse/core'

//@ts-ignore
const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null)
onClickOutside(target, () => {
    emit('modal-close')
})

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container card" ref="target">
                <div class="modal-header d-flex">
                    <slot name="header"><button type="button" class="btn-close ms-auto"
                            @click.stop="emit('modal-close')" aria-label="Close"></button></slot>
                </div>
                <div class="modal-body">
                    <slot name="content"> default content </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <div>
                            <button class="btn btn-primary" @click.stop="emit('modal-close')">Cancel</button>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
    min-width: 65vw;
    max-width: 80vw;
    max-height: 90vh;
    overflow: scroll;
    margin: 150px auto;
    padding: 20px 30px;
    border-radius: 12px;
}
</style>