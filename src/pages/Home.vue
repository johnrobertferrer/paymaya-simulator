<template>
    <div class="wrapper">
        <v-row>
            <v-col cols="12" md="6" class="green lighten-3 py-6 px-8 px-md-12">
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
                            <v-row>
                                <v-col cols="2">
                                    <v-list-item-title class="title green lighten-3">
                                        {{ item.id }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col cols="8">
                                    <v-list-item-title class="title">
                                        {{ item.name }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon color="green" @click.native="moveItem(item.id, 'right')">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                </draggable>
            </v-col>

            <v-col cols="12" md="6" class="red lighten-3 py-6 px-8 px-md-12">
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
                            <v-row>
                                <v-col cols="2">
                                    <v-list-item-title class="title red lighten-3">
                                        {{ item.id }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col cols="8">
                                    <v-list-item-title class="title">
                                        {{ item.name }}
                                    </v-list-item-title>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon color="red" @click.native="moveItem(item.id, 'left')">
                                        <v-icon>mdi-arrow-left</v-icon>
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
        };
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
        moveItem(id, location) {
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
        }
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
        },
    }
};
</script>

<style scoped>
    .row {
        margin-left: 0px;
        margin-right: 0px;
    }
</style>
