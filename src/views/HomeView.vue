<template>
    <main class="flex-col-center">
        <div class="inputContainer">
            <input class="searchBox" type="query" v-model="query" :placeholder="'Search'" @keydown.enter="fetchData">
        </div>
        <div v-if="isLoading">Loading...</div>
        <div v-else class="resource">
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
                        <td>{{ result.name }}</td>
                        <td>{{ result.version }}</td>
                        <td>{{ result.datetype }}</td>
                        <td>{{ result.last_updated_date }}</td>
                        <td>{{ result.flagged_date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import axios from "axios";

const data = ref<Result[]>([]);

const query = ref("");
const isLoading = ref(false);

const isFocusing = ref(false);

interface Result {
  source: string;
  name: string;
  version: string;
  datetype: string;
  last_updated_date: string;
  flagged_date: string;
}

function fetchData() {
    isLoading.value = true;
    console.log(query.value);
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
        });
}

fetchData();
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #673ab888;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #010101;
}

.resource {
    border: 1px solid #000;
    box-shadow: 0 25px 50px -12px #673ab888;
}

.searchBox {
    border: 3px solid #673ab888;
    font-size: 3rem;
    border-radius: .5rem;
    padding: .5rem 1rem;
    margin: 20px auto;
    font-family: inherit;
    outline: none;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 20px 20px -20px #673ab888;
}

.inputContainer {
    text-align: center;
}
</style>