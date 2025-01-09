export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath.indexOf("/user/") > -1) {
    setPageLayout("user");
  }
});
