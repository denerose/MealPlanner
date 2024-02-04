<script setup lang="ts">
import NavBar from './components/NavBar.vue';

</script>

<template>
  <header>
    <h1>myMealPlanner</h1>
    <nav-bar />
  </header>
  <router-view />
  <footer><small>this is the footer</small></footer>
</template>

<style scoped></style>
