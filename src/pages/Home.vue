<template>
  <!--  <div class="text-caption px-4 mb-2">
    <v-btn @click="userStore.logout()">
      Logout <v-icon icon="logout"></v-icon
    ></v-btn>
  </div> -->
  <AuthMenu />
</template>
<script lang="ts" setup>
import AuthMenu from "@/components/AuthMenu.vue";
/* import { useUserStore } from "@/stores/user";
const userStore = useUserStore(); */
</script>
