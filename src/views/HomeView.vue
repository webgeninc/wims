<template>
  <div v-if="user" class="h-screen w-screen flex overflow-hidden">
    <Headerplace />
    <Workplace />
  </div>
  <div v-if="!user" class="h-screen w-screen flex overflow-hidden">
    <p class="p-5">Not logged. Get back.</p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";
import { computed } from "vue";
import { useStore } from "../stores/index.js";
import Headerplace from "../components/Header.vue";
import Workplace from "../components/Workplace.vue";
export default defineComponent({
  name: "HomeView",
  setup() {
    const dataLoaded = ref<boolean>(false);
    const dataNotes = ref<unknown>([]);
    const dataTasks = ref<unknown>([]);
    const dataTabs = ref<unknown>([]);

    const use = useStore();
    const user = computed(() => use.user);

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
      dataLoaded.value = false;
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
        dataLoaded.value = true;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
    };
    checkData();
    getData();
    return { getData, user, dataLoaded, dataNotes, dataTasks, dataTabs };
  },
  components: { Headerplace, Workplace },
});
</script>
