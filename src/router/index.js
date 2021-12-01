import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Players from "../pages/Players.vue";

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
    {
        path: "/players",
        name: "Players",
        component: Players,
        meta: {
            requiresAuth: true,
        },
    }
];

const router = new Router({
    mode: 'history',
    routes,
});

export default router;
