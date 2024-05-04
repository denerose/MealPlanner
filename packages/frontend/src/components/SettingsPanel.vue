<script setup lang="ts">
import { ref } from 'vue';
import { getSettingsFromServer, updateSettingsOnServer } from '../data/helpers';
import { SettingsData } from '../data/types';
import LunchDaysTable from './LunchDaysTable.vue';

const serverSettings = await getSettingsFromServer() || {
    lunchRule: false,
    carbRule: false,
    acidRule: false
}

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
    <div class="container page-frame">
        <div class="card">
            <details class="card-body">
                <summary class="" open>
                    <h4>Suggestion Rules</h4>
                </summary>
                <form submit.prevent="submitForm">
                    <ul>
                        <li>
                            <label for="lunch-rule">Check for lunches:</label>
                            <input v-model="settingsData.lunchRule" type="checkbox" id="lunch-rule" />
                        </li>
                        <li>
                            <label for="carb-rule">Avoid double carbs:</label>
                            <input v-model="settingsData.carbRule" type="checkbox" id="carb-rule" />
                        </li>
                        <li>
                            <label for="acid-rule">Avoid double acid:</label>
                            <input v-model="settingsData.acidRule" type="checkbox" id="acid-rule" />
                        </li>
                    </ul>
                    <button class="btn btn-outline-primary" type="submit" @click="submitForm">Update Settings</button>
                </form>
            </details>
        </div>

        <hr />
        <div class="card">
            <details class="card-body">
                <summary>
                    <h4>Lunch Days</h4>
                </summary>
                <LunchDaysTable />
                <p>Test</p>
            </details>
        </div>
    </div>
</template>

<style scoped></style>