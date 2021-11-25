<template>
  <div class="pt-3">
    <v-row class="d-flex justify-center" v-if="superadmin">
      <v-col cols="6" md="3" sm="6" xs="6">
        <v-text-field
          label="Add Item"
          outlined
          v-model="newItem"
          @keyup.enter.prevent="addItem"
        ></v-text-field>
      </v-col>
      <v-col cols="1" md="1">
        <v-btn large color="primary" @click.prevent="addItem">Add</v-btn>
      </v-col>
      <v-col cols="1" md="1">
        <v-btn large color="secondary" @click.prevent="generate()">Generate</v-btn>
      </v-col>
    </v-row>
    <transition-group name="fade">
      <div class="pending-card" key="pending">
        <v-card
          class="mx-auto pa-3 ma-2 text-center"
          :class="{ 'active' : index==0 }"
          max-width="400"
          v-for="(item, index) in sortedItem"
          :key="item.id"
        >
          <v-row>
            <v-col cols="8">
              <v-list-item-title class="headline mb-1">{{ item.label }}</v-list-item-title>
            </v-col>
            <v-col cols="4">
              <v-btn icon color="red" @click="deleteItem(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { db } from "../firebase/db";

export default {
  data() {
    return {
      item: [],
      room: [],
      newItem: "",
      counter: 0,
      players: [
        { id: 1, name: 'Jobs' },
        { id: 2, name: 'Joy' },
        { id: 3, name: 'Cedric' },
        { id: 4, name: 'Ericka' }
      ],
      superadmin: false
    };
  },
  mounted() {
  },
  methods: {
    async deleteItem(id) {
      // const test = await db.collection("item")
      //   .doc(id)
      //   .get();

      //   console.log(test.data());
      db.collection("item")
        .doc(id)
        .delete();
    },
    async addItem() {
      if (this.newItem) {
        await db.collection("item").add({ 
          label: this.newItem,
          sort: this.counter
        });

        this.newItem = "";
        this.counter++;
      }
    },
    async bulkInsert(data) {
      for (let i=0; i<data.length; i++) {
        await db.collection("item").add({ 
          label: data[i].label,
          sort: data[i].sort
        });
      }

      this.newItem = "";
    },
    generate(maximum = 4) {
      let from, to;
      let sequence = [];

      for (let i = 0; i < maximum; i++) {
        for (let j = 0; j < maximum; j++) {
          from = i + 1;
          to = j + 1;

          if (from == to) { continue }
          if (from == maximum) { continue }
          if (from > to) { continue }
          sequence.push({ from, to });

          if (to == maximum) { from++; }
          if (from == to) { from = 1; }
          sequence.push({ from: to, to: from });
        }
      }

      console.log('sequence 1', sequence);
      sequence = this.transformSequence(sequence);
      console.log('sequence 2', sequence);
      this.bulkInsert(sequence);
    },
    transformSequence(sequence) {
      let data = [];

      for (let i=0; i<sequence.length; i++) {
        let label = this.getPlayerName(sequence[i].from) + ' => ' + this.getPlayerName(sequence[i].to);
        data.push({
          sort: i,
          label: label
        });
      }

      return data;
    },
    getPlayerName(playerId) {
      let player = this.players.find(player => player.id == playerId)
      return player.name != '' ? player.name : 'Player ' + playerId;
    }
  },
  computed: {
    sortedItem() {
      return [...this.item].sort((a, b) => (a.sort > b.sort) ? 1 : -1) || [];
    }
  },
  firestore: {
    item: db.collection("item"),
    room: db.collection("room")
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.active {
  background: #444 !important;
  color: white !important;
}
.pending-card {
  max-height: 700px;
  max-width: 50%;
  overflow: auto;
}
</style>
