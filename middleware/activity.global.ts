/** Sledování aktivity */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const { config, track } = useActivity();

    config.max = 10;
    config.exclude = ["/auth/login", "/auth/register"];

    track(to);
  }
});
