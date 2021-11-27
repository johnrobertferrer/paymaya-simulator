<template>
    <div class="wrapper">
        <Navigation v-if="!$route.path.includes('login')">
            <router-view />
        </Navigation>

        <!-- LOGIN PAGE -->
        <div class="login-wrapper" v-if="$route.path.includes('login')">
            <router-view />
        </div>
    </div>
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

<style>
html {
    overflow: hidden;
}
</style>
