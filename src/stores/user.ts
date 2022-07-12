import { defineStore } from "pinia";
import { supabase } from "@/supabase/init.js";

export const userStore = defineStore({
  id: "userState",
  state: () => ({
    user: null,
    loggedIn: "" as any,
  }),
  actions: {
    setUser(payload: any) {
      this.user = payload ? payload.user : null;
    },
  },
});