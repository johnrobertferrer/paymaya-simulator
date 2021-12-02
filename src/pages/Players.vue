<template>
    <div class="wrapper">
        <v-row class="align-center py-3">
            <v-col>
                <v-subheader class="title">Total Players: {{ totalPlayers }}</v-subheader>
            </v-col>
            <v-col class="add-button-wrapper">
                <v-btn color="red" class="lighthen-2" @click.native="addPlayer" :disabled="!isSuperadmin" block dark>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="totalPlayers > 0" class="grey lighten-4 py-6">
            <v-col
                cols="12"
                v-for="(player, index) in players" :key="index"
            >
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="player.name"
                            :label='"Player " + player.id + " Name"'
                            @keyup.native="sync"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="player.contact"
                            :label='"Player " + player.id + " Contact"'
                            @keyup.native="sync"
                        ></v-text-field>
                    </v-col>
                    <v-col class="delete-player-wrapper">
                        <v-btn icon color="red" @click.native="deletePlayer(player.id)" :disabled="!isSuperadmin">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
var debounce = require('lodash.debounce');

import firestoreMixins from "../mixins/firestore";

export default {
    name: "Players",
    mixins: [firestoreMixins],
    components: {
    },
    data() {
        return {
            players: []
        };
    },
    created() {
        this.sync = debounce(this.sync, 800);
    },
    mounted() {
        this.setPlayers();
    },
    methods: {
        add() {
            this.list.push({ name: "Juan" });
        },
        replace() {
            this.list = [{ name: "Edgard" }];
        },
        sync() {
            let id = this.$root.roomData.id;
            let data = Object.assign(this.$root.roomData, {
                players: JSON.stringify(this.players)
            });

            this.updateRecord(id, data);
        },
        addPlayer() {
            if (!this.isSuperadmin) { return }

            let max = this.totalPlayers;

            if (max == 11) { 
                window.alert('Maximum player: 11');
                return false;
            }

            this.players.push({ id: max+1, name: '' });
            this.sync();
        },
        deletePlayer(id) {
            if (!this.isSuperadmin) { return }

            let players = this.players.filter(player => player.id !== id);

            this.players = this.resetPlayerIds(players);
            this.sync();
        },
        resetPlayerIds(players) {
            let data = [];

            for (let i=0; i<players.length; i++) {
                data.push(Object.assign({}, players[i], { id: (i+1) }));
            }

            return data;
        },
        setPlayers() {
            if (this.$root.roomData === null) { return }

            let players = JSON.parse(this.$root.roomData.players);

            this.players = players;
        }
    },
    watch: {
        roomData: {
            handler(){
                this.setPlayers();
            },
            deep: true
        }
    },
    computed: {
        roomData() {
            return this.$root.roomData;
        },
        totalPlayers() {
            return this.players.length;
        },
        isSuperadmin() {
            return this.$root.superadmin;
        }
    }
};
</script>

<style scoped>
    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .row .col {
        padding-top: 0;
        padding-bottom: 0;
    }

    .add-button-wrapper {
        max-width: 84px;
    }

    .delete-player-wrapper {
        max-width: 56px;
    }
</style>
