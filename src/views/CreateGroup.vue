<script setup>
    import { ref, computed } from "vue";
    import { useRouter } from "vue-router";
    import { useSplitBillStore } from "../stores/splitBillStore";
    const router = useRouter();
    const splitBillStore = useSplitBillStore();
    const group = computed(() => splitBillStore.group);
    const groupName = computed({
        get: () => splitBillStore.groupName,
        set: (value) => splitBillStore.groupName = value
    });
    const memberName = ref("");
    //輸入錯誤處理
    const groupError = ref(false);
    const memberError = ref(false);
    const handlerErrorMessage = ref(null);
    const memberErrorMessage = computed(() => {
        switch(handlerErrorMessage.value){
            case 1:
                return "請輸入成員名稱";
                break;
            case 2:
                return "成員請勿低於2人";
                break;
            case 3:
                return "已經有重複的成員";
                break;
            case 4:
                return "分帳未完成，請勿刪除成員";
                break;
        }
    }) 
    function clearError(){
        handlerErrorMessage.value = null;
        memberError.value = false;
        groupError.value = false;
    }
    function addMember(){
        clearError();
        if(memberName.value === ""){
            handlerErrorMessage.value = 1;
            memberError.value = true;
            return;
        }
        for(let member of group.value){
            if(member === memberName.value){
                handlerErrorMessage.value = 3;
                memberError.value = true;
                return;
            }
        }
        splitBillStore.addMember(memberName.value);
        memberName.value = "";
    }
    function addGroup(){
        clearError();
        if(groupName.value == ""){
            groupError.value = true;
            return;
        }
        if(group.value.length < 2){
            handlerErrorMessage.value = 2;
            memberError.value = true;
            return;
        }
        router.push({name: "group"});
    }
    function removeMember(index){
        clearError();
        if(splitBillStore.payments.length !== 0){
            handlerErrorMessage.value = 4;
            memberError.value = true;
            return;
        }
        splitBillStore.removeMember(index);
    }
    
</script>

<template>
    <div class="wrap">
        <header>
            <div class="title">
                <h1>分帳應用程式</h1>
            </div>
        </header>
        <div class="content">
            <div class="input-group">
                <label for="group-name">分帳群組名</label><span v-show="groupError">請填寫群組名</span>
                <input type="text" id="group-name" v-model="groupName">
            </div>
            <div class="input-group">
                <label for="member-name">成員名稱</label><span v-show="memberError">{{ memberErrorMessage }}</span>
                <div class="member-input">
                    <input type="text" id="member-name" v-model="memberName">
                <button @click="addMember()">新增</button>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(member, index) in group" :key="index">
                <p>{{ member }}</p>
                <span @click="removeMember(index)">&times</span>
            </li>
        </ul>
        <button class="add-group-btn" @click="addGroup()">建立群組</button>
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
    .title{
        background-color: #635DA2;
        padding: 20px 0;
        text-align: center;
        color: #fff;
    }
    .content{
        padding: 30px 30px 0 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .input-group{
        margin-bottom: 20px;
        flex-grow: 1;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .input-group label{
        font-size: 1.15rem;
        margin-bottom: 5px;
    }
    .input-group span{
        color: #f00;
        position: absolute;
        top: 0;
        right: 0;
    }
    .input-group button{
        padding: 0 20px;
        border: none;
        border-radius: 0 8px 8px 0;
        background-color: #5D7AA2;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        flex-basis: 80px;
        flex-shrink: 0;
    }
    .input-group button:hover{
        background-color: rgba(0, 0, 0, .5);
    }
    .member-input{
        display: flex;
        width: 100%;
    }
    #member-name{
        border-width: 2px 0 0 2px;
        border-color: rgb(243, 244, 246);
        border-style: solid;
        border-radius: 10px 0 0 10px;
        flex-shrink: 1;
        flex-grow: 1;
        min-width: 0;
    }
    input{
        flex-grow: 1;
        padding: 8px 20px;
        background-color: rgb(231, 231, 231);
        border: 2px rgb(243, 244, 246) solid;
        font-size: 16px;
        outline: none;
        border-radius: 10px;
    }
    ul{
        padding: 0 30px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }
    li{
        padding: 0 25px 0 12px;
        border: 1px #333 solid;
        border-radius: 8px;
        position: relative;
    }
    li p{
        line-height: 1.8;
    }
    li span{
        position: absolute;
        right: 2px;
        top: 0;
        cursor: pointer;
    }
    .add-group-btn{
        align-self: center;
        margin: 60px 0 10px 0;
        padding: 15px 100px;
        border: none;
        border-radius: 20px;
        background-color: #855DA2;
        color: #fff;
        font-size: 1.1rem;
        cursor: pointer;
        
    }
    .add-group-btn:hover{
        background-color: rgba(0, 0, 0, .5);
        transform: scale(1.05);
    }
    @media (max-width: 575px) {
        .add-group-btn{
            padding: 15px 50px;
            font-size: 1rem;
        }
    }
    
</style>
