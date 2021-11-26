import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: (h) => h(App),
    data() {
        return {
            passcode: "",
        };
    },
}).$mount("#app");

if (router.currentRoute.name !== "Login") {
    router.replace("/login");
}
