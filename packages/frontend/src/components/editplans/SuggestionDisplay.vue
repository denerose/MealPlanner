<script setup lang="ts">
import { Meal } from '../../data/types';


const props = defineProps<{
    meal: Meal
}>()

</script>

<template>
    <div class="suggestion my-1">
        <p>{{ meal.mealName }}
            <span v-if="props.meal.qualities">
                <span v-if="props.meal.qualities.outdoorCooking" class="qual-icon" title="outside cooking">🔥</span>
                <span v-if="props.meal.qualities.isHighVeg" class="qual-icon" title="lots of veggies">🥦</span>
                <span v-if="props.meal.qualities.isCreamy" class="qual-icon" title="creamy">🫕</span>
                <span v-if="props.meal.qualities.isHighCarb" class="qual-icon" title="high carb">🥐</span>
                <span v-if="props.meal.qualities.makesLunch" class="qual-icon" title="makes lunch">🥡</span>
            </span>
        </p>
    </div>
</template>

<style scoped>
.suggestion {
    border: 1px solid rgb(184, 154, 205);
    border-radius: 12px;
    padding: 0.5rem;
}

.suggestion>p {
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.qual-icon {
    padding: 0.2rem;
}
</style>