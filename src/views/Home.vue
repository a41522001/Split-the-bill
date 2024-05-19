<script setup>
    import { useRouter } from "vue-router";
    const router = useRouter();
    function goToHome(){
        router.push({name: "createGroup"});
    }
</script>

<template>
    <div class="wrap">
        <header>
            <div class="title">
                <h1>分帳應用程式</h1>
            </div>
            <div class="content">
                <h2>功能說明:</h2>
                <p>可以建立分帳群組，新增分帳成員，
                    用戶可添加分帳事件並記錄付款人與金額，
                    最後再根據群組成員來進行計算，可查看每位成員應分攤的金額。</p>
            </div>
        </header>
        <button @click="goToHome()">開始使用</button>
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
        height: 500px;
        border-radius: 0 0 20px 20px;
    }
    .title{
        background-color: #635DA2;
        padding: 20px 0;
        text-align: center;
        color: #fff;
    }
    .content{
        padding: 30px 20px;
    }
    .content h2{
        padding: 10px 0;
    }
    .content p{
        margin-top: 15px;
        font-size: 1.25rem;
    }
    button{
        margin-top: 80px;
        align-self: center;
        padding: 10px 45px;
        border: none;
        border-radius: 20px;
        background-color: #5D7AA2;
        color:#fff;
        font-size: 1rem;
        cursor: pointer;
    }
    button:hover{
        transform: scale(1.05);
        background-color: rgba(0, 0, 0, .8);
    }
</style>
