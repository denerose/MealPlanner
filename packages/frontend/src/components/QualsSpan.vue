<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore } from '../data/store';

const store = useDataStore()


const props = defineProps<{
    mealID: number
}>()

const thisMeal = ref(store.findMealByID(props.mealID))

</script>

<template>
    <span>
        <span v-if="thisMeal.qualities.outdoorCooking" class="qual-icon p-1" title="outside cooking">🔥</span>
        <span v-if="thisMeal.qualities.isHighVeg" class="qual-icon p-1" title="lots of veggies">🥦</span>
        <span v-if="thisMeal.qualities.isCreamy" class="qual-icon p-1" title="creamy">🫕</span>
        <span v-if="thisMeal.qualities.isHighCarb" class="qual-icon p-1" title="high carb">🥐</span>
        <span v-if="thisMeal.qualities.makesLunch" class="qual-icon p-1" title="makes lunch">🥡</span>
    </span>
</template>