<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="entities"
          class="elevation-1 tableWrapper"
          :server-items-length="totalItems"
          :loading="loading"
          :options.sync="options"
          @click:row="onDetailsClick"
          mobile-breakpoint="0"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{ resource }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="Search"
                class="mt-4"
                append-icon="mdi-magnify"
              >
              </v-text-field>
              <v-chip
                v-if="search"
                class="ma-2"
                close
                @click:close="search = ''"
              >
                Clear Filter
              </v-chip>
              <v-tooltip v-if="search" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    class="ma-2"
                    color="primary"
                    @click="openFilterModal"
                    icon="mdi-info"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Filter Active
                  </v-chip>
                </template>
                <span>Click to see the search term</span>
              </v-tooltip>
            </v-toolbar>
          </template>
          <template
            v-if="resource === 'Clients'"
            v-slot:[`item.logo`]="{ item }"
          >
            <v-img
              :src="item.logo"
              aspect-ratio="1"
              width="50"
              class="imgWrapper"
            ></v-img>
          </template>
          <template v-else v-slot:[`item.images`]="{ item }">
            <v-img
              :src="item.images[0]"
              aspect-ratio="1"
              width="50"
              class="imgWrapper"
            ></v-img>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="onDetailsClick(item)">mdi-open-in-new</v-icon>
          </template>
        </v-data-table>
        <v-dialog v-model="filterModal" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Filter Details</span>
            </v-card-title>
            <v-card-text>
              <p>Search Term: {{ search }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeFilterModal">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import axios from "axios";
import { ApiData } from "@/dto/ApiData";
import { DataGridOptions } from "@/dto/DataGridOptions";
import moment from "moment";

@Component
export default class AppTable extends Vue {
  @Prop({ required: true }) resource!: string;
  @Prop({ required: true }) headers!: Array<{ text: string; value: string }>;
  @Prop({ type: Function, required: true }) onDetailsClick!: (
    item: ApiData
  ) => void;
  entities: ApiData[] = [];
  search = "";
  loading = true;
  totalItems = 0;
  options: DataGridOptions = {
    page: 1,
    itemsPerPage: 5,
  };
  filterModal = false;

  @Watch("options")
  onOptionsChanged() {
    this.fetchData();
  }
  @Watch("search")
  onSearchChanged() {
    this.options = { ...this.options, page: 1 };
  }

  async fetchData() {
    try {
      const { page, itemsPerPage } = this.options;
      const response = await axios.get(
        `https://tracktik-challenge.staffr.com/${this.resource}?_page=${page}&_limit=${itemsPerPage}&q=${this.search}`
      );
      this.entities = response.data.map((entity: ApiData) => {
        return {
          ...entity,
          createdAt: entity.createdAt
            ? moment(entity.createdAt).format("YYYY-MM-DD")
            : null,
          updatedAt: entity.updatedAt
            ? moment(entity.updatedAt).format("YYYY-MM-DD")
            : null,
        };
      });
      this.totalItems = response.headers["x-total-count"];
      this.loading = false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  openFilterModal() {
    this.filterModal = true;
  }

  closeFilterModal() {
    this.filterModal = false;
  }
}
</script>

<style scoped>
.imgWrapper {
  border-radius: 50%;
}

.tableWrapper ::v-deep tr {
  min-height: 64px !important;
  height: 64px;
}
</style>
