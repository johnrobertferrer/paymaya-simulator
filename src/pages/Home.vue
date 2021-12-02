<template>
    <div class="wrapper">
        <v-row>
            <v-col
                v-show="waitingList.length > 0"
                cols="12"
                :md="doneList.length > 0 ? '6' : '12'"
                class="green lighten-3 py-6 px-10 px-md-12"
            >
                <div class="list-group-item">
                    <v-list-item-title
                        class="headline my-2 text-center font-weight-medium"
                    >
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
                        <v-card class="mx-auto mb-2 text-center">
                            <v-row class="align-center">
                                <v-col class="ticket-id pa-1 pa-md-3">
                                    <v-list-item-title
                                        class="green lighten-3"
                                        :class="
                                            $vuetify.breakpoint.mdAndUp
                                                ? 'title'
                                                : 'subtitle-1'
                                        "
                                    >
                                        {{ item.id }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="pa-1 pa-md-3">
                                    <v-list-item-title
                                        :class="
                                            $vuetify.breakpoint.mdAndUp
                                                ? 'title'
                                                : 'subtitle-2'
                                        "
                                    >
                                        {{ getPlayerName(item) }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="arrow-button pa-1 pa-md-3">
                                    <v-btn
                                        icon
                                        color="green"
                                        @click.native="move(item.id, 'right')"
                                        @touchstart="move(item.id, 'right')"
                                    >
                                        <v-icon medium>mdi-arrow-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                </draggable>
            </v-col>

            <v-col
                v-show="doneList.length > 0"
                cols="12"
                :md="waitingList.length > 0 ? '6' : '12'"
                class="red lighten-3 py-6 px-10 px-md-12"
            >
                <div class="list-group-item">
                    <v-list-item-title
                        class="headline my-2 text-center font-weight-medium"
                    >
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
                        <v-card class="mx-auto mb-2 text-center">
                            <v-row class="align-center">
                                <v-col class="ticket-id pa-1 pa-md-3">
                                    <v-list-item-title
                                        class="red lighten-3"
                                        :class="
                                            $vuetify.breakpoint.mdAndUp
                                                ? 'title'
                                                : 'subtitle-1'
                                        "
                                    >
                                        {{ item.id }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="pa-1 pa-md-3">
                                    <v-list-item-title
                                        :class="
                                            $vuetify.breakpoint.mdAndUp
                                                ? 'title'
                                                : 'subtitle-2'
                                        "
                                    >
                                        {{ getPlayerName(item) }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col class="arrow-button pa-1 pa-md-3">
                                    <v-btn
                                        icon
                                        color="red"
                                        @click.native="move(item.id, 'left')"
                                        @touchstart="move(item.id, 'left')"
                                    >
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
var debounce = require("lodash.debounce");

import dateFormat from "dateformat";
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
            logs: [],
        };
    },
    created() {
        this.move = debounce(this.move, 200);
    },
    mounted() {
        this.setSequenceList();
        this.setLogs();
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
        resetItems() {
            this.$root.event = '';
            this.logs = [];
            this.waitingList = [];
            this.doneList = [];

            this.generate(11);
            this.processSyncing();
        },
        resetAllStatus() {
            for (let i = 0; i < this.waitingList.length; i++) {
                this.waitingList[i].status = 1;
            }

            for (let i = 0; i < this.doneList.length; i++) {
                this.doneList[i].status = 2;
            }
        },
        sync(actionData = {}, action = "drag") {
            // this.resetAllStatus();

            this.logs.push({
                ticket: this.getTicket(action, actionData),
                action: this.generateUserAction(action, actionData),
                timestamp: this.generateTimestamp(),
                username: this.$root.username,
            });

            this.processSyncing();
        },
        processSyncing() {
            let sequenceList = JSON.stringify({
                waiting: this.waitingList,
                done: this.doneList,
            });

            let data = Object.assign(this.$root.roomData, {
                sequence_list: sequenceList,
                logs: JSON.stringify(this.logs),
            });

            let id = this.$root.roomData.id;

            this.updateRecord(id, data);
        },
        generateUserAction(action, data) {
            let userAction = "";

            if (action == "move") {
                let list =
                    data.location === "left" ? "Waiting List" : "Done List";

                userAction = `Moved to ${list}, old row index is ${data.index} and new row index is 0`;
            } else {
                let key = "";
                if (Object.prototype.hasOwnProperty.call(data, "moved")) {
                    key = "moved";
                    let oldIndex = data[key].oldIndex;
                    let newIndex = data[key].newIndex;

                    userAction = `Dragged from row index ${oldIndex} to row index ${newIndex}`;
                } else if (
                    Object.prototype.hasOwnProperty.call(data, "added")
                ) {
                    key = "added";
                    let newIndex = data[key].newIndex;
                    let list =
                        data[key].element.status === 1
                            ? "Waiting List"
                            : "Done List";
                    userAction = `Added to ${list}, new row index is ${newIndex}`;
                } else {
                    key = "removed";
                    let oldIndex = data[key].oldIndex;
                    let list =
                        data[key].element.status === 2
                            ? "Waiting List"
                            : "Done List"; //reverse since it is removed
                    userAction = `Removed from ${list}, old row index is ${oldIndex}`;
                }
            }

            return userAction;
        },
        getTicket(action, data) {
            let key = "moved";

            if (Object.prototype.hasOwnProperty.call(data, "moved")) {
                key = "moved";
            } else if (Object.prototype.hasOwnProperty.call(data, "added")) {
                key = "added";
            } else {
                key = "removed";
            }

            let id = action == "move" ? data.ticket.id : data[key].element.id;
            let name =
                action == "move"
                    ? data.ticket.name
                    : this.getPlayerName(data[key].element);

            return {
                id: id,
                name: name,
            };
        },
        generateTimestamp() {
            return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        },
        afterUpdateRecord() {
            this.setSequenceList();
        },
        setSequenceList() {
            if (this.$root.roomData === null) {
                return;
            }

            let list = JSON.parse(this.$root.roomData.sequence_list);
            this.waitingList = list.waiting;
            this.doneList = list.done;
        },
        setLogs() {
            if (this.$root.roomData === null) {
                return;
            }

            this.logs = JSON.parse(this.$root.roomData.logs);
        },
        move(id, location) {
            let key = location === "right" ? "waitingList" : "doneList";
            let index = this[key].findIndex((data) => data.id === id);
            let data = this[key][index];

            if (location == "right") {
                this.waitingList = this.waitingList.filter(
                    (data) => data.id != id
                );
                this.doneList = [data, ...this.doneList];
            } else {
                this.doneList = this.doneList.filter((data) => data.id != id);
                this.waitingList = [data, ...this.waitingList];
            }

            this.sync(
                {
                    index: index,
                    location: location,
                    ticket: {
                        id: data.id,
                        name: this.getPlayerName(data),
                    },
                },
                "move"
            );
        },
        getPlayerName(item) {
            let from = this.players.find((player) => player.id === item.from);
            let to = this.players.find((player) => player.id === item.to);

            return from.name + " to " + to.name;
        },
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
                    id: i + 1,
                    from: sequence[i].from,
                    to: sequence[i].to,
                    status: 1,
                });
            }

            return data;
        },
    },
    watch: {
        roomData: {
            handler() {
                this.setSequenceList();
                this.setLogs();
            },
            deep: true,
        },
        hasPendingEvent: {
            handler() {
                let event = this.$root.event;

                if (event !== '') {
                    this[event]();
                }
            },
            deep: true,
        },
    },
    computed: {
        roomData() {
            return this.$root.roomData;
        },
        players() {
            return this.roomData.players !== ""
                ? JSON.parse(this.roomData.players)
                : [];
        },
        hasPendingEvent() {
            return this.$root.event !== '';
        }
    },
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
