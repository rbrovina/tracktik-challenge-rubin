<template>
    <div class="text-center">
      <v-avatar color="primary" @click="dialog = true">
        <span class="iconName" title="Open user profile">AH</span>
      </v-avatar>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>User Details</v-card-title>
          <v-card-text v-if="user">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Given Name:</strong> {{ user.givenName }}</p>
            <p><strong>Locale:</strong> {{ user.locale }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import axios from "axios";
  import { User } from "@/dto/User";
  
  @Component
  export default class Profile extends Vue {
    user: User | null = null;
    dialog: boolean = false;
  
    mounted() {
      this.fetchUserData();
    }
  
    async fetchUserData() {
    try {
      const response = await axios.get(
        `https://tracktik-challenge.staffr.com/me`
      );
      this.user = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  }
  </script>
  
  <style>
    .iconName {
      color: white;
      cursor: pointer;
    }
  </style>
  