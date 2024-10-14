<template>
    <div class="container resource">
        <h1>Styled Table Example</h1>
        <table>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Version</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="result in data.results" :key="result.Name">
                    <td>{{ result.Name }}</td>
                    <td>{{ result.Version }}</td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";

interface data {
    resultcount: number,
    results: result[],
    type: string,
    version: number
}

interface result {
  Description: string;
  FirstSubmitted: number | null;
  ID: number;
  LastModified: number;
  Maintainer: string;
  Name: string;
  NumVotes: number;
  OutOfDate: number | null;
  PackageBase: string;
  PackageBaseID: number;
  Popularity: number;
  URL: string;
  URLPath: string;
  Version: string;
}

const data = ref<data>({
    resultcount: 0,
    results: [],
    type: '',
    version: 0,
});

const isLoading = ref(false);
const route = useRoute();
const query = String(route.params.query); // You can also use a type guard for better TypeScript support

function fetchData() {
    isLoading.value = true;
    console.log(query);
    let url = "http://localhost:3001/aur/info?value=" + query;
    console.log(url);
    axios
        .get(url)
        .then((response) => {
            data.value = response.data;
            console.log(JSON.stringify(data.value));
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            isLoading.value = false;
        });
}
onBeforeMount(() => {
    fetchData();
});
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

.resource {
    border: 1px solid #000;
    box-shadow: 0 25px 50px -12px #673ab888;
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

.container {
    justify-content: center;
    align-items: center;

    .table-container {
        position: relative;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
}
</style>
