<template>
  <div>
    <div class="container">
        <h1>{{data.results[0].Name}}</h1>
        <table class="resource">
            <tbody>
                <tr>
                    <th scope="col">Name</th>
                    <td>{{ data.results[0].Name }}</td>
                </tr>
                <tr>
                    <th>Version</th>
                    <td>{{ data.results[0].Version }}</td>
                </tr>
                <tr>
                  <th>URL</th>
                  <td><a :href="data.results[0].URL">{{ data.results[0].URL }}</a></td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{{data.results[0].Description}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";

interface Data {
    resultcount: number,
    results: Result[],
    type: string,
    version: number
}

interface Result {
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

const data = ref<Data>({
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
    let url = "http://localhost:3001/aur/info?value=" + query;
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
    box-shadow: 0 25px 50px -12px #673ab888;
}

th,
td {
    border: 1px solid #673ab888;
    padding: 10px;
    text-align: left;
}
@media (prefers-color-scheme: dark) {
    th {
        background-color: #010101;
    }
}

@media (prefers-color-scheme: light) {
    th {
        background-color: #CCC;
    }
}
.container {
  width:50%;
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

.col-container {
  margin-top: 30px;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;

}

.column {
  background-color: #010101;
  padding: 10px 10px;
  flex-basis: 33.33%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #673ab888;
  box-shadow: 0 25px 50px -12px #673ab888;
}
</style>
