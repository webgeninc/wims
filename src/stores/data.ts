import { defineStore } from "pinia";
import { supabase } from "@/supabase/init.js";
import { toNumber } from "@vue/shared";

export const dataStore = defineStore({
  id: "dataState",
  state: () => ({
    dataNotes: [] as unknown[] | null,
    dataTabs: [] as unknown[] | null,
    dataTasks: [] as unknown[] | null,
    dataImages: [] as unknown[] | null,
    version: "1.0.00" as string,
    processing: false as boolean,
    fixing: false as boolean,
    check: false as boolean,
    ready: null as number | null,
    diagnostics: {} as Object | null,
    intro: true as boolean,
  }),

  actions:{
    introRefresh() {
      if (localStorage.getItem("intro") == "false") {
        this.intro = false;
      } else this.intro = true;
    },
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
        if (error_notes instanceof Error) throw error_task;
        this.dataNotes = notes_table;
        if (error_task instanceof Error) throw error_task;
        this.dataTasks = tasks_table;
        if (error_tabs instanceof Error) throw error_tabs;
        this.dataTabs = tabs_table;
        this.resolve()
        setTimeout(() => {
          this.processing = false;
        }, 500);
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
    },
    async resolve() {
      let images: any;
      let imagesMemory: any;
      let tabs: any = this.dataTabs;
      if(this.dataTabs){
        for (const item of tabs){
          if (item.order != (tabs.indexOf(item) + 1)){
            console.log("Order inaccuracies.. fixing...")
            this.fixing = true;
            try {
              const { error } = await supabase
                .from("tabs_table")
                .update({ order: (tabs.indexOf(item) + 1) })
                .eq("id", item.id);
              if (error instanceof Error) throw error;
            } catch (error) {
              if (error instanceof Error) {
                console.warn(error.message);
              }
            }   
          }
        }
        if (this.fixing) {
          setTimeout(() => {
            this.fixing = false;
          }, 800);
        }
      }
      
      try {
        const { data: data_images, error } = await supabase.storage.from("images").list()
        if (error) throw error;
        if(data_images){
          images = data_images.filter((ell: any) => ell.name != ("" || ".emptyFolderPlaceholder"));
          imagesMemory = data_images.map((item: any) => Object.values(item.metadata)[0]).reduce((it: any, a: any) => it + a) 
          this.diagnostics = {
            storageFiles: images.length,
            storageFileMemory: toNumber((imagesMemory / 1010000).toFixed(1)) , 
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error)
          console.warn(error.message);
        }
      }
      if(this.dataTasks){
        let result = images.map((item: any) => item.name).filter((it: any) => !this.dataTasks!.filter((el: any) => el.task_image != (undefined || null)).filter((ell: any) => ell.task_image != "").map((elll: any) => elll.task_image).includes(it))
        if(result[0]){
          this.check = true;
          console.log("Storage inaccuracies")
          console.log(...result)
        }
        if (result[0] == "undefined"){
          try {
            const { error } = await supabase.storage
              .from("images")
              .remove(['undefined']);
            if (error instanceof Error) throw error;
          } catch (error) {
            if (error instanceof Error) {
              console.warn(error.message);
            }
          }
        }
      }
    }
  }
});
