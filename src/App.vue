<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <div class="nav-container">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <a href="https://archlinux.org">Arch Linux</a>
                <a href="https://archlinux.org">Arch Wiki</a>
                <a href="https://archlinux.org">Arch Repository</a>
                <a href="https://archlinux.org">Arch User Repository</a>
            </nav>
        </div>
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
</style>
