<template>
    <v-app>
        <v-toolbar color="primary" class="toolbar" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon v-show="isHomePage()" :disabled="isSuperadmin" @click.native="addPlayer()">
                <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn icon v-show="isHomePage()" :disabled="isSuperadmin" @click.native="deleteItem()">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer id="navigation" v-model="drawer" absolute left temporary>
            <v-list class="mt-6 flex align-center">
                <center>
                <v-img
                    lazy-src="@/assets/logo.png"
                    src="@/assets/logo.png"
                    class="navbar__logo my-6"
                />
                </center>
                <v-toolbar-title class="subtitle-1 text-center mb-3">{{ username }}</v-toolbar-title>
                <v-toolbar-title class="subtitle-1 text-center mb-3">{{ roomcode }}</v-toolbar-title>
                <v-toolbar-title class="subtitle-1 text-center mb-3">{{ version }}</v-toolbar-title>
            </v-list>
            <v-list class="mt-6">
                <router-link :to="item.route" v-for="item in items" :key="item.title">
                    <v-list-item link class="pl-12" :class="isDisabled(item) ? 'disabled' : ''">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="subtitle-1">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>

            <template>
                <div class="pa-2 mt-8 mx-2">
                    <v-btn block color="secondary" @click="logout">
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <slot></slot>
    </v-app>
</template>

<script>
export default {
    name: "Navigation",
    data() {
        return {
            drawer: false,
            items: [
                { title: "Home", route: "/", icon: "mdi-home" },
                { title: "Players", route: "/players", icon: "mdi-account" },
                { title: "Logs", route: "/", icon: "mdi-folder-search" }
            ],
        };
    },
    methods: {
        logout() {
            this.$router.push("/login");
        },
        isHomePage() {
            return this.$router.currentRoute.name == 'Home';
        },
        isDisabled(item) {
            return item.title === 'Logs';
        }
    },
    computed: {
        roomcode() {
            return 'Code: ' + this.$root.roomcode;
        },
        version() {
            return 'Version ' + this.$root.version;
        },
        username() {
            return 'Name: ' + this.$root.username;
        },
        isSuperadmin() {
            return this.$root.superadmin;
        }
    },
};
</script>

<style scoped>
.v-toolbar__content {
    padding-left: 0px;
    padding-right: 0px;
}

.disabled {
    pointer-events:none; 
    opacity:0.5; 
}

#navigation a {
    text-decoration: none;
}

.navbar__logo {
    width:85%;
}

.toolbar {
    max-height: 64px;
}

@media only screen and (max-width: 959px) {
    .toolbar {
        max-height: 56px;
    }
}
</style>
