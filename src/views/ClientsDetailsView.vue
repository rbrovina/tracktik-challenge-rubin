<template>
  <v-container v-if="entity">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mx-auto">
          <v-img :src="entity.logo" aspect-ratio="2"></v-img>
          <v-card-title>
            {{ entity.givenName }}
          </v-card-title>
          <v-card-subtitle> ID: {{ entity.id }} </v-card-subtitle>
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Created At</v-list-item-title>
                    <v-list-item-subtitle>{{
                      formatDate(entity.createdAt)
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Updated At</v-list-item-title>
                    <v-list-item-subtitle>{{
                      formatDate(entity.updatedAt)
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" md="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Tags</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip-group>
                        <v-chip v-for="tag in entity.tags" :key="tag">{{
                          tag
                        }}</v-chip>
                      </v-chip-group>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="successSnackbar"
      bottom
      right
      timeout="1500"
      color="green"
    >
      Client {{ entity.givenName }} loaded successfully.
    </v-snackbar>
    <v-snackbar
      v-model="failureSnackbar"
      bottom
      right
      timeout="1500"
      color="red"
    >
      Error loading client data. Please try again later.
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ClientDetails } from "@/dto/ClientDetails";
import moment from "moment";

@Component
export default class ClientsDetailsView extends Vue {
  entity: ClientDetails | null = null;
  successSnackbar = false;
  failureSnackbar = false;

  created() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const id = this.$route.params.id;
      const response = await axios.get(
        `https://tracktik-challenge.staffr.com/clients/${id}`
      );
      this.entity = response.data;
      this.successSnackbar = true;
    } catch (error) {
      console.error("Error fetching data:", error);
      this.failureSnackbar = true;
    }
  }

  formatDate(date: string): string {
    return date ? moment(date).format("YYYY-MM-DD") : "";
  }
}
</script>
