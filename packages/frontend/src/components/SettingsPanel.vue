<script setup lang="ts">
import { ref } from 'vue';
import { getSettingsFromServer, updateSettingsOnServer } from '../data/helpers';
import { SettingsData } from '../data/types';
import LunchDaysTable from './LunchDaysTable.vue';

const serverSettings = await getSettingsFromServer()

const settingsData = ref<SettingsData>({
    preset: "default",
    lunchRule: serverSettings.lunchRule,
    carbRule: serverSettings.carbRule,
    acidRule: serverSettings.acidRule,

})

const submitForm = async () => {
    await updateSettingsOnServer(settingsData.value)
};

</script>

<template>
    <div>
        <details>
            <summary open>Suggestion Rules</summary>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="lunch-rule">Check for lunches:</label>
                    <input v-model="settingsData.lunchRule" type="checkbox" id="lunch-rule" />
                </div>
                <div>
                    <label for="carb-rule">Avoid double carbs:</label>
                    <input v-model="settingsData.carbRule" type="checkbox" id="carb-rule" />
                </div>
                <div>
                    <label for="acid-rule">Avoid double acid:</label>
                    <input v-model="settingsData.acidRule" type="checkbox" id="acid-rule" />
                </div>
                <button type="submit">Update Settings</button>
            </form>
        </details>
        <details>
            <summary>Lunch Days</summary>
            <LunchDaysTable />
        </details>
    </div>
</template>

<style scoped></style>