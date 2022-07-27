<template>
  <div v-if="user" class="h-screen w-screen flex overflow-hidden">
    <div class="h-full flex flex-1 min-w-80">
      <Workplace />
    </div>
    <div class="w-80 h-full">
      <Headerplace />
    </div>
    <div v-if="dateStor.intro">
      <Changelog
        class="absolute left-0 right-0 top-[20%] w-[700px] h-[500px] ml-auto mr-auto"
      />
    </div>
  </div>
  <div v-if="!user" class="h-screen w-screen flex overflow-hidden">
    <p class="p-5">
      Not logged in. If browser doesn't take you automatically - please refresh
      the page.
    </p>
  </div>
</template>

<script lang="ts">
import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";
import { computed } from "vue";
import { userStore } from "../stores/user.js";
import { dataStore } from "../stores/data.js";
import Headerplace from "../components/HeaderPlace.vue";
import Workplace from "../components/WorkPlace.vue";
import Changelog from "../components/changelogPreview.vue";
export default defineComponent({
  name: "HomeView",
  setup() {
    const dateStor: any = dataStore();
    const userStor: any = userStore();

    const user = computed(() => userStor.user);

    const checkData = () => {
      const subs = supabase
        .from("*")
        .on("*", () => {
          setTimeout(() => {
            dateStor.getData();
          }, 100);
        })
        .subscribe();
      return () => supabase.removeSubscription(subs);
    };
    checkData();
    dateStor.getData();

    return { user, dateStor };
  },
  components: { Headerplace, Workplace, Changelog },
});
</script>
