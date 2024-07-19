<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>TrackTik challenge</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="headerButtons">
        <v-btn text to="/">Client View</v-btn>
        <v-btn text to="/sites">Sites View</v-btn>
        <profile></profile>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Profile from "@/components/Profile.vue";

@Component({
  components: {
    Profile,
  },
})
export default class App extends Vue {}
</script>

<style>
.headerButtons {
  width: 21rem;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
</style>
