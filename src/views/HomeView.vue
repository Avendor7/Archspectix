<template>
    <main>
        <h1>Hello World</h1>

        <input v-model="query" placeholder="Search" />
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <ul>
                <li v-for="result in data.results">
                    {{ result.pkgname }}
                </li>
            </ul>
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
    let url = "http://localhost:3001/append?value=" + query.value;
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
