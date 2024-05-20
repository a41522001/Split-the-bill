<script setup>
    
</script>

<template>
    <router-view></router-view>
</template>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-family: "Noto Sans TC", sans-serif;
    }
    body{
        background-color: #e6e6e6;
    }
    input{
        font-size: 16px;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance: textfield;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: #fff;
    }
</style>
