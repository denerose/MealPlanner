<script setup lang="ts">
import { ref } from "vue";
import TagInput from "@mayank1513/vue-tag-input";
import "@mayank1513/vue-tag-input/style.css";
import { useDataStore } from '../data/store';

const store = useDataStore()
store.fetchIngredients()

const ingredientNamesArray = store.allIngredients.map(ing => ing.ingredientName)

const autocompleteItems = ingredientNamesArray
const tags = ref<string[]>([]);
// const validator = (tag: string, items: string[]) => {
//     return items.includes(tag);
// }

</script>
<template>
    <tag-input :autocomplete-items="autocompleteItems" v-model="tags" :validator="/\w/"
        validation-message="must be a word" />
</template>
<style scoped></style>