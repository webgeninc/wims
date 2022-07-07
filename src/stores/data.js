import { defineStore } from "pinia";
import { supabase } from "@/supabase/init.js";
import { toNumber } from "@vue/shared";
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
        diagnostics: {},
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
                    .order("order", { ascending: true });
                if (error_notes instanceof Error)
                    throw error_task;
                this.dataNotes = notes_table;
                if (error_task instanceof Error)
                    throw error_task;
                this.dataTasks = tasks_table;
                if (error_tabs instanceof Error)
                    throw error_tabs;
                this.dataTabs = tabs_table;
                this.resolve();
                setTimeout(() => {
                    this.processing = false;
                }, 500);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.warn(error.message);
                }
            }
        },
        async resolve() {
            let images;
            let imagesMemory;
            try {
                const { data: data_images, error } = await supabase.storage.from("images").list();
                if (error)
                    throw error;
                if (data_images) {
                    images = data_images.filter((ell) => ell.name != "");
                    imagesMemory = data_images.map((item) => Object.values(item.metadata)[0]).reduce((it, a) => it + a);
                    this.diagnostics = {
                        storageFiles: data_images.filter((ell) => ell.name != "").length,
                        storageFileMemory: toNumber((imagesMemory / 1010000).toFixed(1)),
                    };
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    console.warn(error.message);
                }
            }
            if (this.dataTasks) {
                let result = images.map((item) => item.name).filter((it) => !this.dataTasks.filter((el) => el.task_image != (undefined || null)).filter((ell) => ell.task_image != "").map((elll) => elll.task_image).includes(it));
                if (result[0]) {
                    console.log("Storage inaccuracies");
                    console.log(...result);
                }
            }
        }
    }
});
