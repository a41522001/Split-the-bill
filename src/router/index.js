import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"; 
import CreateGroup from "../views/CreateGroup.vue";
import Group from "../views/Group.vue"; 
import Payment from "../views/Payment.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/createGroup",
        name: "createGroup",
        component: CreateGroup
    },
    {
        path: "/group",
        name: "group",
        component: Group
    },
    {
        path: "/payment",
        name: "payment",
        component: Payment
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;