<template>
    <main>
        <h1>Hello World</h1>

        <input v-model="query" placeholder="Search" />
        <div v-if="isLoading">Loading...</div>
        <div v-else>
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

const data = ref();
const query = ref("htop");
const isLoading = ref(false);

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
