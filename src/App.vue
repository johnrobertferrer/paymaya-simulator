<template>
    <v-app>
        <Navigation v-if="!$route.path.includes('login')">
            <router-view></router-view>
        </Navigation>

        <v-content v-if="$route.path.includes('login')">
            <keep-alive :include="['Login']">
                <router-view></router-view>
            </keep-alive>
        </v-content>
    </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
    name: "App",
    components: {
        Navigation,
    },
};
</script>
