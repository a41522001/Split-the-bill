import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
export const usesplitBillStore = defineStore("splitBill", () => {
    const groupName = ref("");
    const group = ref([]);
    const payments = ref([]);
    
    onMounted(() => {
        readLocalstorage();
    })
    function addMember(name){
        group.value.push(name);
        saveLocalstorage();
    }
    function addPayment(newPayment){
        payments.value.push(newPayment);
        computedPayment(newPayment);
        computedResult();
        finallyComputed();
        saveLocalstorage();
    }
    function removeMember(index){
        group.value.splice(index, 1);
        saveLocalstorage();
    }
    function removePayment(index){
        payments.value.splice(index, 1);
        result.value.length = 0;
        payments.value.forEach(p => {
            computedPayment(p);
        });
        computedResult();
        finallyComputed();
        saveLocalstorage();
    }
    
    //開始分帳
    const result = ref([]);
    function computedPayment(payment){
        //total
        let total = payment.price;
        //參與人數
        let people = payment.selectMember.length;
        //參與但未付款需平分的錢
        let x = parseInt(total / people);
        //付款人需收的錢
        let y = parseInt(total * [ (people - 1) / people ] );
        //付款人
        let payer = payment.payer;
        //刪掉付款人後的陣列(也就是需付款的人)
        let newSelectMember = payment.selectMember.filter(item => item !== payment.payer);
        //payer的意義要反過來(payer已經付款, 之後的付款人是還未給錢的人)
        result.value.push({
            payers: newSelectMember,
            payee: payer,
            payMoney: x,
            collectMoney: y,
        })
    }
    //分帳計算
    const groupBalances = ref([]);
    function computedResult(){
        groupBalances.value = group.value.map(member => {
            return {
                name: member,
                balance: 0
            }
        });
        //這邊的邏輯是第一個for迴圈要迭代所有成員, 
        //第二個for迴圈要迭代result這個陣列裡面的if要算收款人的餘額, else要算除了收款人的餘額
        //第三個for迴圈要迭代payers的所有成員
        for(let i = 0; i < groupBalances.value.length; i++){
            for(let j = 0; j < result.value.length; j++){
                if(groupBalances.value[i].name == result.value[j].payee){
                    groupBalances.value[i].balance += result.value[j].collectMoney;
                }else{
                    for(let k = 0; k < result.value[j].payers.length; k++){
                        if(groupBalances.value[i].name == result.value[j].payers[k]){
                            groupBalances.value[i].balance -= result.value[j].payMoney;
                        }
                    }
                }
            }
        }
    }
    const list = ref([]);
    function finallyComputed(){
        list.value.length = 0;
        //把付款組和收款組先分開再做計算, 
        const payees = groupBalances.value.filter(member => member.balance > 0);
        const payers = groupBalances.value.filter(member => member.balance < 0);
        //排序是為了呈現最少筆的分帳次數
        payees.sort((a, b) => b.balance - a.balance);
        payers.sort((a, b) => a.balance - b.balance);
        //設index來作為while迴圈的條件, 在amount是要抓出付款者和收款者兩者之間的最小值
        let payeeIndex = 0;
        let payerIndex = 0;
        while(payeeIndex < payees.length && payerIndex < payers.length){
            let payee = payees[payeeIndex];
            let payer = payers[payerIndex];
            let amount = Math.min(Math.abs(payer.balance), payee.balance);
            list.value.push({
                payee: payee.name,
                payer: payer.name,
                amount: amount,
            })
            payee.balance -= amount;
            payer.balance += amount;
            if(payee.balance === 0){
                payeeIndex ++;
            }
            if(payer.balance === 0){
                payerIndex ++;
            }
        }
        console.log(list.value);
    }
    //localstorage
    function saveLocalstorage(){
        localStorage.setItem("groupName", groupName.value);
        localStorage.setItem("group", JSON.stringify(group.value));
        localStorage.setItem("payments", JSON.stringify(payments.value));
        localStorage.setItem("list", JSON.stringify(list.value));
    }
    function readLocalstorage(){
        if(localStorage.getItem("groupName")){
            groupName.value = localStorage.getItem("groupName");
        }
        if(localStorage.getItem("group")){
            group.value = JSON.parse(localStorage.getItem("group"));
        }
        if(localStorage.getItem("payments")){
            payments.value = JSON.parse(localStorage.getItem("payments"));
        }
        if(localStorage.getItem("list")){
            list.value = JSON.parse(localStorage.getItem("list"));
        }
    }
    function finishSplitBill(){
        groupName.value = "";
        group.value.length = 0;
        payments.value.length = 0;
        list.value.length = 0;
        localStorage.clear();
    }
    return { groupName, group, addMember, payments, addPayment, removeMember, removePayment, list, finishSplitBill };
});