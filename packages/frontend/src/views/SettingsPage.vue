<script setup lang="ts">
import SettingsPanel from '../components/settings/SettingsPanel.vue';
</script>

<template>
    <div class="page-frame bg-white mx-auto my-2 p-2 p-sm-3 p-md-5" style="--bs-bg-opacity: .9;">
        <h2>Settings Page</h2>
        <Suspense>
            <SettingsPanel />
        </Suspense>

    </div>
</template>

<style scoped></style>