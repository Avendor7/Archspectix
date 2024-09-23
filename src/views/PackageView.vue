<template>
    <div class="container resource">
        <h1>Styled Table Example</h1>
        <table>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
    { id: 3, name: 'Bob Smith', age: 40 }
]);

import axios from "axios";

const data = ref();

//TODO: query should come from the route somehow
const query = ref("");
const isLoading = ref(false);

function fetchData() {
    isLoading.value = true;
    console.log(query.value);
    let url = "http://localhost:3001/alr?value=" + query.value;
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
