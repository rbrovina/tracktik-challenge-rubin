<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card v-if="entity" class="mx-auto">
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in entity.images"
              :key="i"
              :src="item"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
          <v-card-title>
            {{ entity.title }}
          </v-card-title>
          <v-card-subtitle> ID: {{ entity.id }} </v-card-subtitle>
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Created At</v-list-item-title>
                    <v-list-item-subtitle>{{
                      new Date(entity.createdAt).toISOString().split('T')[0]
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Name</v-list-item-title>
                    <v-list-item-subtitle>{{
                      entity.contacts.main.firstName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Updated At</v-list-item-title>
                    <v-list-item-subtitle>{{
                      new Date(entity.updatedAt).toISOString().split('T')[0]
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{
                      entity.contacts.main.email
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { SiteDetails } from "@/dto/SiteDetails"

@Component
export default class SitesDetailsView extends Vue {
  entity: SiteDetails | null = null;

  created() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const id = this.$route.params.id;
      const response = await axios.get(
        `https://tracktik-challenge.staffr.com/sites/${id}`
      );
      this.entity = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
