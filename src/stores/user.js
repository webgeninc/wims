import { defineStore } from "pinia";
import { supabase } from "@/supabase/init.js";
export const userStore = defineStore({
    id: "userState",
    state: () => ({
        user: null,
        loggedIn: "",
    }),
    actions: {
        setUser(payload) {
            this.user = payload ? payload.user : null;
        },
    },
});
