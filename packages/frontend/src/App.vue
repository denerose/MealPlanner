<script setup lang="ts">
import NavBar from './components/NavBar.vue';

</script>

<template>
  <header class="bg-white text-dark border-bottom sticky-top p-2">
    <nav-bar />
  </header>
  <div class="container-lg">
    <router-view />
    <footer><small>this is the footer</small></footer>
  </div>
</template>

<style scoped>
footer {
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  border: 1px solid gold;
  border-radius: 5px;
}
</style>
