import { defineStore } from "pinia";
import { supabase } from "@/supabase/init.js";
export const dataStore = defineStore({
    id: "dataState",
    state: () => ({
        dataNotes: [],
        dataTabs: [],
        dataTasks: [],
        dataImages: [],
        version: "1.0.00",
        processing: false,
        ready: null,
    }),
    actions: {
        async getData() {
            this.processing = true;
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
                if (error_notes instanceof Error)
                    throw error_task;
                this.dataNotes = notes_table;
                if (error_task instanceof Error)
                    throw error_task;
                this.dataTasks = tasks_table;
                if (error_tabs instanceof Error)
                    throw error_tabs;
                this.dataTabs = tabs_table;
                setTimeout(() => {
                    this.processing = false;
                }, 700);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.warn(error.message);
                }
            }
        }
    }
});
