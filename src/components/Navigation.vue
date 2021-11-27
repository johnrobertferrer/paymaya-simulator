<template>
    <v-app>
        <v-toolbar color="primary" class="toolbar" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- <v-chip color="secondary" label>
                {{ roomcode }}
            </v-chip> -->
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute left temporary>
            <center>
                <v-img
                    src="./../assets/logo.png"
                    class="navbar__logo"
                />
                <v-chip color="secondary" class="mb-2" label>
                    {{ roomcode }}
                </v-chip>
                <br>
                <span class="text-md-body-1">{{ version }}</span>
            </center>
            <v-list class="mt-6">
                <v-list-item v-for="item in items" :key="item.title" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <div class="pa-2 mb-4 mx-2">
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
                { title: "Home", icon: "mdi-home" },
                { title: "Players", icon: "mdi-account-box" },
                { title: "Contact", icon: "mdi-gavel" },
            ],
        };
    },
    methods: {
        logout() {
            this.$router.push("/login");
        },
    },
    computed: {
        roomcode() {
            return 'Code: ' + this.$root.roomcode;
        },
        version() {
            return 'Version ' + this.$root.version;
        }
    },
};
</script>

<style scoped>
.v-toolbar__content {
    padding-left: 0px;
    padding-right: 0px;
}

.navbar__logo {
    width: 90%;
    margin-top: 10px;
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
