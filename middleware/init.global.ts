import { pb } from "~/utils/pocketbase";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/login" && !pb.authStore.isValid) {
    return navigateTo("/login");
  } else if (to.path === "/login" && pb.authStore.isValid) {
    return navigateTo("/");
  }
});
