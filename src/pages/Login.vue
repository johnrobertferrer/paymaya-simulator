<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Paymaya Send Money Guide</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <!-- <v-text-field
                                    prepend-icon="mdi-account"
                                    name="login"
                                    label="Login"
                                    type="text"
                                ></v-text-field> -->
                                <v-text-field
                                    id="roomcode"
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
                                <v-btn color="primary" @click="validateRoomcode"
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
        roomcode: "",
        invalidRoomcode: true,
    }),
    methods: {
        validateRoomcode() {
            if (this.validRoomCodes.includes(this.roomcode)) {
                this.$root.roomcode = this.roomcode;
                this.$router.push("/");
            } else {
                this.invalidRoomcode = false;
            }
        },
    },
    watch: {
        roomcode() {
            this.invalidRoomcode = true;
        },
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
</style>