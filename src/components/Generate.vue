<template>
  <div class="pt-3">
    <v-row class="d-flex justify-center">
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
    </v-row>
    <transition-group name="fade">
      <v-card
        class="mx-auto pa-3 ma-2 text-center"
        max-width="400"
        v-for="ToDo in ToDos"
        :key="ToDo.id"
      >
        <v-row>
          <v-col cols="8">
            <v-list-item-title class="headline mb-1">{{ ToDo.name }}</v-list-item-title>
          </v-col>
          <v-col cols="4">
            <v-btn icon color="red" @click="deleteToDo(ToDo.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </transition-group>
  </div>
</template>

<script>
import { db } from "../firebase/db";

export default {
  data() {
    return {
      ToDos: [],
      id: 0,
      newItem: ""
    };
  },
  methods: {
    deleteToDo(id) {
      db.collection("ToDos")
        .doc(id)
        .delete();
    },
    async addItem() {
      if (this.newItem) {
        await db.collection("ToDos").add({ 
          name: this.newItem,
          sort: this.id
        });

        this.newItem = "";
        this.id++;
      }
    }
  }
  // firestore: {
  //   ToDos: db.collection("ToDos")
  // }
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
</style>
