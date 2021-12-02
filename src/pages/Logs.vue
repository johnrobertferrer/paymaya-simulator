<template>
    <div class="my-4 my-md-8 ml-0 mr-6 mr-md-8">
        <v-timeline dense>
            <v-slide-x-reverse-transition group hide-on-leave>
                <v-timeline-item
                    v-for="(log, index) in logs"
                    :key="index"
                    color="grey darken-3"
                    small
                    fill-dot
                >
                    <v-alert color="grey darken-3" class="white--text">
                        <v-card-text class="subtitle-1 py-0">
                            <span class="font-weight-black"> Timestamp: </span>
                            <span> {{ log.timestamp }} </span>
                        </v-card-text>
                        <v-card-text class="subtitle-1 py-0">
                            <span class="font-weight-black"> Username: </span>
                            <span> {{ log.username }} </span>
                        </v-card-text>
                        <v-card-text class="subtitle-1 py-0">
                            <span class="font-weight-black"> Card ID: </span>
                            <span> {{ log.ticket.id }} </span>
                        </v-card-text>
                        <v-card-text class="subtitle-1 py-0">
                            <span class="font-weight-black"> Card Title: </span>
                            <span> {{ log.ticket.name }} </span>
                        </v-card-text>
                        <v-card-text class="subtitle-1 py-0">
                            <span class="font-weight-black"> Action: </span>
                            <span> {{ log.action }} </span>
                        </v-card-text>
                    </v-alert>
                </v-timeline-item>
            </v-slide-x-reverse-transition>
        </v-timeline>
    </div>
</template>

<script>
export default {
    name: "Logs",
    computed: {
        roomData() {
            return this.$root.roomData;
        },
        logs() {
            return this.roomData !== null && this.roomData.logs !== ""
                ? JSON.parse(this.roomData.logs)
                : [];
        },
    },
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
