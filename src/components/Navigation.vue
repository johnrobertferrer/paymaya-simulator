<template>
    <v-app>
        <v-toolbar color="primary" class="toolbar" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>PayMaya Guide</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-chip color="secondary" label>
                {{ roomName }}
            </v-chip>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute bottom temporary>
            <v-list>
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
                <div class="pa-2">
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
                { title: "Home", icon: "mdi-view-dashboard" },
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
        roomName() {
            return 'Code: ' + this.$root.passcode;
        },
    },
};
</script>

<style scoped>
.v-toolbar__content {
    padding-left: 0px;
    padding-right: 0px;
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
