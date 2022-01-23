<template>
    <div class="wrapper">
        <Navigation v-if="!isLoginRoute">
            <router-view />
        </Navigation>

        <!-- LOGIN PAGE -->
        <div class="login-wrapper" v-if="isLoginRoute">
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
    computed: {
        isLoginRoute() {
            return this.$route.name === 'Login';
        }
    }
};
</script>

<style>
</style>
