<template>
  <div v-if="user" class="h-screen w-screen flex overflow-hidden">
    <div class="h-full flex flex-1 min-w-80">
      <Workplace />
    </div>
    <div class="w-80 h-full">
      <Headerplace />
    </div>
  </div>
  <div v-if="!user" class="h-screen w-screen flex overflow-hidden">
    <p class="p-5">Not logged in. Get back.</p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";
import { computed } from "vue";
import { userStore } from "../stores/user.js";
import { dataStore } from "../stores/data.js";
import Headerplace from "../components/HeaderPlace.vue";
import Workplace from "../components/WorkPlace.vue";
export default defineComponent({
  name: "HomeView",
  setup() {
    const dataNotes = ref<unknown[] | null>([]);
    const dataTasks = ref<unknown[] | null>([]);
    const dataTabs = ref<unknown[] | null>([]);

    const dateStor: any = dataStore();
    const userStor: any = userStore();

    const user = computed(() => userStor.user);

    const checkData = () => {
      const subs = supabase
        .from("*")
        .on("*", () => {
          setTimeout(() => {
            getData();
          }, 100);
        })
        .subscribe();
      return () => supabase.removeSubscription(subs);
    };

    const getData = async () => {
      dateStor.processing = true;
      try {
        const { data: notes_table, error: error_notes } = await supabase
          .from("notes_table")
          .select("*")
          .order("created_at", { ascending: false });
        const { data: tasks_table, error: error_task } = await supabase
          .from("tasks_table")
          .select("*")
          .order("task_date", { ascending: true });
        const { data: tabs_table, error: error_tabs } = await supabase
          .from("tabs_table")
          .select("*")
          .order("created_at", { ascending: true });
        if (error_notes instanceof Error) throw error_task;
        dataNotes.value = notes_table;
        if (error_task instanceof Error) throw error_task;
        dataTasks.value = tasks_table;
        if (error_tabs instanceof Error) throw error_tabs;
        dataTabs.value = tabs_table;
        dateStor.dataNotes = dataNotes.value;
        dateStor.dataTabs = dataTabs.value;
        dateStor.dataTasks = dataTasks.value;
        setTimeout(() => {
          dateStor.processing = null;
        }, 700);
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
    };
    checkData();
    getData();

    return { getData, user, dataNotes, dataTasks, dataTabs };
  },
  components: { Headerplace, Workplace },
});
</script>
