<template>
  <app-table
    resource="Clients"
    :headers="headers"
    :on-details-click="goToDetails"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppTable from "@/components/AppTable.vue";
import { Client } from "@/dto/Client";

@Component({
  components: {
    AppTable,
  },
})
export default class ClientsView extends Vue {
  headers: Array<{ text: string; value: string }> = [
    { text: "Logo", value: "logo" },
    { text: "Title", value: "givenName" },
    { text: "Created At", value: "createdAt" },
    { text: "Updated At", value: "updatedAt" },
    { text: "Actions", value: "actions" },
  ];

  goToDetails(item: Client) {
    this.$router.push({ name: "Clients Details", params: { id: item.id } });
  }
}
</script>
