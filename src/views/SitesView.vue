<template>
  <app-table
    resource="Sites"
    :headers="headers"
    :on-details-click="goToDetails"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppTable from "@/components/AppTable.vue";
import { Site } from "@/dto/Site";

@Component({
  components: {
    AppTable,
  },
})
export default class SitesView extends Vue {
  headers: Array<{ text: string; value: string }> = [
    { text: "Logo", value: "images" },
    { text: "Title", value: "title" },
    { text: "Created At", value: "createdAt" },
    { text: "Updated At", value: "updatedAt" },
    { text: "Actions", value: "actions" },
  ];

  goToDetails(item: Site) {
    this.$router.push({ name: "Sites Details", params: { id: item.id } });
  }
}
</script>