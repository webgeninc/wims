import { defineStore } from "pinia";

export const dataStore = defineStore({
  id: "dataState",
  state: () => ({
    dataNotes: [] as unknown[] | null,
    dataTabs: [] as unknown[] | null,
    dataTasks: [] as unknown[] | null,
    dataImages: [] as unknown[] | null,
    version: "1.0.00" as string,
    processing: null as number | null,
    ready: null as number | null,
  }),
});
