<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>PayMaya Guide</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <!-- <v-text-field
                                    prepend-icon="mdi-account"
                                    name="login"
                                    label="Login"
                                    type="text"
                                ></v-text-field> -->
                                <v-text-field
                                    id="passcode"
                                    prepend-icon="mdi-lock"
                                    name="passcode"
                                    label="Passcode"
                                    type="text"
                                    v-model="passcode"
                                    @keyup.enter.prevent="validatePasscode"
                                    :rules="[
                                        () =>
                                            !!passcode ||
                                            'This field is required',
                                        () =>
                                            invalidPasscode == true ||
                                            'Invalid passcode',
                                    ]"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="validatePasscode"
                                    >Login</v-btn
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
        passcode: "",
        invalidPasscode: true,
    }),
    methods: {
        validatePasscode() {
            if (this.passcode === "paymaya") {
                this.$root.passcode = this.passcode;
                this.$router.push("/");
            } else {
                this.invalidPasscode = false;
            }
        },
    },
    watch: {
        passcode() {
            this.invalidPasscode = true;
        },
    },
};
</script>
