import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import { firestorePlugin } from "vuefire";
import firestoreMixins from "./mixins/firestore";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: (h) => h(App),
    mixins: [firestoreMixins],
    data() {
        return {
            roomcode: '',
            version: '1.0.0.0'
        };
    },
    computed: {
        roomData() {
            return this.room.filter((data) => data.code == this.roomcode)[0] || null;
        },
    },
}).$mount("#app");

if (router.currentRoute.name !== "Login") {
    router.replace("/login");
}
