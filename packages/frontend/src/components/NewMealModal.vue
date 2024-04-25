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

<style scoped></style>