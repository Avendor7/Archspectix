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
                <tr v-for="result in data.results" :key="result.pkgname">
                    <td>{{ result.pkgname }}</td>
                    <td>{{ result.pkgver }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface PackageInfo {
    pkgname: string;
    pkgbase: string;
    repo: string;
    arch: string;
    pkgver: string;
    pkgrel: number;
    epoch: number;
    pkgdesc: string;
    url: string;
    filename: string;
    compressed_size: number;
    installed_size: number;
    build_date: Date;
    last_update: Date | null;
    flag_date: Date | null;
    maintainers: string[];
    packager: string;
    groups: string[];
    licenses: string[];
    conflicts: string[];
    provides: string[];
    replaces: string[];
    depends: Dependency[];
    optdepends: OptDependency[];
    makedepends: string[];
    checkdepends: string[];
}
interface Dependency {
    pkg: string;
    version?: string;
    operator?: string;
    arch?: string;
}

interface OptDependency {
    name: string;
    description: string;
}
interface Data{
    version: number,
    limit: number,
    valid: boolean,
    results: PackageInfo[],
    type: string,
    num_pages: number,
    page: number
}
const data = ref<Data>({
    version: 0,
    limit: 0,
    valid: false,
    results: [],
    type: '',
    num_pages:  0,
    page: 0
});

const isLoading = ref(false);
const route = useRoute();
const query = String(route.params.query); // You can also use a type guard for better TypeScript support

function fetchData() {
    isLoading.value = true;
    console.log(query);
    let url = "http://localhost:3001/alr?value=" + query;
    console.log(url);
    axios
        .get(url)
        .then((response) => {
            data.value = response.data;
            console.log(data.value);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            isLoading.value = false;
        });
}
onMounted(() => {
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
