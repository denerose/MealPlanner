<script setup lang="ts">
import SettingsPanel from '../components/SettingsPanel.vue';
</script>

<template>
    <div class="page-frame bg-white" style="--bs-bg-opacity: .9;">
        <h2>Settings Page</h2>
        <Suspense>
            <SettingsPanel />
        </Suspense>

    </div>
</template>

<style scoped></style>