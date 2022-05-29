import { defineStore } from "pinia";

export const dataStore = defineStore({
  id: "dataState",
  state: () => ({
    dataNotes: [] as unknown[] | null,
    dataTabs: [] as unknown[] | null,
    dataTasks: [] as unknown[] | null,
  }),
});
