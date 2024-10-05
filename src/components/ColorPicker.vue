<template>
    <div class="container">
        <h2>Color Picker</h2>
        <div class="picker">
            <label for="primaryColour">Primary</label>
            <input id="primaryColour" class="pickerInput" type="color" :value="primaryColour">
            <span>{{ primaryColour }}</span>
        </div>
        <div class="picker">
            <label for="secondaryColour">Secondary</label>
            <input id="secondaryColour" class="pickerInput" type="color" :value="secondaryColour">
            <span>{{ primaryColour }}</span>
        </div>
        <ul>
            <li v-for="color in presetColors" :key="color.primary">
                <div class="preset" :style="{backgroundColor:`${color.primary}`}">
                    <span style="color:#000;">{{color.primary}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Color {
  hex: string;
}

const presetColors = [
    {primary: '#B25BFD', primaryShadow:'#B25BFD44', secondary: '#FF0000'},
    {primary: '#28FF00', primaryShadow:'#28FF0044', secondary: '#FF0000'},
    {primary: '#FF10F0', primaryShadow:'#FF10F044', secondary: '#FF0000'},
    {primary: '#1F51FF', primaryShadow:'#1F51FF44', secondary: '#FF0000'},
    {primary: '#CFFF04', primaryShadow:'#CFFF0444', secondary: '#FF0000'},
    {primary: '#FF073A', primaryShadow:'#FF073A44', secondary: '#FF0000'},
];

const primaryColour = ref('#3344ff');


</script>

<style scoped>
.container {
    height: auto;
    width: 250px;
    margin: auto;
    padding: 1rem;
    border: solid 1px #ccc;
    box-shadow: var(--shadow);
    background-color: #222;
    border-radius: 10px;
}

.picker {
    margin: 1rem auto;
}

.pickerInput {
    width: 25%;
    height: 30px;
    border: solid 1px #ccc;
    box-shadow: var(--shadow);
    background-color: #fff;
    text-align: center;
    margin: 0.5rem auto;
}

label {
    display: block;
}

ul {
    list-style-type: none;
    padding: 0px;
    margin: 1rem auto;
}

li {
    padding-bottom: 5px;
}
</style>
