import { createRouter, createWebHistory } from "vue-router/auto";
import { useSupabaseClient } from "../composables/supabase";
const loggedInRoute = { name: "Home" };
const loginRoute = { name: "Login" };

const loginGuard = async (to: any, from: any, next: Function) => {
  const { data } = await useSupabaseClient.auth.getSession();
  if (data.session) {
    next();
  } else {
    next(loginRoute);
  }
};

const loggedInGuard = async (to: any, from: any, next: Function) => {
  const { data } = await useSupabaseClient.auth.getSession();
  if (data.session) {
    next(loggedInRoute);
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    component: () => import("../layouts/default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/Home.vue"),
        beforeEnter: loginGuard,
      },
      {
        path: "login",
        name: "Login",
        component: () => import("../pages/Login.vue"),
        beforeEnter: loggedInGuard,
      },
      {
        path: "track",
        name: "Track",
        component: () => import("@/pages/Track.vue"),
        beforeEnter: loginGuard,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
