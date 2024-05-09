<script setup lang="ts">
import { ref } from 'vue';
// import { Ingredient, ValidMeal } from '../../data/types';
// import { useDataStore } from '../../data/store';

const value = ref<string[]>(['apple', 'orange'])

</script>

<template>
  <div>
    <label for="tags-separators">Enter tags separated by space, comma or semicolon</label>
    <BFormTags input-id="tags-separators" v-model="value" separator=" ,;" tag-pills tag-variant="success"
      placeholder="Enter new tags separated by space, comma or semicolon" remove-on-delete>
    </BFormTags>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
</template>