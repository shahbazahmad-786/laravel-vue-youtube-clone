import { createRouter, createWebHistory } from "vue-router";

import PageLayout from "@/views/app/layout/PageLayout.vue";
import Home from "@/views/app/pages/Home.vue";
import AddVideo from "@/views/app/pages/AddVideo.vue";
import SingleVideo from "@/views/app/pages/SingleVideo.vue";

import Register from "@/views/auth/pages/Register.vue";
import Login from "@/views/auth/pages/Login.vue";

import store from "../store";
const appName = store.state.app.name;
const appLogo = store.state.app.logo;

const routes = [
    {
        path: "/",
        component: PageLayout,
        meta: { requireAuth: true },
        children: [
            {
                path: "/",
                name: "Home",
                component: Home,
                meta: { title: "Home" },
            },
            {
                path: "/add-video",
                name: "AddVideo",
                component: AddVideo,
                meta: { title: "Add Video" },
            },
            {
                path: "/video/:id",
                name: "Video",
                component: SingleVideo,
                meta: { title: "Video View" },
            },
        ],
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requireGuest: true, title: "Register" },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requireGuest: true, title: "Login" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (to.meta.requireGuest && store.state.user.token) {
        next({ name: "Home" });
    } else {
        next();
    }

    document.title = to.meta?.title ? `${to.meta.title} | ${appName}` : appName;
    document.getElementById("favicon").setAttribute("href", appLogo);
});

export default router;
