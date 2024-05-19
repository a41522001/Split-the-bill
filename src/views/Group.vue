<script setup>
    import { ref, computed } from "vue";
    import { useRouter } from "vue-router";
    import { usesplitBillStore } from "../stores/splitBillStore";
    import Result from "../components/Result.vue";
    const splitBillStore = usesplitBillStore();
    const router = useRouter();
    const group = computed(() => splitBillStore.group);
    const groupName = computed(() => splitBillStore.groupName);
    const payments = computed(() => splitBillStore.payments);

    function addPayment(){
        router.push({name: "payment"});
    }
    function removePayment(index){
        splitBillStore.removePayment(index);
    }
    const showModal = ref(false);
    function finishSplitBill(){
        splitBillStore.finishSplitBill();
        router.push({name: "home"});
    }
</script>  

<template>
    <div class="wrap">
        <header>
            <div class="title">
                <h1>分帳應用程式</h1>
            </div>
            <h3>{{ groupName }}</h3>
            <ul>
                <li v-for="member in group">{{ member }}</li>
            </ul>
        </header>
        <main>
            <button class="add-payment" @click="addPayment">新增付款資訊</button>
            <ul class="payment-list">
                <li class="payment-list-li" v-for="(payment, index) in payments">
                    <div class="payment">
                        <h4 class="payment-name">{{ payment.paymentName }}</h4>
                        <p class="payer">{{ payment.payer }}</p>
                        <ul class="people-list">
                            <li class="people-list-li" v-for="member in payment.selectMember">
                                {{ member[0] }}
                            </li>
                        </ul>
                    </div>
                    <div class="money">
                        <p>NT${{ payment.price }}</p>
                        <span @click="removePayment(payment, index)">
                            <img src="/public/trash.png" alt="edit">
                        </span>
                    </div>
                </li>
            </ul>
        </main>
        <section>
            <Result></Result>
        </section>
        <button class="finish" @click="showModal = true">結束分帳</button>
    </div>
    <div class="modal" v-show="showModal">
        <div class="modal-content">
            <p>確定結束分帳嗎</p>
            <div class="modal-btn">
                <button @click="finishSplitBill()">確定</button>
                <button @click="showModal = false">取消</button>
            </div>
            <span @click="showModal = false">&times;</span>
        </div>
    </div>
</template>

<style scoped>
    .wrap{
        margin: auto;
        max-width: 600px;
        width: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        min-height: 500px;
        height: auto;
        border-radius: 0 0 20px 20px;
    }
    header{
        background-color: #635DA2;
        padding: 20px;
        color: #fff;
    }
    .title{
        text-align: center;
        margin-bottom: 10px;
    }
    header ul{
        display: flex;
        gap: 8px; 
    }
    .money span{
        display: inline-block;
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
    .money span img{
        width: 100%;
        height: 100%;
    }
    main{
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
    main .add-payment{
        padding: 15px 0;
        border: #635DA2 1px solid;
        border-radius: 5px;
        background-color: #fff;
        color: #635da2;
        font-size: 1.25rem;
        font-weight: 600;
        cursor: pointer;
    }
    main .add-payment:hover{
        opacity: .5;
        color: #000;
    }
    .payment-list-li{
        display: flex;
        padding: 10px;
        justify-content: space-between;
        position: relative;
    }
    .payment-list-li::after{
        content: "";
        width: 100%;
        height: 1px;
        background-color: #888;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .people-list{
        display: flex;
        gap: 5px;
    }
    .people-list-li{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: #635DA2 1px solid;
        text-align: center;
        line-height: 1;
    }
    .people-list-li:nth-child(even){
        border-color: rgb(145, 73, 31);
    }
    .money{
        display: flex;
        gap: 8px;
        margin-top: 20px;
    }
    section{
        padding: 20px;
        font-size: 1.15rem;
    }
    .finish{
        display: block;
        padding: 15px 0;
        border: #da2525 1px solid;
        border-radius: 5px;
        background-color: #fff;
        color: #da2525;
        font-size: 1.25rem;
        font-weight: 600;
        cursor: pointer;
        margin: 10px 20px 20px;
    }
    .finish:hover{
        opacity: .5;
        color: #000;
    }
    .modal{
        min-width: 100vw;
        min-height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .6);
        z-index: 20;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content{
        width: 300px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        transform: translateY(-150px);
        border-radius: 15px;
        position: relative;
        padding: 60px 0 10px 0;
    }
    .modal-content p{
        color: #333;
        font-size: 1.75rem;
    }
    .modal-content span{
        position: absolute;
        top: 2px;
        right: 5px;
        font-size: 1.25rem;
        cursor: pointer;
    }
    .modal-btn button{
        padding: 5px 30px;
        margin: 0 5px;
        border-radius: 8px;
        border: none;
        outline: none;
        font-size: 1rem;
        cursor: pointer;
        color: #fff;
    }
    .modal-btn button:hover{
        opacity: .5;
    }
    .modal-btn button:first-child{
        background-color: #524ff5;
    }
    .modal-btn button:nth-child(2){
        background-color: #f81f1f;
    }
</style>
