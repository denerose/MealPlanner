<script setup lang="ts">
import { useDataStore } from '../data/store';

const store = useDataStore()
store.fetchIngredients()

</script>
<template>
    <div class="card">
        <h3>All Ingredients</h3>
        <ul>
            <li v-for="ing in store.allIngredients">
                <div class="item-div"><span class="item">{{ ing.ingredientName }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.item-div {
    display: flex;
    min-width: 200px;
    max-width: 40%;
}

.item {
    min-width: 100px;
    flex-grow: 2;
}

.edit {
    color: rgb(95, 52, 213);
    max-width: 1.5rem;
}

.del {
    color: crimson;
    max-width: 1.5rem;
}
</style>