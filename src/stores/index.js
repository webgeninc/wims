import { defineStore } from "pinia";
export const useStore = defineStore({
    id: "userState",
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(payload) {
            this.user = payload ? payload.user : null;
        }
    },
});
