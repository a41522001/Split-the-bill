<script setup>
    import { computed } from "vue";
    import { useSplitBillStore } from "../stores/splitBillStore";
    const splitBillStore = useSplitBillStore();
    const list = computed(() => splitBillStore.list);
</script>

<template>
    <h3>結算</h3>
    <ul class="result-list">
        <li class="result-list-li" v-for="item in list">
            <div class="member-list">
                <span>{{ item.payer }}</span>
                <span>&rarr;</span>
                <span>{{ item.payee }}</span>
            </div>
            <div class="price-list">
                <span>$NT</span>
                <span>{{ Math.abs(item.amount) }}</span>
            </div>
        </li>
    </ul>
</template>

<style scoped>
    .result-list{
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .result-list-li{
        display: flex;
        position: relative;
        padding: 15px 0 10px 10px;
        gap: 20px;
        display: flex;
        justify-content: space-between;
    }
    .result-list-li::after{
        content: "";
        width: 100%;
        height: 1px;
        background-color: #888;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .member-list{
        display: flex;
        gap: 5px;
    }
    .price-list{
        display: flex;
        gap: 5px;
    }
</style>