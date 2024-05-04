<script setup lang="ts">
import EditPlanTable from '../components/editplans/EditPlanTable.vue'

</script>

<template>
    <div class="container page-frame bg-white" style="--bs-bg-opacity: .9;">
        <Suspense>
            <EditPlanTable />
            <template #fallback>
                <LoadingWheel />
            </template>
        </Suspense>
        <router-view class="d-none s-sm-block"></router-view>
    </div>
</template>