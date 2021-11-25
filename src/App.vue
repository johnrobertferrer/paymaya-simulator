<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>PayMaya Simulator</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <List />
    </v-content>
  </v-app>
</template>

<script>
import List from "./components/List";
export default {
  name: "App",
  components: {
    List,
  },
  data: () => ({}),
};
</script>
