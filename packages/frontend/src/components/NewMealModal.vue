<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from '@vueuse/core'
import MealForm from './MealForm.vue';

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["meal-modal-close"]);

const target = ref(null)
onClickOutside(target, () => emit('meal-modal-close'))

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container" ref="target">
                <div>
                    <MealForm />
                    <footer>
                        <div>
                            <button @click.stop="emit('meal-modal-close')">Cancel</button>
                        </div>
                    </footer>
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
    min-width: 100%;
    max-width: 500px;
    margin: 150px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>