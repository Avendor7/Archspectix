<template>
    <main class="flex-col-center">
        <div class="inputContainer">
            <input class="searchBox" type="query" v-model="query" :placeholder="'Search'" @keydown.enter="fetchData">
        </div>
        <div v-if="hasLoaded" class="resource">
            <table>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Data Type</th>
                        <th>Last Updated Date</th>
                        <th>Flagged Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="result in data" :key="result.name">
                        <td>{{ result.source }}</td>
                        <td v-if="result.source == 'ALR'">
                            <RouterLink :to="{ name: 'ALR', params: { query: result.name }}">
                                {{ result.name }}
                            </RouterLink>
                        </td>
                        <td v-else="result.source == 'AUR'">
                            <RouterLink :to="{ name: 'AUR', params: { query: result.name }}">
                                {{ result.name }}
                            </RouterLink>
                        </td>
                        <td>{{ result.version }}</td>
                        <td>{{ result.datetype }}</td>
                        <td>{{ formatUnixTimestamp(result.last_updated_date) }}</td>
                        <td>{{ formatUnixTimestamp(result.flagged_date) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else-if="isLoading">Loading...</div>
        <div v-else></div>
    </main>
</template>

<script setup lang="ts">
import {ref} from "vue";

import axios from "axios";

const data = ref<Result[]>([]);

const query = ref("");
const isLoading = ref(false);
const hasLoaded = ref(false);
const isFocusing = ref(false);

interface Result {
  source: string;
  name: string;
  version: string;
  datetype: string;
  last_updated_date: number; // Changed type to number
  flagged_date: number; // Changed type to number
}

function fetchData() {
    isLoading.value = true;
    let url = "http://localhost:3001/search?value=" + query.value;
    console.log(url);
    axios
        .get(url)
        .then((response) => {
            data.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            isLoading.value = false;
            hasLoaded.value = true;
        });
}

function formatUnixTimestamp(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid var(--color-primary);
    padding: 10px;
    text-align: left;
}

th {
    background-color: #010101;
}

.resource {
    border: 1px solid #000;
    box-shadow: 0 25px 50px -12px var(--color-primary-shadow);
}

.searchBox {
    border: 3px solid var(--color-primary);
    font-size: 3rem;
    border-radius: .5rem;
    padding: .5rem 1rem;
    margin: 20px auto;
    font-family: inherit;
    outline: none;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 20px 20px -20px var(--color-primary-shadow);
    background: var(--color-background);
    color: var(--color-text);
}

.inputContainer {
    text-align: center;
}
</style>