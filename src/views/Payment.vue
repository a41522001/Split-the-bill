<script setup>
    import { ref, computed } from "vue";
    import { useRouter } from "vue-router";
    import { usesplitBillStore } from "../stores/splitBillStore";
    const splitBillStore = usesplitBillStore();
    const router = useRouter();
    const group = computed(() => splitBillStore.group);
    const payer = ref("");
    const paymentName = ref("");
    const price = ref("");
    const selectMember = ref([]);
    //輸入錯誤處理
    const payerError = ref(false);
    const paymentNameError = ref(false);
    const priceError = ref(false);
    const selectMemberError = ref(false); 
    const handlerErrorMessage = ref(null);
    const selectMemberErrorMessage = computed(() => {
        return handlerErrorMessage.value ? "分帳人數低於2人":"參與人需包含付款人";
    })
    function addPayment(){
        clearError();
        if(payer.value == ""){
            payerError.value = true;
            return;
        }
        if(paymentName.value == ""){
            paymentNameError.value = true;
            return;
        }
        if(price.value == ""){
            priceError.value = true;
            return;
        }
        if(selectMember.value.length < 2){
            selectMemberError.value = true;
            handlerErrorMessage.value = true;
            return;
        }else{
            const result = selectMember.value.some(member => member == payer.value);
            if(!result){
                handlerErrorMessage.value = false;
                selectMemberError.value = true;
                return;
            }
        }
        const payment = {
            payer: payer.value,
            paymentName: paymentName.value,
            price: price.value,
            selectMember: selectMember.value
        };
        splitBillStore.addPayment(payment);
        router.push({name: "group"});   
    }
    function clearError(){
        payerError.value = false;
        paymentNameError.value = false;
        priceError.value = false;
        selectMemberError.value = false;
        handlerErrorMessage.value = null;
    }
    function back(){
        router.push({name: "group"});
    }
</script>

<template>
    <div class="wrap">
        <header>
            <div class="title">
                <h1>分帳應用程式</h1>
            </div>
        </header>
        <main>
            <div class="input-group">
                <label for="payer">付款人
                    <span v-show="payerError">付款人請勿為空</span>
                </label>
                <select id="payer" v-model="payer">
                    <option v-for="member in group" :value="member">{{ member }}</option>
                </select>
            </div>
            <div class="input-group">
                <label for="payment-name">款項名
                    <span v-show="paymentNameError">請輸入款項名</span>
                </label>
                <input type="text" id="payment-name" v-model="paymentName">
            </div>
            <div class="input-group">
                <label for="price">金額
                    <span v-show="priceError">請填寫金額</span>
                </label>
                <p class="price"><span>NT$</span><input type="number" id="price" v-model="price"></p>  
            </div>
            <div class="input-group">
                <p class="select-member">參與人
                    <span v-show="selectMemberError">{{ selectMemberErrorMessage }}</span>
                </p>
                <ul>
                    <li v-for="member in group">
                        <label>
                            <input type="checkbox" :value="member" v-model="selectMember">
                            {{ member }}
                        </label>
                    </li>
                </ul>
            </div>
            <button @click="addPayment()">新增此筆帳務</button>
            <button @click="back()">返回</button>
        </main>
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
    main{
        display: flex;
        flex-direction: column;
        padding: 20px 20px 5px 20px;
    }
    .input-group{
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
    }
    .input-group label{
        display: flex;
        justify-content: space-between;
    }
    .input-group label span{
        color: #f00;
    }
    .input-group select,
    .input-group input[type=text]{
        padding: 10px;
        border-radius: 8px;
        outline: none;
        border: 2px #ccc solid;
        font-size: 1rem;
    }
    .price{
        display: flex;
        align-items: center;
        width: 100%;
    }
    .price span,
    #price{
        border-color: #ccc;
        border-style: solid;
    }
    .price span{
        border-width: 2px 0 2px 2px;
        padding: 10px;
        line-height: 1;
        background-color: #ccc;
        border-radius: 8px 0 0 8px;
    }
    #price{
        border-width: 2px 2px 2px 0;
        outline: none;
        flex-grow: 1;
        padding: 9px;
        border-radius: 0 8px 8px 0;
    }
    p.select-member{
        display: flex;
        justify-content: space-between;
    }
    p.select-member span{
        color: #f00;
    }
    .input-group ul{
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding: 5px 10px;
    }
    .input-group ul li label{
        cursor: pointer;
    }
    button{
        padding: 15px 0;
        margin-bottom: 15px;
        cursor: pointer;
        font-size: 1.15rem;
        border-radius: 8px;
        outline: none;
        border: none;
        font-weight: 600;
    }
    button:hover{
        opacity: .8;
    }
    button:first-of-type{
        background-color: #635DA2;
        color: #fff;
    }
    button:nth-of-type(2) {
        background-color: #f1f0f0;
        color: #4b4b4b;
    }
</style>
