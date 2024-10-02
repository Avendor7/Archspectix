<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <a href="https://archlinux.org" class="split">Arch Linux</a>
            <a href="https://archlinux.org" class="split">Arch Wiki</a>
            <a href="https://archlinux.org" class="split">Arch Repository</a>
            <a href="https://archlinux.org" class="split">Arch User Repository</a>
        </nav>
    </header>
    <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

nav a:last-of-type {
    border: 0;
}

nav a.split {
    float: right;
}
</style>
