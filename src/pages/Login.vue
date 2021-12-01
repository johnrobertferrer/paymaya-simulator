<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height class="px-8">
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Paymaya Send Money Guide</v-toolbar-title>
                            </v-toolbar>
                            <transition-group name="fade">
                                <v-alert type="error" v-for="(error, index) in errors" :key="index" class="mx-3 mt-3 mb-0">
                                    {{ error }}
                                </v-alert>
                            </transition-group>
                            <v-card-text>
                                <v-text-field
                                    autocomplete="off"
                                    prepend-icon="mdi-account"
                                    name="login"
                                    label="Name"
                                    type="text"
                                    v-model="username"
                                    @keyup.enter.prevent="validateRoomcode"
                                    :rules="[
                                        () => !!username || 'This field is required',
                                        () => !!username && username.length <= 15 || 'Name must be less than 15 characters'
                                    ]"
                                    counter="15"
                                ></v-text-field>
                                <v-text-field
                                    id="roomcode"
                                    autocomplete="off"
                                    prepend-icon="mdi-lock"
                                    name="roomcode"
                                    label="Room code"
                                    type="text"
                                    v-model="roomcode"
                                    @keyup.enter.prevent="validateRoomcode"
                                    :rules="[
                                        () =>
                                            !!roomcode ||
                                            'This field is required'
                                    ]"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="secondary" disabled
                                    >Create</v-btn
                                >
                                <v-btn color="primary" @click="validateRoomcode" :disabled="errors.length > 0"
                                    >Join</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        username: "",
        roomcode: "",
        invalidRoomcode: true,
        errors: [],
        processing: false
    }),
    methods: {
        validateRoomcode() {
            if (this.errors.length > 0) { 
                return false; 
            }

            if (this.username == '') {
                this.log('Name is required.');
                return false;
            }

            if (this.username.length > 15) {
                this.log('Name must be less than 15 characters.');
                return false;
            }

            if (this.roomcode == '') {
                this.log('Room code is required.');
                return false;
            }

            if (this.validRoomCodes.includes(this.roomcode)) {
                this.$root.username = this.username;
                this.$root.roomcode = this.roomcode;
                this.$router.push("/");
            } else {
                this.log('Invalid room code.');
                this.invalidRoomcode = false;
            }
        },
        log(message) {
            this.errors.push(message);
            this.clearErrors();
        },
        async clearErrors() {
            await setTimeout(() => { this.errors = [] }, 3500);
        }
    },
    watch: {
        roomcode() {
            this.invalidRoomcode = true;
        }
    },
    computed: {
        validRoomCodes() {
            return this.$root.room.map(room => room.code);
        }
    }
};
</script>

<style scoped>
    #inspire {
        background: #eee;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>