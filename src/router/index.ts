import Vue from "vue";
import VueRouter from "vue-router";
import ClientsView from "@/views/ClientsView.vue";
import ClientsDetailsView from "@/views/ClientsDetailsView.vue";
import SitesView from "@/views/SitesView.vue";
import SitesDetailsView from "@/views/SitesDetailsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Clients",
    component: ClientsView,
  },
  {
    path: "/details/:id",
    name: "Clients Details",
    component: ClientsDetailsView,
    props: true,
  },
  {
    path: "/sites/",
    name: "Sites",
    component: SitesView,
  },
  {
    path: "/sites/:id",
    name: "Sites Details",
    component: SitesDetailsView,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
