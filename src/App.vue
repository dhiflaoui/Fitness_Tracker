<template>
  <v-app>
    <AuthMenu />
    <v-app-bar app style="position: relative">
      <v-app-bar-nav-icon @click="appStore.toggleDrawer()">
      </v-app-bar-nav-icon>
      <v-toolbar-title>💪 Fittest Pal - {{ pageTitle }}</v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only">
        <!-- todo: change code here  the menu should be like this: https://codesandbox.io/p/sandbox/vuetify-top-navbar-frhu8?file=%2Fsrc%2FApp.vue%3A58%2C7-58%2C16 -->
        <v-btn flat v-for="item in menuItems" :key="item.title">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view />
      <v-dialog v-model="dialog.visible" :fullscreen="dialog.fullscreen">
        <v-card>
          <v-card-title>{{ dialog.title }}</v-card-title>
          <v-card-text><p v-html="dialog.contents"></p> </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="appStore.hideDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
    <v-footer app>
      <span>&copy; {{ currentYear }} 💪 Fittest Pal Fitness Tracker</span>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useAppStore } from "./stores/app";
import { useSupabaseClient } from "@/composables/supabase";

import AuthMenu from "@/components/AuthMenu.vue";
const userStore = useUserStore();
const appStore = useAppStore();
const menuItems = [
  {
    icon: "mdi-dumbbell",
    title: "Track",
    page: "/track",
  },
];
const { pageTitle, dialog } = storeToRefs(appStore);
const currentYear = new Date().getFullYear();
onMounted(async () => {
  const { data } = await useSupabaseClient.auth.getSession();

  if (data && data.session) userStore.setUserSession(data.session);

  useSupabaseClient.auth.onAuthStateChange((_, _session) => {
    userStore.setUserSession(_session);
  });
});
</script>
