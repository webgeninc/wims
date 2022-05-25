import { createRouter, createWebHashHistory } from "vue-router";
import { supabase } from "../supabase/init";
import HomeView from "../views/HomeView.vue";
import LoginPage from "../views/LoginPage.vue";
const routes = [
    {
        path: "/",
        name: "LoginPage",
        component: LoginPage,
        // meta: {
        //   title: "Home",
        //   auth: false,
        // }
    },
    {
        path: "/HomeView",
        name: "HomeView",
        component: HomeView,
        meta: {
            auth: true,
        },
    },
];
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    const user = supabase.auth.user();
    if (to.matched.some((res) => res.meta.auth)) {
        if (user) {
            next();
            return;
        }
        next({ name: "LoginPage" });
        return;
    }
    next();
});
export default router;
