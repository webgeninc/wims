import { defineStore } from "pinia";
export const dataStore = defineStore({
    id: "dataState",
    state: () => ({
        dataNotes: [],
        dataTabs: [],
        dataTasks: [],
        dataImages: [],
        version: "1.0.00",
        processing: null,
        ready: null,
    }),
});
