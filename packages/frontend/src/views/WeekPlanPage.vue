<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoadingWheel from '../components/LoadingWheel.vue';
import EditPlanTable from '../components/editplans/EditPlanTable.vue'

const route = useRoute()

</script>

<template>
    <div class="container page-frame bg-white" style="--bs-bg-opacity: .9;">
        <Suspense>
            <EditPlanTable />
            <template #fallback>
                <LoadingWheel />
            </template>
        </Suspense>
        <div class="d-none d-sm-block">
            View
            <Suspense>
                <router-view :id="route.params.id"></router-view>
            </Suspense>
        </div>
    </div>
</template>