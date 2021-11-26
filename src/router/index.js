import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";

Vue.use(Router);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new Router({
    routes,
});

export default router;
