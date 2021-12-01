<template>
    <div class="wrapper">
        <v-row>
            <v-col cols="12" md="6" class="green lighten-3 py-6 px-10 px-md-12">
                <div class="list-group-item">
                    <v-list-item-title class="headline my-2 text-center font-weight-medium">
                        Waiting
                    </v-list-item-title>
                </div>
                <draggable
                    class="list-group"
                    :list="waitingList"
                    group="people"
                    @change="sync"
                >
                    <div
                        class="list-group-item"
                        v-for="item in waitingList"
                        :key="item.id"
                    >
                        <v-card
                            class="mx-auto mb-2 text-center"
                        >
                            <v-row class="align-center">
                                <v-col class="ticket-id pa-1 pa-md-3">
                                    <v-list-item-title class="green lighten-3" :class="$vuetify.breakpoint.mdAndUp ? 'title' : 'subtitle-1'">
                                        {{ item.id }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="pa-1 pa-md-3">
                                    <v-list-item-title  :class="$vuetify.breakpoint.mdAndUp ? 'title' : 'subtitle-2'">
                                        {{ getPlayerName(item) }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="arrow-button pa-1 pa-md-3">
                                    <v-btn icon color="green" @click.native="move(item.id, 'right')" @touchstart="move(item.id, 'right')">
                                        <v-icon medium>mdi-arrow-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                </draggable>
            </v-col>

            <v-col cols="12" md="6" class="red lighten-3 py-6 px-10 px-md-12">
                <div class="list-group-item">
                    <v-list-item-title class="headline my-2 text-center font-weight-medium">
                        Done
                    </v-list-item-title>
                </div>
                <draggable
                    class="list-group"
                    :list="doneList"
                    group="people"
                    @change="sync"
                >
                    <div
                        class="list-group-item"
                        v-for="item in doneList"
                        :key="item.id"
                    >
                        <v-card
                            class="mx-auto mb-2 text-center"
                        >
                            <v-row class="align-center">
                                <v-col class="ticket-id pa-1 pa-md-3">
                                    <v-list-item-title class="red lighten-3" :class="$vuetify.breakpoint.mdAndUp ? 'title' : 'subtitle-1'">
                                        {{ item.id }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="pa-1 pa-md-3">
                                    <v-list-item-title  :class="$vuetify.breakpoint.mdAndUp ? 'title' : 'subtitle-2'">
                                        {{ getPlayerName(item) }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="arrow-button pa-1 pa-md-3">
                                    <v-btn icon color="red" @click.native="move(item.id, 'left')" @touchstart="move(item.id, 'left')">
                                        <v-icon medium>mdi-arrow-left</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                </draggable>
            </v-col>
        </v-row>
    </div>
</template>

<script>
var debounce = require('lodash.debounce');

import draggable from "vuedraggable";
import firestoreMixins from "../mixins/firestore";

export default {
    name: "Home",
    mixins: [firestoreMixins],
    components: {
        draggable,
    },
    data() {
        return {
            waitingList: [],
            doneList: [],
            players: [
                {
                    id: 1,
                    name: 'Jobs',
                    contact: '12345'
                },
                {
                    id: 2,
                    name: 'Joy',
                    contact: '12345'
                },
                {
                    id: 3,
                    name: 'Ced',
                    contact: '12345'
                },
                {
                    id: 4,
                    name: 'Ericka',
                    contact: '12345'
                }
            ]
        };
    },
    created() {
        this.move = debounce(this.move, 200);
    },
    mounted() {
        this.setSequenceList();
    },
    methods: {
        add() {
            this.list.push({ name: "Juan" });
        },
        replace() {
            this.list = [{ name: "Edgard" }];
        },
        clone(el) {
            return {
                name: el.name + " cloned",
            };
        },
        sync() {
            let sequenceList = JSON.stringify({
                waiting: this.waitingList,
                done: this.doneList
            });

            let id = this.$root.roomData.id;
            let data = Object.assign(this.$root.roomData, {
                sequence_list: sequenceList
            });

            this.updateRecord(id, data);
        },
        afterUpdateRecord() {
            this.setSequenceList();
        },
        setSequenceList() {
            if (this.$root.roomData === null) { return }

            let list = JSON.parse(this.$root.roomData.sequence_list);
            this.waitingList = list.waiting;
            this.doneList = list.done;
        },
        move(id, location) {
            if (location == 'right') {
                let data = this.waitingList.find(data => data.id == id);
                this.waitingList = this.waitingList.filter(data => data.id != id);
                this.doneList = [data, ...this.doneList];
            } else {
                let data = this.doneList.find(data => data.id == id);
                this.doneList = this.doneList.filter(data => data.id != id);
                this.waitingList = [data, ...this.waitingList];
            }

            this.sync();
        },
        getPlayerName(item) {
            let from = this.players.find(player => player.id === item.from);
            let to = this.players.find(player => player.id === item.to);

            return from.name + ' to ' + to.name;
        },

        // generator
        generate(maximum = 4) {
            let from, to;
            let sequence = [];

            for (let i = 0; i < maximum; i++) {
                for (let j = 0; j < maximum; j++) {
                    from = i + 1;
                    to = j + 1;

                    if (from == to) {
                        continue;
                    }
                    if (from == maximum) {
                        continue;
                    }
                    if (from > to) {
                        continue;
                    }
                    sequence.push({ from, to });

                    if (to == maximum) {
                        from++;
                    }
                    if (from == to) {
                        from = 1;
                    }
                    sequence.push({ from: to, to: from });
                }
            }

            sequence = this.transformSequence(sequence);
            this.waitingList = sequence;
        },
        transformSequence(sequence) {
            let data = [];

            for (let i = 0; i < sequence.length; i++) {
                data.push({
                    id: i+1,
                    from: sequence[i].from,
                    to: sequence[i].to,
                    status: 1
                });
            }

            return data;
        },
    },
    watch: {
        roomData: {
            handler(){
                this.setSequenceList();
            },
            deep: true
        }
    },
    computed: {
        roomData() {
            return this.$root.roomData;
        }
    }
};
</script>

<style scoped>
    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .ticket-id {
        max-width: 100px;
    }

    .arrow-button {
        max-width: 64px;
    }

    @media only screen and (max-width: 959px) {
        .ticket-id {
            max-width: 60px;
        }

        .arrow-button {
            max-width: 46px;
        }
    }
</style>
