<template>
  <v-app :dark="darkMode">
    <v-app-bar app>
      <v-toolbar-title>TrackTik challenge</v-toolbar-title>
      <div class="themeWrapper">
        <span>Theme</span>
        <v-switch
          :value="darkMode"
          @change="toggleDarkMode"
          class="themeSwitcher"
        ></v-switch>
      </div>
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
export default class App extends Vue {
  darkMode = false;

  toggleDarkMode(): void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    this.darkMode = !this.darkMode;
  }
}
</script>

<style>
.headerButtons {
  width: 21rem;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.themeWrapper {
  align-items: center;
  display: flex;
  margin-left: 2rem;
}
.themeSwitcher {
  margin-top: 1.3rem !important;
  margin-left: 0.4rem;
}
</style>
