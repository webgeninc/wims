<template>
  <div v-if="appReady">
    <router-view />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { supabase } from "./supabase/init.js";
import { userStore } from "./stores/user.js";
export default {
  setup() {
    // Create data / vars
    const appReady = ref<boolean>(false);
    // Check to see if user is already logged in
    const user = supabase.auth.user() || supabase.auth.session();
    // If user does not exist, need to make app ready
    if (!user) {
      appReady.value = true;
    }
    const use = userStore()
    // Runs when there is a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      use.setUser(session);
      appReady.value = true;
    });

    return { appReady, user };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
