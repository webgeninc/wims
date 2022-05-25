<template>
  <div>
    <p>Główny ekran</p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase/init.js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const dataLoaded = ref<boolean>(false);
    const dataNotes = ref<unknown>([]);
    const dataTasks = ref<unknown>([]);
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
        if (error_notes instanceof Error) throw error_task;
        dataNotes.value = notes_table;
        if (error_task instanceof Error) throw error_task;
        dataTasks.value = tasks_table;
        console.log(dataTasks.value);
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
    };

    getData();

    return { getData };
  },
});
</script>
