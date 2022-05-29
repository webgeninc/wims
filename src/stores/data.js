import { defineStore } from "pinia";
export const dataStore = defineStore({
    id: "dataState",
    state: () => ({
        dataNotes: [],
        dataTabs: [],
        dataTasks: [],
    }),
});
